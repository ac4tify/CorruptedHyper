// shortener.js
const input = document.getElementById("userLink");
const typeSelect = document.getElementById("linkType");
const resultDiv = document.getElementById("result");
const btn = document.getElementById("generateBtn");

btn.addEventListener("click", async () => {
  const link = input.value.trim();
  const type = typeSelect.value;
  const service = new URLSearchParams(window.location.search).get("service");

  if (!link) return alert("Please paste a link!");
  if (!service) return alert("No shortener selected!");

  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, url: link })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    const finalLink = `[${link}](${data.shortLink})`;
    resultDiv.innerText = finalLink;
  } catch (err) {
    console.error(err);
    resultDiv.innerText = "Error shortening the link";
  }
});
