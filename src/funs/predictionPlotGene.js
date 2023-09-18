import * as d3 from 'd3-v6';


// // Sample data for demonstration
// const data = d3.range(500).map(() => [Math.random() * 400, Math.random() * 300]);


// Function to create high-density contour with axes using D3.js
export function createDensityContourWithAxes(data, len, dispval) {
    const margin = { top: 20, right: 70, bottom: 30, left: 40 };
    d3.select(".ScattedPlotSection").selectAll("*").remove();
    let svgWidth = d3.select(".ScattedPlotSection").node().clientWidth;
    if (svgWidth > 1000) {
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
      .attr("x1", -7)
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
      .attr("x2", 0)
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
    if (dispval === 100 || dispval === 50) {
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
          .call(legendAxis); 

        plotArea.selectAll(".contour")
        .data(contours)
        .enter().append("path")
        .attr("class", "contour-glow")
        .attr("d", d3.geoPath())
        .attr("stroke", d => colorScale(d.value))
        .attr("stroke-opacity", 0.7);
    }
      
    
    if (dispval === 0 || dispval === 50) {
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
    const yAxis = d3.axisLeft(yScale);
  
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(-7, ${height})`)
      .call(xAxis)
      .selectAll("text")
    .attr("font-size", "12px");
  
    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${-7}, 0)`)
      .call(yAxis)
      .selectAll("text")
    .attr("font-size", "12px");


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

    // Add y-axis label
    svg.append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -40)
      .attr("font-size", "13px")
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold") // Make it bold
      .attr("fill", "black")
      .text("Model Prediction Values");
    
      

    return svg;
}

  
export const generatePredictionGraph = (data, len, dispVal) =>{
    // Sample scatter plot data
    // const width = 500;
    // const height = 300;
    createDensityContourWithAxes(data, len, dispVal);
  
}