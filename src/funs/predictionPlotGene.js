import * as d3 from 'd3-v6';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';


// // Sample data for demonstration
// const data = d3.range(500).map(() => [Math.random() * 400, Math.random() * 300]);


// Function to create high-density contour with axes using D3.js
export function createDensityContourWithAxes(data, len, dispval, orgState) {
    const margin = { top: 20, right: 70, bottom: 30, left: 40 };
    d3.select(".ScattedPlotSection").selectAll("*").remove();
    let svgWidth = d3.select(".ScattedPlotSection").node().clientWidth;
    if (svgWidth > 800) {
      svgWidth = 1000;
    }
    const svgHeight = svgWidth*0.43;
    const width = svgWidth - (margin.left + margin.right + 30);
    const height = svgHeight - (margin.top + margin.bottom + 10);
    const svg = d3.select(".ScattedPlotSection")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", `translate(${margin.left + 20},${margin.top})`);
      // Add lines around the blue background rectangle
      svg.append("line")
      .attr("x1", -12)
      .attr("y1", 0)
      .attr("x2", width +12)
      .attr("y2", 0)
      .attr("stroke", "black");

    svg.append("line")
      .attr("x1", width+12)
      .attr("y1", 0)
      .attr("x2", width+12)
      .attr("y2", height)
      .attr("stroke", "black");
    
    svg.append("line")
      .attr("x1", width + 12)
      .attr("y1", height)
      .attr("x2", -12)
      .attr("y2", height)
      .attr("stroke", "black");

    svg.append("line")
      .attr("x1", -12)
      .attr("y1", 0)
      .attr("x2", -12)
      .attr("y2", height)
      .attr("stroke", "black");

      // blue rect
      svg.append("rect")
      .attr("x", -7)
      .attr("y", 5)
      .attr("width", width+15)
      .attr("height", height - 10)
      .attr("fill", "#010080");

      // Define the clip path
    svg.append("defs").append("clipPath")
    .attr("id", "plot-area-clip")
    .append("rect");

    // Apply the clip path to the contour paths and scatter plot
    const plotArea = svg.append("g")
      .attr("clip-path", "url(#plot-area-clip)");
    // Create x and y scales
    const xScale = d3.scaleLinear()
      .domain([-(len*0.07), len + len*0.07 + len*0.03])
      .range([0, width]);
  
    const yScale = d3.scaleLinear()
      .domain([-3, d3.max(data, d => d[1] + d[1]*0.15)])
      .range([height, 0]);
    if (orgState && (dispval === 100 || dispval === 50)) {
      const density = d3.contourDensity()
        .x(d => xScale(d[0]))
        .y(d => yScale(d[1]))
        .size([width, height])
        .bandwidth(parseInt(width*0.03) > 20 ? 20: parseInt(width*0.03))
        .thresholds(parseInt(width*0.013) > 14 ? 14: parseInt(width*0.013));
    
      const contours = density(data);
      const colorScale = d3
        .scaleLinear()
        .domain([0, d3.max(contours, d => d.value)])
        .range(['#ACBF7A','#ff3636']);
      svg.selectAll("path")
        .data(contours)
        .enter().append("path")
        .attr("d", d3.geoPath())
        .attr("fill", d => colorScale(d.value));

        // Add color key (legend)
      const legendWidth = 10;
      const legendHeight = height;
      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width + 15}, 0)`);

      const legendGradient = legend.append("defs")
        .append("linearGradient")
        .attr("id", "legend-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", 0)
        .attr("x2", 0).attr("y2", legendHeight);

      legendGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#ff0000ee");


      legendGradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#ACBF7A");

      legendGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#010080");

      legend.append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#legend-gradient)");

        const legendScale = d3.scaleLinear()
          .domain([0, d3.max(contours, d => d.value)])
          .range([legendHeight, 0]);

        const legendAxis = d3.axisRight(legendScale).ticks(7);

        legend.append("g")
          .attr("class", "legend-axis")
          .attr("transform", `translate(${legendWidth}, 0)`)
          .call(legendAxis)
          .selectAll("text") // Select all text elements within the axis
          .style("font-size", "12px");

        plotArea.selectAll(".contour")
        .data(contours)
        .enter().append("path")
        .attr("class", "contour-glow")
        .attr("d", d3.geoPath())
        .attr("stroke", d => colorScale(d.value))
        .attr("stroke-opacity", 0.7);
    }
      
    
    if (orgState && (dispval === 0 || dispval === 50)) {
        // Add scatter plots
        svg.selectAll("circle")
          .data(data)
          .enter().append("circle")
          .attr("cx", d => xScale(d[0]))
          .attr("cy", d => yScale(d[1]))
          .attr("r", 3) // Radius of the scatter points
          .attr("fill", "lightgreen");
    }


    // Create x and y axes outside the contour area
    const xAxis = d3.axisBottom(xScale);
    // const yAxis = d3.axisLeft(yScale);
  
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(-7, ${height})`)
      .call(xAxis)
      .selectAll("text")
    .attr("font-size", "14px");
  
   


    // Add x-axis label
    svg.append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom + 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "13px")
      .attr("font-weight", "bold") // Make it bold
      .attr("fill", "black")
      .text("Ensemble Dataset Size");
    return svg;
}
 // svg.append("g")
    //   .attr("class", "y-axis")
    //   .attr("transform", `translate(${-7}, 0)`)
    //   .call(yAxis)
    //   .selectAll("text")
    // .attr("font-size", "0px");


