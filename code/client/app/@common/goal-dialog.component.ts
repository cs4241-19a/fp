import {Component, Input, Injectable, OnInit} from '@angular/core';

declare let d3: any;

@Component({
    selector: 'app-goal-dialog',
    template: `
        <nb-card>
            <nb-card-header>Congratulations!</nb-card-header>
            <nb-card-body style="background-image: url('http://www.thomastwp.org/wp-content/uploads/firework-clipart-1.jpg')">
                <div id="d3">
                </div>
            </nb-card-body>
        </nb-card>
    `,
})
export class GoalDialogComponent implements OnInit{

    playAudio(){
        let audio = new Audio();
        audio.src = "../../../assets/337000__tim-kahn__cheer-01.wav";
        audio.load();
        audio.play();
    }

    ngOnInit(): void {
        this.playAudio();

        var width = 960,
            height = 500,
            size = 150,
            color = d3.scale.ordinal().range(['#f7a91e', '#d9f71e']),
            rand = d3.random.normal(width / 2, 100),
            randomX = function(b) {
                return d3.random.normal(b, 80)()
            },
            randomY = d3.random.normal(height / 2, 80);

        var svg = d3.select("#d3").append("svg")
            .attr("width", width)
            .attr("height", height);

        var img_id = "img_c";
        var img_url = "url(#img_c)";

        // create an svg element
        var imgPattern = svg.append("defs").append("pattern")
            .attr("id", img_id)
            .attr("width", 60)
            .attr("height", 60)
            .attr("patternUnits", "objectBoundingBox")
            .append("image")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 60)
            .attr("height", 60)
            .attr("xlink:href", "https://www.wpi.edu/sites/default/files/faculty-image/cdroberts.jpg");


        var data = d3.range(100).map(function() {
            return {x: randomX(width / 2), y: randomY()};
        });

        var circles = svg.selectAll("circle").data(data).enter()
            .append("circle");

        function fireworks() {
            var base = rand();
            data = d3.range(100).map(function() {
                return {x: randomX(base), y: randomY()};
            });
            circles.transition().ease('circle').duration(1500).attr({cy: height / 2})

            circles.data(data)
                .attr("opacity", 1)
                .attr({r: 3, cx: base, cy: height, fill: "gray"})
                .transition()
                .ease('circle')
                .duration(1500)
                .attr({cy: height / 2})
                .transition().delay(1400)
                .ease("exp")
                .duration(300)
                .attr("cx", function(d) {
                    return d.x;
                })
                .attr("cy", function(d) {
                    return d.y;
                })
                .attr("r", 30)
                .attr("opacity", 1)
                .attr("fill", img_url)
                .transition()
                .ease("circle")
                .duration(2000)
                .attr("opacity", 0)
                .attr("cx", function(d) {
                    if (d.x > base) {
                        return d.x + (d.x - base)
                    }
                    return d.x - (base - d.x)
                })
                .attr("cy", function(d) {
                    if (d.y > height / 2) {
                        return d.y + (d.y - height / 2)
                    }
                    return d.y - (height / 2 - d.y)
                })
                .attr("r", 0);
        }
        fireworks();
        setInterval(fireworks, 4000);
    }
}
