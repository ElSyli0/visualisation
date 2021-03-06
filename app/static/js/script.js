function getLabelsForTime(array_time){
    var labels = Array();
    var year = parseInt(array_time[0]);
    while(year <= array_time[1]){
        labels.push(year);
        year ++;
    }
    return labels;
}

function getNbrEventsPerYear(all_events, typeEvent, labels){
    // Initialisation des nbrs d'événements par année
    var res = Array();
    for(let i=0; i<labels.length; i++){
        res.push(0);
    }
    // Mise à jour
    for(let i=0; i<all_events.length; i++){
        if(all_events[i].properties.type == typeEvent){
            var year = all_events[i].properties.year;
            var index = labels.indexOf(year);
            res[index] = res[index] + 1;
        }
    }
    return res;
}

function getDeathDmgPerYear(all_events, typeEvent, labels){
    // Initialisation des nbrs d'événements par année
    var res = Array();
    for(let i=0; i<labels.length; i++){
        res.push(0);
    }
    // Mise à jour
    for(let i=0; i<all_events.length; i++){
        if(all_events[i].properties.type == typeEvent && all_events[i].properties.dmgDeath){
            var year = all_events[i].properties.year;
            var index = labels.indexOf(year);
            res[index] = res[index] + all_events[i].properties.dmgDeath;
        }
    }
    return res;
}

function getDstHousePerYear(all_events, typeEvent, labels){
    // Initialisation des nbrs d'événements par année
    var res = Array();
    for(let i=0; i<labels.length; i++){
        res.push(0);
    }
    // Mise à jour
    for(let i=0; i<all_events.length; i++){
        if(all_events[i].properties.type == typeEvent && all_events[i].properties.dstHouse){
            var year = all_events[i].properties.year;
            var index = labels.indexOf(year);
            res[index] = res[index] + all_events[i].properties.dstHouse;
        }
    }
    return res;
}

function getMoneyForEvents(all_events, typeEvent){
    var res = [0, 0, 0, 0];
    for(let i=0; i<all_events.length; i++){
        if(all_events[i].properties.type == typeEvent){
            var val = all_events[i].properties.damageMoney - 1;
            res[val] = res[val] + 1;
        }
    }
    return res;
}

function getGravityForEvents(all_events, typeEvent){
    var res = [0, 0, 0];
    for(let i=0; i<all_events.length; i++){
        if(all_events[i].properties.type == typeEvent){
            var val = all_events[i].properties.gravity - 1;
            res[val] = res[val] + 1;
        }
    }
    return res;
}

function getDeathForEvents(all_events, typeEvent){
    var res = [0, 0, 0, 0];
    for(let i=0; i<all_events.length; i++){
        if(all_events[i].properties.type == typeEvent){
            var val = all_events[i].properties.damageDeath - 1;
            res[val] = res[val] + 1;
        }
    }
    return res;
}

function getHouseForEvents(all_events, typeEvent){
    var res = [0, 0, 0, 0];
    for(let i=0; i<all_events.length; i++){
        if(all_events[i].properties.type == typeEvent){
            var val = all_events[i].properties.destroyedHouse - 1;
            res[val] = res[val] + 1;
        }
    }
    return res;
}

/* ZONE POUR GRAPHIQUE */
function plotBarChart(data, where, check, titre, labelX, labelY){
    var config = {
        type: "bar",
        data: data,
        options: {
            events: [],
            responsive: true,
            plugins:{
              legend:{
                position: 'right',
              },
              title:{
                display: true,
                text: titre
              }
            },
            scales:{
              x:{
                //type:"time",
                title:{
                  display: true,
                  text:labelX
                }
              },
              y:{
                //type:"time",
                title:{
                  display: true,
                  text:labelY
                }
              }
            }
        }
    }
    if(check == "C"){
        // check is plot existe déjà
        if(typeof(plot_c) != "undefined"){
            plot_c.destroy();
        }
        plot_c = new Chart(
            document.getElementById(where),
            config
        );
    }
    else{
        // check is plot existe déjà
        if(typeof(plot_f) != "undefined"){
            plot_f.destroy();
        }
        plot_f = new Chart(
            document.getElementById(where),
            config
        );
    }
}

function plotLineChart(data, where, check, titre, labelX, labelY){
    var config = {
        type: "line",
        data: data,
        options: {
          responsive: true,
          plugins:{
            legend:{
              position:'right',
            },
            title:{
              display: true,
              text: titre
            }
          },
          scales: {
            x:{
              title:{
                display: true,
                text:labelX
              }
            },
            y: {
              beginAtZero: true,
              title:{
                  display: true,
                  text:labelY
                }
            }
          }
        }
    }
    if(check == "C"){
        if(typeof(plot_c) != "undefined") plot_c.destroy();
        plot_c = new Chart(
            document.getElementById(where),
            config
        );
    }
    else{
        if(typeof(plot_f) != "undefined") plot_f.destroy();
        plot_f = new Chart(
            document.getElementById(where),
            config
        );
    }
}

// Transformer les features pour chaque events en données lisibles pour affichage graphique
function showMoneyDmg(all_events, where, eq, tsu, vol){
    // Gestion des labels pour chaque classe
    var labels = ["<$1 million", "~$1 to $5 million", "~>$5 to $24 million", "~$25 million or more"];
    // Gestion des données
    var all_data = Array();
    if(eq){
        var tmp = {
            label: "Earthquakes",
            backgroundColor: "orange",
            data: getMoneyForEvents(all_events, "eq")
        }
        all_data.push(tmp)
    }
    if(tsu){
        var tmp = {
            label: "Tsunamis",
            backgroundColor: "darkblue",
            data: getMoneyForEvents(all_events, "tsu")
        }
        all_data.push(tmp)
    }
    if(vol){
        var tmp = {
            label: "Volcanos",
            backgroundColor: "darkred",
            data: getMoneyForEvents(all_events, "vol")
        }
        all_data.push(tmp)
    }
    // Structure finale des données
    var data = {
        labels: labels,
        datasets: all_data
    }
    // Affichage
    plotBarChart(data, where, "C","Economic loss","Category","Occurrence");
}

