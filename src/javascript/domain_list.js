// Domains to ping
// Source: https://www.alexa.com/topsites/countries/US
const domains = [
	{name: "Google", domain: "www.google.com/favicon.ico", rank: 1},
	{name: "Youtube", domain: "www.youtube.com/favicon.ico", rank: 2},
	{name: "Amazon", domain: "www.amazon.com/favicon.ico", rank: 3},
	{name: "Yahoo", domain: "www.yahoo.com/favicon.ico", rank: 4},
	{name: "Facebook", domain: "www.facebook.com/favicon.ico", rank: 5},
	{name: "Reddit", domain: "www.reddit.com/favicon.ico", rank: 6},
	{name: "Wikipedia", domain: "www.wikipedia.org/favicon.ico", rank: 7},
	{name: "Ebay", domain: "www.ebay.com/favicon.ico", rank: 8},
	{name: "Office", domain: "blobs.officehome.msocdn.com/images/content/images/favicon_metro-bb8cb440e5.ico", rank: 9},
	{name: "Bing", domain: "www.bing.com/favicon.ico", rank: 10},
	{name: "Netflix", domain: "www.netflix.com/favicon.ico", rank: 11},
	{name: "ESPN", domain: "www.espn.com/favicon.ico", rank: 12},
	{name: "Salesforce", domain: "c1.sfdcstatic.com/etc/designs/sfdc-www/en_us/favicon.ico", rank: 13}, /* Salesforce */
	{name: "Live", domain: "outlook.live.com/mail/favicon.ico", rank: 14},
	{name: "Instructure", domain: "www.instructure.com/themes/instructure_blog/images/favicon.ico", rank: 15},
	{name: "Chase", domain: "www.chase.com/favicon.ico", rank: 16},
	{name: "Apple", domain: "www.apple.com/favicon.ico", rank: 17},
	{name: "Instagram", domain: "www.instagram.com/favicon.ico", rank: 18},
	/*{name: "MicrosoftOnline", domain: "www.microsoftonline.com/favicon.ico", rank: 19}, */ // Not responding
	{name: "CNN", domain: "www.cnn.com/favicon.ico", rank: 20},
	{name: "Dropbox", domain: "cfl.dropboxstatic.com/static/images/favicon-vflUeLeeY.ico", rank: 21},
	{name: "Tmall", domain: "www.tmall.com/favicon.ico", rank: 22},
	{name: "LinkedIn", domain: "www.linkedin.com/favicon.ico", rank: 23},
	{name: "Twitter", domain: "www.twitter.com/favicon.ico", rank: 24},
	{name: "Twitch", domain: "static.twitchcdn.net/assets/favicon-32-d6025c14e900565d6177.png", rank: 25},
	/* {name: "Salesforce", domain: "www.salesforce.com/favicon.ico", rank: 26}, */ // Duplicate
	{name: "Microsoft", domain: "www.microsoft.com/favicon.ico", rank: 27},
	{name: "Shopify", domain: "cdn.shopify.com/s/assets/favicon-4425e7970f1327bc362265f54e8c9c6a4e96385b3987760637977078e28ffe92.png", rank: 28},
	{name: "NYTimes", domain: "www.nytimes.com/favicon.ico", rank: 29},
	/* {name: "Craigslist", domain: "www.craigslist.com/favicon.ico", rank: 30}, */ // Doesn't like no cache parameter
	{name: "Walmart", domain: "www.walmart.com/favicon.ico", rank: 31},
	{name: "Pornhub", domain: "www.pornhub.com/favicon.ico", rank: 32},
	{name: "Adobe", domain: "www.adobe.com/favicon.ico", rank: 33},
	/* {name: "LiveJasmine", domain: "www.livejasmine.com/favicon.ico", rank: 34}, */ // Not working
	{name: "IMDb", domain: "www.imdb.com/favicon.ico", rank: 35},
	{name: "Stackoverflow", domain: "www.stackoverflow.com/favicon.ico", rank: 36},
	{name: "AWS", domain: "a0.awsstatic.com/libra-css/images/site/fav/favicon.ico", rank: 37},
	{name: "Sohu", domain: "statics.itc.cn/web/static/images/pic/sohu-logo/favicon.ico", rank: 38}, // Sohu.com
	{name: "QQ", domain: "www.qq.com/favicon.ico", rank: 39},
	{name: "Indeed", domain: "www.indeed.com/images/favicon.ico", rank: 40},
	{name: "Zillow", domain: "www.zillow.com/favicon.ico", rank: 41},
	{name: "Wellsfargo", domain: "www.wellsfargo.com/favicon.ico", rank: 42},
	{name: "Spotify", domain: "www.spotify.com/favicon.ico", rank: 43},
	{name: "MSN", domain: "www.msn.com/favicon.ico", rank: 44},
	{name: "Imgur", domain: "www.imgur.com/favicon.ico", rank: 45},
	/* {name: "Tmall", domain: "www.login.tmall.com/favicon.ico", rank: 46}, */ // Duplicate
	{name: "Yelp", domain: "www.yelp.com/favicon.ico", rank: 47},
	{name: "Taobao", domain: "www.taobao.com/favicon.ico", rank: 48},
	{name: "Etsy", domain: "www.etsy.com/favicon.ico", rank: 49},
	{name: "Hulu", domain: "www.hulu.com/favicon.ico", rank: 50}];

export default domains;
