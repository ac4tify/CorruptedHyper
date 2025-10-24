const input = document.getElementById("userLink");
const typeSelect = document.getElementById("linkType");
const resultDiv = document.getElementById("result");
const btn = document.getElementById("generateBtn");

btn.addEventListener("click", async () => {
  const link = input.value.trim();
  const type = typeSelect.value;
  const service = new URLSearchParams(window.location.search).get("service");

  if(!link) return alert("Please paste a link!");
  if(!service) return alert("No shortener selected!");

  // Transformare link Robiox → link Roblox
  let originalLink = "";
  if(type === "profile") originalLink = "https://www.roblox.com/users/435559589933/profile";
  else if(type === "group") originalLink = "https://www.roblox.com/groups/2194003353";
  else if(type === "private") originalLink = "https://www.roblox.com/share?code=80177c63cdc8614aa84be3cbd84b051a&type=Server";

  try {
    const res = await fetch("/api/shorten", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ service, url: originalLink })
    });
    const data = await res.json();
    if(data.error) throw new Error(data.error);

    const shortLink = data.shortLink;
    let label = type === "profile" ? "ROBLOX" : type === "group" ? "GROUP" : "PRIVATE SERVER";
    resultDiv.innerHTML = `
      ${label}-[${originalLink}](${shortLink})
      <div style="margin-top:8px">
        <button id="copyBtn">Copy</button>
        <a href="${shortLink}" target="_blank">View</a>
      </div>
    `;

    document.getElementById("copyBtn").onclick = () => {
      navigator.clipboard.writeText(`${label}-[${originalLink}](${shortLink})`);
      alert("Copied!");
    };

  } catch(e) {
    console.error(e);
    resultDiv.textContent = "Error shortening the link";
  }
});
