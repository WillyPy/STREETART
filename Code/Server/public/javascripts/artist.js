var aId = sessionStorage.getItem("artistId");
window.onload = function () {
  loadArts();
};
async function loadArts() {
  try {
    console.log(aId);
    let data = await $.ajax({
      url: `/api/artists/${aId}/arts`,
      method: `get`,
      dataType: `json`,
    });
    console.log(data);
    createArtsHtml(data);
  } catch (error) {
    console.log(error);
  }
}
function createArtsHtml(data) {
  let html = ``;
  for (let dat of data) {
    html += `<section class="art" onclick="toArt(${dat.art_id})">
            <p>Ano:${dat.art_year}</p>
            <p>Address:${dat.art_address}</p>
            <p>Address:${dat.art_state}</p>
            </section>`;
  }
  document.getElementById("arts").innerHTML = html;
}
function toArt(aId) {
  sessionStorage.setItem("artId", aId);
  window.location = "art.html";
}
