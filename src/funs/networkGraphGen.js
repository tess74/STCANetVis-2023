import * as d3 from 'd3';

const pushBackFromEdges = (pos, lim, r) =>{
    if ((pos + (r*2)) > lim ) {
        return lim - r*2.5;
    } else if ((pos - r) < 5) {
        return r*2.5;
    } else {
        return pos;
    }
}

function createNetworkGraph(data) {
    const nodesData = data.map(([accuracy, runtime, iterations, size], index) => ({
      id: index,
      accuracy,
      runtime,
      iterations,
      size
    }));

    const linksData = [];
    nodesData.forEach((sourceNode, sourceIndex) => {
      nodesData.forEach((targetNode, targetIndex) => {
        if (sourceIndex !== targetIndex) {
          const weight = sourceNode.iterations / targetNode.size;
          linksData.push({ source: sourceIndex, target: targetIndex, weight });
        }
      });
    });

    return {
        nodes: nodesData, 
        links: linksData 
    };
  }
export const networkGrahGen = (siteData) => {
    console.log(siteData);
    const data = createNetworkGraph(siteData);
    const r = 5;
    d3.select(".PlotHolderNetworkPlotGra").selectAll("*").remove();
    d3.select(".PlotHolderNetworkPlotGra").html('<div className="tooltipNetwork"></div>');
    const nodes = data.nodes;
    const links = data.links;
    /* SVG frame creation */
    var w = 900,
    h = 600;
    // fbBlue = d3.rgb("#3b5998");
    // fill = [fbBlue.brighter(2),fbBlue.brighter(),fbBlue,fbBlue.darker()];

    var vis = d3.select(".PlotHolderNetworkPlotGra").append("svg:svg")
    .attr("width", w)
    .attr("height", h);


    /* Force paramettring */
    var force = d3.layout.force()
    .charge(-300)
    .linkDistance(300)
    .linkStrength(0.1)
    .size([w, h])
    .nodes(nodes)
    .links(links)
    .friction(0.7)
    .start();
    /*Link creation template */
    var link = vis.selectAll(".link")
    .data(links)
    .enter()
    .append("line")
    .style("stroke", d => {
        // return 'blue'
        const sourceIterations = nodes[d.source.id].iterations;
        const targetSize = nodes[d.target.id].size;
        
        if (sourceIterations > targetSize) {
          return "#61DAFB"; // Color for links due to iterations
        } else {
          return "#3D2B1F"; // Color for links due to size
        }
      })
      .attr("stroke-width", d => d.weight)
      .attr("stroke-opacity", 0.5)
    .attr("class", "link");

    /*Node creation template */
    var node = vis.selectAll("circle.node")
    .data(nodes)
    .enter().append("svg:circle")
    .attr("class", "node")
    .attr("cx", function(d) { return d.x; }) //x
    .attr("cy", function(d) { return d.y; }) //y
    .attr("r", d => {
        if (d.runtime > 7000) return 16;
        else if (d.runtime > 5000) return 14;
        else if (d.runtime > 3000) return 10;
        else return 7;
      })
    .style("fill", d => {
        if (d.accuracy > 0.75) return "#61DAFB";
        else if (d.accuracy > 0.55) return "orange";
        else return "#FF3636";
    })
    .call(force.drag);

    /*node.append("title")
    .text(function(d) { return "User "+d.userID; });*/

    /* Start transition */
    vis.style("opacity", 1e-6)
    .transition()
    .duration(1000)
    .style("opacity", 1);

    //Forces in action
    force.on("tick", function(e) {
    //Clustering: Push odd/even nodes up/down, something alike for left/right
        var k = 6 * e.alpha;
        nodes.forEach(function(o, i) {
            o.y += i & 1 ? k : -k;
            o.x += i & 2 ? k : -k;
        }); //clustering end
        // Get items coords (then whole force's maths managed by D3)
        link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });


        node.attr("cx", function(d) { 
            return d.x = pushBackFromEdges(Math.max(r, Math.min(w - r, d.x)), w, r); })
        .attr("cy", function(d) { return d.y = pushBackFromEdges(Math.max(5, Math.min(h - r, d.y)), h, r); });
    });

    /* Click-plosion and tooltip*/
    d3.select("PlotHolderNetworkPlotGra").on("dblclick", function() {
        nodes.forEach(function(o, i) {
            o.x += (Math.random() - .5) * 200;
            o.y += (Math.random() - .5) * 200;
        });
        force.resume();
    });
    
}


  
