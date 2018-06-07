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
        .attr("width", "100%")
        .attr("height", "100%");


// var subunits = topojson.feature(nld, nld.objects.feature);

var projection = d3.geo.albers()
    .center([5, 52])
    .rotate([0, 0])
    .parallels([50, 60])
    .scale(500)
    .translate([width / 2, height / 2]);

    var path = d3.geo.path()
    .projection(projection);

    svg.append("path")
    .datum(nld.features)
    .attr("d", path);

}