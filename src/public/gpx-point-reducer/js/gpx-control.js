/**
 * The implementation of this class asumes that the leaflet library is allready loaded 
 */
class GpxControl extends L.Control {

    static options = {
        position: 'topleft',
        title: "GPX Control",
        html: "?",
        name: "?",
        command: null
    };

    initialize(options) {
        
        // Set the default options
        L.setOptions(this, GpxControl.options);

        // Overwrite with the handed options
        L.setOptions(this, options);
    }

    onAdd(map) {

        var htmlClassName = "leaflet-control-" + this.options.name;

        var container = L.DomUtil.create(
            "div", 
            htmlClassName + ' leaflet-bar');
 
        this._button = this._createButton(
            this.options.html, 
            this.options.title,
            htmlClassName, 
            container, this.options.command);
 
        return container;
    }


	_createButton (html, title, className, container) {

		var link = L.DomUtil.create('a', className, container);
        link.href = '#';
        link.title = title;
        link.innerHTML = html;

		/*
		 * Will force screen readers like VoiceOver to read this as "<title> - button"
		 */
		link.setAttribute('role', 'button');
		link.setAttribute('aria-label', title);

		L.DomEvent.disableClickPropagation(link);
		L.DomEvent.on(link, 'click', L.DomEvent.stop);
		L.DomEvent.on(link, 'click', this._callCommand, this);
		L.DomEvent.on(link, 'click', this._refocusOnMap, this);

		return link;
    }

    _callCommand() {
        this.options.command.run(null);
    }
    
}

module.exports = GpxControl ;