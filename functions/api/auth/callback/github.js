export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code: code,
    }),
  });

  const tokenData = await tokenResponse.json();
  if (tokenData.error) {
    return new Response(JSON.stringify(tokenData), { status: 400 });
  }

  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
      "Accept": "application/json",
    },
  });

  const userData = await userResponse.json();
  // 返回用户信息（可以根据需求改成跳转或保存用户状态）
  return new Response(JSON.stringify(userData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
