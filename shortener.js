document.getElementById("generateBtn").addEventListener("click", async () => {
  const userLink = document.getElementById("userLink").value.trim();
  const service = document.getElementById("linkType").value;
  const resultDiv = document.getElementById("result");

  if (!userLink) {
    resultDiv.textContent = "⚠️ Please enter a valid link.";
    return;
  }

  resultDiv.textContent = "⏳ Generating link...";

  try {
    // 🔗 Trimite cererea către API-ul tău Vercel
    const response = await fetch(`/api/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, url: userLink }),
    });

    const data = await response.json();

    if (response.ok && data.shortLink) {
      resultDiv.innerHTML = `✅ Shortened link:<br><a href="${data.shortLink}" target="_blank">${data.shortLink}</a>`;
    } else {
      resultDiv.textContent = `❌ Error: ${data.error || "Could not shorten link."}`;
    }
  } catch (err) {
    resultDiv.textContent = "❌ Network or server error.";
  }
});
