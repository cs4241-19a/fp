import * as d3Base from 'd3';
import { group } from 'd3-array';
import * as topojson from 'topojson';
import domains from './domain_list'

const d3 = Object.assign(d3Base, { group });
let svg = null;
let projection = null;
let maxRtt = 100;
let minRtt = 0;

// data = [{favicon: '', avg: 0.0}]
let bar_initialized = false;
//Set size of svg element and chart
const width = 600,
      height = domains.length * 20,
      categoryIndent = 4*15 + 5,
      defaultBarWidth = 2000;
let y = null;
let x = null;
let bar_svg = null;
const displayBar = function (raw_data) {
    if (!bar_initialized) {
        bar_initialized = true;
        //Set up scales
        x = d3.scaleLinear()
            .domain([0,defaultBarWidth])
            .range([0,width]);
        y = d3.scaleBand()
            .range([0, height]).round([0.1, 0]);

        //Create SVG element
        d3.select("#bar_chart").selectAll("svg").remove()
        bar_svg = d3.select("#bar_chart").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g");



    }

    const data = [];

    for (let [key, value] of Object.entries(raw_data)) {
        data.push({key: key, value: value});
    }

    y.domain(data.sort(function(a,b){
        return b.value - a.value;
    })
        .map(function(d) { return d.key; }));

    const barMax = d3.max(data, function(e) {
        return e.value;
    });
    x.domain([0,barMax]);

    /////////
    //ENTER//
    /////////

    //Bind new data to chart rows

    //Create chart row and move to below the bottom of the chart
    const chartRow = bar_svg    .selectAll("g.chartRow")
        .data(data, function(d){ return d.key});
    const newRow = chartRow
        .enter()
        .append("g")
        .attr("class", "chartRow")
        .attr("transform", "translate(0," + height + ")");

    //Add rectangles
    newRow.insert("rect")
        .attr("class","bar")
        .attr("x", 0)
        .attr("opacity",0)
        .attr("height", y.bandwidth())
        .attr("width", function(d) { return x(d.value);});

    //Add value labels
    newRow.append("text")
        .attr("class","label")
        .attr("y", y.bandwidth()/2)
        .attr("x",0)
        .attr("opacity",0)
        .attr("dy",".35em")
        .attr("dx","0.5em")
        .text(function(d){return d.value;});

    //Add Headlines
    newRow.append("text")
        .attr("class","category")
        .attr("text-overflow","ellipsis")
        .attr("y", y.bandwidth()/2)
        .attr("x", categoryIndent)
        .attr("opacity",0)
        .attr("dy",".35em")
        .attr("dx","0.5em")
        .text(function(d){return d.key});


    //////////
    //UPDATE//
    //////////

    //Update bar widths
    chartRow.select(".bar").transition()
        .duration(300)
        .attr("width", function(d) { return x(d.value);})
        .attr("opacity",1);

    //Update data labels
    chartRow.select(".label").transition()
        .duration(300)
        .attr("opacity",1)
        .tween("text", function(d) {
            const i = d3.interpolate(+this.textContent.replace(/\,/g,''), +d.value);
            return function(t) {
                this.textContent = Math.round(i(t)) + ' ms';
            };
        });

    //Fade in categories
    chartRow.select(".category").transition()
        .duration(300)
        .attr("opacity",1);


    ////////
    //EXIT//
    ////////

    //Fade out and remove exit elements
    chartRow.exit().transition()
        .style("opacity","0")
        .attr("transform", "translate(0," + height + ")")
        .remove();


    ////////////////
    //REORDER ROWS//
    ////////////////

    const delay = function(d, i) { return 200 + i * 30; };

    chartRow.transition()
        .delay(delay)
        .duration(900)
        .attr("transform", function(d){ return "translate(0," + y(d.key) + ")"; });
};

const getRttColorValue = function(rtt){
    //TODO write this
    return "rgb(0,255,0)"

};

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

