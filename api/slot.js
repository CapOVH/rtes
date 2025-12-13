import axios from "axios";
import cookie from "cookie";

export default async function(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  if (!cookies.sa_token)
    return res.status(401).json({ error: "Login required" });

  const bet = Number(req.body.bet);

  const user = await axios.get("https://sellauth.com/api/v1/user", {
    headers: { Authorization: `Bearer ${cookies.sa_token}` }
  });

  if (user.data.balance < bet)
    return res.json({ error: "Not enough balance" });

  // Deduct bet
  await axios.post("https://sellauth.com/api/v1/balance/remove", {
    amount: bet
  }, {
    headers: { Authorization: `Bearer ${cookies.sa_token}` }
  });

  // RTP logic
  const roll = Math.random();
  let payout = 0;
  if (roll < 0.05) payout = bet * 10;
  else if (roll < 0.2) payout = bet * 2;

  if (payout > 0) {
    await axios.post("https://sellauth.com/api/v1/balance/add", {
      amount: payout
    }, {
      headers: { Authorization: `Bearer ${cookies.sa_token}` }
    );
  }

  res.json({ win: payout > 0, payout });
}
