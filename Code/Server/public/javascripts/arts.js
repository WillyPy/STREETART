var aId = sessionStorage.getItem("artistId");
window.onload = function () {
  loadReserves();
};

async function loadReserves() {
  try {
    let data = await $.ajax({
      url: `/api/artists/${aId}/arts`,
      method: "get",
      datatype: "json",
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
            <p>Address:${dat.art_address}</p>
            <p>state:${dat.art_state}</p>
            </section>`;
  }
  document.getElementById("arts").innerHTML = html;
}
function toArt(aId) {
  sessionStorage.setItem("artId", aId);
  window.location = "art.html";
}
