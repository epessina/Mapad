"use strict";

const positionMarkerIcon = L.icon({
    iconUrl    : "img/user-position-marker.png", // ToDo add "www" in front
    iconSize   : [47, 71],
    iconAnchor : [23, 71],
    popupAnchor: [0, -72]
});

let positionMarker;

let map,
    controlLayers,
    baseMaps,
    overlayMaps = {};

let osm,
    bing;

let currLatLong = [0, 0],
    defaultZoom = 3;

function initMap() {

    map = L.map("map");
    map.setView(currLatLong, defaultZoom);

    // Map events
    map.on("dragend", () => disableLocationWatcher());

    // map.on("zoomend", () => {
    //     console.log("Zoom " + map.getZoom());
    // });

    map.on("mousemove", (e) => $(".coordinates").html(e.latlng.lat + ", " + e.latlng.lng));

    map.on("locationfound", event => {
        console.log(event.latlng + ", " + event.accuracy);
        positionMarker.setLatLng(event.latlng);
    });

    map.on("locationerror", () => console.log("Location error"));

    // Add basemaps ToDo connection check
    osm = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution : "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors",
            errorTileUrl: "img/errorTile.png"
        }
    );

    bing = new L.tileLayer.bing(
        "AqSfYcbsnUwaN_5NvJfoNgNnsBfo1lYuRUKsiVdS5wQP3gMX6x8xuzrjZkWMcJQ1",
        {type: "AerialWithLabels"}
    );

    baseMaps = {
        "Open Street Map": osm,
        "Bing Aerial"    : bing
    };

    osm.addTo(map);
    controlLayers = L.control.layers(baseMaps, overlayMaps).addTo(map);

    initPositionControl();

    positionMarker = L.marker(
        currLatLong,
        {icon: positionMarkerIcon, draggable: true}
    );

    positionMarker.addTo(map);

    positionMarker.on("dragend", (e) => {

        currLatLong = [
            e.target.getLatLng().lat,
            e.target.getLatLng().lng
        ];
        console.log(currLatLong);

        disableLocationWatcher();
    });

}

function initPositionControl() {

    // Extend the Control object of Leaflet to create a new one
    L.Control.Position = L.Control.extend({
        onAdd   : function (map) {
            let icon       = L.DomUtil.create("div", "leaflet-control-position");
            icon.innerHTML = "<div id='control-position'><i id='control-position-icon' class='fas fa-crosshairs'></i></div>";

            return icon;
        },
        onRemove: function (map) {
            // Do nothing
        }
    });

    // Add the new Control to the map
    new L.Control.Position({position: "topleft"}).addTo(map);

    enableLocationWatcher();

    $("#control-position").click((e) => {
        e.stopPropagation();
        enableLocationWatcher();
    }).dblclick(e => e.stopPropagation());

}


function enableLocationWatcher() {

    $("#control-position-icon").addClass("blue");

    let LOCATION_OPTIONS = {
        setView           : true,
        zoom              : 12,
        enableHighAccuracy: true,
    };

    if (isMobile) {
        LOCATION_OPTIONS.watch      = true;
        LOCATION_OPTIONS.maximumAge = 15000;
        LOCATION_OPTIONS.timeout    = 300000;
    }

    map.locate(LOCATION_OPTIONS);

}

function disableLocationWatcher() {

    $("#control-position-icon").removeClass("blue");

    map.stopLocate();

}
