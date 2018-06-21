// so sick of string concatenation for translations
function translation(x,y) {
  return 'translate(' + x + ',' + y + ')';
}


function getProvinceData(data, province, topic = "", subtopic = ""){

	for (var i = 0; i < data.length; i++){

		// get data for an entire province
		if (data[i].province === province){
				if (arguments.length === 2){

					return data[i];
				}

				// get data for a certain topic
				else if (arguments.length == 3){
					return data[i][topic];
				}	


				// get value for a certain subtopic
				else if (arguments.length == 4){
					return data[i][topic][subtopic];
				}			
		}
	}
}

// Change values for causes of death, education and social security to be per 1000 people for better comparison
function changeDataValues(data){
	var topics = ["causesofdeath", "education", "socialsecurity"]

for (var i = 0; i < data.length; i++){
	population = data[i].population.total
	for (var j = 0; j < topics.length; j++){
		var subtopics = data[i][topics[j]]
		for (var key in subtopics){
			subtopics[key] = parseFloat(subtopics[key]/population*1000).toFixed(2);
		}
	}


}
}