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
