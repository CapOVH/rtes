export default function(req, res) {
  const url =
    `https://sellauth.com/oauth/authorize?` +
    `client_id=${process.env.SELLAUTH_CLIENT}` +
    `&redirect_uri=${process.env.SELLAUTH_REDIRECT}` +
    `&response_type=code`;
  res.redirect(url);
}
