//https://stackoverflow.com/questions/25044997/creating-population-pyramid-with-d3-js

var svg, leftBars, rightBars, yScale, xScale, xScaleLeft, xScaleRight, populationData, rightProvince;

// SET UP DIMENSIONS
var w = 450,
    h = 300;
    
// margin.middle is distance from center line to each y-axis
var margin = { top: 20, left: 20, bottom: 30, right: 20, middle: 28 };

    
// the width of each side of the chart
var regionWidth = w/2 - margin.middle;

// these are the x-coordinates of the y-axes
var pointA = regionWidth,
    pointB = w - regionWidth;


var format = (d3.format(".3s"))


function createPyramid(provinceDataOne, provinceDataTwo, provinceTwo){



// transform data to correct format
populationData = [
{group: "0-5", "Limburg": provinceDataOne.population.from0to4, provinceTwo: provinceDataTwo.population.from0to4},
{group: "6-10", "Limburg": provinceDataOne.population.from5to10, provinceTwo: provinceDataTwo.population.from5to10},
{group: "11-15", "Limburg": provinceDataOne.population.from11to15, provinceTwo: provinceDataTwo.population.from11to15},
{group: "16-20", "Limburg": provinceDataOne.population.from16to20, provinceTwo: provinceDataTwo.population.from16to20},
{group: "21-25", "Limburg": provinceDataOne.population.from21to25, provinceTwo: provinceDataTwo.population.from21to25},
{group: "26-30", "Limburg": provinceDataOne.population.from26to30, provinceTwo: provinceDataTwo.population.from26to30},
{group: "31-35", "Limburg": provinceDataOne.population.from31to35, provinceTwo: provinceDataTwo.population.from31to35},
{group: "36-40", "Limburg": provinceDataOne.population.from36to40, provinceTwo: provinceDataTwo.population.from36to40},
{group: "41-45", "Limburg": provinceDataOne.population.from41to45, provinceTwo: provinceDataTwo.population.from41to45},
{group: "45-50", "Limburg": provinceDataOne.population.from46to50, provinceTwo: provinceDataTwo.population.from46to50},
{group: "51-55", "Limburg": provinceDataOne.population.from51to55, provinceTwo: provinceDataTwo.population.from51to55},
{group: "56-60", "Limburg": provinceDataOne.population.from56to60, provinceTwo: provinceDataTwo.population.from56to60},
{group: "61-65", "Limburg": provinceDataOne.population.from61to65, provinceTwo: provinceDataTwo.population.from61to65},
{group: "66-70", "Limburg": provinceDataOne.population.from66to70, provinceTwo: provinceDataTwo.population.from66to70},
{group: "71-75", "Limburg": provinceDataOne.population.from71to75, provinceTwo: provinceDataTwo.population.from71to75},
{group: "76-80", "Limburg": provinceDataOne.population.from76to80, provinceTwo: provinceDataTwo.population.from76to80},
{group: "81-85", "Limburg": provinceDataOne.population.from81to85, provinceTwo: provinceDataTwo.population.from81to85},
{group: "86-90", "Limburg": provinceDataOne.population.from86to90, provinceTwo: provinceDataTwo.population.from86to90},
{group: "91-94", "Limburg": provinceDataOne.population.from91to94, provinceTwo: provinceDataTwo.population.from91to94},
{group: "95+", "Limburg": provinceDataOne.population.from95, provinceTwo: provinceDataTwo.population.from95}
];


// parse Amount so that d3.max works
	populationData.forEach(function(d) {
		d["Limburg"] = parseFloat(d["Limburg"]).toFixed(2),
		d.provinceTwo = parseFloat(d.provinceTwo).toFixed(2);
				});

// create title for map
    var title = d3.select("#container2")        
        .append("text")
        .attr("id", "title")
        .style("text-anchor", "middle")
        .text("Population by age group");


// CREATE SVG
var svg = d3.select('#container2').append('svg')
  .attr('width', margin.left + w + margin.right)
  .attr('height', margin.top + h + margin.bottom)
 // ADD A GROUP FOR THE SPACE WITHIN THE MARGINS
  .append('g')
  .attr('transform', translation(margin.left, margin.top))
  .attr("id", "space");



 // create text below graph
    var leftProvince = d3.select("#container2")
        .append("text")
        .attr("id", "leftProvince")
        .text("Limburg, total population: " + format(provinceDataOne.population.total));

    rightProvince = d3.select("#container2")
    	.append("text")
    	.attr("id", "rightProvince")
    	.text(provinceTwo + ", total population: " + format(provinceDataTwo.population.total));



    var tipLeft = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) {					return "<strong>Age Group:</strong> <span style='color:#b5f2d2'>" + d.group + 
					"</span></br><strong>Percentage:</strong> <span style='color:#b5f2d2'>" + d["Limburg"] + "</span>";});


   var tipRight = d3.tip()
      .attr("class", "d3-tip")
      .offset([-8, 0])
      .html(function(d) {					return "<strong>Age Group:</strong> <span style='color:#b5f2d2'>" + d.group + 
					"</span></br><strong>Percentage:</strong> <span style='color:#b5f2d2'>" + d.provinceTwo + "</span>";})


    var tipSvg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
   svg.call(tipLeft);
  svg.call(tipRight);




//  since this will be shared by both of the x-axes
var maxValue = Math.max(
  d3.max(populationData, function(d) { return d["Limburg"]; }),
  d3.max(populationData, function(d) { return d.provinceTwo; })
);


// the xScale goes from 0 to the width of a region
//  it will be reversed for the left x-axis
xScale = d3.scaleLinear()
  .domain([0, maxValue])
  .range([0, regionWidth])
  .nice();

