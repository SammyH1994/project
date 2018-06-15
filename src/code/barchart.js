function createBarchart(provinceDataOne, provinceDataTwo, currentProvince, topic){

	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x0 = d3.scaleBand()
	.rangeRound([0, width])
	.padding(0.1);

var x1 = d3.scaleBand();

var y = d3.scaleLinear()
	.range([height, 0]);

var xAxis = d3.axisBottom()
.scale(x0);

var yAxis = d3.axisLeft()
.scale(y);


var barData = [provinceDataOne, provinceDataTwo];


  var categoriesNames = barData.map(function(d) { return d.province; });
    var rateNames = Object.keys(barData[0][topic]);
barData.forEach(function(d) {
    d.values = rateNames.map(function(name) { return {name: name, value: parseFloat(d[topic][name])}; });
});

 
var color = d3.scaleOrdinal()
    .range(["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", " #fed9a6"]);

var svg = d3.select("#container3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




  x0
  .domain(categoriesNames);

  x1
  .domain(rateNames)
  .range([0, x0.bandwidth()]);

  y.domain([0, d3.max(barData, function(d) {return d3.max(d.values, function(d) {return d.value;}); })]);

 svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .style('opacity','0')
      .call(yAxis)

  .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style('font-weight','bold')
      .text("Value");

  svg.select('.y')
  .transition()
  .duration(500)
  .style('opacity','1');

  var slice = svg.selectAll(".slice")
    .data(barData)
    .enter()
    .append("g")
    .attr("class", "rect")
    .attr("transform", function(d) { return "translate(" + x0(d.province) + ",0)"; });



slice.selectAll("rect")
    .data(function(d) { return d.values; })
    .enter().append("rect")
      .transition()
    .duration(500)
    .attr("width", x1.bandwidth())
    .attr("x", function(d) { return x1(d.name); })
    .attr("y", function(d) { return y(d.value); })
    .attr("value", function(d){return d.name;})
    .attr("height", function(d) { return height - y(d.value); })
        .style("fill", function(d) { return color(d.name); });


var legend = svg.selectAll(".legend")
    .data(rateNames.slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });
}

