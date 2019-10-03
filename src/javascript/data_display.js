import * as d3Base from 'd3';
import { group } from 'd3-array';
import * as topojson from 'topojson';

const d3 = Object.assign(d3Base, { group });

// data = [{favicon: '', avg: 0.0}]
const displayBar = function (data) {

};

const setupMap = function(width, height){
    let projection = d3.geoAlbersUsa()
        .translate([width/2, height/2])
        .scale([1000])

    let path = d3.geoPath()
        .projection(projection)

    let svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    let div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)


    d3.json("http://enjalot.github.io/wwsd/data/USA/us-named.topojson").then(us => {
        const geo = topojson.feature(us, us.objects.counties);

        svg.selectAll("path")
            .data(geo.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#000")
            .style("stroke-width", "1")
            .style("fill", "#FF0")

    })




};

// data = [{favicon: "facebook.com", avg_rtt: 1.1, city: "Boston", lat: "0.0", lng: "0.0"}]
const displayMap = function(data) {
	console.log("display_map", data);
};

export default {displayBar, displayMap}

setupMap(1000, 1000)
