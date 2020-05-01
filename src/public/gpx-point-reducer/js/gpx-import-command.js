const gpxParse = require("./lib/gpx-parse-browser.js");

/**
 * The command has a very asynchronous nature. The flow of execution is:
 * 
 *      run -> _read -> _parseGpx -> _addToMap
 */
class GpxImportCommand {


    constructor(map) {
        this._map = map;
        this._gpx = null;
    }

    run(file) {
        this._read(file);
    }

    _read(file) {

        // Create reader
        var reader = new FileReader();

        // register this instance as listener 
        var myself = this;
        reader.onload = function (event) {
            var data = event.target.result;
            if (data != null) {
                myself._parseGpx(data);
            }
        };

        // start reading
        reader.readAsText(file);
    }

    _parseGpx(data) {

        // register this instance as listener 
        var myself = this;
        var callback = function(error, gpx) {
            if (error !== null) {
                alert("Can not parse the selected file, error:=" + error);
            } else {
                myself._addToLayer(gpx);
            }
        };

        // start parsing
        gpxParse.parseGpx(data, callback);
    }

    _addToLayer(gpx) {
        console.log(gpx);
    }
};

module.exports = GpxImportCommand;