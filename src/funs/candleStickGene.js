import * as d3 from 'd3-v6';
  // Create a function to render the candlestick chart
const renderCandlestickChart = (data, containerId) => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const svgWidth = d3.select(`.${containerId}`).node().clientWidth;
    const svgHeight = svgWidth*0.6;
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
    
    d3.select(`.${containerId}`).selectAll("*").remove();
    const svg = d3.select(`.${containerId}`)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([0, width])
      .padding(0.1);
  
    const y = d3.scaleLinear()
      .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
      .nice()
      .range([height, 0]);
  
    svg.selectAll(".candle")
      .data(data)
      .enter().append("rect")
      .attr("class", "candle")
      .attr("x", d => x(d.date))
      .attr("y", d => y(Math.max(d.open, d.close)))
      .attr("width", x.bandwidth())
      .attr("height", d => Math.abs(y(d.open) - y(d.close)))
      .attr("fill", d => d.open > d.close ? "#3D2B1F" : "#61DAFB");
  
    svg.selectAll(".wick")
      .data(data)
      .enter().append("line")
      .attr("class", "wick")
      .attr("x1", d => x(d.date) + x.bandwidth() / 2)
      .attr("x2", d => x(d.date) + x.bandwidth() / 2)
      .attr("y1", d => y(d.high))
      .attr("y2", d => y(d.low))
      .attr("stroke", d => d.open > d.close ?  "#3D2B1F" : "#61DAFB");
  
    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
  
    // Add y-axis
    svg.append("g")
      .call(d3.axisLeft(y));
}

export const stickGeneRator = (cls, data) => {
    renderCandlestickChart(data, cls)
}
  