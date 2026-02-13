#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_CREDENTIALS="${HOME}/.claude/credentials/25-快速网站/credentials.md"
UMAMI_SHARED_DIR="${HOME}/.claude/credentials/_Shared/Umami"
UMAMI_TOKEN_FILE="${UMAMI_SHARED_DIR}/api_token.txt"
UMAMI_GET_TOKEN_SCRIPT="${HOME}/Documents/claude-work/10-网站运营/domain-phoenix/scripts/get_umami_token.py"

UMAMI_HOST="${UMAMI_HOST:-https://umami.hniapi.top}"
WORKER_NAME="${UMAMI_WORKER_NAME:-gpacalc-umami-proxy}"
EXCLUDED_IPS=""
CF_API="https://api.cloudflare.com/client/v4"

if [[ ! -f "${SITE_CREDENTIALS}" ]]; then
  echo "未找到站点凭据: ${SITE_CREDENTIALS}" >&2
  exit 1
fi

extract_value() {
  local label="$1"
  local line
  line="$(grep -m1 "${label}" "${SITE_CREDENTIALS}" || true)"
  if [[ -z "${line}" ]]; then
    echo ""
    return 0
  fi
  echo "${line}" | sed -E 's/.*: *//; s/[[:space:]]+$//; s/^`//; s/`$//'
}

DOMAIN="$(extract_value '域名')"
CF_EMAIL="$(extract_value '账号邮箱')"
CF_KEY="$(extract_value 'Global API Key')"
CREDENTIALS_EXCLUDED_IPS="$(extract_value 'Umami Excluded IPs')"

if [[ -n "${UMAMI_EXCLUDED_IPS:-}" ]]; then
  EXCLUDED_IPS="${UMAMI_EXCLUDED_IPS}"
else
  EXCLUDED_IPS="${CREDENTIALS_EXCLUDED_IPS}"
fi
EXCLUDED_IPS="$(printf '%s' "${EXCLUDED_IPS}" | sed -E 's/[[:space:]]+//g')"

if [[ -z "${DOMAIN}" || -z "${CF_EMAIL}" || -z "${CF_KEY}" ]]; then
  echo "站点凭据缺少必要字段（域名 / 账号邮箱 / Global API Key）" >&2
  exit 1
fi

ensure_umami_token() {
  if [[ -s "${UMAMI_TOKEN_FILE}" ]]; then
    cat "${UMAMI_TOKEN_FILE}"
    return 0
  fi

  if [[ ! -f "${UMAMI_GET_TOKEN_SCRIPT}" ]]; then
    echo "缺少 Umami token 获取脚本: ${UMAMI_GET_TOKEN_SCRIPT}" >&2
    exit 1
  fi

  python3 "${UMAMI_GET_TOKEN_SCRIPT}" >/dev/null
  if [[ ! -s "${UMAMI_TOKEN_FILE}" ]]; then
    echo "无法获取 Umami API token" >&2
    exit 1
  fi
  cat "${UMAMI_TOKEN_FILE}"
}

umami_request() {
  local method="$1"
  local path="$2"
  local token="$3"
  local payload="${4:-}"
  local resp body code

  if [[ -n "${payload}" ]]; then
    resp="$(curl -sS -w $'\n%{http_code}' -X "${method}" \
      -H "Authorization: Bearer ${token}" \
      -H "Content-Type: application/json" \
      --data "${payload}" \
      "${UMAMI_HOST}${path}")"
  else
    resp="$(curl -sS -w $'\n%{http_code}' -X "${method}" \
      -H "Authorization: Bearer ${token}" \
      "${UMAMI_HOST}${path}")"
  fi

  body="${resp%$'\n'*}"
  code="${resp##*$'\n'}"
  if [[ "${code}" == "401" ]]; then
    return 41
  fi
  if [[ "${code}" -lt 200 || "${code}" -ge 300 ]]; then
    echo "Umami API ${path} 请求失败，HTTP ${code}" >&2
    echo "${body}" >&2
    return 1
  fi

  printf '%s' "${body}"
}

CF_HEADERS=(
  -H "X-Auth-Email: ${CF_EMAIL}"
  -H "X-Auth-Key: ${CF_KEY}"
  -H "Content-Type: application/json"
)

