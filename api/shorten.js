import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { service, url } = req.body;

  try {
    let shortLink = "";

    if(service === "isgd") {
      const response = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
      shortLink = await response.text();
    } else if(service === "vgd") {
      const response = await fetch(`https://v.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
      shortLink = await response.text();
    } else if(service === "tinyurl") {
      const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      shortLink = await response.text();
    } else if(service === "dagd") {
      const response = await fetch(`https://da.gd/s?url=${encodeURIComponent(url)}`);
      shortLink = await response.text();
    } else if(service === "shrtco") {
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      shortLink = data.ok ? data.result.full_short_link : "";
    } else if(service === "clckru") {
      const response = await fetch(`https://clck.ru/--?url=${encodeURIComponent(url)}`);
      shortLink = await response.text();
    } else {
      return res.status(400).json({ error: "Unknown shortener service" });
    }

    if(!shortLink) throw new Error("Shortening failed");

    res.status(200).json({ shortLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error shortening the link" });
  }
}
