#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CREDENTIALS_FILE="${HOME}/.claude/credentials/25-快速网站/credentials.md"

if [[ ! -f "${CREDENTIALS_FILE}" ]]; then
  echo "未找到凭据文件: ${CREDENTIALS_FILE}" >&2
  exit 1
fi

extract_value() {
  local label="$1"
  local line
  line="$(grep -m1 "${label}" "${CREDENTIALS_FILE}" || true)"
  if [[ -z "${line}" ]]; then
    echo ""
    return 0
  fi
  echo "${line}" | sed -E 's/.*: *//; s/[[:space:]]+$//; s/^`//; s/`$//'
}

extract_first_value() {
  local value=""
  for label in "$@"; do
    value="$(extract_value "${label}")"
    if [[ -n "${value}" ]]; then
      echo "${value}"
      return 0
    fi
  done
  echo ""
}

CLOUDFLARE_EMAIL="$(extract_value '账号邮箱')"
CLOUDFLARE_API_KEY="$(extract_value 'Global API Key')"
PROJECT_NAME="$(extract_value '项目名')"
UMAMI_WEBSITE_ID="$(extract_value 'Umami Website ID')"
UMAMI_ENABLED_VALUE="$(extract_value 'Umami Enabled')"
ADSENSE_CLIENT_VALUE="$(extract_first_value 'PUBLIC_ADSENSE_CLIENT' 'AdSense Client' 'Adsense Client' 'AdSense Publisher ID')"
AD_SLOT_TOP_VALUE="$(extract_first_value 'PUBLIC_AD_SLOT_TOP' 'Ad Slot Top' 'Ad Slot Header')"
AD_SLOT_SIDEBAR_VALUE="$(extract_first_value 'PUBLIC_AD_SLOT_SIDEBAR' 'Ad Slot Sidebar')"
AD_SLOT_IN_CONTENT_VALUE="$(extract_first_value 'PUBLIC_AD_SLOT_IN_CONTENT' 'Ad Slot In Content' 'Ad Slot In-Content')"
AD_SLOT_BOTTOM_VALUE="$(extract_first_value 'PUBLIC_AD_SLOT_BOTTOM' 'Ad Slot Bottom' 'Ad Slot Footer')"
AD_STRATEGY_VALUE="$(extract_first_value 'PUBLIC_AD_STRATEGY' 'Ad Strategy')"
ADSENSE_AUTO_ADS_VALUE="$(extract_first_value 'PUBLIC_ADSENSE_AUTO_ADS' 'AdSense Auto Ads')"
PRODUCTION_BRANCH="${CLOUDFLARE_PRODUCTION_BRANCH:-main}"

if [[ -z "${CLOUDFLARE_EMAIL}" || -z "${CLOUDFLARE_API_KEY}" || -z "${PROJECT_NAME}" ]]; then
  echo "凭据文件缺少必要字段（账号邮箱 / Global API Key / 项目名）" >&2
  exit 1
fi

cd "${PROJECT_ROOT}"

npm run guard:i18n

BUILD_PUBLIC_UMAMI_WEBSITE_ID="${PUBLIC_UMAMI_WEBSITE_ID:-${UMAMI_WEBSITE_ID}}"
BUILD_PUBLIC_UMAMI_ENABLED="${PUBLIC_UMAMI_ENABLED:-${UMAMI_ENABLED_VALUE}}"
BUILD_PUBLIC_ADSENSE_CLIENT="${PUBLIC_ADSENSE_CLIENT:-${ADSENSE_CLIENT_VALUE}}"
BUILD_PUBLIC_AD_SLOT_TOP="${PUBLIC_AD_SLOT_TOP:-${AD_SLOT_TOP_VALUE}}"
BUILD_PUBLIC_AD_SLOT_SIDEBAR="${PUBLIC_AD_SLOT_SIDEBAR:-${AD_SLOT_SIDEBAR_VALUE}}"
BUILD_PUBLIC_AD_SLOT_IN_CONTENT="${PUBLIC_AD_SLOT_IN_CONTENT:-${AD_SLOT_IN_CONTENT_VALUE}}"
BUILD_PUBLIC_AD_SLOT_BOTTOM="${PUBLIC_AD_SLOT_BOTTOM:-${AD_SLOT_BOTTOM_VALUE}}"
BUILD_PUBLIC_AD_STRATEGY="${PUBLIC_AD_STRATEGY:-${AD_STRATEGY_VALUE}}"
BUILD_PUBLIC_ADSENSE_AUTO_ADS="${PUBLIC_ADSENSE_AUTO_ADS:-${ADSENSE_AUTO_ADS_VALUE}}"