function showDeathDmg(all_events, where, eq, tsu, vol){
  // Gestion des labels pour chaque classe
  var labels = ["~1 to 50 people", "~51 to 100 people", "~101 to 1000 people", "~1001 or more people)"];
  // Gestion des données
  var all_data = Array();
    if(eq){
        var tmp = {
            label: "Earthquakes",
            backgroundColor: "orange",
            data: getDeathForEvents(all_events, "eq")
        }
        all_data.push(tmp)
    }
    if(tsu){
        var tmp = {
            label: "Tsunamis",
            backgroundColor: "darkblue",
            data: getDeathForEvents(all_events, "tsu")
        }
        all_data.push(tmp)
    }
    if(vol){
        var tmp = {
            label: "Volcanos",
            backgroundColor: "darkred",
            data: getDeathForEvents(all_events, "vol")
        }
        all_data.push(tmp)
    }
    // Structure finale des données
    var data = {
        labels: labels,
        datasets: all_data
    }
    // Affichage
    plotBarChart(data, where, "C","Loss of human life","Category","Occurrence");
}

function showHouseDst(all_events, where, eq, tsu, vol){
  // Gestion des labels pour chaque classe
  var labels = ["~1 to 50 houses", "~51 to 100 houses", "~101 to 1000 houses", "~1001 or more houses"];
  // Gestion des données
  var all_data = Array();
    if(eq){
        var tmp = {
            label: "Earthquakes",
            backgroundColor: "orange",
            data: getHouseForEvents(all_events, "eq")
        }
        all_data.push(tmp)
    }
    if(tsu){
        var tmp = {
            label: "Tsunamis",
            backgroundColor: "darkblue",
            data: getHouseForEvents(all_events, "tsu")
        }
        all_data.push(tmp)
    }
    if(vol){
        var tmp = {
            label: "Volcanos",
            backgroundColor: "darkred",
            data: getHouseForEvents(all_events, "vol")
        }
        all_data.push(tmp)
    }
    // Structure finale des données
    var data = {
        labels: labels,
        datasets: all_data
    }
    // Affichage
    plotBarChart(data, where, "C","Destroyed house","Category","Occurrence");
}

function showGravityEvents(all_events, where, eq, tsu, vol){
    // Gestion des labels
    var labels = ["Weak", "Strong", "Severe"];
    // Gestion des données
    var all_data = Array();
    if(eq){
        var tmp = {
            label: "Earthquakes",
            backgroundColor: "orange",
            data: getGravityForEvents(all_events, "eq")
        }
        all_data.push(tmp);
    }
    if(tsu){
        var tmp = {
            label: "Tsunamis",
            backgroundColor: "darkblue",
            data: getGravityForEvents(all_events, "tsu")
        }
        all_data.push(tmp);
    }
    if(vol){
        var tmp = {
            label: "Volcanos",
            backgroundColor: "darkred",
            data: getGravityForEvents(all_events, "vol")
        }
        all_data.push(tmp);
    }
    // Structure finale des données
    var data = {
        labels: labels,
        datasets: all_data
    }
    // Affichage
    plotBarChart(data, where, "F","Gravity of events ","Category","Occurrence");
}

function showNbrEventsEvolution(all_events, where, eq, tsu, vol, array_time){
    // gestion des labels
    labels = getLabelsForTime(array_time);
    var all_data = Array();
    if(eq){
        var tmp = {
            label: "Earthquakes",
            backgroundColor: "orange",
            borderColor: "orange",
            data: getNbrEventsPerYear(all_events, "eq", labels)
        }
        all_data.push(tmp);
    }
    if(tsu){
        var tmp = {
            label: "Tsunamis",
            backgroundColor: "darkblue",
            borderColor: "darkblue",
            data: getNbrEventsPerYear(all_events, "tsu", labels)
        }
        all_data.push(tmp);
    }
    if(vol){
        var tmp = {
            label: "Volcanos",
            backgroundColor: "darkred",
            borderColor: "darkred",
            data: getNbrEventsPerYear(all_events, "vol", labels)
        }
        all_data.push(tmp);
    }
    // Structure finale des données
    var data = {
        labels: labels,
        datasets: all_data
    };
    // Affichage
    plotLineChart(data, where, "F","Evolution of the number of events over time","Years","Value");
}

function showDeathDmgEvolution(all_events, where, eq, tsu, vol, array_time){
    // gestion des labels
    labels = getLabelsForTime(array_time);
    var all_data = Array();
    if(eq){
        var tmp = {
            label: "Earthquakes",
            backgroundColor: "orange",
            borderColor: "orange",
            data: getDeathDmgPerYear(all_events, "eq", labels)
        }
        all_data.push(tmp);
    }
    if(tsu){
        var tmp = {
            label: "Tsunamis",
            backgroundColor: "darkblue",
            borderColor: "darkblue",
            data: getDeathDmgPerYear(all_events, "tsu", labels)
        }
        all_data.push(tmp);
    }
    if(vol){
        var tmp = {
            label: "Volcanos",
            backgroundColor: "darkred",
            borderColor: "darkred",
            data: getDeathDmgPerYear(all_events, "vol", labels)
        }
        all_data.push(tmp);
    }
    // Structure finale des données
    var data = {
        labels: labels,
        datasets: all_data
    };
    // Affichage
    plotLineChart(data, where, "C","Evolution of the number of deaths over time","Years","Value");
}

function showDstHouseEvolution(all_events, where, eq, tsu, vol, array_time){
    // gestion des labels
    labels = getLabelsForTime(array_time);
    var all_data = Array();
    if(eq){
        var tmp = {
            label: "Earthquakes",
            backgroundColor: "orange",
            borderColor: "orange",
            data: getDstHousePerYear(all_events, "eq", labels)
        }
        all_data.push(tmp);
    }
    if(tsu){
        var tmp = {
            label: "Tsunamis",
            backgroundColor: "darkblue",
            borderColor: "darkblue",
            data: getDstHousePerYear(all_events, "tsu", labels)
        }
        all_data.push(tmp);
    }
    if(vol){
        var tmp = {
            label: "Volcanos",
            backgroundColor: "darkred",
            borderColor: "darkred",
            data: getDstHousePerYear(all_events, "vol", labels)
        }
        all_data.push(tmp);
    }
    // Structure finale des données
    var data = {
        labels: labels,
        datasets: all_data
    };
    // Affichage
    plotLineChart(data, where, "C","Evolution of the total number of destroyed houses over time","Years","Value");
}

