const buttons = document.querySelectorAll('.buttons button');
const input = document.getElementById('url-input');
const result = document.getElementById('result');

buttons.forEach(btn => {
  btn.addEventListener('click', async () => {
    const service = btn.dataset.service;
    const url = input.value.trim();
    if (!url) {
      alert('Please enter a Roblox link!');
      return;
    }

    try {
      const res = await fetch(`/api/${service}.js?url=${encodeURIComponent(url)}`);
      const text = await res.text();
      result.textContent = text; // Afișează linkul scurtat
    } catch (err) {
      console.error(err);
      alert('Error shortening the link!');
    }
  });
});
