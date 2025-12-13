import cookie from "cookie";

const db = new Map(); // replace with DB later

export default function(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const key = cookies.user;
  if (!key) return res.json({ ok:false });

  const bet = Number(req.body.bet);
  const pts = db.get(key) || 100;

  if (pts < bet) return res.json({ ok:false, error:"Not enough points" });

  const win = Math.random() < 0.25;
  const payout = win ? bet * 2 : 0;

  db.set(key, pts - bet + payout);
  res.json({ ok:true, win, payout });
}
