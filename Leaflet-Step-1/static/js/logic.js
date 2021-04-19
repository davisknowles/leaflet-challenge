// Create the map object with options
var map = L.map("mapid", {
    center: [34.0552, -118.2469],
    zoom: 6
})

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 12,
      username: "dknowles52",
      id: "mapbox/light-v10", //satellite-v9
      accessToken: API_KEY
}).addTo(map);

    
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(url).then(function(data) {
    console.log(data.features[0]);
    console.log(data.features[0].properties.mag)
    for (var i = 0; i < data.features.length; i++) {
        var feature = data.features[i];
        var mag = [feature.properties.mag]
        var depth = [feature.geometry.coordinates[2]]
        L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            radius: mag * 5,
            color: depth
        }).addTo(map);

    }
});
