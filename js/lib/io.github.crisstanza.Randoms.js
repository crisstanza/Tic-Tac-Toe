"use strict";

if (!io) var io = {};
if (!io.github) io.github = {};
if (!io.github.crisstanza) io.github.crisstanza = {};
if (!io.github.crisstanza.Randoms) io.github.crisstanza.Randoms = {};

(function() {

	io.github.crisstanza.Randoms.getInt = function(min, max) {
		return Math.round(io.github.crisstanza.Randoms.getFloat(min, max));
	};

	io.github.crisstanza.Randoms.getFloat = function(min, max) {
		return Math.random() * (max - min) + min;
	};

})();
