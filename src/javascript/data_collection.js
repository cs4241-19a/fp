"use strict";

import "./data_display"

// Source: https://www.alexa.com/topsites/countries/US
const domains = ["www.google.com/favicon.ico",
	"www.youtube.com/favicon.ico",
	"www.amazon.com/favicon.ico",
	"www.facebook.com/favicon.ico",
	"www.reddit.com/favicon.ico",
	"www.wikipedia.org/favicon.ico",
	"www.ebay.com/favicon.ico",
	"blobs.officehome.msocdn.com/images/content/images/favicon_metro-bb8cb440e5.ico",
	"www.bing.com/favicon.ico",
	"www.netflix.com/favicon.ico",
	"www.espn.com/favicon.ico",
	"c1.sfdcstatic.com/etc/designs/sfdc-www/en_us/favicon.ico", /* Salesforce */
	"outlook.live.com/mail/favicon.ico",
	"www.instructure.com/themes/instructure_blog/images/favicon.ico",
	"www.chase.com/favicon.ico",
	"www.apple.com/favicon.ico",
	"www.instagram.com/favicon.ico",
	/*"www.microsoftonline.com/favicon.ico", */ // Not responding
	"www.cnn.com/favicon.ico",
	"cfl.dropboxstatic.com/static/images/favicon-vflUeLeeY.ico",
	"www.tmall.com/favicon.ico",
	"www.linkedin.com/favicon.ico",
	"www.twitter.com/favicon.ico",
	"static.twitchcdn.net/assets/favicon-32-d6025c14e900565d6177.png",
	/* "www.salesforce.com/favicon.ico", */ // Duplicate
	"www.microsoft.com/favicon.ico",
	"cdn.shopify.com/s/assets/favicon-4425e7970f1327bc362265f54e8c9c6a4e96385b3987760637977078e28ffe92.png",
	"www.nytimes.com/favicon.ico",
	/* "www.craigslist.com/favicon.ico", */ // Doesn't like no cache parameter
	"www.walmart.com/favicon.ico",
	"www.pornhub.com/favicon.ico",
	"www.adobe.com/favicon.ico",
	/* "www.livejasmine.com/favicon.ico", */ // Not working
	"www.imdb.com/favicon.ico",
	"www.stackoverflow.com/favicon.ico",
	"a0.awsstatic.com/libra-css/images/site/fav/favicon.ico",
	"statics.itc.cn/web/static/images/pic/sohu-logo/favicon.ico", // Sohu.com
	"www.qq.com/favicon.ico",
	"www.indeed.com/images/favicon.ico",
	"www.zillow.com/favicon.ico",
	"www.wellsfargo.com/favicon.ico",
	"www.spotify.com/favicon.ico",
	"www.msn.com/favicon.ico",
	"www.imgur.com/favicon.ico",
	/* "www.login.tmall.com/favicon.ico", */ // Duplicate
	"www.yelp.com/favicon.ico",
	"www.taobao.com/favicon.ico",
	"www.etsy.com/favicon.ico",
	"www.hulu.com/favicon.ico"];

const localData = [];
const collectPingData = async function (){
	for (let i = 0; i < domains.length; i++) {
		localData.push({server: domains[i], data: []})
	}

		const data = [];
		/**
		 * Creates and loads an image element by url.
		 * @param  {String} url
		 * @return {Promise} promise that resolves to an image element or
		 *                   fails to an Error.
		 */
		function request_image(url) {
			return new Promise(function(resolve, reject) {
				const img = new Image(32,32);
				img.onload = function() { resolve(img); };
				img.onerror = function() { reject(url); };
				img.src = "https://" + url + '?nocache=' + Math.floor((1 + Math.random()) * 0x10000).toString(16);
			});
		}

		/**
		 * Pings a url.
		 * @param  {String} url
		 * @param  {Number} multiplier - optional, factor to adjust the ping by.  0.3 works well for HTTP servers.
		 * @return {Promise} promise that resolves to a ping (ms, float).
		 */
		function ping(url, multiplier) {
			//console.log( "pinging" + url)
			return new Promise(function(resolve) {
				const start = (new Date()).getTime();
				const response = function() {
					let delta = ((new Date()).getTime() - start);
					delta *= (multiplier || 1);
					resolve(delta);
				};
				request_image(url).then(response).catch(response);

				// Set a timeout for max-pings, 5s.
				//setTimeout(function() { reject(Error('Timeout')); }, 5000);
			});
		}


		for (let i=0; i < domains.length; i += 1){
			let pingTime =  await ping(domains[i], 1);
			data.push({favicon_name: domains[i], time: pingTime});
			//addPing(servers[i], pingTime)
		}
		fetch( '/post_data', {
			method:'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then( function( response ) {
			})
};

collectPingData().then(console.log);
