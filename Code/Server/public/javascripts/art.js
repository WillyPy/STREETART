var mymap;
var aId = sessionStorage.getItem("artId");
window.onload = async function () {
  loadArt();
};
async function loadArt(aId) {
  try {
    console.log(aId);
    let images = await $.ajax({
      url: `/api/arts/${aId}/images`,
      method: `get`,
      dataType: `json`,
    });

    let html = `<section id="arts"> `;
    for (let img of images)
      html += `<img class="artImgs" src="${img.image_link}">`;
    html += "</section>";
    document.getElementById("conteiner").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}
