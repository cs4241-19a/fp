export const fadeOut = d3.transition()
    .duration(500)
    .ease(d3.easeExpOut);

export const fadeIn = d3.transition()
    .duration(500)
    .ease(d3.easeExpIn);

export const pulse = d3.transition()
    .duration(100)
    .attr("transform", "scale(1.3)")
    .ease(d3.easeExpOut)
    .on("end", function endtrans() {
        d3.active(this).transition()
            .duration(100)
            .attr("transform", "scale(1.0)")
            .ease(d3.easeExpIn);
    });