cf_request() {
  local method="$1"
  local path="$2"
  local payload="${3:-}"
  local resp body code

  if [[ -n "${payload}" ]]; then
    resp="$(curl -sS -w $'\n%{http_code}' -X "${method}" \
      "${CF_HEADERS[@]}" \
      --data "${payload}" \
      "${CF_API}${path}")"
  else
    resp="$(curl -sS -w $'\n%{http_code}' -X "${method}" \
      "${CF_HEADERS[@]}" \
      "${CF_API}${path}")"
  fi

  body="${resp%$'\n'*}"
  code="${resp##*$'\n'}"
  if [[ "${code}" -lt 200 || "${code}" -ge 300 ]]; then
    echo "Cloudflare API ${path} 请求失败，HTTP ${code}" >&2
    echo "${body}" >&2
    return 1
  fi
  printf '%s' "${body}"
}

refresh_umami_token() {
  if [[ ! -f "${UMAMI_GET_TOKEN_SCRIPT}" ]]; then
    echo "缺少 Umami token 刷新脚本: ${UMAMI_GET_TOKEN_SCRIPT}" >&2
    exit 1
  fi
  python3 "${UMAMI_GET_TOKEN_SCRIPT}" >/dev/null
  cat "${UMAMI_TOKEN_FILE}"
}

echo "==> 初始化 Umami for ${DOMAIN}"
if [[ -n "${EXCLUDED_IPS}" ]]; then
  echo "✓ 已配置排除 IP: ${EXCLUDED_IPS}"
fi

UMAMI_TOKEN="$(ensure_umami_token)"
set +e
WEBSITES_JSON="$(umami_request GET "/api/websites" "${UMAMI_TOKEN}")"
UMAMI_STATUS=$?
set -e
if [[ ${UMAMI_STATUS} -eq 41 ]]; then
  UMAMI_TOKEN="$(refresh_umami_token)"
  WEBSITES_JSON="$(umami_request GET "/api/websites" "${UMAMI_TOKEN}")"
fi

WEBSITE_ID="$(printf '%s' "${WEBSITES_JSON}" | DOMAIN="${DOMAIN}" node -e '
const fs = require("fs");
const input = fs.readFileSync(0, "utf8");
const domain = process.env.DOMAIN;
const json = JSON.parse(input);
const data = Array.isArray(json) ? json : (Array.isArray(json.data) ? json.data : []);
const hit = data.find((site) => site.domain === domain);
process.stdout.write(hit?.id || "");
')"

if [[ -z "${WEBSITE_ID}" ]]; then
  CREATE_PAYLOAD="$(printf '{"name":"%s","domain":"%s"}' "${DOMAIN}" "${DOMAIN}")"
  set +e
  CREATE_JSON="$(umami_request POST "/api/websites" "${UMAMI_TOKEN}" "${CREATE_PAYLOAD}")"
  UMAMI_STATUS=$?
  set -e
  if [[ ${UMAMI_STATUS} -eq 41 ]]; then
    UMAMI_TOKEN="$(refresh_umami_token)"
    CREATE_JSON="$(umami_request POST "/api/websites" "${UMAMI_TOKEN}" "${CREATE_PAYLOAD}")"
  fi

  WEBSITE_ID="$(printf '%s' "${CREATE_JSON}" | node -e '
const fs = require("fs");
const input = fs.readFileSync(0, "utf8");
const json = JSON.parse(input);
process.stdout.write(json.id || "");
')"
fi

if [[ -z "${WEBSITE_ID}" ]]; then
  echo "创建/获取 Umami Website ID 失败" >&2
  exit 1
fi
echo "✓ Umami Website ID 已确认"

ZONE_JSON="$(cf_request GET "/zones?name=${DOMAIN}")"
ZONE_INFO="$(printf '%s' "${ZONE_JSON}" | node -e '
const fs = require("fs");
const input = fs.readFileSync(0, "utf8");
const json = JSON.parse(input);
if (!json.success || !Array.isArray(json.result) || json.result.length === 0) {
  process.exit(1);
}
const zone = json.result[0];
process.stdout.write(`${zone.id} ${zone.account?.id || ""}`);
')" 
ZONE_ID="${ZONE_INFO%% *}"
ACCOUNT_ID="${ZONE_INFO#* }"

if [[ -z "${ZONE_ID}" || -z "${ACCOUNT_ID}" ]]; then
  echo "获取 Zone/Account 信息失败" >&2
  exit 1
fi
echo "✓ Cloudflare Zone/Account 已确认"

WORKER_SCRIPT="${PROJECT_ROOT}/workers/umami-proxy/src/index.js"
if [[ ! -f "${WORKER_SCRIPT}" ]]; then
  echo "缺少 Worker 脚本: ${WORKER_SCRIPT}" >&2
  exit 1
fi

