window.onload = function() {

	  var margin = {top: 20, right:20, bottom: 30, left: 30},
    width = 420 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

	var barData = [
{"province": "Nederland",
"value": 2.84},
{"province":"Limburg",
"value" : 3.84}];

var titleSvg = d3.select("#container4")
    .append('svg')
    .attr("width", width)
    .attr("height", 50)
    .append('g')
    // .attr('transform','translate(10,10)');

title = titleSvg
.append('g')
.attr('id', 'title');


  // topic titles
title
.append('text')
.attr("id", "bartitel")
.style("font-size", "15px")
.style("fill", "grey")
.style("font-size", "20px")
.style("text-anchor", "middle")
.attr("x", width/2)
.attr("y", 30)
.text("Baby's born with birth defects");


	 var svg = d3.select("#container4").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", translation(margin.left, margin.top));


          svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-size", "10px")
      .text("Percentage");


    // set the ranges
var xScale = d3.scaleBand()
          .range([0, width])
          .padding(0.1)
     		.domain(barData.map(function(d) {return d.province}));
var yScale = d3.scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(barData, function(d) {return d.value})]);


   var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(d =>   "<strong>Value:</strong> <span style='color:#b5f2d2'>" + d.value  + "</span>");

      svg.call(tip);


var colorScheme =  d3.schemePastel1;
var color = d3.scaleOrdinal()
.range(colorScheme);





 svg.selectAll(".bar")
      .data(barData)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.province); })
      .attr("width", xScale.bandwidth())
      .attr("y", function(d) { return yScale(d.value); })
      .attr("height", function(d) { return height - yScale(d.value); })
      .style("fill", function(d,i) { return color(i); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
       .attr("class", "x axis")

      .call(d3.axisBottom(xScale));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(yScale));


}