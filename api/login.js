import axios from "axios";
import cookie from "cookie";

export default async function(req, res) {
  const { key } = req.body;

  const check = await axios.get(
    `https://sellauth.com/api/v1/licenses/${key}`,
    { headers:{ Authorization:`Bearer ${process.env.SELLAUTH_API_KEY}` } }
  ).catch(() => null);

  if (!check) return res.json({ ok:false });

  res.setHeader("Set-Cookie",
    cookie.serialize("user", key, { httpOnly:true, path:"/" })
  );

  res.json({ ok:true });
}
