import * as d3Base from 'd3';
import {group} from 'd3-array';
import * as topojson from 'topojson';
import domains from './domain_list'
import socket from './index';
import constant from "d3-array/src/constant";
import {max} from "d3";

const d3 = Object.assign(d3Base, {group});
let svg = null;
let projection = null;
let data = [];
let currentFavicon = "Google";
let mapHeight;

// data = [{favicon: '', avg: 0.0}]
let bar_initialized = false;
//Set size of svg element and chart
const width = 500,
	height = domains.length * 20,
	categoryIndent = 4 * 15 + 5,
	defaultBarWidth = 2000;
let y = null;
let x = null;
let bar_svg = null;

const initializeBar = function () {
	bar_initialized = true;
	//Set up scales
	x = d3.scaleLinear()
		.domain([0, defaultBarWidth])
		.range([0, width]);
	y = d3.scaleBand()
		.range([0, height]).round([0.1, 0]);

	//Create SVG element
	d3.select("#bar_chart").selectAll("svg").remove();
	bar_svg = d3.select("#bar_chart").append("svg")
		.attr("width", width)
		.attr("height", height + chartHeader)
		.append("g");


	bar_svg.append('text')
		.attr("class", "chart-header")
		.attr("dominant-baseline", "hanging")
		.attr("text-anchor", "middle")
		.attr("font-size", 18)
		.attr("font-weight", "bold")
		.attr("fill", "#0367A6")
		.attr("y", 5)
		.attr("x", width / 2)
		.text("Rolling Average of Locally Collected Data (ms)");

	bar_svg.append('text')
		.attr("class", "chart-header")
		.attr("dominant-baseline", "hanging")
		.attr("text-anchor", "middle")
		.attr("font-size", 16)
		.attr("fill", "#0367A6")
		.attr("y", 30)
		.attr("x", width / 2)
		.text("(Page Alexa Rank)");
};

const displayBar = function (raw_data) {
	const data = [];

	for (let [key, value] of Object.entries(raw_data)) {
		data.push({key: key, value: value.avg, max: value.max});
	}

	y.domain(data.sort(function (a, b) {
		return b.value - a.value;
	}).map(function (d) {
		return d.key;
	}));

	const barMax = d3.max(data, function (e) {
		return e.value; //max
	});
	x.domain([0, barMax]);

	/////////
	//ENTER//
	/////////

	//Bind new data to chart rows

	//Create chart row and move to below the bottom of the chart
	const chartRow = bar_svg.selectAll("g.chartRow")
		.data(data, function (d) {
			return d.key
		});
	const newRow = chartRow
		.enter()
		.append("g")
		.attr("class", "chartRow")
		.attr("transform", "translate(0," + height + chartHeader + ")");

	//Add rectangles
	newRow.insert("rect")
		.attr("class", "bar")
		.attr("x", 0)
		.attr("opacity", 0)
		.attr("height", y.bandwidth())
		.attr("width", function (d) {
			return x(d.value);
		});

	//Add value labels
	newRow.append("text")
		.attr("class", "label")
		.attr("y", y.bandwidth() / 2)
		.attr("x", 0)
		.attr("opacity", 1)
		.attr("dy", ".35em")
		.attr("dx", "0.5em")
		.text(d => d.value);

	//Add Headlines
	newRow.append("text")
		.attr("class", "category")
		.attr("text-overflow", "ellipsis")
		.attr("y", y.bandwidth() / 2)
		.attr("x", categoryIndent)
		.attr("opacity", 0)
		.attr("dy", ".35em")
		.attr("dx", "0.5em")
		.on("click", d => {
			currentFavicon = d.key.split(" ")[0];
			document.querySelector("#selected_favicon_display").textContent = d.key.split(" ")[0];
			updateMap();
		})
		.text(function (d) {
			return d.key
		});

	chartRow.select(".bar").transition()
		.duration(300)
		.attr("width", function (d) {
			return x(d.value);
		})
		.attr("opacity", 1);

	//Update data labels
	chartRow.select(".label").transition()
		.duration(300)
		.attr("opacity", 1)
		.tween("text", function (d) {
			+this.textContent.replace(/,/g, '');
			return () => {
				this.textContent = isNaN(Math.round(d.value)) ? "-" : Math.round(d.value);
			};
		});

	//Fade in categories
	chartRow.select(".category").transition()
		.duration(300)
		.attr("opacity", 1);


	////////
	//EXIT//
	////////

	//Fade out and remove exit elements
	chartRow.exit().transition()
		.style("opacity", "0")
		.attr("transform", "translate(0," + height + ")")
		.remove();

	chartRow.transition()
		.duration(900)
		.attr("transform", function (d) {
			return "translate(0," + (y(d.key) + chartHeader) + ")";
		});
};

