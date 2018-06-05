# Design
## Data
### Data sources
#### Main data set
[CBS Data per province](https://opendata.cbs.nl/statline/#/CBS/nl/dataset/70072ned/table?ts=1528142338597)
#### Map
I will either use the nld.json file from [this D3 visualization](http://bl.ocks.org/phil-pedruco/9344373) or use [datamaps](http://datamaps.github.io/).

### Data usage
The data from CBS can be downloaded as a CSV file. 10 files will be downloaded, one for each year (2006-2015).  
This is done since all visualizations will show the data for a chosen year. This will make searching through the files for a certain topic for a certain year a bit more efficient.  

The CSV files will be converted to JSON format using python. However, since the CSV files that are retrieved from CBS, they will have to be preprocessed manually. When downloaded, there are multiple "header rows" per column, since most values are taken from a topic and one or more subtopics. For instance, a part of the downloaded data looks like this:

	Onderwerpen	Bevolking
	Onderwerpen	Bevolkingssamenstelling op 1 januari
	Onderwerpen	Totale bevolking
	Onderwerpen	Totale bevolking
	Onderwerpen	Totale bevolking
	Onderwerpen	Totale bevolking
	Onderwerpen	Totale bevolking
Regio's	Perioden	aantal
Nederland	2015	16900726
Groningen (PV)	2015	583942



|         |Onderwerpen| Bevolking                            |
|         |Onderwerpen| Bevolkingssamenstelling op 1 januari |
|         |Onderwerpen| Totale Bevolking                     |
|         |Onderwerpen| Totale Bevolking                     |
|         |Onderwerpen| Totale Bevolking                     |
|         |Onderwerpen| Totale Bevolking                     |
|         |Onderwerpen| Totale Bevolking                     |
|Regio's  |Perioden   | Totale Bevolking                     |
|---------|-----------|--------------------------------------|
|Nederland|2006       | 16334210                             |
|Groningen|2006       | 574042                               |
      

In order to use the data for my visualizations, it will be converted to JSON format using a python script.
However, since the CSV data is not in the correct format to be transformed to an easily usable JSON file, the data has to be rearranged.
In addition, there is a lot of data on various subjects, for 10 years. Since all visualizations will show data for a chosen year, I have decided to create a JSON file for each year, in order to make searching through the files for a certain topic a bit more efficient. Thus, I will have 10 CSV files which will then be converted to JSON format.

## Components

### Function diagram
|Function Name           |Description                                                        |Filename   | 
|------------------------|-------------------------------------------------------------------|-----------|
|***Map***               |                                                                   |           |                               
|createMap               |creates the initial map                                            |map.js     | 
|updateMap               |updates the map                                                    |map.js     |
|                        |                                                                   |           |                               
|***Population Pyramid***|                                                                   |           |                               
|createPyramid           |creates the initial population pyramid                             |pyramid.js | 
|updatePyramid           |updates the population pyramid                                     |pyramid.js |
|                        |                                                                   |           |                               
|***Bar chart***         |                                                                   |           |                               
|createBarchart          |creates the initial bar chart                                      |barchart.js| 
|updateBarchart          |updates the bar chart                                              |barchart.js|
|                        |                                                                   |           |                               
|***General functions*** |                                                                   |           |                               
|getProvinceData (Optional)|retrieves the data for a chosen province                           |data.js    |
|***Event listeners***   |                                                                   |           |
|onClick                 |will update the visualizations when the map is clicked             |index.js   |
|onSelect                |will update the bar chart on dropdown selection                    |index.js   |
|onSlide                 |will update the visualizations when a year is chosen via the slider|index.js   |
                                          
Table 1: Diagram with components

### Program flow
- index.html is the main html file that will create the webpage.  
It will also call style.css, all scripts and plugins.  
- style.css contains the stylesheet for the webpage.
- index.js is the main script that will contain the flow of the program  
It will first load the data per year (10 json files) when the window is loaded (onload function) using D3 queue.  
Then (callback function) it will create the initial state of the visualization. It will first get the necessary data (Limburg and the Netherlands) with getProvinceDate. Then it will create the visualizations using createMap, createPyramid and createBarchart.  

Subsequently, a few events can happen:
1. a province on the map is clicked. This will call the onClick function, which will retrieve the required data using the getProvinceData function, and will then update the pyramid and barchart using the updatePyramid and updateBarchart functions.
2. a year is chosen using the slider. This will call the onSlide function, which will again retrieve the date using getProvinceData and create all visualizations using createMap, createPyramid, createBarchart.
3. a bar chart topic is chosen using the drop down menu. From the current data, the date from the selected topic will be retrieved, after which the bar chart will be updated using the updateBarchart function.
4. the user hovers over a datapoint of one of the visualizations. Using d3tip, a tooltip will be created. This is part of the functions that create/update the visualizations.

Note: the getProvinceData function is optional. It may not be necessary to have a separate function to retrieve a province's data. This will depend on possible duplicate code.

## Plugins/libraries
Required:
- d3 tip
- d3 queue
- d3 container
- d3 collections
- d3 legend
- topoJSON/datamaps
- bootstrap

Optional:
- d3 scale-chromatic
