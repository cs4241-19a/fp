"use strict";

import data_display from "./data_display";
import domains from "./domain_list";
import socket from "./index";

let stopped = false;

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
		await ping(domain)
				.then(pingTime => {
					localData[domain].push(pingTime);
					newData.push({favicon: domain, rtt: pingTime});
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
};

const startCollection = async function () {
	stopped = false;
	console.log("Collection start");

	while (!stopped) {
		let newData = await runCycle();

		socket.emit('submitNewData', newData);
		data_display.displayBar(aggregateLocalData());
	}
};

// Enter point
document.body.onload = () => {
	const startCollectionButton = document.querySelector("#start_collection_button");
	const stopCollectionButton = document.querySelector("#stop_collection_button");

	if (startCollectionButton !== undefined && startCollectionButton !== null) {
		startCollectionButton.onclick = startCollection;
	}

	if (stopCollectionButton !== undefined && stopCollectionButton !== null) {
		stopCollectionButton.onclick = stopCollection;
	}

	for (let i = 0; i < domains.length; i++) {
		localData[domains[i]] = [];
	}
};
