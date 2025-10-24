import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { service, url } = req.body;
  if (!service || !url) return res.status(400).json({ error: "Missing parameters" });

  try {
    let shortLink = "";

    if(service === "isgd") {
      const r = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
      shortLink = await r.text();
    } else if(service === "vgd") {
      const r = await fetch(`https://v.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
      shortLink = await r.text();
    } else if(service === "tinyurl") {
      const r = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      shortLink = await r.text();
    } else if(service === "dagd") {
      const r = await fetch(`https://da.gd/s?url=${encodeURIComponent(url)}`);
      shortLink = await r.text();
    } else if(service === "shrtco") {
      const r = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
      const data = await r.json();
      shortLink = data.ok ? data.result.full_short_link : "";
    } else if(service === "clckru") {
      const r = await fetch(`https://clck.ru/--?url=${encodeURIComponent(url)}`);
      shortLink = await r.text();
    } else {
      return res.status(400).json({ error:
