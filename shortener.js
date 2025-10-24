const params = new URLSearchParams(window.location.search);
const service = params.get("service");

const input = document.getElementById("userLink");
const typeSelect = document.getElementById("linkType");
const resultDiv = document.getElementById("result");
const btn = document.getElementById("generateBtn");

btn.addEventListener("click", async () => {
  const link = input.value.trim();
  const type = typeSelect.value;
  if(!link) return alert("Please paste a link!");

  let shortLink = "";

  try {
    if(service === "isgd") {
      const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(link)}`);
      shortLink = await res.text();
    } else if(service === "vgd") {
      const res = await fetch(`https://v.gd/create.php?format=simple&url=${encodeURIComponent(link)}`);
      shortLink = await res.text();
    } else if(service === "tinyurl") {
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(link)}`);
      shortLink = await res.text();
    } else if(service === "dagd") {
      const res = await fetch(`https://da.gd/s?url=${encodeURIComponent(link)}`);
      shortLink = await res.text();
    } else if(service === "shrtco") {
      const res = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(link)}`);
      const data = await res.json();
      shortLink = data.ok ? data.result.full_short_link : "";
    } else if(service === "clckru") {
      const res = await fetch(`https://clck.ru/--?url=${encodeURIComponent(link)}`);
      shortLink = await res.text();
    } else {
      alert("Unknown shortener service");
      return;
    }

    if(!shortLink) throw new Error("Error shortening the link");

    // Creează link-ul final în funcție de tip
    let finalLink = `[${link}](${shortLink})`;
    resultDiv.innerText = finalLink;

  } catch(err) {
    console.error(err);
    resultDiv.innerText = "Error shortening the link";
  }
});