// Récupération de la date sous forme de array [b_inf, b_sup]
function RecupDate() {
    // Récupération des bornes pour l'intervalle de temps
    var res = Array();
    var x = document.getElementById("DateInf").value;
    res.push(x);
    x = document.getElementById("DateSup").value;
    res.push(x);
    // Vérification de l'exactitude des bornes données
    if (res[0] > res[1]){
          let tmp = res[0];
          res[0] = res[1];
          res[1] = tmp;
          var txt = "Mauvais encodage des dates. Dates considérées : "+String(res[0])+" à "+String(res[1])
          alert(txt)
    }
    if (res[0].length == 0 || res[1].length == 0){
        res[0] = 0;
        res[1] = 2021;
        var txt = "Mauvais encodage des dates. Dates considérées : "+String(res[0])+" à "+String(res[1])
        alert(txt)
    }
    if (res[0] == res[1]) {
        res[0] = res[0]-10;
        var txt = "Mauvais encodage des dates. Dates considérées : "+String(res[0])+" à "+String(res[1])
        alert(txt)
    }
    $("#DateInf").val(res[0]);
    $("#DateSup").val(res[1]);
    return res
}
// Vérification si un événement est dans une feature ou pas
function isInFeature(event, feature){
    var x = event.geometry.coordinates[0];
    var y = event.geometry.coordinates[1];
    var points = feature.geometry.coordinates;
    var pt = turf.point([x, y]);
    var poly = turf.polygon(points);
    return turf.booleanPointInPolygon(pt, poly);
}

function getMyColor(d, bounds) {
    if(bounds.length == 5){
        if(d >= bounds.b0 && d < bounds.b1) return "#ffffcc";
        if(d >= bounds.b1 && d < bounds.b2) return "#a1dab4";
        if(d >= bounds.b2 && d < bounds.b3) return "#41b6c4";
        if(d >= bounds.b3 && d < bounds.b4) return "#225ea8";
    }
    if(bounds.length == 4){
        if(d >= bounds.b0 && d < bounds.b1) return "#ffffcc";
        if(d >= bounds.b1 && d < bounds.b2) return "#a1dab4";
        if(d >= bounds.b2 && d < bounds.b3) return "#41b6c4";
    }
    if(bounds.length == 3){
        if(d >= bounds.b0 && d < bounds.b1) return "#ffffcc";
        if(d >= bounds.b1 && d < bounds.b2) return "#a1dab4";
    }
}

function newStyle(feature, bounds){
    return {
        "fillColor" : getMyColor(feature.properties.nbr, bounds),
        "wheight": 2,
        "opacity": 1,
        "dashArray": "3",
        "fillOpacity": 0.5
    };
}

// Fonctions pour premier nettoyage des données
function Polygon_cleanCountries(Data){
    let features=Array();
    for (let i=0;i<Data.features.length;i++){
        if (Data.features[i].geometry.type=="MultiPolygon"){
            for (let j=0;j<Data.features[i].geometry.coordinates.length;j++){
                let point={type:"Feature",
                                geometry :{
                                    type: "Polygon",
                                    coordinates :Data.features[i].geometry.coordinates[j]
                                },
                                properties : {
                                        name : Data.features[i].properties.name
                                }
                }
                features.push(point);
            }
        } else if(Data.features[i].geometry.type=="Polygon"){
            let point={type:"Feature",
                geometry :{
                    type: "Polygon",
                    coordinates :Data.features[i].geometry.coordinates
                },
                properties : {
                    name : Data.features[i].properties.name
                }
            }
            features.push(point);
        } else {
            //console.log(i);
            //console.log(Data.features[i]);
        }
    }
    return features
}
function Polygon_cleanContinent(Data){
    let features=Array();
    for (let i=0;i<Data.features.length;i++){
        if (Data.features[i].geometry.type=="MultiPolygon"){
            for (let j=0;j<Data.features[i].geometry.coordinates.length;j++){
                let point={type:"Feature",
                                geometry :{
                                    type: "Polygon",
                                    coordinates :Data.features[i].geometry.coordinates[j]
                                },
                                properties : {
                                        name : Data.features[i].properties.continent
                                }
                }
                features.push(point);
            }
        } else if(Data.features[i].geometry.type=="Polygon"){
            let point={type:"Feature",
                geometry :{
                    type: "Polygon",
                    coordinates :Data.features[i].geometry.coordinates
                },
                properties : {
                    name : Data.features[i].properties.continent
                }
            }
            features.push(point);
        } else {
            //console.log(i);
            //console.log(Data.features[i]);
        }
    }
    return features
}
function Polygon_cleanTect(Data){
    let features=Array();
    for (let i=0;i<Data.features.length;i++){
        if (Data.features[i].geometry.type=="MultiPolygon"){
            for (let j=0;j<Data.features[i].geometry.coordinates.length;j++){
                let point={type:"Feature",
                                geometry :{
                                    type: "Polygon",
                                    coordinates :Data.features[i].geometry.coordinates[j]
                                },
                                properties : {
                                        name : Data.features[i].properties.PlateName
                                }
                }
                features.push(point);
            }
        } else if(Data.features[i].geometry.type=="Polygon"){
            let point={type:"Feature",
                geometry :{
                    type: "Polygon",
                    coordinates :Data.features[i].geometry.coordinates
                },
                properties : {
                    name : Data.features[i].properties.PlateName
                }
            }
            features.push(point);
        } else {
            //console.log(i);
            //console.log(Data.features[i]);
        }
    }
    return features
}

