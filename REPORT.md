# Report 

## Description
Recently, it became known that the number of baby's born with a birth defect is alarmingly higher in Limburg than in any other province of the Netherlands: 3.84% in Limburg compared to the national average of 2.84% (Source).

This raises the question of how Limburg is different from other provinces in the Netherlands, and what the potential reasons for this difference in the number of baby's born with a birth defect are.

Is Limburg, for instance, different in population structure, income, social security, or any other factor?

This visualization explores the differences between Limburg and the rest of the Netherlands on a number of different topics: population size, population structure, amounts of births and deaths, causes of death, income, social security, education, and migration.

This is accomplished with three visualizations: a map with population size per province, a population pyramid with the relative population per age group for Limburg and a chosen province, and a grouped bar chart that uses a dropdown to display the differences between Limburg and a chosen province on a chosen topic. 

Below you can find a screenshot of the visualizations.

<img src="https://github.com/SammyH1994/project/blob/master/doc/screenshot1.png" />
Image 1: Screenshot of application

## Technical design
The website starts on the homepage, where a small explanation is given and a simple barchart displays the difference in birth defects between Limburg and the Netherlands.
The user can navigate between the home page, visualizations, about section and to my github source page.

On the visualizations page, the user first sees a small text explanation about the page. Then, using a scroll button, the user can scroll down to the first visualization: the map of the Netherlands containing the population size per province. Using the slider, a year between 2006 and 2015 can be chosen, which will change the map.

The user can then click on the map, choosing a province of interest. When clicking on the map, the page will scroll down to the second and third visualizations: the pyramid and the barchart. Limburg will then be compared with the chosen province (If Limburg is clicked, the whole Netherlands will be used for comparison). These two charts can also be updated by choosing a year using the slider. Additionally, in the bar chart the user is able to choose a topic using the drop down menu. 

The user can scroll back to the map using the pink scroll button. 

Below the map and the pyramid, the user can click the button "Extra information". This button creates a pop up window with additional information about the population pyramid and the barchart.

When no data is available, an alert message is shown (this only happens with "social security" barchart data for the year 2006.

In order to implement the functionality in my code, several javascript files with different functionality have been implemented, consisting of several functions. 
These are shown in the table below.

## Challenges
Clearly describe challenges that your have met during development. Document all important changes that your have made with regard to your design document (from the PROCESS.md). Here, we can see how much you have learned in the past month.

## Decisions
Defend your decisions by writing an argument of a most a single paragraph. Why was it good to do it different than you thought before? Are there trade-offs for your current solution? In an ideal world, given much more time, would you choose another solution?

