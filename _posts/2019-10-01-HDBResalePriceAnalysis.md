---
layout: post
title: "HDB Resale Price Analysis"
---

![HDB Resale](/assets/HDBresale_jiachen-lin-unsplash.jpg)

This is an individual project done to research and model the Singaporean HDB Resale Market using R, attaining A grade.


## The Project
In this project, I used methods such as regression, clustering and PCA, etc. to model and predict the HDB resale prices, given a set of parameters for the resale unit. 

Firstly, data from <a href="https://data.gov.sg/" target="_blank">data.gov.sg</a> was cleaned and prepared for analysis. Some summary statistics was produced so that I can have a better understanding of the data.

Example:

![HDB Resale](/assets/HDBresaleBoxplot.png)

This visualization gave me an interesting result. The boxplot notch of NSL does not overlap with notches of every other line, telling us that it is highly like that its median price differs from the rest, which are not significantly different. This could be due to NSL tend to be far from the CBD. The max value of TEL is also significantly lower than the rest, possibly due to the smaller sample size because TEL is relatively new and less developed.

Secondly, I produced a linear model as a benchmark by using a <a href="https://www.r-bloggers.com/2021/04/decision-trees-in-r/" target="_blank">decision tree</a> to check for useful predictors and <a href = "https://en.wikipedia.org/wiki/Cross-validation_(statistics)" target="_blank">cross-validation</a> to decide on the degree of polynomial I use as my regression model.

<div class="row">
    <div class="column">
        <img src="/assets/HDBresaleHierarchical.png" alt="Hierarchical Clustering forms 4 groups" title="Hierarchical Clustering Results">
    </div>
    <div class="column">
        <img src="/assets/HDBresaleKmeans.png" alt="K-means CLustering forms 4 groups" title="K-means clustering Results">
    </div> 
</div>

Next, I use some unsupervised learning methods such as <a href="https://en.wikipedia.org/wiki/Hierarchical_clustering" target="_blank">Hierarchical clustering</a> and <a href="https://en.wikipedia.org/wiki/K-means_clustering" target="_blank">K-means Clustering</a>. Allowing us to get more insights to our data. 
For example, Both Methods produce 4 groups. K-means Clustering(Right graph above) shows that HDBs with small floor area tend to have low resale price(blue). There is also a group in the middle of the plot(green). These could be the average HDB. Those with high floor area  generally have higher resale prices(purple), but some have lower resale prices that is near the median value. There is also a group with high resale price without as much floor area(red).  This could be due to red being in prime locations such as being very near CBD while purple may be in non-mature/less desired locations.

Thirdly, I explore the use of <a href="https://www.r-bloggers.com/2021/04/decision-trees-in-r/" target="_blank">Decision Trees</a>, <a href="https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm" target="_blank">KNN</a>, <a href="https://en.wikipedia.org/wiki/Principal_component_analysis" target="_blank">PCA</a> and <a href="https://en.wikipedia.org/wiki/Naive_Bayes_classifier" target="_blank">NB</a> to compared them to our benchmark model using <a href = "https://en.wikipedia.org/wiki/Mean_squared_error" target="_blank">MSE</a> metric. Classification methods like NB was compared with a <a href = "https://en.wikipedia.org/wiki/Confusion_matrix" target="_blank">confusion martix</a>. Results were documented and a succint report was produced. You may click <a href = "/assets/HDB-Resale-Prices-Report-JustinCheong.pdf" download="HDB-Resale-Project-Justin-Cheong">here</a> to download a pdf copy. 

Thanks for reading!
After this project, I have done many projects such as visualization with ggplot2 and Tableau! Click <a href = "https://justin-czk.github.io/blog/">here</a> to find out more!