// Fonctions pour conversion des données en GEOJSON
function getGeoJSON_E(DataJson){
    let features = Array();
    for (let i=0;i<DataJson.length;i++){
        if (DataJson[i].longitude && DataJson[i].latitude && DataJson[i].intensity >3 && DataJson[i].latitude > -70 && DataJson[i].latitude < 80 && DataJson[i].year && DataJson[i].intensity) {
            let point={type:"Feature",
                            geometry : {
                                type: "Point",
                                coordinates : [DataJson[i].longitude, DataJson[i].latitude]
                            },
                            properties : {
                                id : DataJson[i].id,
                                intensity : DataJson[i].intensity,
                                type: "eq",
                                damageMoney: DataJson[i].damageAmountOrder,
                                damageDeath: DataJson[i].deathsAmountOrder,
                                dmgDeath: DataJson[i].deaths,
                                destroyedHouse: DataJson[i].housesDestroyedAmountOrder,
                                dstHouse: DataJson[i].housesDestroyedTotal,
                                year: DataJson[i].year
                            }
            }
            if (DataJson[i].comments) {
              point.properties.comments = DataJson[i].comments
            } else {
              point.properties.comments ="Nothing to say, glhf"
            }
            // gestion de la gravité
            if(DataJson[i].intensity>3 && DataJson[i].intensity<7) point.properties.gravity=1;
            else if(DataJson[i].intensity>6 && DataJson[i].intensity<10) point.properties.gravity=2;
            else if (DataJson[i].intensity>9 && DataJson[i].intensity<13) point.properties.gravity=3;
            features.push(point);
        }
    }
    return features
}
function getGeoJSON_T(DataJson){
    let features =Array();
    for (let i=0;i<DataJson.length;i++){
        if (DataJson[i].longitude && DataJson[i].latitude && DataJson[i].eventValidity >= 3  && DataJson[i].latitude > -70 && DataJson[i].latitude < 80 && DataJson[i].year && DataJson[i].maxWaterHeight) {
            let point={type:"Feature",
                            geometry : {
                                type: "Point",
                                coordinates : [DataJson[i].longitude, DataJson[i].latitude]
                            },
                            properties : {
                                id : DataJson[i].id,
                                intensity : DataJson[i].intensity,
                                type: "tsu",
                                damageMoney: DataJson[i].damageAmountOrder,
                                damageDeath: DataJson[i].deathsAmountOrder,
                                dmgDeath: DataJson[i].deaths,
                                destroyedHouse: DataJson[i].housesDestroyedAmountOrder,
                                dstHouse: DataJson[i].housesDestroyed,
                                year: DataJson[i].year
                            }
            }
            if (DataJson[i].comments) {
              point.properties.comments = DataJson[i].comments
            } else {
              point.properties.comments ="Nothing to say, glhf"
            }
            // Gestion de la gravité
            if (DataJson[i].maxWaterHeight>=0 && DataJson[i].maxWaterHeight<=3) point.properties.gravity=1;
            if(DataJson[i].maxWaterHeight>3 && DataJson[i].maxWaterHeight<=9) point.properties.gravity=2;
            if(DataJson[i].maxWaterHeight>9 && DataJson[i].maxWaterHeight<200) point.properties.gravity=3;
            features.push(point);
        }
    }
    return features
}
function getGeoJSON_V(DataJson, DataEvents){
    let features = Array();
    var cnt=0;
    var point;
    var indJson=0
    var j=0
    for (let i=0;i<DataEvents.length;i++){

      for (j=0;j<DataJson.length;j++){
        if (DataJson[j].id ==DataEvents[i].volcanoLocationId){
          indJson=j
          break;
        }
        if(j==DataJson.length-1){
          indJson=-1;
          cnt++;
        }
      }
      if (indJson!=-1){
        if (DataJson[indJson].longitude && DataJson[indJson].latitude && DataJson[indJson].latitude > -70 && DataJson[indJson].latitude < 80 && DataEvents[i].year && DataEvents[i].vei) {
          point={type:"Feature",
                          geometry : {
                              type: "Point",
                              coordinates : [DataJson[indJson].longitude, DataJson[indJson].latitude]
                          },
                          properties : {
                              id : DataJson[indJson].id,
                              intensity : DataJson[indJson].intensity,
                              year : DataEvents[i].year,
                              type: "vol",
                              damageMoney: DataEvents[i].damageAmountOrder,
                              damageDeath: DataEvents[i].deathsAmountOrder,
                              dmgDeath: DataEvents[i].deaths,
                              destroyedHouse: DataEvents[i].housesDestroyedAmountOrder,
                              dstHouse: DataEvents[i].housesDestroyed
                          }
          }
          if (DataEvents[i].comments){
            point.properties.comments = DataEvents[i].comments
          } else {
            point.properties.comments = "Nothing to say, glhf"
          }
          if (DataEvents[i].vei>12){
            continue;
          } else {
            if (DataEvents[i].vei<3 && DataEvents[i].vei>0){
              point.properties.gravity=1;
            } else if(DataEvents[i].vei<5 && DataEvents[i].vei>2){
              point.properties.gravity=2;
            } else if(DataEvents[i].vei>4 && DataEvents[i].vei<13){
              point.properties.gravity=3;
            }
            features.push(point)
          }
        }
    }
}
return features
}

// Fonction pour compléter un GEJSON de séparations avec une properties en plus qui est la densité
// d'accidents
function addDensityToGEOJSON(Data, all_events){
    var count_total = all_events.length;
    var features = Array();
    var val_array = Array();
    for(let i = 0; i < Data.features.length; i++){
        // Calcul du taux d'incidents pour la feature i
        var count = 0
        for(let j=0; j<all_events.length; j++){
            if(isInFeature(all_events[j], Data.features[i])) count ++;
        }
        val_array.push(count);
        var rate = (count/count_total) * 100;
        // Création d'un nouvel élément pour features
        let point = {type:"Feature",
                        geometry :{
                            type: "Polygon",
                            coordinates :Data.features[i].geometry.coordinates
                        },
                        properties : {
                                name : Data.features[i].properties.name,
                                nbr : count,
                                density: rate
                        }
        }
        features.push(point);
    }
    return [val_array, features];
}

function getParticularEvents(all_events, typeEvent){
    var features = Array();
    for(let i=0; i<all_events.length; i++){
        if(all_events[i].properties.type == typeEvent) features.push(all_events[i]);
    }
    return features;
}

// Fonction pour conserver uniquement les événements liés à une délimitation
function getLocalEvents(all_events, feature){
    let features = Array();
    for(let i=0; i<all_events.length;i++){
        var event = all_events[i];
        if(isInFeature(event, feature)) features.push(all_events[i]);
    }
    return features;
}

// Récupération de tous les évévenements dans un seul array
function getAllEvents(final_eq, final_tsu, final_vol, eq, tsu, vol){
    let features = Array();
    if(eq){
        for(let i = 0; i < final_eq.features.length; i++){
            features.push(final_eq.features[i]);
        }
    }
    if(tsu){
        for(let i = 0; i < final_tsu.features.length; i++){
            features.push(final_tsu.features[i]);
        }
    }
    if(vol){
        for(let i = 0; i < final_vol.features.length; i++){
            features.push(final_vol.features[i]);
        }
    }
    return features;
}

