const fetch = require('node-fetch');
const CUTTLY_KEY = 'YOUR_CUTTLY_KEY';

module.exports = async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing URL');

    const apiUrl = `https://cutt.ly/api/api.php?key=${CUTTLY_KEY}&short=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.setHeader('Content-Type', 'text/plain');
    res.send(data.url.shortLink);
  } catch (err) {
    res.status(500).send('Error processing the request');
  }
};
