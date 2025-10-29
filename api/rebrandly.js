const fetch = require('node-fetch');
const API_KEY = 'YOUR_REBRANDLY_KEY';

module.exports = async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing URL');

    const response = await fetch('https://api.rebrandly.com/v1/links', {
      method: 'POST',
      headers: {
        'apikey': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ destination: url })
    });

    const data = await response.json();
    res.setHeader('Content-Type', 'text/plain');
    res.send(data.shortUrl);
  } catch (err) {
    res.status(500).send('Error processing the request');
  }
};
