const input = document.getElementById("userLink");
const typeSelect = document.getElementById("linkType");
const resultDiv = document.getElementById("result");
const btn = document.getElementById("generateBtn");

btn.addEventListener("click", async () => {
  let link = input.value.trim();
  const type = typeSelect.value;
  const service = new URLSearchParams(window.location.search).get("service");

  if (!link) return alert("Please paste a link!");
  if (!service) return alert("No shortener selected!");

  try {
    // Normalize link în funcție de tip
    let displayText = "";
    if (type === "profile") {
      const match = link.match(/users\/(\d+)/i);
      const userId = match ? match[1] : null;
      if (!userId) throw new Error("Invalid Profile link");
      link = `https://www.roblox.com/users/${userId}/profile`;
      displayText = `https_:_//www.roblox.com/users/${userId}/profile`;
    } else if (type === "group") {
      const match = link.match(/groups\/(\d+)/i);
      const groupId = match ? match[1] : null;
      if (!groupId) throw new Error("Invalid Group link");
      link = `https://www.roblox.com/groups/${groupId}`;
      displayText = `www.roblox.com/groups/${groupId}`;
    } else if (type === "private") {
      const match = link.match(/share\?code=([A-Za-z0-9]+)/i);
      const code = match ? match[1] : "80177c63cdc8614aa84be3cbd84b051a";
      link = `https://www.roblox.com/share?code=${code}&type=Server`;
      displayText = `https_:_//www.roblox.com/share?code=${code}&type=Server`;
    }

    // Trimite la API pentru scurtare
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, url: link })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    // Afișează linkul final
    resultDiv.innerHTML = `
      <span>[${displayText}](${data.shortLink})</span><br>
      <button onclick="copyLink('${data.shortLink}')">Copy</button>
      <button onclick="window.open('${link}','_blank')">View Website</button>
    `;

  } catch (err) {
    console.error(err);
    resultDiv.innerText = "Error shortening the link";
  }
});

function copyLink(url) {
  navigator.clipboard.writeText(url).then(() => alert("Link copied!"));
}
