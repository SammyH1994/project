# Design
## Data
### Data sources
#### Main data set
[CBS Data per province](https://opendata.cbs.nl/statline/#/CBS/nl/dataset/70072ned/table?ts=1528142338597)
#### Map
I will either use the nld.json file from [this D3 visualization](http://bl.ocks.org/phil-pedruco/9344373) or use [datamaps](http://datamaps.github.io/).

### Data usage
The data from CBS can be downloaded as a CSV file.
In order to use the data for my visualizations, it will be converted to JSON format using a python script.
However, since the CSV data is not in the correct format to be transformed to an easily usable JSON file, the data has to be rearranged.
In addition, there is a lot of data on various subjects, for 10 years. Since all visualizations will show data for a chosen year, I have decided to create a JSON file for each year, in order to make searching through the files for a certain topic a bit more efficient. Thus, I will have 10 CSV files which will then be converted to JSON format.

## Components

|Function Name           |Description                             | Filename              | 
|------------------------|----------------------------------------|-----------------------|
|***Map***               |                                        |                       |                                                 
|createMap               |creates the initial map                 |541                    | 
|updateMap               |updates the map                         |542                    |
|                        |                                        |                       |                                             
|***Population Pyramid***|                                        |                       |                                             
|createPyramid           |creates the initial population pyramid  |624                    | 
|updatePyramid           |updates the population pyramid          |629                    |
|                        |                                        |                       |                                            
|***Bar chart***         |                                        |                       |                                            
|createBarchart          |creates the initial bar chart           |1125                   | 
|updateBarchart          |updates the bar chart                   |1146                   |
|                        |                                        |                       |                                            
|***General functions*** |                                        |                       |                                             
|getProvinceData         |retrieves the data for a chosen province|1683                   |
                                          
Table 1: Diagram with components
## Plugins