// // Add y-axis label
    // svg.append("text")
    //   .attr("class", "y-axis-label")
    //   .attr("transform", "rotate(-90)")
    //   .attr("x", -height / 2)
    //   .attr("y", -40)
    //   .attr("font-size", "13px")
    //   .attr("text-anchor", "middle")
    //   .attr("font-weight", "bold") // Make it bold
    //   .attr("fill", "black")
    //   .text("Model Prediction Values");
    

const dataLinkNodeProduce = (datArr = []) =>{
  const fnData = {
    nodes: [], links: []
  };
  datArr.map((levs, inx) => {
    if (fnData.nodes.length > 0 && datArr.length >= inx+1) {
      const c = datArr[inx - 1].length;
      const t = fnData.nodes.length;
      const ltn = t - c;
      for (let index = ltn; index < t; index++) {
        for (let indx = t; indx < levs.length+t; indx++) {
          fnData.links.push({ source: index, target: indx, value: 30 });
          fnData.links.push({ source: index, target: indx, value: 30 });
        }
      }
    }
    levs.map((node) => {
      fnData.nodes.push(node);
      return 0;
    });
    return 0;
  });
  return fnData;
}




const plotSankey = (nodesInfo) => {
  // Define your data with 4 tiers (levels)
 
  const data =  dataLinkNodeProduce(nodesInfo);

  var linkColors = ["#FF5733", "#33FF57", "#3366FF", "#FF33E9", "#006600", "#33FFFF"]

  // Set up the SVG container dimensions
  var width = d3.select(".sankey-diagram").node().clientWidth;
  console.log(width);
  var nodeWidth = 36; // Fixed node width
  var nodeHeight = 80;
  var spacingX = 30; // Horizontal spacing between nodes (adjust as needed)

  // Create an SVG element
  d3.select(".sankey-diagram").selectAll("*").remove();
  const custoHe = () => {if (nodesInfo[2].length > nodesInfo[1].length) {
    return nodesInfo[2].length*nodeHeight;
  } else {
    nodeHeight = 110;
    return nodesInfo[1].length*nodeHeight;
  }}
  var svg = d3.select(".sankey-diagram")
    .append("svg")
    .attr("width", width)
    .attr("height", custoHe()); // Adjust for 4 tiers

  
  // Create a Sankey generator
  var sankeyx = sankey()
    .nodeWidth(nodeWidth)
    .nodePadding(spacingX) // Adjust horizontal spacing
    .extent([[5, 5], [width, custoHe()]]);
  // Generate the Sankey diagram layout
  var { nodes, links } = sankeyx(data);

  // Draw nodes and links
  

  const node = svg.selectAll('.node')
    .data(nodes)
    .enter()
    .append('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.x0},${d.y0})`);

  // Add the text element within the node 'g' element
  node.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', (d) => { 
      return d.y1 - d.y0;
    })
    .attr('width', nodeWidth)
    .style('fill', (d) => { if (d.name === 's12') {
      return 'transparent';
    } 
    return 'lightgrey';
  }) // Assign colors based on index
    .style('stroke', (d) => { if (d.name === 's12') {
      return 'transparent';
    } 
    return 'black';
  }) // Border color similar to links
    .style('stroke-width', 2) // Border width

  // Add rounded corners to nodes
  node.selectAll("rect")
    .attr("rx", 10) // Adjust the radius of the rounded corners
    .attr("ry", 10); 
  node.append('text')
    .attr('x', d => d.x0 < width / 2 ? -((d.y1 - d.y0)/1) +5 : -((d.y1 - d.y0)/2) + 15)
    .attr('y', d => d.x0 < width / 2 ? ((d.x1 - d.x0) / 2) : 18)
    .attr('dy', '0.30em')
    .attr('text-anchor', d => d.x0 < width / 2 ? 'start' : 'end')
    .style('fill', 'black')
    .attr("font-size", "11px")
    .attr('transform', d => d.x0 < width / 2 ? 'rotate(-90)' : 'rotate(-90)')
    .text(d => d.name);
  
  // Draw nodes and links
  var link = svg.append("g")
    .selectAll(".link")
    .data(links)
    .enter().append("path")
    .attr("class", "link dotted-link")
    .attr("d", sankeyLinkHorizontal())
    .style("fill", "none")
    .style("stroke", (d, i) => linkColors[i % linkColors.length]) // Assign colors based on index
    .style("stroke-opacity", 0.7) // Adjust opacity as needed
    .style("stroke-width", function (d) { return 2; });
  

}

  // var linkGroup = svg.append("g")
  //   .selectAll(".link-group")
  //   .data(links)
  //   .enter().append("g")
  //   .attr("class", "link-group");

  // var link = linkGroup.append("path")
  //   .attr("class", "link dotted-link")
  //   .attr("d",  sankeyLinkHorizontal())
  //   .style("fill", "none")
  //   .style("stroke", (d, i) => linkColors[i % linkColors.length]) // Assign colors based on index
  //   .style("stroke-opacity", 0.7) // Adjust opacity as needed
  //   .style("stroke-width", function (d) { return 2; });
  // // Add animation to links to show data flow
  // linkGroup.transition()
  //   .delay((d, i) => i * 200) // Delay each link animation
  //   .duration(800) // Animation duration
  //   .attr("transform", (d) => `translate(${d.x},${d.y})`);

  // link.transition()
  //   .delay((d, i) => i * 200) // Delay each link animation
  //   .duration(1000) // Animation duration
  //   .attr("d", sankeyLinkHorizontal())
  //   .style("stroke-opacity", 0.7); // Adjust opacity as needed
  
export const generatePredictionGraph = (data, len, dispVal, nodesInfo, orgState) =>{
   console.log('runs');
    createDensityContourWithAxes(data, len, dispVal, orgState);
    plotSankey(nodesInfo);
}