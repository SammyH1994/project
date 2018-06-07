window.onload = function() {
	
	var data2006 = "data_2006.json";
	var data2007 = "data_2007.json";
	var data2008 = "data_2008.json";
	var data2009 = "data_2009.json";
	var data2010 = "data_2010.json";
	var data2011 = "data_2011.json";
	var data2012 = "data_2012.json";
	var data2013 = "data_2013.json";
	var data2014 = "data_2014.json";
	var data2015 = "data_2015.json";
	var nld = "nld.json"

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

	console.log(data2006);
	console.log(data2006.data_2006["0"].population.female);


	createMap(nld);



var slider = document.getElementById("myRange");
var output = document.getElementById("year");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

}
}