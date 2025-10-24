const input = document.getElementById("userLink");
const resultDiv = document.getElementById("result");
const btn = document.getElementById("generateBtn");
const actions = document.querySelector(".actions");
const copyBtn = document.getElementById("copyBtn");
const viewBtn = document.getElementById("viewBtn");

btn.addEventListener("click", async () => {
  const link = input.value.trim();
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

    let title = "LINK";
    if (link.includes("users")) title = "ROBLOX";
    else if (link.includes("groups")) title = "GROUP";
    else if (link.includes("share?code")) title = "PRIVATE SERVER";

    const finalLink = `${title} - [${link}](${data.shortLink})`;
    resultDiv.innerText = finalLink;

    actions.style.display = "flex";
    copyBtn.onclick = () => navigator.clipboard.writeText(data.shortLink);
    viewBtn.onclick = () => window.open(data.shortLink, "_blank");
  } catch (err) {
    console.error(err);
    resultDiv.innerText = "Error shortening the link";
    actions.style.display = "none";
  }
});
