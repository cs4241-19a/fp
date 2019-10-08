"use strict";

import data_display from "./data_display";
import domains from "./domain_list";
import socket from "./index";

let stopped = true;

const rollingNumber = 10;

const userLocation = {lat: undefined, lng: undefined};
const connectionData = {available: false, type: undefined, rtt: undefined, downlink: undefined, effectiveType: undefined}

const localData = {};
const runCycle = async function () {
	const newData = [];

	/**
	 * Creates and loads an image element by url.
	 * @param  {String} url
	 * @return {Promise} promise that resolves to an image element or
	 *                   fails to an Error.
	 */
	function request_image(url) {
		return new Promise(function (resolve, reject) {
			const img = new Image(32, 32);
			img.onload = function () {
				resolve(img);
			};
			img.onerror = function () {
				reject(url + " is bad.");
			};
			img.src = "https://" + url + '?nocache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
		});
	}

	/**
	 * Pings a url.
	 * @param  {String} url
	 * @return {Promise} promise that resolves to a ping (ms, float).
	 */
	function ping(url) {
		return new Promise(function (resolve, reject) {
			const start = (new Date()).getTime();
			const response = function () {
				let delta = ((new Date()).getTime() - start);
				resolve(delta);
			};
			request_image(url).then(response).catch(reason => reject(reason));
		});
	}

	console.log("Running cycle");
	for (let i = 0; i < domains.length; i += 1) {
		if (stopped) break;

		const domain = domains[i];
		await ping(domain.domain)
				.then(pingTime => {
					localData[`${domain.name} (${domain.rank})`].push(pingTime);

					while( localData[`${domain.name} (${domain.rank})`].length > rollingNumber ) {
						localData[`${domain.name} (${domain.rank})`].shift();
					}

					newData.push({favicon: domain.name, rtt: pingTime});
				})
				.catch(console.log);
	}

	newData.forEach(d => {
		d.lat = userLocation.lat;
		d.lng = userLocation.lng;
		d.connectionDataAvailable = connectionData.available;
		d.connectionType = connectionData.type;
		d.connectionEffectiveType = connectionData.effectiveType;
		d.connectionRtt = connectionData.rtt;
		d.connectionDownlink = connectionData.downlink;
	});

	return newData;
};

const sum = (data, start) => {
	return data + start;
};

const max = (a, b) => {
	if (b >= a) return b;
	return a;
};

const aggregateLocalData = () => {
	const data = {};

	Object.keys(localData).forEach(key => {
		data[key] = {avg: localData[key].reduce(sum, 0) / localData[key].length};
	});

	return data;
};

const stopCollection = function () {
	stopped = true;
	console.log("Collection stop");
	document.querySelector("#start_collection_button_modal").disabled = false;
	document.querySelector("#stop_collection_button").disabled = true;
};

const startCollection = async function () {
	if (stopped) {
		document.querySelector("#start_collection_button_modal").disabled = true;
		document.querySelector("#stop_collection_button").disabled = false;
		stopped = false;
		console.log("Collection start");

		geoLocate();

		while (!stopped) {
			let newData = await runCycle();

			socket.emit('submitNewData', newData);
			data_display.displayBar(aggregateLocalData());
		}
	}
};

const geoLocate = function() {
	navigator.geolocation.getCurrentPosition(position => {
			userLocation.lat = position.coords.latitude.toFixed(2);
			userLocation.lng = position.coords.longitude.toFixed(2);
	});
};

// Enter point
let runningBeforeUnblur = false;
document.body.onload = () => {
	window.onblur = () => {
		runningBeforeUnblur = stopped === false;
		stopCollection();
	};

	window.onfocus = () => {
		data_display.displayBar(aggregateLocalData());
		if (runningBeforeUnblur) {
			startCollection().then();
		}
	};

	const startCollectionButton = document.querySelector("#start_collection_button");
	const stopCollectionButton = document.querySelector("#stop_collection_button");

	if (startCollectionButton !== undefined && startCollectionButton !== null) {
		startCollectionButton.disabled = false;
		startCollectionButton.onclick = startCollection;
	}

	if (stopCollectionButton !== undefined && stopCollectionButton !== null) {
		stopCollectionButton.disabled = true;
		stopCollectionButton.onclick = stopCollection;
	}

	for (let i = 0; i < domains.length; i++) {
		const d = domains[i];
		localData[`${d.name} (${d.rank})`] = [];
	}

	socket.on('sendData', data_display.updateMapData);

	const zero_bar = {};
	domains.forEach(d => zero_bar[`${d.name} (${d.rank})`] = {avg: NaN, max: NaN});

	data_display.initializeBar();
	data_display.displayBar(zero_bar);
	data_display.displayBar(zero_bar); // Note: bar chart has an issue where it doesn't display first call
	data_display.setupMap(800, 500);

	const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
	if (connection) {
		connectionData.available = true;
		connectionData.type = connection.type;
		connectionData.effectiveType = connection.effectiveType;
		connectionData.rtt = connection.rtt;
		connectionData.downlink = connection.downlink;
	}
};
