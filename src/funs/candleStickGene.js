import * as d3 from 'd3-v6';
import { transformData, transformDataMod2 } from './SharedFun';

  // Create a function to render the candlestick chart
const renderCandlestickChart = (data, containerId, dispVal) => {
    const margin = { top: 20, right: 30, bottom: 65, left: 50 };
    let svgWidth = d3.select(`.${containerId}`).node().clientWidth;
    if (svgWidth > 1000) {
      svgWidth = 1000;
    }
    const maxWidth = 10;
    const svgHeight = svgWidth*0.43;
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
    
    const svg = d3.select(`.${containerId}`)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const x = d3.scaleBand()
      .domain(data[0].map(d => d.date))
      .range([0, width])
      .padding(0.1);
  
    const y = d3.scaleLinear()
      .domain([d3.min(data[2], d => d.low - d.low*0.05), d3.max(data[0], d => d.high + d.high*0.05)])
      .nice()
      .range([height, 0]);
    
    const defs = svg.append("defs");

    const gradient1 = defs.append("linearGradient")
      .attr("id", "candlestickGradient1")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", y(0))
      .attr("x2", 0).attr("y2", y(d3.max(data[0], d => Math.max(d.open, d.close))));
  
    gradient1.append("stop").attr("offset", "0%").attr("stop-color", "#7F00FF"); // Start color
    gradient1.append("stop").attr("offset", "100%").attr("stop-color", "#E6E6FA"); // End color
    
      // Gradient for second dataset (data[1])
    const gradient2 = defs.append("linearGradient")
        .attr("id", "candlestickGradient2")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", y(0))
        .attr("x2", 0).attr("y2", y(d3.max(data[1], d => Math.max(d.open, d.close))));
    
    gradient2.append("stop").attr("offset", "0%").attr("stop-color", "#90EE90"); // Start color
    gradient2.append("stop").attr("offset", "100%").attr("stop-color", "#008000"); // End color
  
    if (dispVal === 0 || dispVal === 50) {
      svg.selectAll(".candle")
      .data(data[0])
      .enter().append("rect")
      .attr("class", "candle")
      .attr("x", d => (x(d.date) + x.bandwidth() / 2) -5)
      .attr("y", d => y(Math.max(d.open, d.close)))
      .attr("width", maxWidth)
      .attr("height", d => Math.abs(y(d.open) - y(d.close)))
      .attr("fill", d => d.open > d.close ? "url(#candlestickGradient1)" : "url(#candlestickGradient1)")
      .attr("stroke-width", 1)
      .attr("stroke", "#301934");
  
      svg.selectAll(".wick")
        .data(data[0])
        .enter().append("line")
        .attr("class", "wick")
        .attr("x1", d => x(d.date) + x.bandwidth() / 2)
        .attr("x2", d => x(d.date) + x.bandwidth() / 2)
        .attr("y1", d => y(d.high))
        .attr("y2", d => y(d.low))
        .attr("stroke", d => d.open > d.close ?  "#7F00FF" : "#7F00FF");
    }
    
    if (dispVal === 100 || dispVal === 50) {
      svg.selectAll(".candle2")
      .data(data[1])
      .enter().append("rect")
      .attr("class", "candle")
      .attr("x", d => (x(d.date) + x.bandwidth() / 2) -5)
      .attr("y", d => y(Math.max(d.open, d.close)))
      .attr("width", maxWidth)
      .attr("height", d => Math.abs(y(d.open) - y(d.close)))
      .attr("fill", "url(#candlestickGradient2)")  // Set fill to none
      .attr("stroke-width", 1)
      .attr("stroke", "#023020");
  
      svg.selectAll(".wick2")
        .data(data[1])
        .enter().append("line")
        .attr("class", "wick")
        .attr("x1", d => x(d.date) + x.bandwidth() / 2)
        .attr("x2", d => x(d.date) + x.bandwidth() / 2)
        .attr("y1", d => y(d.high))
        .attr("y2", d => y(d.low))
        .attr("stroke", d => d.open > d.close ?  "#90EE90" : "#90EE90"); 
    }

    // Calculate average value between high and low values
    const avgHighLow = data[0].map(d => (d.high + d.low) / 2); // Calculate average

    // Create a line for the average between high and low values
    const lineGenerator = d3.line()
      .x((d, i) => x(data[0][i].date) + x.bandwidth() / 2)
      .y(d => y(d));

    if (dispVal === 0 || dispVal === 50) {
      svg.append("path")
        .datum(avgHighLow)
        .attr("class", "average-line")
        .attr("fill", "none")
        .attr("stroke", "#7F00FF") // Change color as needed
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);
    }
    
    // Calculate average value between high and low values
    const avgHighLow2 = data[1].map(d => (d.high + d.low) / 2); // Calculate average

    // Create a line for the average between high and low values
    const lineGenerator2 = d3.line()
      .x((d, i) => x(data[1][i].date) + x.bandwidth() / 2)
      .y(d => y(d));

    if (dispVal === 100 || dispVal === 50) {
      svg.append("path")
        .datum(avgHighLow2)
        .attr("class", "average-line")
        .attr("fill", "none")
        .attr("stroke", "#90EE90") // Change color as needed
        .attr("stroke-width", 2)
        .attr("d", lineGenerator2);
    }
      
    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
    .style("text-anchor", "end")
    .attr("font-size", "14px")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");
  
    
    // Add y-axis
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
    .attr("font-size", "13px");

    svg.append("text")
      .attr("class", "x-axis-label")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold") // Make it bold
      .attr("fill", "black")
      .text("Input Ensemble Dataset");

    // Add y-axis label
    svg.append("text")
    .attr("class", "y-axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -30)
    .attr("font-size", "14px")
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold") // Make it bold
    .attr("fill", "black")
    .text("Degree of uncertainty");
}

export const stickGeneRator = (cls, data, dispVal) => {
    d3.select(`.${cls}`).selectAll("*").remove();
    const DataMod1 = transformData(data);
    const DataMod2 = transformDataMod2(data);
    const YVals = DataMod1.map((d, i) => ({
      high: d.high < DataMod2[i].high ? DataMod2[i].high : d.high,
      low: d.low < DataMod2[i].low ? d.low : DataMod2[i].low,
    }));
    const combinedData = [DataMod1, DataMod2, YVals];
    renderCandlestickChart(combinedData, cls, dispVal)
}
  