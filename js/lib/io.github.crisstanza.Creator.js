"use strict";

if (!io) var io = {};
if (!io.github) io.github = {};
if (!io.github.crisstanza) io.github.crisstanza = {};
if (!io.github.crisstanza.Creator) io.github.crisstanza.Creator = {};

(function() {

	io.github.crisstanza.Creator.html = function(name, attributes, parent, innerHTML) {
		let element = name ? document.createElement(name) : document.createTextNode(innerHTML);
		if (attributes) {
			for (var key in attributes) {
				element.setAttribute(key, attributes[key]);
			}
		}
		if (parent) {
			parent.appendChild(element);
		}
		if (innerHTML) {
			element.innerHTML = innerHTML;
		}
		return element;
	};

})();