WORKER_METADATA="$(node -e '
const host = process.argv[1];
const excluded = process.argv[2];
const metadata = {
  main_module: "index.js",
  bindings: [
    { type: "plain_text", name: "UMAMI_HOST", text: host },
    { type: "plain_text", name: "EXCLUDED_IPS", text: excluded },
  ],
};
process.stdout.write(JSON.stringify(metadata));
' "${UMAMI_HOST}" "${EXCLUDED_IPS}")"

curl -sS -X PUT \
  -H "X-Auth-Email: ${CF_EMAIL}" \
  -H "X-Auth-Key: ${CF_KEY}" \
  -F "script=@${WORKER_SCRIPT};filename=index.js;type=application/javascript+module" \
  -F "metadata=${WORKER_METADATA};type=application/json" \
  "${CF_API}/accounts/${ACCOUNT_ID}/workers/scripts/${WORKER_NAME}" >/dev/null
echo "✓ Worker 已部署: ${WORKER_NAME}"

ROUTE_PATTERN="${DOMAIN}/a/*"
ROUTES_JSON="$(cf_request GET "/zones/${ZONE_ID}/workers/routes")"
ROUTE_INFO="$(printf '%s' "${ROUTES_JSON}" | PATTERN="${ROUTE_PATTERN}" node -e '
const fs = require("fs");
const input = fs.readFileSync(0, "utf8");
const pattern = process.env.PATTERN;
const json = JSON.parse(input);
const routes = Array.isArray(json.result) ? json.result : [];
const hit = routes.find((route) => route.pattern === pattern);
if (!hit) process.stdout.write(" ");
else process.stdout.write(`${hit.id || ""} ${hit.script || ""}`);
')" 
EXISTING_ROUTE_ID="${ROUTE_INFO%% *}"
EXISTING_ROUTE_SCRIPT="${ROUTE_INFO#* }"

ROUTE_PAYLOAD="$(printf '{"pattern":"%s","script":"%s"}' "${ROUTE_PATTERN}" "${WORKER_NAME}")"
if [[ -z "${EXISTING_ROUTE_ID}" ]]; then
  cf_request POST "/zones/${ZONE_ID}/workers/routes" "${ROUTE_PAYLOAD}" >/dev/null
  echo "✓ Worker 路由已创建: ${ROUTE_PATTERN}"
elif [[ "${EXISTING_ROUTE_SCRIPT}" != "${WORKER_NAME}" ]]; then
  cf_request PUT "/zones/${ZONE_ID}/workers/routes/${EXISTING_ROUTE_ID}" "${ROUTE_PAYLOAD}" >/dev/null
  echo "✓ Worker 路由已更新: ${ROUTE_PATTERN}"
else
  echo "✓ Worker 路由已存在: ${ROUTE_PATTERN}"
fi

if grep -q "Umami Website ID" "${SITE_CREDENTIALS}"; then
  TMP_FILE="$(mktemp)"
  awk -v website_id="${WEBSITE_ID}" -v worker_name="${WORKER_NAME}" -v excluded_ips="${EXCLUDED_IPS}" '
    {
      if ($0 ~ /Umami Website ID/) {
        sub(/:.*/, ": " website_id);
      } else if ($0 ~ /Umami Worker/) {
        sub(/:.*/, ": " worker_name);
      } else if ($0 ~ /Umami Enabled/) {
        sub(/:.*/, ": true");
      } else if ($0 ~ /Umami Excluded IPs/) {
        sub(/:.*/, ": " excluded_ips);
      }
      print $0;
    }
  ' "${SITE_CREDENTIALS}" > "${TMP_FILE}"
  mv "${TMP_FILE}" "${SITE_CREDENTIALS}"
else
  cat >> "${SITE_CREDENTIALS}" <<EOF

## Umami

- **Umami Host**: ${UMAMI_HOST}
- **Umami Website ID**: ${WEBSITE_ID}
- **Umami Worker**: ${WORKER_NAME}
- **Umami Enabled**: true
- **Umami Excluded IPs**: ${EXCLUDED_IPS}
EOF
fi

if ! grep -q "Umami Excluded IPs" "${SITE_CREDENTIALS}"; then
  echo "- **Umami Excluded IPs**: ${EXCLUDED_IPS}" >> "${SITE_CREDENTIALS}"
fi
echo "✓ 站点凭据已写入 Umami 字段"

echo "==> 验证 Worker 代理"
curl -sS -I "https://${DOMAIN}/a/s.js" | sed -n '1,20p'

echo "==> 完成。下一步执行生产部署时会自动携带 PUBLIC_UMAMI_WEBSITE_ID"
