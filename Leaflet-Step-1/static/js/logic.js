// Create the map object with options
var map = L.map("mapid", {
    center: [34.0552, -118.2469],
    zoom: 7
})

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 12,
      username: "dknowles52",
      id: "mapbox/light-v10", //"mapbox/satellite-v9",
      accessToken: API_KEY
}).addTo(map);

    
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


function chooseColor(depth) {
        

}

d3.json(url).then(function(data) {
    // console.log(data.features[0]);
    // console.log(data.features[0].properties.mag)
    
    for (var i = 0; i < data.features.length; i++) {
        // array of objects
        var feature = data.features[i];
        var mag = [feature.properties.mag]
        var depth = [feature.geometry.coordinates[2]]

        // conditional for depth 
        var color = "";
        if (depth > -10 && depth < 10) {
            color =  "green"; 
        } 
        else if (depth >= 10 && depth < 30) {
            color =  "yellowgreen";
        } 
        else if (depth >= 30 && depth < 50) {
            color = "gold";
        } 
        else if (depth >= 50 && depth < 70) {
            color = "orange";
        }
        else if (depth >= 70 && depth < 90) {
            color = "salmon";
        }
        else {
            color = "red";
        }

        L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            Opacity: 0.5,
            fillOpacity: 0.75,
            radius: mag * 2500,
            color: color,
            fillColor: color
        }).bindPopup("<h3>" + feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>").addTo(map);

    }

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = ['-10-10', '10-10', '30-50', '50-70', '70-90', '90+'];
        var colors = ["green", 'yellowgreen', 'gold', 'orange', 'salmon', 'red'];
        var labels = [];

        // Add min & max
        var legendInfo = "<h2>Earthquake Depth</h2>" +
        "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";

        div.innerHTML = legendInfo;


        limits.forEach(function(limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;

    };

    // Adding legend to the map
    legend.addTo(map);

});
