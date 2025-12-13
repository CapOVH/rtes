import axios from "axios";
import cookie from "cookie";

export default async function(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  if (!cookies.sa_token) return res.json({ loggedIn: false });

  const user = await axios.get("https://sellauth.com/api/v1/user", {
    headers: { Authorization: `Bearer ${cookies.sa_token}` }
  });

  res.json({
    loggedIn: true,
    username: user.data.username,
    balance: user.data.balance
  });
}
