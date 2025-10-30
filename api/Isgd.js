export default async function handler(req, res) {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing URL');

    const apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const shortUrl = (await response.text()).trim();

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(shortUrl);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing the request');
  }
}
