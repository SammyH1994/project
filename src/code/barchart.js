 //https://codepen.io/Rastikko/pen/GqNbqM
//https://jsfiddle.net/mrl513/arjcq9ka/
// https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad

  var marginBar = {top: 20, right: 100, bottom: 30, left: 30},
    widthBar = 420 - marginBar.left - marginBar.right,
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



    var titleSvg = d3.select("#container3")
    .append('svg')
    .attr("width", widthBar)
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
.style("text-anchor", "middle")
.attr("x", widthBar/2)
.attr("y", 30);

title
.append('text')
.attr("id", "barsubtitel")
  .style("text-anchor", "middle")
        .style("font-size", "10px")
.attr('y', 50)
.attr("x", widthBar/2);


// title = d3.select("#container3").append("svg")
//   .attr("width", widthBar + marginBar.left + marginBar.right)
//   .attr("height", 50)
//   .append("g")    
//         .append("text")
//         .attr("id", "title")
//         .attr("dy", ".0em")
//         .style("text-anchor", "middle")      

// subtitle = d3.select("#container3")
// .append("g")
//             .append("tspan")
//         .attr("id", "subtitlebar")
//         .attr("dy", ".8em")


    svg = d3.select("#container3").append("svg")
    .attr("width", widthBar + marginBar.left + marginBar.right)
    .attr("height", heightBar + marginBar.top + marginBar.bottom)
    .append("g")
    .attr("transform", translation(marginBar.left, marginBar.top));

 svg.append("g")
      .attr("class", "x axis")
      .attr("transform", translation(0, heightBar));

  svg.append("g")
      .attr("class", "y axis")
      .style('opacity','0');

      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-size", "10px")
      .text("Value");







}

function updateBarchart(provinceDataOne, provinceDataTwo, currentProvince, topic, bartitel, barsubtitel, updateY){
// data
var barData = [provinceDataOne, provinceDataTwo];


// Check for empty values
var keys = Object.keys(barData[0][topic])

var emptyValues = 0
for (var i = 0; i < barData.length; i++){
      var dates = barData[i][topic]
      for (var j = 0; j < Object.keys(barData[0][topic]).length; j++){
        if (dates[keys[j]] === "0.00"){
          emptyValues = 1
        }
        }
  }

if (emptyValues === 1){
  document.getElementById("nodata").style.display =  "block";
}

else {
  title.selectAll("#bartitel")
  .text(bartitel);

  title.selectAll("#barsubtitel")
  .text(barsubtitel);

  var categoriesNames = barData.map(function(d) { return d.province; });
    var rateNames = Object.keys(barData[0][topic]);




barData.forEach(function(d) {
    d.values = rateNames.map(function(name) { return {name: name, value: parseFloat(d[topic][name])}; });
});


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

// if (updateY == "yes"){



  y.domain([0, d3.max(barData, function(d) {return d3.max(d.values, function(d) {return d.value;}); })]);


  var yAxis = d3.axisLeft()
    .scale(y);

  svg.select('.y')
  .transition()
  .duration(500)
  .style('opacity','1')
  .call(yAxis);


  // }

   var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(d =>   "<strong>Value:</strong> <span style='color:#b5f2d2'>" + d.value  + "</span>");

    

  var slice = svg.selectAll(".slice")
    .data(barData);

    slice
    .enter()
    .append("g")
    .attr("class", "slice")
    .attr("transform", function(d) { return translation(x0(d.province),0); });


  var bars = d3.selectAll(".slice").selectAll("rect")
    .data(function(d) { return d.values; });

    bars
    .enter()
    .append("rect")
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide)
    .transition()
      .delay(function(d, i) {
        return 30 * i;
      })    .duration(800)
    .attr("width", x1.bandwidth())
    .attr("x", function(d) { return x1(d.name); })
    .attr("y", function(d) { return y(d.value); })
    .attr("value", function(d){return d.name;})
    .attr("height", function(d) { return heightBar - y(d.value); })
    .style("fill", function(d,i) { return color(i); });

    bars
    .transition()
      .delay(function(d, i) {
        return 30 * i;
      })
          .duration(800)
    .attr("x", function(d){return x1(d.name)})
    .attr("width", x1.bandwidth())
    .attr("y", function(d) { return y(d.value); })
           .attr("height", function(d) { return heightBar - y(d.value); })
           .style("fill", function(d,i) { return color(i); });



  bars
  .exit()
  .remove();

  svg.call(tip);

 svg.selectAll(".legend")
      .remove();

  var legendHolder = svg.append('g')
  // translate the holder to the right side of the graph
  .attr('transform', translation(marginBar.left + widthBar, 0))

var legend = legendHolder.selectAll(".legend")
    .data(rateNames.slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return  translation(0, i * 20); });

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




}
}