xScaleLeft = d3.scaleLinear()
  .domain([0, maxValue])
  .range([regionWidth, 0]);

xScaleRight = d3.scaleLinear()
  .domain([0, maxValue])
  .range([0, regionWidth]);


yScale = d3.scaleBand()
  .domain(populationData.map(function(d) { return d.group; }))
  .rangeRound([h,0])
  .padding(0.1)


// SET UP AXES
var yAxisLeft = d3.axisRight()
  .scale(yScale)
  .tickSize(4,0)
  .tickPadding(margin.middle-4);

var yAxisRight = d3.axisLeft()
  .scale(yScale)
  .tickSize(4,0)
  .tickFormat('');

var xAxisRight = d3.axisBottom()
  .scale(xScale)
  .tickFormat(function(d){ return d + "%"});

var xAxisLeft = d3.axisBottom()
  // REVERSE THE X-AXIS SCALE ON THE LEFT SIDE BY REVERSING THE RANGE
  .scale(xScale.copy().range([pointA, 0]))
  .tickFormat(function(d){ return d + "%"});

// MAKE GROUPS FOR EACH SIDE OF CHART
// scale(-1,1) is used to reverse the left side so the bars grow left instead of right
var leftBarGroup = svg.append('g')
  .attr('transform', translation(pointA, 0) + 'scale(-1,1)');
var rightBarGroup = svg.append('g')
  .attr('transform', translation(pointB, 0));

// DRAW AXES
svg.append('g')
  .attr('class', 'axis y left')
  .attr('transform', translation(pointA, 0))
  .call(yAxisLeft)
  .selectAll('text')
   .attr("id", "yAxis")
  .style('text-anchor', 'middle');

svg.append('g')
  .attr('class', 'axis y right')
  .attr('transform', translation(pointB, 0))
  .call(yAxisRight);

svg.append('g')
  .attr('class', 'axis x left')
  .attr('transform', translation(0, h))
  .call(xAxisLeft);

svg.append('g')
  .attr('class', 'axis x right')
  .attr('transform', translation(pointB, h))
  .call(xAxisRight)

// DRAW BARS
leftBars = leftBarGroup.selectAll('.bar.left')
  .data(populationData)
  .enter()
  .append('rect');

  leftBars
  .transition()
	    	.delay(function(d, i) {
	    		return 30 * i;
	      	})
	      	.duration(1400)
    .attr('class', 'bar left')
    .attr('x', 0)
    .attr('y', function(d) { return yScale(d.group); })
    .attr('width', function(d) { return xScale(d["Limburg"]); })
    .attr('height', yScale.bandwidth());

    leftBars
    .on("mouseover", tipLeft.show)
	.on("mouseout", tipLeft.hide);	

rightBars = rightBarGroup.selectAll('.bar.right')
  .data(populationData)
  .enter().append('rect');

  rightBars
  .transition()
	    	.delay(function(d, i) {
	    		return 30 * i;
	      	})
	.duration(1400)
    .attr('class', 'bar right')
    .attr('x', 0)
    .attr('y', function(d) { return yScale(d.group); })
    .attr('width', function(d) { return xScale(d.provinceTwo); })
    .attr('height', yScale.bandwidth());

    rightBars
    .on("mouseover", tipRight.show)
	.on("mouseout", tipRight.hide);	


}


function updatePyramid(provinceDataOne, provinceDataTwo, provinceTwo){


var ageGroups = ["from0to4", "from5to10", "from11to15", "from16to20", "from21to25", "from26to30", "from31to35", "from36to40", "from41to45", "from46to50", "from51to55", "from56to60", "from61to65",
"from66to70", "from71to75", "from76to80", "from81to85", "from86to90", "from91to94", "from95"]


for (var i = 0; i < populationData.length; i ++){
	populationData[i]["Limburg"] = provinceDataOne["population"][ageGroups[i]]
	populationData[i].provinceTwo = provinceDataTwo["population"][ageGroups[i]]
}

// parse Amount so that d3.max works
	populationData.forEach(function(d) {
		d["Limburg"] = parseFloat(d["Limburg"]).toFixed(2)
		d.provinceTwo = parseFloat(d.provinceTwo).toFixed(2);
				});

var maxValue = Math.max(
  d3.max(populationData, function(d) { return d["Limburg"]; }),
  d3.max(populationData, function(d) { return d.provinceTwo; })
);

  	leftBars
  		.data(populationData)

	leftBars
		.exit()
      	.attr("y", yScale(0))
       	.attr("x", w)
    	.attr("height", h - yScale(0))
      	.style("fill-opacity", 1e-6)
		.remove();

	leftBars
		.enter()
		.append("rect");

		leftBars
  		.transition()
	    	.delay(function(d, i) {
	    		return 30 * i;
	      	})
	      	.duration(500)
    .attr('class', 'bar left')
    .attr('x', 0)
    .attr('y', function(d) { return yScale(d.group); })
    .attr('width', function(d) { return xScale(d["Limburg"]); })
    .attr('height', yScale.bandwidth());
		


    rightBars
    	.data(populationData)

	rightBars
		.exit()
      	.attr("y", yScale(0))
       	.attr("x", w)
    	.attr("height", h - yScale(0))
      	.style("fill-opacity", 1e-6)
		.remove();

		rightBars
		.enter()
		.append("rect");

		rightBars
  		.transition()
	    	.delay(function(d, i) {
	    		return 30 * i;
	      	})
	      	.duration(800)
    .attr('class', 'bar right')
    .attr('x', 0)
    .attr('y', function(d) { return yScale(d.group); })
    .attr('width', function(d) { return xScale(d.provinceTwo); })
    .attr('height', yScale.bandwidth());

    rightProvince
    .text(provinceTwo + ", total population: " + format(provinceDataTwo.population.total))


}

