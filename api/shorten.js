export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { service, url } = req.body;
  if (!service || !url) return res.status(400).json({ error: "Missing parameters" });

  try {
    let apiUrl = "";

    if (service === "isgd") apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
    else if (service === "vgd") apiUrl = `https://v.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
    else if (service === "tinyurl") apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
    else if (service === "dagd") apiUrl = `https://da.gd/s?url=${encodeURIComponent(url)}`;
    else if (service === "shrtco") apiUrl = `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`;
    else if (service === "clckru") apiUrl = `https://clck.ru/--?url=${encodeURIComponent(url)}`;
    else return res.status(400).json({ error: "Unknown shortener service" });

    const response = await fetch(apiUrl);
    const data = service === "shrtco" ? await response.json() : await response.text();

    const shortLink = service === "shrtco"
      ? (data.ok ? data.result.full_short_link : "")
      : data;

    if (!shortLink) throw new Error("Shortening failed");

    res.status(200).json({ shortLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error shortening the link" });
  }
}
