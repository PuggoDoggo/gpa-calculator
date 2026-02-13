# GPA Calculator - Free Online Cumulative GPA & CGPA Calculator

Free online GPA calculator with school-specific grading scales. Calculate your cumulative GPA, project semester results, convert GPA to percentage, and plan grade targets. Built for university and polytechnic students in Singapore, Malaysia, India, and the United States.

**[Use the Calculator at gpacalc.app](https://gpacalc.app)**

![GPACalc - Free GPA Calculator](screenshot-homepage.png)

## Features

- **Cumulative GPA projection** - Enter your current CGPA and credits, add this semester's modules, and see your projected CGPA instantly
- **School-specific grading scales** - Pre-configured grade points for 30+ institutions/scales across 4 countries
- **GPA to Percentage converter** - Convert GPA to percentage for 4.0, 5.0, and 10.0 scales
- **Percentage to GPA converter** - Convert percentage scores back to GPA
- **What-if scenarios** - Try different grade combinations to plan your target GPA
- **Shareable result cards** - Download your GPA result as a PNG image or share to WhatsApp, Telegram, X, and Facebook
- **No sign-up required** - Completely free, works in the browser, no account needed

## Supported Schools

### Singapore Universities (5.0 Scale)

| School | Full Name | Scale |
|--------|-----------|-------|
| NUS | National University of Singapore | 5.0 |
| NTU | Nanyang Technological University | 5.0 |
| SMU | Singapore Management University | 4.0 |
| SUSS | Singapore University of Social Sciences | 5.0 |
| SUTD | Singapore University of Technology and Design | 5.0 |
| SIT | Singapore Institute of Technology | 5.0 |

### Singapore Polytechnics (4.0 Scale)

| School | Full Name | Scale |
|--------|-----------|-------|
| SP | Singapore Polytechnic | 4.0 |
| NP | Ngee Ann Polytechnic | 4.0 |
| TP | Temasek Polytechnic | 4.0 |
| NYP | Nanyang Polytechnic | 4.0 |
| RP | Republic Polytechnic | 4.0 |

### Malaysia Universities (4.0 Scale)

| School | Full Name | Scale |
|--------|-----------|-------|
| UM | Universiti Malaya | 4.0 |
| UKM | Universiti Kebangsaan Malaysia | 4.0 |
| USM | Universiti Sains Malaysia | 4.0 |
| UTM | Universiti Teknologi Malaysia | 4.0 |
| UPM | Universiti Putra Malaysia | 4.0 |
| UiTM | Universiti Teknologi MARA | 4.0 |
| IIUM | International Islamic University Malaysia | 4.0 |
| UUM | Universiti Utara Malaysia | 4.0 |
| UMS | Universiti Malaysia Sabah | 4.0 |
| UNIMAS | Universiti Malaysia Sarawak | 4.0 |
| UPSI | Universiti Pendidikan Sultan Idris | 4.0 |
| UMT | Universiti Malaysia Terengganu | 4.0 |
| UTHM | Universiti Tun Hussein Onn Malaysia | 4.0 |
| USIM | Universiti Sains Islam Malaysia | 4.0 |
| UMPSA | Universiti Malaysia Pahang Al-Sultan Abdullah | 4.0 |
| UniMAP | Universiti Malaysia Perlis | 4.0 |
| UTeM | Universiti Teknikal Malaysia Melaka | 4.0 |
| UniSZA | Universiti Sultan Zainal Abidin | 4.0 |
| UMK | Universiti Malaysia Kelantan | 4.0 |
| UPNM | Universiti Pertahanan Nasional Malaysia | 4.0 |

### Other Scales

- **US Standard** - 4.0 GPA scale
- **India CGPA** - 10.0 CGPA scale (with 9.5 multiplier for percentage conversion)

## How It Works

```
Projected CGPA = (Current CGPA x Credits Done + Semester Points) / Total Credits
Semester Points = Sum of (Grade Point x Module Credit)
```

1. Enter your current CGPA and completed credits
2. Select your school's grading scale
3. Add this semester's modules with expected grades and credit units
4. The calculator updates your projected CGPA in real time
5. Download or share the result card

## Use Cases

- **Semester planning** - See how expected grades affect your cumulative GPA before exams
- **Honours classification** - Check if you meet the GPA threshold for First Class, Second Upper, etc.
- **Scholarship applications** - Verify your GPA meets minimum requirements
- **Exchange programmes** - Project your GPA for application deadlines
- **Graduate school admission** - Convert and verify your GPA across different scales

## Tools Included

| Tool | URL | Description |
|------|-----|-------------|
| Cumulative GPA Calculator | [gpacalc.app](https://gpacalc.app) | Main calculator with CGPA projection |
| GPA to Percentage | [gpacalc.app/gpa-to-percentage](https://gpacalc.app/gpa-to-percentage) | Convert GPA to percentage |
| Percentage to GPA | [gpacalc.app/percentage-to-gpa](https://gpacalc.app/percentage-to-gpa) | Convert percentage to GPA |
| School-specific calculators | [gpacalc.app/schools](https://gpacalc.app/schools) | NUS, NTU, SMU, SP, NP, UM and more |

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com)

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:4321` in your browser.

### Build

```bash
npm run build
```

Output goes to `dist/`.

### AdSense Setup

本项目是本地构建后再 `wrangler pages deploy dist`，因此广告变量必须在构建阶段注入。

可通过两种方式提供（优先级：命令行环境变量 > credentials）：

1) 直接导出环境变量后 `npm run deploy`
2) 写入 `~/.claude/credentials/25-快速网站/credentials.md`，由 `scripts/deploy-cloudflare.sh` 自动读取

支持的变量：

- `PUBLIC_ADSENSE_CLIENT`: AdSense publisher id, e.g. `ca-pub-xxxxxxxxxxxxxxxx`
- `PUBLIC_AD_SLOT_TOP`: manual top slot id
- `PUBLIC_AD_SLOT_SIDEBAR`: manual sidebar slot id
- `PUBLIC_AD_SLOT_IN_CONTENT`: manual in-content slot id
- `PUBLIC_AD_SLOT_BOTTOM`: manual bottom slot id
- `PUBLIC_ADSENSE_AUTO_ADS=true|false`: enable page-level auto ads fallback
- `PUBLIC_AD_STRATEGY=performance` (default): low-impact loading, suitable for UX and Lighthouse
- `PUBLIC_AD_STRATEGY=revenue`: earlier loading and denser fill strategy

Recommended policy for this project (方案2):

- Keep `Auto ads` enabled, but use only overlay-focused formats in AdSense.
- Turn off `In-page formats` in Auto ads to avoid conflicts with manual slots above.
- Keep `Anchor` at bottom only, and exclude calculator hero/form areas from auto placement.

After changing env vars or strategy, redeploy:

```bash
npm run deploy
```

部署后快速验收：

```bash
# 页面应包含手动广告槽位（有配置时）
curl -sL https://gpacalc.app/ | rg "data-ad-slot"

# AdSense 脚本应可加载
curl -I "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
```

### Umami Analytics Setup (按 10-网站运营方案)

项目采用 Cloudflare Worker 代理 Umami，前端统一使用第一方路径上报：

- 脚本路径：`/a/s.js`
- 上报路径：`/a/api/send`

初始化（会自动读取 `~/.claude/credentials/25-快速网站/credentials.md`）：

```bash
npm run setup:umami
```

该命令会自动完成：

- 创建或复用 Umami Website（按站点域名）
- 部署 Worker：`gpacalc-umami-proxy`
- 绑定路由：`gpacalc.app/a/*`
- 回写 credentials 中的 `Umami Website ID`
- 支持通过 `UMAMI_EXCLUDED_IPS` 写入并更新 `Umami Excluded IPs`（逗号分隔）

生产部署时，`scripts/deploy-cloudflare.sh` 会自动把 `Umami Website ID` 注入构建变量：

- `PUBLIC_UMAMI_WEBSITE_ID`
- `PUBLIC_UMAMI_ENABLED`

链路验收命令：

```bash
# 1) 脚本代理是否可访问
curl -I https://gpacalc.app/a/s.js

# 2) 预检是否通过（应返回 204）
curl -i -X OPTIONS https://gpacalc.app/a/api/send \
  -H 'Origin: https://gpacalc.app' \
  -H 'Access-Control-Request-Method: POST'
```

浏览器侧进一步确认：打开站点后检查网络请求，应出现 `POST /a/api/send` 且状态码 `200`。

排除调试 IP 示例：

```bash
UMAMI_EXCLUDED_IPS="118.200.44.242" npm run setup:umami
```

### SEO Canonical & Sitemap 约定

- 规范主站域名：`https://gpacalc.app/`
- `www` 会 301 到根域（避免主机名重复内容）
- `http` 会 301 到 `https`
- `https://gpacalc.app/sitemap.xml` 会 301 到 `https://gpacalc.app/sitemap-index.xml`
- GSC 建议提交：`https://gpacalc.app/sitemap-index.xml`

## License

[MIT](LICENSE)
