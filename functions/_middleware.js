export async function onRequest(context) {
  const response = await context.next();
  const host = new URL(context.request.url).hostname.toLowerCase();

  if (!host.endsWith(".pages.dev")) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
