export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing URL');

    const response = await fetch(`https://clickly.xyz/api?key=YOUR_API_KEY&url=${encodeURIComponent(url)}`);
    const data = await response.json();
    if (!data.shortUrl) throw new Error("Invalid response");

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(data.shortUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing the request');
  }
}
