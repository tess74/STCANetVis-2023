import * as d3 from 'd3-v6';


// // Sample data for demonstration
// const data = d3.range(500).map(() => [Math.random() * 400, Math.random() * 300]);


// Function to create high-density contour with axes using D3.js
export function createDensityContourWithAxes(data, len) {
    console.log(data);
    const margin = { top: 20, right: 70, bottom: 20, left: 20 };
    d3.select(".ScattedPlotSection").selectAll("*").remove();
    const svgWidth = d3.select(".ScattedPlotSection").node().clientWidth;
    const svgHeight = svgWidth*0.6;
    const width = svgWidth - (margin.left + margin.right);
    const height = svgHeight - (margin.top + margin.top);
    const svg = d3.select(".ScattedPlotSection")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Create x and y scales
    const xScale = d3.scaleLinear()
      // .domain([0, d3.max(data, d => d[0])])
      .domain([-3, len])
      .range([0, width]);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[1])])
      .range([height, 0]);
  
    const density = d3.contourDensity()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
      .size([width, height])
      .bandwidth(10)
      .thresholds(5);
  
    const contours = density(data);
    const colorScale = d3
      .scaleLinear()
      .domain([0, d3.max(contours, d => d.value)])
      .range(['lightgreen','#ff3636']);
    svg.selectAll("path")
      .data(contours)
      .enter().append("path")
      .attr("d", d3.geoPath())
      .attr("fill", d => colorScale(d.value));
  
    
    // Add scatter plots
    svg.selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("cx", d => xScale(d[0]))
      .attr("cy", d => yScale(d[1]))
      .attr("r", 3) // Radius of the scatter points
      .attr("fill", "#ff0000");
    
    // Add color key (legend)
    const legendWidth = 20;
    const legendHeight = height;
    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width + 10}, 0)`);

    const legendGradient = legend.append("defs")
      .append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", 0).attr("y2", legendHeight);

    legendGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#2E589400");

    legendGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#ff0000ee");

    legend.append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .style("fill", "url(#legend-gradient)");

    const legendScale = d3.scaleLinear()
      .domain([0, d3.max(contours, d => d.value)])
      .range([legendHeight, 0]);

    const legendAxis = d3.axisRight(legendScale).ticks(6);

    legend.append("g")
      .attr("class", "legend-axis")
      .attr("transform", `translate(${legendWidth}, 0)`)
      .call(legendAxis);


    // Create x and y axes outside the contour area
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
  
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);
  
    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${0}, 0)`)
      .call(yAxis);
  
    return svg;
}

  
export const generatePredictionGraph = (data, len) =>{
    // Sample scatter plot data
    // const width = 500;
    // const height = 300;
    createDensityContourWithAxes(data, len);
  
}