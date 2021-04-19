
// Create the map object with options
var map = L.map("mapid", {
    center: [34.0552, -118.2469],
    zoom: 12
})

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 6,
      username: "dknowles52",
      id: "mapbox/satellite-v9",
      accessToken: API_KEY
}).addTo(map);

    
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(url).then(function(data) {
    console.log(data.features[0]);
    feature = data.features[0]
    L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]).addTo(map);
})

d3.json(url).then(function(data) {
    console.log(data.features[0]);
    for (var i = 0; i < data.features.length; i++) {
        var feature = data.features[i];
        if (feature) {
            L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]).addTo(map);
        }

    }
});