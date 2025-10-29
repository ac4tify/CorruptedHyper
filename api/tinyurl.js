const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing URL');

    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const shortUrl = (await response.text()).trim();

    res.setHeader('Content-Type', 'text/plain');
    res.send(shortUrl);
  } catch (err) {
    res.status(500).send('Error processing the request');
  }
};
