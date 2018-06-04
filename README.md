# Project Proposal
Sammy Heutz  
Programmeerproject 
Minor Programmeren UvA 2018  


## Problem Statement
Recently, it became known that the number of baby's born with a birth defect is alarmingly higher in Limburg than in any other province of the Netherlands: 3.84% in Limburg compared to the national average of 2.84% ([Source](https://www.limburger.nl/cnt/dmf20180524_00062550/alarmerend-meer-baby-s-met-afwijkingen-in-limburg)). 

This raises the question of how Limburg is different from other provinces in the Netherlands, and what the potential reasons for this difference in baby's born with a birth defect are. 

Is Limburg, for instance, different in population structure, income, social security, environment etc?

This question is interesting not only for the population of Limburg (and specifically those who have or wish to start a family there), but also for potential future residents of Limburg who are trying to decide where in the Netherlands they want to settle.

## Solution
This visualization aims to compare Limburg to the other provinces of the Netherlands with regards to several variables: population size, population structure, births and deaths, migration background, causes of death, work, income, social security, education, traffic and transport, environment, and soil use. 

This will be accomplished by having three interactive visualizations: a map of the Netherlands that vidsualizes relative population size per province, two population pyramids that compare Limburg to a certain province that is chosen by clicking on the map, and a grouped barchart that shows the variables of a chosen topic for both Limburg and a chosen province of the map. A sketch of the visualization can be found below.

<img src="https://github.com/SammyH1994/project/blob/master/doc/sketch.png" />
Image 1: sketch of visualization

### Visualization features
- A year between 2005 and 2015 can be chosen using the slider. This will change all three visualizations to show the data for the respective year. If data for a certain year is unavailable, the user will be notified.
- The map shows the relative population size per province of the Netherlands. On hover, the province will be highlighted and the percentage will be shown in a d3 tip.
- If a province on the map is clicked, both the population pyramid and the bar chart will be updated for the chosen province. This province is then compared to Limburg in the two visualizations.
- If Limburg is clicked, the population pyramid and bar chart will show the values for the average of the Netherlands compared to Limburg.
- The population pyramid shows the population structure (per age and per gender) for Limburg and the chosen province.
- The grouped bar chart shows data on a topic that is chosen using the drop-down menu, for both Limburg and the chosen province. Each topic has a few related variables. For instance, births vs deaths has information on both births and deaths, and migration background has information about the total amount of immigrants and the amount of both Western and non-Western immigrants. 

## Prerequisites



https://www.limburger.nl/cnt/dmf20180524_00062550/alarmerend-meer-baby-s-met-afwijkingen-in-limburg
http://statline.cbs.nl
https://www.waarstaatjegemeente.nl/
