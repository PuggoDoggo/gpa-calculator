#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const scriptFile = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(scriptFile), '..');
const guardFile = path.join(rootDir, 'src/data/i18n/seo-locale-pages.json');

function fail(message) {
  console.error(`\n[i18n-guard] 校验失败: ${message}`);
  process.exit(1);
}

function readGuardConfig() {
  if (!fs.existsSync(guardFile)) {
    fail(`未找到配置文件: ${guardFile}`);
  }

  try {
    const raw = fs.readFileSync(guardFile, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    fail(`配置文件 JSON 解析失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function containsBlockedTerm(text, blockedTerms) {
  const lowerText = text.toLowerCase();
  return blockedTerms.find((term) => lowerText.includes(term.toLowerCase())) ?? null;
}

function textBundle(page) {
  const secondary = Array.isArray(page.secondaryKeywords) ? page.secondaryKeywords.join(' ') : '';
  return `${page.title} ${page.h1} ${page.description} ${page.primaryKeyword} ${secondary}`;
}

function hasKeywordInCoreText(page) {
  const core = `${page.title} ${page.h1} ${page.description}`.toLowerCase();
  const tokens = page.primaryKeyword
    .toLowerCase()
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
  return tokens.every((token) => core.includes(token));
}

function validateStaticRules(config) {
  if (!Array.isArray(config.requiredRoutes) || config.requiredRoutes.length === 0) {
    fail('requiredRoutes 不能为空');
  }
  if (!config.locales || typeof config.locales !== 'object') {
    fail('locales 配置缺失');
  }

  const seenCanonical = new Set();
  const localeKeys = Object.keys(config.locales);
  if (localeKeys.length === 0) {
    fail('至少需要一个 locale');
  }

  for (const locale of localeKeys) {
    const localeConfig = config.locales[locale];
    if (!localeConfig?.pathPrefix || !localeConfig.pathPrefix.startsWith(`/${locale}`)) {
      fail(`locale ${locale} 的 pathPrefix 非法，当前值: ${localeConfig?.pathPrefix ?? '空'}`);
    }

    const blockedTerms = Array.isArray(localeConfig.blockedTerms) ? localeConfig.blockedTerms : [];
    const pages = localeConfig.pages;
    if (!pages || typeof pages !== 'object') {
      fail(`locale ${locale} 缺少 pages 配置`);
    }

    for (const route of config.requiredRoutes) {
      const page = pages[route];
      if (!page) {
        fail(`locale ${locale} 缺少必需路由: ${route}`);
      }

      const requiredFields = ['canonicalPath', 'title', 'h1', 'description', 'primaryKeyword'];
      for (const field of requiredFields) {
        if (typeof page[field] !== 'string' || page[field].trim().length === 0) {
          fail(`locale ${locale} 路由 ${route} 的 ${field} 为空`);
        }
      }

      if (!page.canonicalPath.startsWith(`${localeConfig.pathPrefix}/`) && page.canonicalPath !== `${localeConfig.pathPrefix}/`) {
        fail(`locale ${locale} 路由 ${route} 的 canonicalPath 与 pathPrefix 不一致: ${page.canonicalPath}`);
      }

      if (!page.canonicalPath.endsWith('/')) {
        fail(`locale ${locale} 路由 ${route} 的 canonicalPath 必须以 / 结尾: ${page.canonicalPath}`);
      }

      const canonicalKey = page.canonicalPath.toLowerCase();
      if (seenCanonical.has(canonicalKey)) {
        fail(`canonicalPath 重复: ${page.canonicalPath}`);
      }
      seenCanonical.add(canonicalKey);

      if (!Array.isArray(page.secondaryKeywords) || page.secondaryKeywords.length < 2) {
        fail(`locale ${locale} 路由 ${route} secondaryKeywords 至少 2 条`);
      }

      if (!hasKeywordInCoreText(page)) {
        fail(`locale ${locale} 路由 ${route} primaryKeyword 未覆盖到 title/h1/description`);
      }

      const blockedHit = containsBlockedTerm(textBundle(page), blockedTerms);
      if (blockedHit) {
        fail(`locale ${locale} 路由 ${route} 含禁用词: ${blockedHit}`);
      }
    }
  }
}

function checkKeywordLockChange() {
  const relativeFile = 'src/data/i18n/seo-locale-pages.json';

  try {
    execSync(`git cat-file -e HEAD:${relativeFile}`, { cwd: rootDir, stdio: 'ignore' });
  } catch {
    console.warn('[i18n-guard] 首次引入关键词锁文件，跳过 diff 锁定检查。');
    return;
  }

  let diff = '';
  try {
    diff = execSync(`git diff --unified=0 -- ${relativeFile}`, {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
  } catch {
    diff = '';
  }

  if (!diff.trim()) {
    return;
  }

  const changedLockedFields = diff
    .split('\n')
    .filter((line) => (line.startsWith('+') || line.startsWith('-')) && !line.startsWith('+++') && !line.startsWith('---'))
    .filter((line) => /"primaryKeyword"\s*:|"canonicalPath"\s*:/.test(line));

  if (changedLockedFields.length === 0) {
    return;
  }

  if (process.env.ALLOW_I18N_KEYWORD_CHANGE === 'true') {
    console.warn('[i18n-guard] 检测到关键词锁字段变更，但已通过 ALLOW_I18N_KEYWORD_CHANGE=true 明确授权。');
    return;
  }

  fail('检测到 primaryKeyword/canonicalPath 变更。若为有意调整，请显式设置 ALLOW_I18N_KEYWORD_CHANGE=true 后再部署。');
}

function main() {
  const config = readGuardConfig();
  validateStaticRules(config);
  checkKeywordLockChange();
  console.log('[i18n-guard] 通过：locale 关键词锁、禁用词与 canonical 规则校验完成。');
}

main();
