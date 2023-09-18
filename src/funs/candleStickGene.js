import * as d3 from 'd3-v6';
import { transformData, transformDataMod2 } from './SharedFun';

  // Create a function to render the candlestick chart
const renderCandlestickChart = (data, containerId, dispVal) => {
    const margin = { top: 20, right: 30, bottom: 60, left: 50 };
    const svgWidth = d3.select(`.${containerId}`).node().clientWidth;
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
  
    if (dispVal === 0 || dispVal === 50) {
      svg.selectAll(".candle")
      .data(data[0])
      .enter().append("rect")
      .attr("class", "candle")
      .attr("x", d => x(d.date))
      .attr("y", d => y(Math.max(d.open, d.close)))
      .attr("width", x.bandwidth())
      .attr("height", d => Math.abs(y(d.open) - y(d.close)))
      .attr("fill", d => d.open > d.close ? "#61DAFB" : "#61DAFB");
  
      svg.selectAll(".wick")
        .data(data[0])
        .enter().append("line")
        .attr("class", "wick")
        .attr("x1", d => x(d.date) + x.bandwidth() / 2)
        .attr("x2", d => x(d.date) + x.bandwidth() / 2)
        .attr("y1", d => y(d.high))
        .attr("y2", d => y(d.low))
        .attr("stroke", d => d.open > d.close ?  "#61DAFB" : "#61DAFB");
    }
    
    if (dispVal === 100 || dispVal === 50) {
      svg.selectAll(".candle2")
      .data(data[1])
      .enter().append("rect")
      .attr("class", "candle")
      .attr("x", d => x(d.date))
      .attr("y", d => y(Math.max(d.open, d.close)))
      .attr("width", x.bandwidth())
      .attr("height", d => Math.abs(y(d.open) - y(d.close)))
      .attr("fill", "none")  // Set fill to none
      .attr("stroke", d => d.open > d.close ? "#3D2B1F" : "#3D2B1F") // Set border color
      .attr("stroke-width", 1);
  
      svg.selectAll(".wick2")
        .data(data[1])
        .enter().append("line")
        .attr("class", "wick")
        .attr("x1", d => x(d.date) + x.bandwidth() / 2)
        .attr("x2", d => x(d.date) + x.bandwidth() / 2)
        .attr("y1", d => y(d.high))
        .attr("y2", d => y(d.low))
        .attr("stroke", d => d.open > d.close ?  "#3D2B1F" : "#3D2B1F"); 
    }
    // Add x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
    .style("text-anchor", "end")
    .attr("font-size", "12px")
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
  