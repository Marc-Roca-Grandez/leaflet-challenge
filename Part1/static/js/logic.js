// Creating the map object
var map = L.map("map", {
  // center: [40.7128, -74.0059],
  center: [37.7749, -122.4194],
  zoom: 4.5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Use this link to get the GeoJSON data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// Function to change color of markers depending on magnitude
function chooseColor(magnitude) {
  if (magnitude > 90) return "yellow";
  else if (magnitude > 70) return "red";
  else if (magnitude > 50) return "orange";
  else if (magnitude > 30) return "green";
  else if (magnitude > 10) return "purple";
  else return "black";
}



// Getting our GeoJSON data
d3.json(link).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  console.log(data);
  //L.geoJson(data).addTo(myMap);
  //var markers = L.markerClusterGroup();

  for (var i = 0; i < data.length; i++) {
    var longitude = data[i].features.geometry.coordinates[0]
    var latitude = data[i].features.geometry.coordinates[1]
    console.log(longitude,latitude);
    L.marker([longitude, latitude]).addTo(map);
    //  // Check for the location property.
    //  if (features) {
    //   // Add a new marker to the cluster group, and bind a popup.
    //   markers.addLayer(L.marker([longitude, latitude]);//.bindPopup(response[i].descriptor));
    // };

  }
});
// console.log("working");