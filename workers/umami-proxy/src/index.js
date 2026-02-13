function normalizeHost(host) {
  if (!host) return "";
  return host.endsWith("/") ? host.slice(0, -1) : host;
}

function getClientIp(request) {
  return (
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("X-Forwarded-For") ||
    request.headers.get("x-forwarded-for") ||
    ""
  )
    .split(",")[0]
    .trim();
}

function parseExcludedIps(raw) {
  return new Set(
    (raw || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  );
}

async function proxy(request, targetUrl) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.delete("host");
  requestHeaders.delete("cf-connecting-ip");
  requestHeaders.delete("content-length");

  const upstream = await fetch(targetUrl, {
    method: request.method,
    headers: requestHeaders,
    body: request.method === "GET" || request.method === "HEAD" ? null : request.body,
    redirect: "follow",
  });

  const responseHeaders = new Headers(upstream.headers);
  responseHeaders.delete("set-cookie");
  return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const umamiHost = normalizeHost(env.UMAMI_HOST);
    if (!umamiHost) {
      return new Response("UMAMI_HOST is not configured", { status: 500 });
    }

    if (url.pathname === "/a/s.js") {
      if (request.method !== "GET" && request.method !== "HEAD") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      const targetUrl = `${umamiHost}/script.js`;
      const res = await proxy(request, targetUrl);
      res.headers.set("cache-control", "public, max-age=86400");
      return res;
    }

    if (url.pathname === "/a/api/send") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
          status: 204,
          headers: {
            "access-control-allow-origin": url.origin,
            "access-control-allow-methods": "POST, OPTIONS",
            "access-control-allow-headers": "content-type",
          },
        });
      }

      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      const clientIp = getClientIp(request);
      const excluded = parseExcludedIps(env.EXCLUDED_IPS);
      if (clientIp && excluded.has(clientIp)) {
        return new Response(null, { status: 204 });
      }

      const targetUrl = `${umamiHost}/api/send`;
      return proxy(request, targetUrl);
    }

    return new Response("Not Found", { status: 404 });
  },
};
