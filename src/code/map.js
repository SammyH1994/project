/*
 *  Sammy Heutz
 *  10445765
 * 
 *  map.js contains the functions that creates a map with its legend via index.js
**/


// creates a map
function createMap(nld, data, year){

	var width = 600,
         height = 600;

// create title for map
    var title = d3.select("#container")        
        .append("text")
        .attr("id", "title")
        .style("text-anchor", "middle")
        .text("Population in the Netherlands in the year " + year);


    var svg = d3.select("#container")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "90%");

    // create subtitle for map
    var subtitle = d3.select("#container")
        .append("text")
        .attr("id", "subtitle")
        .text("Total population: " + data["0"].population.total)

var colorScheme =  d3.schemeGnBu[8]


    var color = d3.scaleThreshold()
        .range(colorScheme)
        .domain([0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000])


    var projection = d3.geoMercator()

    var path = d3.geoPath()
        .projection(projection);

    projection.fitSize([width, height], nld);

    // create tip
    var toolTip = d3.select("#container")
        .append("div")
        .attr("class", "tooltip hidden")


    // create tooltip
    function createTooltip(d) {

      var hoverInfo = d3.mouse(svg.node())
        .map( function(d) { return parseInt(d); } );
         toolTip.classed("hidden", false)
        .attr("style", "left:"+(hoverInfo[0]+10)+"px;top:"+(hoverInfo[1]+10)+"px")
        .html("Province: "+ d.properties.name + "</br> Population: " + getPopulation(d.properties.name)
        )
    }


    // misschien aanpassen voor andere data soorten!! 
    function getPopulation(province){
        for (var i = 0; i < data.length; i++){
            if (data[i].province == province){
                return data[i].population.total
            }
                    }
    }



    svg.selectAll("path")
    .data(nld.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("stroke", "grey")
    .attr("fill", function(d) {
        population = getPopulation(d.properties.name)
        return color(population)
    })
        .on("mousemove", createTooltip)
        .on("mouseout",  function(d,i) {
        toolTip.classed("hidden", true);
        })
        // .on("click", function(d){
        //     console.log(d.properties.name)
        // })

}


function updateMap()
{
    
}