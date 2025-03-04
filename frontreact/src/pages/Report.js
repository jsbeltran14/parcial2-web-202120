import React, { useState, useEffect } from 'react';
import * as d3 from "d3";

export const Report = () => {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001/api/products').then(res=>res.json())
    .then(res=>{
      setProducts(res);
    })
  })
// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Parse the Data
d3.json("http://localhost:3001/api/products").then( function(data) {

// X axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(d => d.name))
  .padding(0.2);
svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
const y = d3.scaleLinear()
  .domain([0, 500])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .join("rect")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.stock))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.stock))
    .attr("fill", "#69b3a2")

})


  return (
    <section id='report'>
      <div className='report-container'>
        <h1>Unidades en inventario</h1>
        <div id="my_dataviz"></div>

      </div>
    </section>
  );
};
