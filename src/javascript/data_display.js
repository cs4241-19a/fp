import * as d3Base from 'd3';
import { group } from 'd3-array';
import * as topojson from 'topojson';

const d3 = Object.assign(d3Base, { group });
let svg = null
let projection = null
let maxRtt = 100
let minRtt = 0

// data = [{favicon: '', avg: 0.0}]
const displayBar = function (data) {

};

const getRttColorValue = function(rtt){
    //TODO write this
    return "rgb(0,255,0)"

}

const setupMap = function(width, height){
    projection = d3.geoAlbersUsa()
        .translate([width/2, height/2])
        .scale([1000]);

    let path = d3.geoPath()
        .projection(projection);

    svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    let div = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    d3.json("http://enjalot.github.io/wwsd/data/USA/us-named.topojson").then(us => {
        const geo = topojson.feature(us, us.objects.counties);

        svg.selectAll("path")
            .data(geo.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#F2E085")
            .style("stroke-width", "1")
            .style("fill", "#0367A6")

        displayMap([{favicon: "facebook.com", avg_rtt: 20, city: "Boston", lat: 42.3601, lng: -71.0589}])

    })




};

// data = [{favicon: "facebook.com", avg_rtt: 1.1, city: "Boston", lat: "0.0", lng: "0.0"}]
const displayMap = function(data) {
    let gradient = d3.scaleLinear()
        .range(["#04BF7B", "#BF303C"])
        .domain([0,100])
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dataPoint")
            .attr("cx", function (d) {
                return projection([d.lng, d.lat])[0]
            })
            .attr("cy", function (d) {
                return projection([d.lng, d.lat])[1]
            })
            .attr("r", 10)
            .style("fill", function (d) {
                let color = gradient(d.avg_rtt)
                return color
            })
};

export default {displayBar, displayMap}

setupMap(1000, 1000);

