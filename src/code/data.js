/*
 *  Sammy Heutz
 *  10445765
 * 
 *  data.js contains helper functions for the visualizations.
**/


// Retrieve the data for a specific province
function getProvinceData(data, province){

	for (var i = 0; i < data.length; i++){
		if (data[i].province === province){
				return data[i];
			}
		}
	}


// Change values for causes of death, education and social security to be per 1000 people for better comparison
function changeDataValues(data){
	var topics = ["causesofdeath", "education", "socialsecurity"]

	for (var i = 0; i < data.length; i++){

		// Get population count per province
		population = data[i].population.total;

		for (var j = 0; j < topics.length; j++){

			// Get subtopic
			var subtopics = data[i][topics[j]];
			for (var key in subtopics){

				// Calculate ratio per 1000 people for each subtopic
				subtopics[key] = parseFloat(subtopics[key]/population*1000).toFixed(2);
			}
		}
	}
}


// Function for easier d3 translations
function translation(x,y) {
	return 'translate(' + x + ',' + y + ')';
}
