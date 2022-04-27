window.onload = async function () {
  loadArt(sessionStorage.getItem("artId"));
};

async function loadArt(aId) {
  try {
    console.log(aId);
    let art = await $.ajax({
      url: `/api/arts/${aId}`,
      method: `get`,
      dataType: `json`,
    });
    let images = await $.ajax({
      url: `/api/arts/${aId}/images`,
      method: `get`,
      dataType: `json`,
    });
    let html = `<section id="arts"> `;
    for (let img of images)
      html += `<img class="artImgs" src="${img.image_link}">`;
    html += "</section>";
    document.getElementById("art").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
}
