// Test
/*
d3.json("/getVolcanoEvents")
    .then(function(data){
        console.log(data);
    });
*/

// Init
var mymap = L.map('map').setView([0, 0], 3);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/basic-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1IjoiY2hpZWZkdXBhbiIsImEiOiJja3Z3cDg5dGMxbmpkMnZtOW42aHQ4N3FqIn0.9bgkgEMeGUihgjpmoDDhVQ'
}).addTo(mymap);
// Plot map
d3.json("/getContinents")
    .then(function(continents){
        d3.json("/getCountries")
            .then(function(countries){
                d3.json("/getTect")
                    .then(function(tect){
                        // Now we can work here !
                        alert(continents)
                        alert(countries)
                        alert(tect)
                    });
            });
    });