const chartHeader = 60;
const setupMap = function (width, height) {
	const scaleLength = 400
	mapHeight = height;
	projection = d3.geoAlbersUsa()
		.translate([width / 2, height / 2 + chartHeader])
		.scale([1000]);

	let path = d3.geoPath()
		.projection(projection);

	svg = d3.select("#map_div")
		.append("svg")
		.attr("width", width)
		.attr("height", height + chartHeader);

	let constGradient = d3.scaleSequential(d3.interpolateOrRd)
	//.range(["#fff", "#BF303C"])
		.domain([0, scaleLength]);

	svg.append('text')
		.attr("class", "chart-header")
		.attr("dominant-baseline", "hanging")
		.attr("text-anchor", "middle")
		.attr("font-size", 18)
		.attr("font-weight", "bold")
		.attr("fill", "#0367A6")
		.attr("y", 5)
		.attr("x", width / 2)
		.text("Country-wide Data Aggregated by City and Website");

	svg.append('text')
		.attr("class", "chart-header")
		.attr("dominant-baseline", "hanging")
		.attr("text-anchor", "middle")
		.attr("font-size", 16)
		.attr("fill", "#0367A6")
		.attr("y", 30)
		.attr("x", width / 2)
		.text("Use the bar chart to select a different site");

	svg.append('text')
		.attr("id", "selected_favicon_display")
		.attr("dominant-baseline", "hanging")
		.attr("text-anchor", "middle")
		.attr("y", 25 + chartHeader)
		.attr("x", width / 2)
		.text(currentFavicon);



	d3.json("us-named.topojson").then(us => {
		const counties = topojson.feature(us, us.objects.counties);
		svg.selectAll("path")
			.data(counties.features)
			.enter()
			.append("path")
			.attr("d", path)
			.style("fill", "#0367A6");

		svg.append("path")
			.datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
			.attr("fill", "none")
			.attr("stroke", "white")
			.attr("stroke-linejoin", "round")
			.attr("d", path);

		socket.emit('getData');
		socket.emit('getData');

	});

	let bars = svg.selectAll(".bars")
		.data(d3.range(0, scaleLength), d => d);
	bars.exit().remove();
	bars.enter()
		.append("rect")
		.attr("class", "bars")
		.attr("x", function (d, i) {
			return i + 40;
		})
		.attr("y", mapHeight - 20 + chartHeader)
		.attr("height", 20)
		.attr("width", 1)
		.style("fill", function (d, i) {
			return constGradient(d);
		})

	svg.append('text')
		.attr("id", "maxScaleLabel")
		.attr("class", "scaleLabel")
		.attr("y", mapHeight + chartHeader)
		.attr("x", scaleLength + 50)
		.text("");

	svg.append('text')
		.attr("id", "minScaleLabel")
		.attr("class", "scaleLabel")
		.attr("y", mapHeight + chartHeader)
		.attr("x", 0)
		.text("");



};

// data = [{favicon: "facebook.com", avg_rtt: 1.1, city: "Boston", latitude: "0.0", longitude: "0.0"}]
const updateMap = function () {

	let div = d3.select("body")
		.append("div")
		.attr('class', "tooltip")
		.style("opacity", 0);

	const filtered = data.filter(d => d.favicon === currentFavicon);
	const maxValue = d3.max(filtered, d => d.avg_rtt);
	let scaledGradient = d3.scaleSequential(d3.interpolateOrRd)
	//.range(["#fff", "#BF303C"])
		.domain([0, maxValue]);


	// let constGradient = d3.scaleSequential(d3.interpolatitudeeOrRd)
	// //.range(["#fff", "#BF303C"])
	// 	.domain([0, scaleLength]);


	const mapPoint = svg.selectAll("circle").data(filtered);
	mapPoint.exit().remove();
	mapPoint.enter()
		.append("circle")
		.on("mouseover", d => {
			div.transition()
				.duration(200)
				.style("opacity", .9);
			div.text(d.city + "\n" + Math.round(d.avg_rtt) + " ms")
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px")
				.style("font-size", "15px")
		})
		.on("mouseout", d => {
			div.transition()
				.duration(200)
				.style("opacity", 0)
		});

	mapPoint.transition().duration(0)
		.attr("cx", function (d) {
			return projection([d.longitude, d.latitude])[0]
		})
		.attr("cy", function (d) {
			return projection([d.longitude, d.latitude])[1]
		})
		.attr("r", 10)
		.style("fill", function (d) {
			return scaledGradient(d.avg_rtt)
		});

	if(maxValue != undefined ) {
		document.getElementById("minScaleLabel").innerText = "0ms"
		document.getElementById("maxScaleLabel").innerText = Math.round(maxValue)+ "ms"
	}


};

const updateMapData = function (newData) {
	data = newData;
	updateMap();
};

export default {displayBar, updateMap, initializeBar, updateMapData, setupMap}
