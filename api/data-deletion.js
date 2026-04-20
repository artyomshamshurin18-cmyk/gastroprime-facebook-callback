// Facebook Data Deletion Callback - JavaScript version for GitHub Pages
// GitHub Pages doesn't support PHP, so we use JavaScript with Vercel/Netlify style

export default async function handler(request) {
  // Set CORS headers
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  // Handle OPTIONS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  // Only allow POST
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers }
    );
  }

  // Generate confirmation code
  const confirmationCode = Math.random().toString(36).substr(2, 8).toUpperCase();
  const statusUrl = `https://artyomshamshurin18-cmyk.github.io/gastroprime-facebook-callback/deletion-status.html?code=${confirmationCode}`;

  // Return Facebook-required JSON
  return new Response(
    JSON.stringify({
      url: statusUrl,
      confirmation_code: confirmationCode
    }),
    { status: 200, headers }
  );
}