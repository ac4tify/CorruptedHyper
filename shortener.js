const input = document.getElementById("userLink");
const typeSelect = document.getElementById("linkType");
const resultDiv = document.getElementById("result");
const btn = document.getElementById("generateBtn");

btn.addEventListener("click", async () => {
  const type = typeSelect.value;
  const service = new URLSearchParams(window.location.search).get("service"); 

  if (!service) return alert("No shortener selected!");

  // Setăm link-urile Roblox pentru fiecare tip
  const robloxProfileURL = "https://www.roblox.com/users/435559589933/profile";
  const robloxGroupURL = "https://www.roblox.com/groups/2194003353";
  const robloxPrivateServerURL = "https://www.roblox.com/share?code=80177c63cdc8614aa84be3cbd84b051a&type=Server";

  let originalLink = "";
  if (type === "profile") originalLink = robloxProfileURL;
  else if (type === "group") originalLink = robloxGroupURL;
  else if (type === "private") originalLink = robloxPrivateServerURL;

  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, url: originalLink })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    const shortLink = data.shortLink;
    let label = type === "profile" ? "ROBLOX" : type === "group" ? "GROUP" : "PRIVATE SERVER";

    resultDiv.innerHTML = `
      <span style="word-break:break-all">${label}-[${originalLink}](${shortLink})</span>
      <div style="margin-top:8px; display:flex; gap:10px; justify-content:center;">
        <button id="copyBtn">Copy</button>
        <a href="${shortLink}" target="_blank">View</a>
      </div>
    `;

    document.getElementById("copyBtn").onclick = () => {
      navigator.clipboard.writeText(`${label}-[${originalLink}](${shortLink})`);
      alert("Copied!");
    };

  } catch (err) {
    console.error(err);
    resultDiv.textContent = "Error shortening the link";
  }
});
