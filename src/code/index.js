var currentProvince = "Nederland"
var topic = "income"
var titel = "Yearly income"
var subtitel = "x 1000 euro"

window.onload = function() {

	
	var data2006 = "src/data/data_2006.json";
	var data2007 = "src/data/data_2007.json";
	var data2008 = "src/data/data_2008.json";
	var data2009 = "src/data/data_2009.json";
	var data2010 = "src/data/data_2010.json";
	var data2011 = "src/data/data_2011.json";
	var data2012 = "src/data/data_2012.json";
	var data2013 = "src/data/data_2013.json";
	var data2014 = "src/data/data_2014.json";
	var data2015 = "src/data/data_2015.json";
	var nld = "src/data/nld.json"

	// retrieve data
	d3.queue()
		.defer(d3.json, data2006)
		.defer(d3.json, data2007)
		.defer(d3.json, data2008)
		.defer(d3.json, data2009)
		.defer(d3.json, data2010)
		.defer(d3.json, data2011)
		.defer(d3.json, data2012)
		.defer(d3.json, data2013)
		.defer(d3.json, data2014)
		.defer(d3.json, data2015)
		.defer(d3.json, nld)
		.await(callback);
	
	// create visualizations
	function callback(error, data2006, data2007, data2008, data2009, data2010, data2011, data2012, data2013, data2014, data2015, nld) {
	if (error) throw error;


  	var years = {
  		"2006": data2006.data_2006,
  		"2007": data2007.data_2007,
  		"2008": data2008.data_2008,
  		"2009": data2009.data_2009,
  		"2010": data2010.data_2010,
  		"2011": data2011.data_2011,
  		"2012": data2012.data_2012,
  		"2013": data2013.data_2013,
  		"2014": data2014.data_2014,
  		"2015": data2015.data_2015,
  	}

  	for (var key in years){
  		changeDataValues(years[key])
  	}

	// console.log(data2006)
	datatest = data2010.data_2010

	createMap(nld, datatest, "2010");
	updateMap(nld, datatest, "2010")
	var provinceDataOne = getProvinceData(datatest, "Limburg")
	var provinceDataTwo = getProvinceData(datatest, currentProvince)
	createPyramid(provinceDataOne, provinceDataTwo, currentProvince);

	createBarchart()
	updateBarchart(provinceDataOne, provinceDataTwo, currentProvince, topic, titel, subtitel, "yes")	

	$("#scrollUp").click(function() {
    $('html, body').animate({
        scrollTop: $("#container1").offset().top
    }, 1000);
});

		$("#scrollDown").click(function() {
    $('html, body').animate({
        scrollTop: $("#container1").offset().top
    }, 1000);
});

		$("path").click(function() {
    $('html, body').animate({
        scrollTop: $(".slidecontainer").offset().top
    }, 1000);
});
var slider = document.getElementById("myRange");
var output = document.getElementById("year");
output.innerHTML = slider.value;

slider.oninput = function() {
	year = this.value
  	output.innerHTML = year

 
  	data = years[year]
  	// document.getElementById("mapsvg").selectAll("path").remove();
  	updateMap(nld, data, year)


  	provinceDataOne = getProvinceData(data, "Limburg")
  	provinceDataTwo = getProvinceData(data, currentProvince)
  	updatePyramid(provinceDataOne, provinceDataTwo, currentProvince)
  	updateBarchart(provinceDataOne, provinceDataTwo, currentProvince, topic, titel, subtitel, "no")


}


function changeTopic(){

	topic = this.getAttribute("id");

	// titles
	if (topic === "income"){
		titel = "Yearly income"
		subtitel = "x 1000 euro"
	}
	else if (topic === "birthsanddeaths"){
		titel = "Amount of births and deaths"
		subtitel = "Per 1000 people"
	}
	else if (topic === "causesofdeath"){
		titel = "Causes of Death"
		subtitel = "Per 1000 people"
	}
	else if (topic === "migration"){
		titel = "Migration"
		subtitel = "Percentages"
	}
	else if (topic === "socialsecurity"){
		titel = "Social Security"
		subtitel = "Per 1000 people"
	}
	else if (topic === "education")
	{
		titel = "Highest level of Education"
		subtitel =  "Per 1000 people"
	}
	var provinceDataTwo = getProvinceData(datatest, currentProvince)
	updateBarchart(provinceDataOne, provinceDataTwo, currentProvince, topic, titel, subtitel, "yes")	
}

	document.getElementById("birthsanddeaths").onclick=changeTopic;
	document.getElementById("causesofdeath").onclick=changeTopic;
	document.getElementById("income").onclick=changeTopic;
	document.getElementById("socialsecurity").onclick=changeTopic;
		document.getElementById("education").onclick=changeTopic;
				document.getElementById("migration").onclick=changeTopic;
}
}