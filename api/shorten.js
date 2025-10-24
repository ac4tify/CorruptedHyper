import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { service, url } = req.body;
  if (!service || !url) return res.status(400).json({ error: "Missing parameters" });

  try {
    let shortLink = "";

    // Asigurăm compatibilitatea pentru Private Server
    let actualService = service;
    if (url.includes("?") && (service === "isgd" || service === "vgd")) {
      actualService = "shrtco"; // folosește shrtco pentru link-uri cu parametri
    }

    if (actualService === "isgd") {
      const r = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
      shortLink = await r.text();
    } else if (actualService === "vgd") {
      const r = await fetch(`https://v.gd/create.php?format=simple&url=${encodeURIComponent(url)}`);
      shortLink = await r.text();
    } else if (actualService === "tinyurl") {
      const r = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      shortLink = await r.text();
    } else if (actualService === "dagd") {
      const r = await fetch(`https://da.gd/s?url=${encodeURIComponent(url)}`);
      shortLink = await r.text();
    } else if (actualService === "shrtco") {
      const r = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
      const data = await r.json();
      shortLink = data.ok ? data.result.full_short_link : "";
    } else if (actualService === "clckru") {
      const r = await fetch(`https://clck.ru/--?url=${encodeURIComponent(url)}`);
      shortLink = await r.text();
    } else {
      return res.status(400).json({ error: "Unknown shortener service" });
    }

    if (!shortLink || shortLink.length < 5) return res.status(500).json({ error: "Error shortening the link" });

    res.status(200).json({ shortLink });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}
