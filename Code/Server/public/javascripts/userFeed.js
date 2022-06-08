var uId = sessionStorage.getItem("userId");
window.onload = async function () {
  loadUser();
};
async function loadUser() {
  try {
    let data = await $.ajax({
      url: `api/users/${uId}`,
      method: "get",
      dataType: "json",
    });
    document.getElementById(
      "user"
    ).innerHTML = `<h1>${data.user_username}-</h1>`;
  } catch (error) {}
}
