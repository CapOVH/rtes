import axios from "axios";
import cookie from "cookie";

export default async function(req, res) {
  const { code } = req.query;

  const token = await axios.post("https://sellauth.com/oauth/token", {
    client_id: process.env.SELLAUTH_CLIENT,
    client_secret: process.env.SELLAUTH_SECRET,
    code,
    redirect_uri: process.env.SELLAUTH_REDIRECT,
    grant_type: "authorization_code"
  });

  const user = await axios.get("https://sellauth.com/api/v1/user", {
    headers: { Authorization: `Bearer ${token.data.access_token}` }
  });

  res.setHeader("Set-Cookie",
    cookie.serialize("sa_token", token.data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/"
    })
  );

  res.redirect("/");
}
