async function insertArt() {
  let address = document.querySelector("#address").value;
  console.log(address);
  let sel = document.querySelector("#cities");
  let city = sel.options[sel.selectedIndex].text;
  var url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    " " +
    city +
    ".json?limit=1&access_token=pk.eyJ1IjoiZmlsb21lbm9tIiwiYSI6ImNrdjEyaGg1NDBjdXkydW92dHVib2RtbXUifQ.YgXHEY0WXf8ptKQJ1wkUyQ";
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then(async (element) => {
      console.log(element);
      try {
        let data;
        data = {
          bdate: document.getElementById("year").value,
          gender: document.querySelector('input[name="estate"]:checked').value,
          address: document.getElementById("address").value,
          location: `${element.features[0].geometry.coordinates[1]},${element.features[0].geometry.coordinates[0]}`,
        };

        let result = await $.ajax({
          url: `/api/arts/insert`,
          method: "post",
          data: JSON.stringify(data),
          dataType: "json",
          contentType: "application/json",
        });
        console.log(JSON.stringify(result));
        window.alert("Insert successful!");
        window.location = "userLogin.html";
      } catch (error) {
        console.log(error);
        return;
      }
    })
    .catch((err) => console.log(err));
}
