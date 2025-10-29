const fetch = require('node-fetch');
const BITLY_TOKEN = 'YOUR_BITLY_TOKEN';

module.exports = async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing URL');

    const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${BITLY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ long_url: url })
    });
    const data = await response.json();
    res.setHeader('Content-Type', 'text/plain');
    res.send(data.link);
  } catch (err) {
    res.status(500).send('Error processing the request');
  }
};
