export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing URL');

    const response = await fetch(`https://tiny.cc/?c=rest_api&m=shorten&version=2.0&login=YOUR_LOGIN&apiKey=YOUR_API_KEY&longUrl=${encodeURIComponent(url)}`);
    const data = await response.json();
    if (!data.results || !data.results.code) throw new Error("Invalid response");

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(data.results.code);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing the request');
  }
}
