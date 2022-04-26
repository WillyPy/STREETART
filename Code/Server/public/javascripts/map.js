var mymap
var user;
window.onload = async function(){
    getLocation();
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

async function showPosition(position){
    mapboxgl.accessToken="pk.eyJ1IjoiZmlsb21lbm9tIiwiYSI6ImNrdjEyaGg1NDBjdXkydW92dHVib2RtbXUifQ.YgXHEY0WXf8ptKQJ1wkUyQ"
    mymap = new mapboxgl.Map({
        container: "mapid",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 13
    })

    mymap.addControl(
        new mapboxgl.NavigationControl({
          accessToken: mapboxgl.accessToken,
        })
      )

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
    )
}