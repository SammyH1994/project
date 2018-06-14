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