window.onload = async function () {
  getLocation();
  getArtists();
};

async function getArtists() {
  try {
    let result = await $.ajax({
      url: `/api/artists`,
      method: "get",
      datatype: "json",
    });

    for (let artist of result) {
      let objectElement = document.createElement("option");
      objectElement.value = artist.artist_id;
      objectElement.innerHTML = artist.artist_name;
      document.getElementById("Artists").appendChild(objectElement);
    }
  } catch (error) {
    console.log(error);
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function loginPage() {
  window.location = "loginPage.html";
}
async function showPosition(position) {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZmlsb21lbm9tIiwiYSI6ImNrdjEyaGg1NDBjdXkydW92dHVib2RtbXUifQ.YgXHEY0WXf8ptKQJ1wkUyQ";
  mymap = new mapboxgl.Map({
    container: "mapid",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [position.coords.longitude, position.coords.latitude],
    zoom: 15,
  });

  mymap.addControl(
    new mapboxgl.NavigationControl({
      accessToken: mapboxgl.accessToken,
    })
  );

  mymap.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    })
  );

  try {
    let arts = await $.ajax({
      url: `/api/arts`,
      method: "get",
      datatype: "json",
    });
    console.log(arts);
    for (let art of arts) {
      if (art.image_link) {
        marker = new mapboxgl.Marker()
          .setLngLat([art.art_coords.y, art.art_coords.x])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<img src="${art.image_link}">`
            )
          )
          .addTo(mymap);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
