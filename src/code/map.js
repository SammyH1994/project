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


    var format = d3.format(".3s")

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
        .text("Total population: " + format(data["0"].population.total))

    var color = d3.scaleLinear()
        .range(["#b5f2d2", "#008545"])
        .domain([300000, 3500000])


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
        var population = getPopulation(d.properties.name)

        var hoverInfo = d3.mouse(svg.node())
        .map( function(d) { return parseInt(d); } );
         toolTip.classed("hidden", false)
        .attr("style", "left:"+(hoverInfo[0]+10)+"px;top:"+(hoverInfo[1]+10)+"px")
        .html("Province: "+ d.properties.name + "</br> Population: " + format(population))
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
    .attr("id", "map")
    .attr("fill", function(d) {
        population = getPopulation(d.properties.name)
        return color(population)
    })
        .on("mousemove", createTooltip)
        .on("mouseout",  function(d,i) {
        toolTip.classed("hidden", true);
        })
        .on("click", function(d){
            currentProvince = d.properties.name

            var province = d.properties.name
            if (province === "Limburg"){
                province = "Nederland"
         }
            currentProvince = province
            provinceDataOne = getProvinceData(data, "Limburg")
            provinceDataTwo = getProvinceData(data, province)
            updatePyramid(provinceDataOne, provinceDataTwo, currentProvince)
            updateBarchart(provinceDataOne, provinceDataTwo, currentProvince, topic, "yes")

        })



        // create legend

        var wLegend = 80, hLegend = width/ 2;
        var margin = { top: 20, left: 20, bottom: 30, right: 20};

    // create svg
    var key = d3.select("#container")
        .append("svg")
        .attr("width", wLegend)
        .attr("height", hLegend)
        .attr("id", "legend")
        .attr("class", "legend");

    // Create the svg:defs element and the main gradient definition.
    var svgDefs = key.append("defs");

    var mainGradient = svgDefs.append("linearGradient")
        .attr("id", "mainGradient")
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    // Create the stops of the main gradient. Each stop will be assigned
    // a class to style the stop using CSS.
    mainGradient.append("stop")
        .attr("class", "stop-top")
        .attr("offset", "0%");

    mainGradient.append("stop")
        .attr("class", "stop-bottom")
        .attr("offset", "100%");

    // Use the gradient to set the shape fill, via CSS.
    key.append("rect")
        .classed("filled", true)
        .attr("width", (wLegend / 2))
        .attr("height", hLegend);

    // create y scale
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([300000, 3600000]);

    var yAxis = d3.axisRight()
        .ticks(5)
        .tickFormat(d3.format(".3s"))
        .scale(y);

    // create y axis
    key.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(41,10)")
        .style("font", "10px sans-serif")
        .call(yAxis);

}
