export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Serve index.html for root path
    if (url.pathname === '/') {
      const indexResponse = await fetch(new Request(new URL('/index.html', url), request));
      return new Response(indexResponse.body, {
        status: 200,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          ...Object.fromEntries(indexResponse.headers)
        }
      });
    }

    return fetch(request);
  }
};
