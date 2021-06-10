"use strict";

if (!io) var io = {};
if (!io.github) io.github = {};
if (!io.github.crisstanza) io.github.crisstanza = {};
if (!io.github.crisstanza.Autos) io.github.crisstanza.Autos = {};

(function() {

	io.github.crisstanza.Autos.initId = function() {
		let elements = document.querySelectorAll('[id]:not([id=""])');
		if (elements) {
			let length = elements.length;
			for (let i = 0 ; i < length ; i++) {
				let element = elements[i];
				let id = element.getAttribute('id');
				let identifier = fixId(id);
				window[identifier] = element;
			}
		}
		return elements;
	};

	io.github.crisstanza.Autos.initName = function() {
		let elements = document.querySelectorAll('[name]:not([name=""])');
		if (elements) {
			let length = elements.length;
			for (let i = 0 ; i < length ; i++) {
				let element = elements[i];
				let name = element.getAttribute('name');
				let identifier = fixId(name);
				if (!window[identifier]) {
					window[identifier] = [];
				}
				window[identifier].push(element);
			}
		}
		return elements;
	};

	io.github.crisstanza.Autos.initButton = function(obj) {
		let elements = document.querySelectorAll('button[name]:not([name=""]), button[id]:not([id=""])');
		if (elements) {
			let parent = obj ? 'obj.' : '';
			let length = elements.length;
			for (let i = 0 ; i < length ; i++) {
				let element = elements[i];
				let name = element.getAttribute('name');
				let identifier = name ? fixId(name) : fixId(element.getAttribute('id'));
				element.addEventListener('click', function(event) {
					eval(parent+identifier+'_OnClick(event)');
				});
			}
		}
		return elements;
	};

	function fixId(str) {
		let parts = str.split('-');
		let length = parts.length;
		for (let i = 0 ; i < length ; i++) {
			let part = parts[i];
			if (i > 0)
				parts[i] = firstUppercase(part);
		}
		let identifier = parts.join('');
		return identifier;
	}

	function firstUppercase(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function initAutos(autos) {
		if (autos) {
			let parts = autos.split(/, */);
			let length = parts.length;
			for (let i = 0 ; i < length ; i++) {
				let part = parts[i];
				let identifier = firstUppercase(part);
				let js = 'io.github.crisstanza.Autos.init'+identifier+'();';
				eval(js);
			}
		}
	}

	function initFromHash(autosHash) {
		function initCurrent(key, value) {
			let objects = window[key];
			if (Array.isArray(objects)) {
				let current = objects.find(object => object.value == value);
				if (current)
					current.checked = true;
			}
		}
		if (autosHash == 'true') {
			let hash = document.location.hash.substring(1);
			if (!hash)
				return;
			let params = new URLSearchParams(hash);
			if (!params)
				return;
			let keys = params.keys();
			for (let key of keys) {
				let value = params.get(key);
				initCurrent(key, value);
			}
		}
	}

	function init(event) {
		initAutos(document.body.getAttribute('data-autos'));
		initFromHash(document.body.getAttribute('data-autos-hash'));
	}

	window.addEventListener('load', init);

})();
