  var marginBar = {top: 20, right: 100, bottom: 30, left: 70},
    widthBar = 500 - marginBar.left - marginBar.right,
    heightBar = 300 - marginBar.top - marginBar.bottom;

var svg, x0, x1, y, color, title;

function createBarchart(){

x0 = d3.scaleBand()
	.rangeRound([0, widthBar])
	.padding(0.1);

x1 = d3.scaleBand();

y = d3.scaleLinear()
	.range([heightBar, 0]);

var colorScheme =  d3.schemePastel1;
color = d3.scaleOrdinal()
.range(colorScheme);
    // .range(["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", " #fed9a6"]);

title = d3.select("#container3")        
        .append("text")
        .attr("id", "title")
        .style("text-anchor", "middle")

    svg = d3.select("#container3").append("svg")
    .attr("width", widthBar + marginBar.left + marginBar.right)
    .attr("height", heightBar + marginBar.top + marginBar.bottom)
    .append("g")
    .attr("transform", "translate(" + marginBar.left + "," + marginBar.top + ")");

 svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + heightBar + ")");

  svg.append("g")
      .attr("class", "y axis")
      .style('opacity','0');

        svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('font-weight','bold')
      .text("Value");



}

function updateBarchart(provinceDataOne, provinceDataTwo, currentProvince, topic, updateY){

// create title for map
title
        .text(topic);
// data
var barData = [provinceDataOne, provinceDataTwo];


  var categoriesNames = barData.map(function(d) { return d.province; });
    var rateNames = Object.keys(barData[0][topic]);
barData.forEach(function(d) {
    d.values = rateNames.map(function(name) { return {name: name, value: parseFloat(d[topic][name])}; });
});

console.log(barData[1])
// update scales
  x0
  .domain(categoriesNames);

  x1
  .domain(rateNames)
  .range([0, x0.bandwidth()]);

    var xAxis = d3.axisBottom()
    .scale(x0);

      svg.select(".x")
      .call(xAxis);

if (updateY == "yes"){



  y.domain([0, d3.max(barData, function(d) {return d3.max(d.values, function(d) {return d.value;}); })]);


  var yAxis = d3.axisLeft()
    .scale(y);

      svg.select('.y')
  .transition()
  .duration(500)
  .style('opacity','1')
  .call(yAxis);


  }

   var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) {         return "<strong>Age Group:</strong> <span style='color:red'>" + d.value + 
          "</span></br><strong>Percentage:</strong> <span style='color:red'>" + d["Limburg"] + "</span>";});

    svg.call(tip);

  var slice = svg.selectAll(".slice")
    .data(barData);

    slice
    .enter()
    .append("g")
    .attr("class", "slice")
    .attr("transform", function(d) { return "translate(" + x0(d.province) + ",0)"; });


  var bars = d3.selectAll(".slice").selectAll("rect")
    .data(function(d) { return d.values; });

    bars
    .enter()
    .append("rect")
    .attr("width", x1.bandwidth())
    .attr("x", function(d) { return x1(d.name); })
    .attr("y", function(d) { return y(d.value); })
    .attr("value", function(d){return d.name;})
    .attr("height", function(d) { return heightBar - y(d.value); })
    .style("fill", function(d,i) { return color(i); });

    bars
    .transition()
    .duration(500)
    .attr("x", function(d){return x1(d.name)})
    .attr("width", x1.bandwidth())
    .attr("y", function(d) { return y(d.value); })
           .attr("height", function(d) { return heightBar - y(d.value); })
           .style("fill", function(d,i) { return color(i); });

    bars
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);

  bars
  .exit()
  .remove();

 svg.selectAll(".legend")
        .remove();

  var legendHolder = svg.append('g')
  // translate the holder to the right side of the graph
  .attr('transform', "translate(" + (marginBar.left + widthBar) + ",0)")


var legend = legendHolder.selectAll(".legend")
    .data(rateNames.slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
    .attr("x", 0)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function (d,i) { return color(i)});

legend.append("text")
    .attr("x", 0)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });



// legend.append("rect")
//   .attr("x", 0)
//   .attr("width", 18)
//   .attr("height", 18)
//   .style("fill", color);

// legend.append("text")
//   .attr("x", 0)
//   .attr("y", 9)
//   .attr("dy", ".35em")
//   .style("text-anchor", "end")
//   .text(function(d) { return d; });

}