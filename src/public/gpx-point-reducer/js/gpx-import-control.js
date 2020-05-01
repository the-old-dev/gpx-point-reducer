/**
 * The implementation of this class asumes that the leaflet library is allready loaded 
 */
const  GpxControl = require("./gpx-control.js");

class GpxImportControl extends GpxControl {

    static options = {
        title: "Import GPX",
        html: "I",
        name: "import",
    };

    initialize(options) {

        // call the super class
        super.initialize(options);

        // Set the class default options
        L.setOptions(this, GpxImportControl.options);

        // Overwrite with the handed options
        L.setOptions(this, options);

    }

    onAdd(map) {

        // call the super class
        var container = super.onAdd(map);

        // create invisible container
        this._createInvisibleFileInput(container);

        return container;
    }

    _createInvisibleFileInput(container) {
        
        // create invisible fileInput
        this._fileInput = L.DomUtil.create('input', 'hidden', container);
        this._fileInput.type = 'file';
        this._fileInput.style.display = 'none';

        // configure file input
        this._fileInput.accept = '.gpx';
                
        // add listener for file selection
        var command = this.options.command;
        var _onFileSelected = function(event) {

            // Check if a file was seleted
            if (event == null || event.target == null || event.target.files == null || event.target.files.length == 0) {
                return;
            }
    
            command.run(event.target.files[0]);
        };

        this._fileInput.addEventListener('change', _onFileSelected, false);
    }

    _callCommand() {
        // Delegate to the invisible file input
        this._fileInput.click();
    }
    
}

module.exports =  GpxImportControl ;