// Sélection des données en fonction d'une période de temps choisie
function DataTimed(Data, Time){
    let features=Array();
    for (let i=0; i<Data.features.length; i++){
        if (Data.features[i].properties.year >= Time[0] && Data.features[i].properties.year <= Time[1]){
            features.push(Data.features[i]);
        }
    }
    return features;
}
// sélection du rayon pour la légende
//additional
function getRadius(r) {
  return  r > 30 ? 35 :
    r > 20 ? 25 :
    r > 10 ? 12 :
    0;
  }

// MAIN FUNCTION (tout ce qui se passe dedans sera possible une fois que la page sera correctement chargée)
$(document).ready(function(){
    // Forcer la page à 67% de zoom
    document.body.style.zoom = "67%";
    let local_feature = null;
    // Définitions des fonctions liées aux différentes couches de mymap
    function onEachFeatureDelim(feature, layer){
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
            layer.on("click", function(event){
                mymap.fitBounds(event.target.getBounds());
                local_feature = feature;
            });
        }
    }
    function onEachFeatureEvent(feature, layer) {
        layer.bindPopup(feature.properties.comments);
    }

    // Initialisation de la carte
    let AutoZoom = 2;
    let AutoCenter = [30, 0];
    var mymap = L.map('map', { zoomControl: false }).setView(AutoCenter, AutoZoom);
    mymap.doubleClickZoom.disable();
    mymap.scrollWheelZoom.disable();
    mymap.boxZoom.disable();
    mymap.keyboard.disable();
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'sk.eyJ1IjoiY2hpZWZkdXBhbiIsImEiOiJja3Z3cDg5dGMxbmpkMnZtOW42aHQ4N3FqIn0.9bgkgEMeGUihgjpmoDDhVQ'
    }).addTo(mymap);
    // Initialisation du style des polygons
    var style_polygons = {
        "fillColor" :'white',
        "color" : "#f55919",
        "opacity" : 0.7,
        "dashArray": '20,10'
    };
    // Initialisation de la layer pour les séparations
    var layer = L.geoJSON(false ,{onEachFeature: onEachFeatureDelim}).addTo(mymap);
    // Initialisation des layers pour les tsunamis
    var layerTsunami = L.geoJSON(false,
        {pointToLayer: function(feature, latlng){
        var MarkerTsu = L.AwesomeMarkers.icon({
            icon: 'tint',
            markerColor: 'darkblue',
            prefix:'fa',
            iconColor:'white',
        });
        return L.marker(latlng,{icon: MarkerTsu});
        },
        onEachFeature: onEachFeatureEvent
    }).addTo(mymap);
    // Initialisation de la layer pour les volcans
    var layerVolcano = L.geoJSON(false,
        {pointToLayer: function(feature, latlng){
        var MarkerVol = L.AwesomeMarkers.icon({
            icon:'fire',
            markerColor: 'darkred',
            prefix:'fa',
            iconColor:'white',
        });
        return L.marker(latlng,{icon: MarkerVol});
        },
        onEachFeature: onEachFeatureEvent
    }).addTo(mymap);
    // Initialisation de la layer pour les tremblements de terre
    var layerEarthquake = L.geoJSON(false,
        {pointToLayer: function(feature, latlng){
        var MarkerEar = L.AwesomeMarkers.icon({
            icon:'globe',
            markerColor: 'beige',
            prefix:'fa',
            iconColor:'black',
        });
        return L.marker(latlng,{icon: MarkerEar});
        },
        onEachFeature: onEachFeatureEvent
    }).addTo(mymap);

    // Initialisation de la légende pour la carte couleur
    let legend = L.control({position: 'bottomright'});
    legend.onAdd = function (mymap) {
        // Vérification si élément déjà existant
        var container = legend.getContainer();
        if(container){
            L.DomUtil.remove(container);
        }
        this._div = L.DomUtil.create('div', 'legend');
        return this._div;
    };
    legend.update = function(bounds){
        if(bounds.length == 5) var grades = [bounds.b0, bounds.b1, bounds.b2, bounds.b3, bounds.b4];
        if(bounds.length == 4) var grades = [bounds.b0, bounds.b1, bounds.b2, bounds.b3];
        if(bounds.length == 3) var grades = [bounds.b0, bounds.b1, bounds.b2];
        var labels = [];
        for (var i = 0; i < grades.length-1; i++){
            this._div.innerHTML += '<i style="background:' + getMyColor(grades[i] + 0.01, bounds) + '"></i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
    };
    //additional
    var legend2 = L.control({position: 'bottomright'});
    legend2.onAdd = function (mymap) {
       var container = legend.getContainer();
       if(container){
           L.DomUtil.remove(container);
       }
       var div = L.DomUtil.create('div', 'info2 legend2');
       grades = [12, 25, 35],
       labels = ['Gravity of event'],
       categories = ['Weak','Strong','Severe'];
       for (var i = 0; i < grades.length; i++) {
            var grade = grades[i];//*0.5;
            if (grade==12){
              labels.push(
                '<i class="circlepadding" style="width: 4px;"></i> <i  style="background: #8080A0; width: '+getRadius(grade)*2+'px; height: '+getRadius(grade)*2+'px; border-radius:  50%; margin-top: '+12+'px; margin-left: '+16+'px"></i> '+categories[i]);
            }else if(grade==35){
              labels.push(
              '<i class="circlepadding" style="width: 4px;"></i> <i  style="background: #8080A0; width: '+getRadius(grade)*2+'px; height: '+getRadius(grade)*2+'px; border-radius:  50%; margin-top: '+-4+'px; margin-bottom: '+-5+'px; margin-left: '+-4+'px"></i> '+categories[i]);
            } else {
            labels.push(
              '<i class="circlepadding" style="width: 7px;"></i> <i  style="background: #8080A0; width: '+getRadius(grade)*2+'px; height: '+getRadius(grade)*2+'px; border-radius:  50%; margin-top: '+-4+'px; margin-bottom: '+-5+'px; margin-left: '+2+'px"></i> '+categories[i]);
            }
            }
     div.innerHTML = labels.join('<br>');
     return div;
     };
    // Legend pour expliquer la colormap
    let legend_label = L.control({position : 'topright'});
    legend_label.onAdd = function(mymap) {
        // vérification si élément déjà existant
        var container = legend_label.getContainer();
        if(container){
            L.DomUtil.remove(container);
        }
        this._div = L.DomUtil.create('div', 'info');
        return this._div;
    }
    legend_label.update = function(array_time){
        this._div.innerHTML = "<h4>Number of disasters from "+String(array_time[0])+" to "+String(array_time[1])+"</h4>";
    }

    // Récupération de toutes les data une seule fois
    d3.json("/getCountries", function(countries){
    d3.json("/getContinents", function(continents){
    d3.json("/getTect", function(tect){
    d3.json("/getEarthquake", function(Da_ear){
    d3.json("/getTsu", function(Da_tsu){
    d3.json("/getVolcanoLoc", function(Da_vol){
    d3.json("/getVolcanoEvents", function(Da_vol_events){ // LIGNE A MODIFIER SELON LE TRAITEMENT DES VOLCANS
        // Traitement des données
        let Data_earthquake = {type :"FeatureCollection", features : getGeoJSON_E(Da_ear)};
        let Data_tsunami = {type :"FeatureCollection", features : getGeoJSON_T(Da_tsu)};
        let Data_volcano = {type :"FeatureCollection", features: getGeoJSON_V(Da_vol, Da_vol_events)};
        let Data_countries = {type :"FeatureCollection", features: Polygon_cleanCountries(countries)};
        let Data_continents = {type :"FeatureCollection", features: Polygon_cleanContinent(continents)};
        let Data_tect = {type :"FeatureCollection", features: Polygon_cleanTect(tect)};
        // Par défaut : séparation par pays
        layer.addData(Data_countries);
        layer.setStyle(style_polygons);
        // Choix des séparations
        document.getElementById("select_sep").onchange = function(){
            var val = $("#select_sep").val();
            if(val == "P"){
                layerTsunami.clearLayers();
                layerEarthquake.clearLayers();
                layerVolcano.clearLayers();
                layer.clearLayers();
                layer.addData(Data_countries);
                layer.setStyle(style_polygons);
                mymap.setView(AutoCenter, AutoZoom);
                legend.remove();
                legend2.remove();
            }
            else if(val == "C"){
                layerTsunami.clearLayers();
                layerEarthquake.clearLayers();
                layerVolcano.clearLayers();
                layer.clearLayers();
                layer.addData(Data_continents);
                layer.setStyle(style_polygons);
                mymap.setView(AutoCenter, AutoZoom);
                legend.remove();
                legend2.remove();
            }
            else if(val == "T"){
                layerTsunami.clearLayers();
                layerEarthquake.clearLayers();
                layerVolcano.clearLayers();
                layer.clearLayers();
                layer.addData(Data_tect);
                layer.setStyle(style_polygons);
                mymap.setView(AutoCenter, AutoZoom);
                legend.remove();
                legend2.remove();
            }
        };
        // Retour à la vision global
        $("#resetZoom").click(function(){
            document.getElementById("nav_btn_facts").style.visibility = "hidden";
            document.getElementById("nav_btn_csq").style.visibility = "hidden";
            if(typeof(plot_c) != "undefined") plot_c.destroy();
            if(typeof(plot_f) != "undefined") plot_f.destroy();
            var val = $("#select_sep").val();
            if(val == "P"){
                layerTsunami.clearLayers();
                layerEarthquake.clearLayers();
                layerVolcano.clearLayers();
                layer.setStyle(style_polygons);
                mymap.setView(AutoCenter, AutoZoom);
                legend.remove();
                legend_label.remove();
                legend2.remove();
            }
            else if(val == "C"){
                layerTsunami.clearLayers();
                layerEarthquake.clearLayers();
                layerVolcano.clearLayers();
                layer.setStyle(style_polygons);
                mymap.setView(AutoCenter, AutoZoom);
                legend.remove();
                legend_label.remove();
                legend2.remove();
            }
            else if(val == "T"){
                layerTsunami.clearLayers();
                layerEarthquake.clearLayers();
                layerVolcano.clearLayers();
                mymap.setView(AutoCenter, AutoZoom);
                legend.remove();
                legend_label.remove();
                legend2.remove();
            }
        })

        // Choix des événements
        $("#event_btn").click(function(){
            // Récupération des valeurs dans les différents inputs
            if($("#eq_event").is(":checked"))  eq = true;
            else  eq = false;
            if($("#tsu_event").is(":checked"))  tsu = true;
            else  tsu = false;
            if($("#vol_event").is(":checked"))  vol = true;
            else  vol = false;
            if(!eq && !tsu && !vol){
                alert("Choose at least one disaster.")
                return;
            }
            // Récupération de l'intervalle de temps et sélection des données
            array_time = RecupDate();
            var final_eq = {type :"FeatureCollection", features: DataTimed(Data_earthquake, array_time)};
            var final_tsu = {type :"FeatureCollection", features: DataTimed(Data_tsunami, array_time)};
            var final_vol = {type: "FeatureCollection", features: DataTimed(Data_volcano, array_time)};
            // Affichage en vision globale
            if(mymap.getZoom() == AutoZoom && Math.round(mymap.getCenter().lat) == AutoCenter[0] && mymap.getCenter().lng == AutoCenter[1]){
                // Récupération du nombre total d'événements
                all_events = getAllEvents(final_eq, final_tsu, final_vol, eq, tsu, vol);
                if(all_events.length == 0){
                    alert("There is no events for your selection.");
                    return;
                }
                // Modification des GEOJSON de séparations selon
                var val = $("#select_sep").val();
                if(val == "P"){
                    // récupération d'un data geoJSON avec les densités
                    var res = addDensityToGEOJSON(Data_countries, all_events);
                    var tmp = {type :"FeatureCollection", features: res[1]};
                    // Ajax call to get the bounderies
                    $.ajax({
                        data:{
                            val_array : JSON.stringify(res[0])
                        },
                        type:"POST",
                        url: "/getClasses",
                        success: function(data){
                            let bounds = JSON.parse(data);
                            // Affichage
                            layer.clearLayers();
                            layer.addData(tmp);
                            layer.eachLayer(function(l){
                                l.setStyle(newStyle(l.feature, bounds));
                            });
                            // légende
                            legend2.remove();
                            legend.addTo(mymap);
                            legend.update(bounds);
                            legend_label.addTo(mymap);
                            legend_label.update(array_time);
                        }
                    });
                }
                else if(val == "C"){
                    // récupération d'un data geoJSON avec les densités
                    var res = addDensityToGEOJSON(Data_continents, all_events);
                    var tmp = {type :"FeatureCollection", features: res[1]};
                    // Ajax call to get the bounderies
                    $.ajax({
                        data:{
                            val_array : JSON.stringify(res[0])
                        },
                        type:"POST",
                        url: "/getClasses",
                        success: function(data){
                            let bounds = JSON.parse(data);
                            // Affichage
                            layer.clearLayers();
                            layer.addData(tmp);
                            layer.eachLayer(function(l){
                                l.setStyle(newStyle(l.feature, bounds));
                            });
                            // légende
                            legend2.remove();
                            legend.addTo(mymap);
                            legend.update(bounds);
                            legend_label.addTo(mymap);
                            legend_label.update(array_time);
                        }
                    });
                }
                else if(val == "T"){
                    // récupération d'un data geoJSON avec les densités
                    var res = addDensityToGEOJSON(Data_tect, all_events);
                    var tmp = {type :"FeatureCollection", features: res[1]};
                    // Ajax call to get the bounderies
                    $.ajax({
                        data:{
                            val_array : JSON.stringify(res[0])
                        },
                        type:"POST",
                        url: "/getClasses",
                        success: function(data){
                            let bounds = JSON.parse(data);
                            // Affichage
                            layer.clearLayers();
                            layer.addData(tmp);
                            layer.eachLayer(function(l){
                                l.setStyle(newStyle(l.feature, bounds));
                            });
                            // légende
                            legend2.remove();
                            legend.addTo(mymap);
                            legend.update(bounds);
                            legend_label.addTo(mymap);
                            legend_label.update(array_time);
                        }
                    });
                }
                // Affichage par défaut du graphique de conséquence
                var id = $(".prev_csq").attr("id").replace("prev_csq_", "");
                if(id == "1") showMoneyDmg(all_events, "plot_csq", eq, tsu, vol);
                if(id == "2") showDeathDmg(all_events, "plot_csq", eq, tsu, vol);
                if(id == "3") showHouseDst(all_events, "plot_csq", eq, tsu, vol);
                if(id == "4") showDeathDmgEvolution(all_events, "plot_csq", eq, tsu, vol, array_time);
                if(id == "5") showDstHouseEvolution(all_events, "plot_csq", eq, tsu, vol, array_time);
                // Affichage du graphique de faits par défaut
                var id = $(".prev_fact").attr("id").replace("prev_facts_", "");
                if(id == "1") showGravityEvents(all_events, "plot_facts", eq, tsu, vol);
                if(id == "2") showNbrEventsEvolution(all_events, "plot_facts", eq, tsu, vol, array_time);
                // Affichage des boutons de navigation
                document.getElementById("nav_btn_csq").style.visibility = "visible";
                document.getElementById("nav_btn_facts").style.visibility = "visible";
            }
            // Affichage en vision locale
            else{
                // local_feature contient la feature sur laquellee on a cliquée
                all_events = getAllEvents(final_eq, final_tsu, final_vol, eq, tsu, vol); // Tous les événements
                all_events = getLocalEvents(all_events, local_feature); // uniquement les événements concernés par local_feature
                if(all_events.length == 0){
                    alert("There is no events for your selection.");
                    return;
                }
                layer.clearLayers();
                var val = $("#select_sep").val();
                if(val == "P"){
                    layer.addData(Data_countries);
                    layer.setStyle(style_polygons);
                    legend.remove();
                    legend_label.remove();
                    legend2.addTo(mymap);
                }
                if(val == "C"){
                    layer.addData(Data_continents);
                    layer.setStyle(style_polygons);
                    legend.remove();
                    legend_label.remove();
                    legend2.addTo(mymap);
                }
                if(val == "T"){
                    layer.addData(Data_tect);
                    layer.setStyle(style_polygons);
                    legend.remove();
                    legend_label.remove();
                    legend2.addTo(mymap);
                }
                layerEarthquake.clearLayers();
                layerTsunami.clearLayers();
                layerVolcano.clearLayers();
                if(eq){
                    var local_events = {type: "FeatureCollection", features: getParticularEvents(all_events, "eq")}
                    layerEarthquake.addData(local_events);
                    for (let i=0;i<local_events.features.length;i++){
                      if (local_events.features[i].properties.gravity==1){
                        circle = L.circleMarker([local_events.features[i].geometry.coordinates[1],local_events.features[i].geometry.coordinates[0]],{color:'darkgoldenrod',radius:12});
                      } else if(local_events.features[i].properties.gravity==2){
                        circle = L.circleMarker([local_events.features[i].geometry.coordinates[1],local_events.features[i].geometry.coordinates[0]],{color:'darkgoldenrod',radius:25});
                      } else if (local_events.features[i].properties.gravity==3){
                        circle = L.circleMarker([local_events.features[i].geometry.coordinates[1],local_events.features[i].geometry.coordinates[0]],{color:'darkgoldenrod',radius:35});
                      }
                      circle.addTo(layerEarthquake);
                    }

                }
                if(tsu){
                    var local_events = {type: "FeatureCollection", features: getParticularEvents(all_events, "tsu")}
                    layerTsunami.addData(local_events);
                    for (let i=0;i<local_events.features.length;i++){
                      if (local_events.features[i].properties.gravity==1){
                        circle = L.circleMarker([local_events.features[i].geometry.coordinates[1],local_events.features[i].geometry.coordinates[0]],{color:'darkblue',radius:12});
                      } else if(local_events.features[i].properties.gravity==2){
                        circle = L.circleMarker([local_events.features[i].geometry.coordinates[1],local_events.features[i].geometry.coordinates[0]],{color:'darkblue',radius:25});
                      } else if (local_events.features[i].properties.gravity==3){
                        circle = L.circleMarker([local_events.features[i].geometry.coordinates[1],local_events.features[i].geometry.coordinates[0]],{color:'darkblue',radius:35});
                      }
                      circle.addTo(layerTsunami);
                    }
                }
                if(vol){
                    var local_events = {type: "FeatureCollection", features: getParticularEvents(all_events, "vol")}
                    layerVolcano.addData(local_events);
                    for (let i=0;i<local_events.features.length;i++){
                      if (local_events.features[i].properties.gravity==1){
                        circle = L.circleMarker([local_events.features[i].geometry.coordinates[1],local_events.features[i].geometry.coordinates[0]],{color:'darkred',radius:12});
                      } else if(local_events.features[i].properties.gravity==2){
                        circle = L.circleMarker([local_events.features[i].geometry.coordinates[1],local_events.features[i].geometry.coordinates[0]],{color:'darkred',radius:25});
                      } else if (local_events.features[i].properties.gravity==3){
                        circle = L.circleMarker([local_events.features[i].geometry.coordinates[1],local_events.features[i].geometry.coordinates[0]],{color:'darkred',radius:35});
                      }
                      circle.addTo(layerVolcano);
                    }
                }
                // Affichage par défaut du graphique de conséquence
                var id = $(".prev_csq").attr("id").replace("prev_csq_", "");
                if(id == "1") showMoneyDmg(all_events, "plot_csq", eq, tsu, vol);
                if(id == "2") showDeathDmg(all_events, "plot_csq", eq, tsu, vol);
                if(id == "3") showHouseDst(all_events, "plot_csq", eq, tsu, vol);
                if(id == "4") showDeathDmgEvolution(all_events, "plot_csq", eq, tsu, vol, array_time);
                if(id == "5") showDstHouseEvolution(all_events, "plot_csq", eq, tsu, vol, array_time);
                // Affichage du graphique de faits par défaut
                var id = $(".prev_fact").attr("id").replace("prev_facts_", "");
                if(id == "1") showGravityEvents(all_events, "plot_facts", eq, tsu, vol);
                if(id == "2") showNbrEventsEvolution(all_events, "plot_facts", eq, tsu, vol, array_time);
                // Affichage des boutons de navigations
                document.getElementById("nav_btn_csq").style.visibility = "visible";
                document.getElementById("nav_btn_facts").style.visibility = "visible";
            }
        });

        // Navigation dans les graphiques
        // Gestion de l'affichage des graphiques en fonction de la flèche sélectionnée
        $("button.next_fact").click(function(){
            if(typeof(all_events) != "undefined"){
                // Récupération de l'id pour savoir quel graphique afficher
                var id = $(this).attr("id").replace("next_facts_", "");
                var tmp = parseInt(id);
                switch (tmp) {
                    case 1:
                        var new_id = 2;
                        showNbrEventsEvolution(all_events, "plot_facts", eq, tsu, vol, array_time);
                        break;
                    case 2:
                        var new_id = 1;
                        // Bar chart des gravités
                        showGravityEvents(all_events, "plot_facts", eq, tsu, vol);
                    default:
                        break;
                }
                var txt = "next_facts_"+String(new_id);
                $(this).attr("id", txt);
                txt = "prev_facts_"+String(new_id);
                $("#prev_facts_"+tmp).attr("id", txt);
            }
        });
        $("button.prev_fact").click(function(){
            if(typeof(all_events) != "undefined"){
                var id = $(this).attr("id").replace("prev_facts_", "");
                var tmp = parseInt(id);
                switch (tmp) {
                    case 1:
                        var new_id = 2;
                        showNbrEventsEvolution(all_events, "plot_facts", eq, tsu, vol, array_time);
                        break;
                    case 2:
                        var new_id = 1;
                        // Bar chart des gravités
                        showGravityEvents(all_events, "plot_facts", eq, tsu, vol);
                        break;
                    default:
                        break;
                }
                var txt = "prev_facts_"+String(new_id);
                $(this).attr("id", txt);
                txt = "next_facts_"+String(new_id);
                $("#next_facts_"+tmp).attr("id", txt);
            }
        });
        $("button.next_csq").click(function(){
            // Check si all_events existe
            if(typeof(all_events) != "undefined"){
                // Récupération de l'id
                var id = $(this).attr("id").replace("next_csq_", "");
                var tmp = parseInt(id);
                switch (tmp) {
                    case 1:
                        var new_id = 2;
                        showDeathDmg(all_events, "plot_csq", eq, tsu, vol);
                        break;
                    case 2:
                        var new_id = 3;
                        showHouseDst(all_events, "plot_csq", eq, tsu, vol);
                        break;
                    case 3:
                        var new_id = 4;
                        // Bar chart des dégâts monétaires
                        showDeathDmgEvolution(all_events, "plot_csq", eq, tsu, vol, array_time);
                        break;
                    case 4:
                        var new_id = 5
                        showDstHouseEvolution(all_events, "plot_csq", eq, tsu, vol, array_time);
                        break;
                    case 5:
                        var new_id = 1;
                        showMoneyDmg(all_events, "plot_csq", eq, tsu, vol);
                        break;
                    default:
                        break;
                }
                var txt = "next_csq_"+String(new_id);
                $(this).attr("id", txt);
                txt = "prev_csq_"+String(new_id);
                $("#prev_csq_"+tmp).attr("id", txt);
            }
        });
        $("button.prev_csq").click(function(){
            // Check si all_events existe
            if(typeof(all_events) != "undefined"){
                var id = $(this).attr("id").replace("prev_csq_", "");
                var tmp = parseInt(id);
                switch (tmp) {
                    case 1:
                        var new_id = 5;
                        showDstHouseEvolution(all_events, "plot_csq", eq, tsu, vol, array_time);
                        break;
                    case 2:
                        var new_id = 1;
                        // Bar chart des dégâts monétaires
                        showMoneyDmg(all_events, "plot_csq", eq, tsu, vol);
                        break;
                    case 3:
                        var new_id = 2;
                        showDeathDmg(all_events, "plot_csq", eq, tsu, vol);
                        break;
                    case 4:
                        var new_id = 3;
                        showHouseDst(all_events, "plot_csq", eq, tsu, vol);
                        break;
                    case 5:
                        var new_id = 4;
                        showDeathDmgEvolution(all_events, "plot_csq", eq, tsu, vol, array_time);
                    default:
                        break;
                }
                var txt = "prev_csq_"+String(new_id);
                $(this).attr("id", txt);
                txt = "next_csq_"+String(new_id);
                $("#next_csq_"+tmp).attr("id", txt);
            }
        });
    });
    });
    });
    });
    });
    });
    });
});