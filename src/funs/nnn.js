// import * as d3 from 'd3';
// function createNetworkGraph(data) {
//     const nodesData = data.map(([accuracy, runtime, iterations, size], index) => ({
//     id: index,
//     accuracy,
//     runtime,
//     iterations,
//     size
//     }));

//     const linksData = [];
//     nodesData.forEach((sourceNode, sourceIndex) => {
//     nodesData.forEach((targetNode, targetIndex) => {
//         if (sourceIndex !== targetIndex) {
//         const weight = sourceNode.iterations / targetNode.size;
//         linksData.push({ source: sourceIndex, target: targetIndex, weight });
//         }
//     });
//     });

//     return { nodesData, linksData };
// }

// const data = [
//     [0.95, 10, 100, 50],
//     [0.85, 15, 200, 60],
//     [0.92, 12, 150, 55],
//     [0.88, 18, 180, 70],
//     [0.98, 8, 80, 45]
// ];

// const { nodesData, linksData } = createNetworkGraph(data);

// d3.select(".PlotHolderNetworkPlotGra").selectAll("*").remove();
// d3.select(".PlotHolderNetworkPlotGra").html('<div className="tooltipNetwork"></div>');

// const nodes = data.nodes;
// const links = data.links;

// /* SVG frame creation */
// const w = 900,
//   h = 600;

// const vis = d3.select(".PlotHolderNetworkPlotGra").append("svg")
//   .attr("width", w)
//   .attr("height", h);

// /* Force parametrizing */
// const force = d3.forceSimulation(nodes)
//   .force("charge", d3.forceManyBody().strength(-70))
//   .force("link", d3.forceLink(links).id(d => d.id).distance(5).strength(0.1))
//   .force("center", d3.forceCenter(w / 2, h / 2))
//   .on("tick", tick);

// /* Link creation template */
// const link = vis.selectAll(".link")
//   .data(links)
//   .enter()
//   .append("line")
//   .attr("class", "link");

// /* Node creation template */
// const node = vis.selectAll("circle.node")
//   .data(nodes)
//   .enter().append("circle")
//   .attr("class", "node")
//   .attr("r", d => {
//     if (d.runtime > 7000) return 12;
//     else if (d.runtime > 5000) return 8;
//     else if (d.runtime > 3000) return 6;
//     else return 3;
//   })
//   .style("fill", d => {
//     if (d.accuracy > 0.85) return "green";
//     else if (d.accuracy > 0.55) return "orange";
//     else return "red";
//   })
//   .call(d3.drag()
//     .on("start", dragStarted)
//     .on("drag", dragged)
//     .on("end", dragEnded))
//   .on("dblclick", dblclicked)
//   .on("mouseover", mouseover)
//   .on("mouseout", mouseout)
//   .on("click", clicked);

// function tick() {
//   link.attr("x1", d => d.source.x)
//     .attr("y1", d => d.source.y)
//     .attr("x2", d => d.target.x)
//     .attr("y2", d => d.target.y);

//   node.attr("cx", d => d.x = pushBackFromEdges(Math.max(d.r, Math.min(w - d.r, d.x)), w, d.r))
//     .attr("cy", d => d.y = pushBackFromEdges(Math.max(d.r, Math.min(h - d.r, d.y)), h, d.r));
// }

// function dragStarted(event, d) {
//   if (!event.active) force.alphaTarget(0.3).restart();
//   d.fx = d.x;
//   d.fy = d.y;
// }

// function dragged(event, d) {
//   d.fx = event.x;
//   d.fy = event.y;
// }

// function dragEnded(event, d) {
//   if (!event.active) force.alphaTarget(0);
//   d.fx = null;
//   d.fy = null;
// }

// function dblclicked(event, d) {
//   d.fixed = !d.fixed;
//   event.stopPropagation();
// }

// function mouseover(event, d) {
//   d3.select(this).style("stroke", "black");
//   const tooltip = d3.select(".tooltipNetwork");
//   tooltip.style("visibility", "visible")
//     .style("opacity", 0.9)
//     .html('hello')
//     .style("left", (d.x + 15) + "px")
//     .style("top", (d.y - 30) + "px");
// }

// function mouseout(event) {
//   d3.select(this).style("stroke", null);
//   const tooltip = d3.select(".tooltipNetwork");
//   tooltip.transition()
//     .duration(500)
//     .style("opacity", 0)
//     .on("end", function() {
//       tooltip.style("visibility", "hidden");
//     });
// }

// function clicked(event) {
//   const d3this = d3.select(this);
//   if (d3this.style("fill") === "orange") {
//     d3this.style("fill", "green");
//   } else if (d3this.style("fill") === "green") {
//     d3this.style("fill", () => {
//       if ((d.in + d.out) < 500) {
//         return "#61DAFB";
//       } else if ((d.in + d.out) > 500 && (d.in + d.out) < 1000) {
//         return "orange";
//       } else {
//         return "#FF3636";
//       }
//     });
//   } else {
//     d3this.style("fill", "#0ca98f");
//   }
//   event.stopPropagation();
// }




// d3.selectAll(".node").on("dblclick", function(d, i){
    //     d.fixed = !d.fixed;
    //     d3.event.stopPropagation();
    // });
    // var div = d3.select(".tooltipNetwork");
    // d3.selectAll(".node").on("mouseover", function(d, i){
    //     div.style("visibility", "visible")
    //     .transition()
    //     .duration(200)
    //     .style("opacity", .9);
    //     div.html('hellow');
    //     // var html;
    //     // if(d.in === d.out)
    //     //     html = "User "+d.userID+"<br/>"+d.in+" conns"
    //     // else
    //     //     html = "User "+d.userID+"<br/>"+d.in+" in, "+d.out+" out"
    //     //     div.html(html)
    //     //     .style("left", (d.x + 15) + "px")
    //     //     .style("top", (d.y - 30) + "px");
    // }).on("mouseout", function(d, i){
    //     div.transition()
    //     .duration(500)
    //     .style("opacity", 0)
    //     .each("end", function(){
    //     div.style("visibility", "hidden")
    //     });
    // });