
require("./lib/Leaflet.Editable");
const Secrets = require("./secrets");
const GpxImportControl = require("./gpx-import-control");
const GpxImportCommand = require("./gpx-import-command");



// ======== Basic Map setup ==========

// Initialize the map and make layers editable
var startCoordinates = [51.1633908, 10.4477191];
var mymap = L.map('mapid', { 
    editable: true,
});

// Set maps view to our chosen geographical coordinates and set a zoom level:
mymap.setView(startCoordinates, 14);

/**
 * Add a tile layer to add to our map
 */
var tileImagesUrlTemplate = "https://api.openrouteservice.org/mapsurfer/{z}/{x}/{y}.png?api_key={apiKey}";
var apiKey = Secrets.getApiKeyForOpenRouteService();
var attribution = "Tiles from <a href=\"https://openrouteservice.org\">openroute service</a>";
var maxZoom = 17;
var zoomOffset = 14;

L.tileLayer(tileImagesUrlTemplate, {
    attribution: attribution,
    maxZoom: maxZoom,
    apiKey: apiKey
}).addTo(mymap);

// ======== Add Controls ==========

var importOptions = {
    command: new GpxImportCommand(mymap)
}
mymap.addControl(new GpxImportControl(importOptions));


/**
 * Add a polyline
 */
 var polyline = L.polyline([
    [51.1633908, 10.4477191],
    [51.1633908, 10.4577191],
    [51.1733908, 10.4577191]
]).addTo(mymap);

// Make polyline editable
polyline.enableEdit();

// Make polyline hideable
var overlayMaps = {
    "polyline": polyline
};

var layersControl = L.control.layers(null, overlayMaps);
layersControl.addTo(mymap);

/**
 * Add control for display points of polyline
 */
L.Control.NewControl = L.Control.extend({

    onAdd: function (map) {
        var div = L.DomUtil.create('div');

        div.textContent = "Hello";

        return div;
    },

    onRemove: function (map) {
        // Nothing to do here
    },

    display: function (text) {
        this.getContainer().textContent = text;
    }

});
L.control.newcontrol = function (opts) {
    return new L.Control.NewControl(opts);
}

var control = L.control.newcontrol({ position: 'bottomleft' });
control.addTo(mymap);

/**
 * Register for polyline changes
 */
function onClick(e) {
    control.display("polyline points:=" + polyline.getLatLngs().length);
}
polyline.on("editable:vertex:new", onClick);
polyline.on("editable:vertex:deleted", onClick);
onClick(null);