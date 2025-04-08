export async function onRequestGet({ request, env }) {
  const clientId = env.GITHUB_CLIENT_ID;
  const redirectUri = "https://newsnow-5c1.pages.dev/api/auth/callback/github";
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
  return Response.redirect(githubAuthUrl, 302);
}
