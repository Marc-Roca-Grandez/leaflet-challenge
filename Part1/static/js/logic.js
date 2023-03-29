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

// Function to change color of markers depending on depth
function chooseColor(depth) {
  if (depth > 90) return "darkred";
  else if (depth > 70) return "red";
  else if (depth > 50) return "orange";
  else if (depth > 30) return "yellow";
  else if (depth > 10) return "green";
  else return "lightgreen";
}

// Function to change color of markers depending on magnitude
function chooseSize(magnitude) {
  if (magnitude < 1.0) return 10;
  else if (magnitude < 2.0) return 15;
  else if (magnitude < 3.0) return 20;
  else if (magnitude < 4.0) return 25;
  else if (magnitude < 5.0) return 30;
  else if (magnitude < 6.0) return 35;
  else if (magnitude < 7.0) return 40;
  else if (magnitude < 8.0) return 45;
  else return 50;
}

//Map and get data
d3.json(link).then(data =>{
  //get info
  console.log(data);
  data.features.forEach(element =>{
    var marker = L.circleMarker([element.geometry.coordinates[1],element.geometry.coordinates[0]],{
        radius: chooseSize(element.properties.mag),
        color: "white",
        fillColor: chooseColor(element.geometry.coordinates[2]),
        fillOpacity: 0.5,
        weight: 1.5
    }).addTo(map);

    //Popup title 
    marker.bindPopup(element.properties.title)
  });
});

//Legend
let legend = L.control({
  position: 'bottomright'
});

//List of things that the
depth_legend_limit = [ -10, 10, 30, 50, 70, "+90"]
colors_legend= ["lightgreen","green","yellow","orange","red", "darkred"]

legend.onAdd = function() {
  // create a div tag to keep it organized
  let div = L.DomUtil.create('div', 'info legend');
  var limits = depth_legend_limit;
  var colors = colors_legend;
  var labels= [];

  // add the colors and mag_range, maybe using a for loop
  
  // for (var i = 0; i < depth_legend_limit.length; i++) {
  //   var legendInfo = "<div class=\"labels\">" +
  //         "<div class=\"min\">" + limits[i] + "</div>" +
  //         "<div class=\"max\">" + limits[limits.length + 1] + "</div>" +
  //       "</div>";
  // }
  var legendInfo = "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          // "<div class=\"secondval\">" + limits[1] + "</div>" +
          // "<div class=\"thirdval\">" + limits[2] + "</div>" +
          // "<div class=\"fourthval\">" + limits[3] + "</div>" +
          // "<div class=\"fifthval\">" + limits[4] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
    div.innerHTML = legendInfo;
    
    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";


  return div; 
};
legend.addTo(map);