if [[ -z "${BUILD_PUBLIC_AD_SLOT_TOP}" && -z "${BUILD_PUBLIC_AD_SLOT_SIDEBAR}" && -z "${BUILD_PUBLIC_AD_SLOT_IN_CONTENT}" && -z "${BUILD_PUBLIC_AD_SLOT_BOTTOM}" ]]; then
  echo "提示：未配置任何 PUBLIC_AD_SLOT_*。当前将仅依赖 Auto ads；若 AdSense 后台关闭 Auto ads，页面不会展示广告位。"
fi

build_env=()
if [[ -n "${BUILD_PUBLIC_UMAMI_WEBSITE_ID}" ]]; then
  build_env+=("PUBLIC_UMAMI_WEBSITE_ID=${BUILD_PUBLIC_UMAMI_WEBSITE_ID}")
  build_env+=("PUBLIC_UMAMI_ENABLED=${BUILD_PUBLIC_UMAMI_ENABLED}")
fi
if [[ -n "${BUILD_PUBLIC_ADSENSE_CLIENT}" ]]; then
  build_env+=("PUBLIC_ADSENSE_CLIENT=${BUILD_PUBLIC_ADSENSE_CLIENT}")
fi
if [[ -n "${BUILD_PUBLIC_AD_SLOT_TOP}" ]]; then
  build_env+=("PUBLIC_AD_SLOT_TOP=${BUILD_PUBLIC_AD_SLOT_TOP}")
fi
if [[ -n "${BUILD_PUBLIC_AD_SLOT_SIDEBAR}" ]]; then
  build_env+=("PUBLIC_AD_SLOT_SIDEBAR=${BUILD_PUBLIC_AD_SLOT_SIDEBAR}")
fi
if [[ -n "${BUILD_PUBLIC_AD_SLOT_IN_CONTENT}" ]]; then
  build_env+=("PUBLIC_AD_SLOT_IN_CONTENT=${BUILD_PUBLIC_AD_SLOT_IN_CONTENT}")
fi
if [[ -n "${BUILD_PUBLIC_AD_SLOT_BOTTOM}" ]]; then
  build_env+=("PUBLIC_AD_SLOT_BOTTOM=${BUILD_PUBLIC_AD_SLOT_BOTTOM}")
fi
if [[ -n "${BUILD_PUBLIC_AD_STRATEGY}" ]]; then
  build_env+=("PUBLIC_AD_STRATEGY=${BUILD_PUBLIC_AD_STRATEGY}")
fi
if [[ -n "${BUILD_PUBLIC_ADSENSE_AUTO_ADS}" ]]; then
  build_env+=("PUBLIC_ADSENSE_AUTO_ADS=${BUILD_PUBLIC_ADSENSE_AUTO_ADS}")
fi

if (( ${#build_env[@]} )); then
  env "${build_env[@]}" npm run build
else
  npm run build
fi

CLOUDFLARE_API_KEY="${CLOUDFLARE_API_KEY}" CLOUDFLARE_EMAIL="${CLOUDFLARE_EMAIL}" \
  npx wrangler pages deploy dist --project-name="${PROJECT_NAME}" --branch="${PRODUCTION_BRANCH}" "$@"
