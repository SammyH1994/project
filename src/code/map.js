/*
 *  Sammy Heutz
 *  10445765
 * 
 *  map.js contains the functions that creates a map with its legend via index.js
**/


// creates a map
function createMap(nld){

	console.log(nld)
	 var width = 600,
        height = 600;

    var svg = d3.select("#container")
    	.append("svg")
        .attr("width", width)
        .attr("height", height);

var projection = d3.geo.albers()
    // .center([5, 52])
    // .rotate([0, 0])
    // .parallels([50, 60])
    .scale(1000)
    .translate([width / 2, height / 2]);

    var path = d3.geo.path()
    .projection(projection);

    svg.append("path")
    .data(nld.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("stroke", "grey")
    .attr("fill", "grey");

}