btn.addEventListener("click", async () => {
  const link = input.value.trim();
  const type = typeSelect.value;
  const serviceName = new URLSearchParams(window.location.search).get("service");

  if (!link) return alert("Please paste a link!");

  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service: serviceName, url: link })
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
