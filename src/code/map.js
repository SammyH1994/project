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

// Create SVG

    var svg = d3.select("#container")
        .append("svg")
        .attr("id", "mapsvg")
        .attr("width", "100%")
        .attr("height", "90%");


    // Create legend
    var w = 100, h = 350;

    var key = svg.append("svg")
    .attr("id", "legend")
    .attr("width", w)
    .attr("height", h);

    var legend = key.append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "100%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

    legend
    .append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#008545")
    .attr("stop-opacity", 0.8);

    legend
    .append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#b5f2d2")
    .attr("stop-opacity", 0.8);


    key
    .append("rect")
    .attr("width", 20)
    .attr("height", 300)
    .style("fill", "url(#gradient)")
    .style("stroke", "grey")
    .attr("transform", translation(0,10));

    var y = d3.scaleLinear()
    .range([300, 0])
    .domain([300000, 3600000]);

    var yAxis = d3.axisRight()
    .scale(y);

     key.append("g")
     .attr("class", "y axis")
     .attr("transform", translation(22,10))
     .call(yAxis)
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 30)
     .attr("dy", ".71em")
     .style("text-anchor", "end")
     .text("axis title");


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
        .attr("style", "left:"+(hoverInfo[0]+10)+"px;top:"+(hoverInfo[1]+55)+"px")
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



}
