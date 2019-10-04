"use strict";

import data_display from "./data_display";
import domains from "./domain_list";
import socket from "./index";

let stopped = true;

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
					newData.push({favicon: domain.name, rtt: pingTime});
				})
				.catch(console.log);
	}

	return newData;
};

const sum = (data, start) => {
	return data + start;
};

const aggregateLocalData = () => {
	const data = {};

	Object.keys(localData).forEach(key => {
		data[key] = localData[key].reduce(sum, 0) / localData[key].length;
	});

	return data;
};

const stopCollection = function () {
	stopped = true;
	console.log("Collection stop");
	document.querySelector("#start_collection_button").disabled = false;
	document.querySelector("#stop_collection_button").disabled = true;
};

const startCollection = async function () {
	if (stopped) {
		document.querySelector("#start_collection_button").disabled = true;
		document.querySelector("#stop_collection_button").disabled = false;
		stopped = false;
		console.log("Collection start");

		while (!stopped) {
			let newData = await runCycle();

			socket.emit('submitNewData', newData);
			data_display.displayBar(aggregateLocalData());
		}
	}
};

// Enter point
document.body.onload = () => {
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

	socket.emit('getData');

	socket.on('sendData', data_display.displayMap);

	const zero_bar = {};
	domains.forEach(d => zero_bar[`${d.name} (${d.rank})`] = 0);

	data_display.initializeBar();
	data_display.displayBar(zero_bar);
	data_display.displayBar(zero_bar); // Note: bar chart has an issue where it doesn't display first call
};
