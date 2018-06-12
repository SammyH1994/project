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


	datatest = data2010.data_2010


	createMap(nld, datatest, "2010");



var slider = document.getElementById("myRange");
var output = document.getElementById("year");
output.innerHTML = slider.value;

slider.oninput = function() {
	year = this.value
  	output.innerHTML = year

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

  	data = years[year]
  	document.getElementById("container").innerHTML = "";
  	createMap(nld, data, year)


}

}
}