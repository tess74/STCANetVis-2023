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
    const sizesLink = {};
    const iterationLink = {};
    const iterationlinkTag = {};
    nodesData.forEach((sourceNode, sourceIndex) => {
      nodesData.forEach((targetNode, targetIndex) => {
        if (sourceIndex !== targetIndex) {
          const weight = sourceNode.iterations / targetNode.size;
          if (typeof (sizesLink[targetNode.size]) !== 'undefined') {
                linksData.push({ source: sizesLink[targetNode.size], target: targetIndex, weight, typc: 'size' });
          } else if (sourceNode.size === targetNode.size) {
                sizesLink[sourceNode.size] = sourceNode.id;
                linksData.push({ source: sizesLink[targetNode.size], target: targetIndex, weight, typc: 'size' });     
          }

          if (typeof (iterationLink[targetNode.iterations]) === 'undefined' && sourceNode.iterations === targetNode.iterations && typeof (iterationLink[sourceNode.size]) === 'undefined' && typeof (iterationLink[targetNode.size]) === 'undefined' && typeof (iterationlinkTag[targetNode.size]) === 'undefined' ) {
                iterationLink[sourceNode.iterations] = sourceNode.id;
                iterationLink[sourceNode.size] = sourceNode.size;
                iterationlinkTag[targetNode.size] = targetNode.size;
                linksData.push({ source: sourceNode.id, target: targetIndex, weight, typc: 'iterations' });
          } 
        
        }
      });
    });

    return {
        nodes: nodesData, 
        links: linksData 
    };
  }
export const networkGrahGen = (siteData) => {
    const data = createNetworkGraph(siteData);
    const r = 5;
    const svgWidth = d3.select(".PlotHolderNetworkPlotGra").node().clientWidth;
    d3.select(".PlotHolderNetworkPlotGra").selectAll("*").remove();
    d3.select(".PlotHolderNetworkPlotGra").html('<div className="tooltipNetwork"></div>');
    const nodes = data.nodes;
    const links = data.links;
    /* SVG frame creation */
    const w = svgWidth,
    h = svgWidth*0.53;

    var vis = d3.select(".PlotHolderNetworkPlotGra").append("svg:svg")
    .attr("width", w)
    .attr("height", h);


    /* Force paramettring */
    var force = d3.layout.force()
    .charge(-60)
    .linkDistance(40)
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
        if (typeof (d.typc) !== 'undefined' && d.typc === 'size') {
          return "grey";
        } else {
          return "#61DAFB";
        }
    })
    .attr("x2", d=> {
        const deltaX = d.target.x - d.source.x;
        if (typeof (d.typc) !== 'undefined' && d.typc === 'size') {
            return deltaX;
        } else {
            const newX2 = d.source.x + (deltaX * 0.2); 
            return newX2;
        }
    })
    .attr("y2", d=> {
        const deltaY = d.target.y - d.source.y;
        const newY2 = d.source.y + (deltaY * 0.2); // increase length for links with more
        if (typeof (d.typc) !== 'undefined' && d.typc === 'size') {
            return newY2;
        } else {
            return deltaY;
            // return deltaY;
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
        if (d.runtime > 7000) return 18;
        else if (d.runtime > 5000) return 15;
        else if (d.runtime > 3000) return 12;
        else return 7;
      })
    .style("fill", d => {
        if (d.accuracy > 0.75) return "#61DAFB";
        else if (d.accuracy > 0.55) return "orange";
        else return "#FF3636";
    })
    .call(force.drag);


    /* Start transition */
    vis.style("opacity", 1e-6)
    .transition()
    .duration(1000)
    .style("opacity", 1);

    //Forces in action
    force.on("tick", function(e) {
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


  
