---
title: "Stock Market Price Prediction"
layout: post
---

Attained A grade using Python to predict future price of stock. Used packages such as Tensorflow, Sklearn and Matplotlib. Project was done over Google Colab. This project was done as the coursework to an Artificial Intelligence module. 🤖

I was mainly in charge with the formulation of the method and Neural Networks part of the project.  


## The Project
In this project, we used variants of regression as benchmark models, followed by exploring the use of [decision tree algorithms](https://scikit-learn.org/stable/modules/tree.html) followed by [SVM](https://scikit-learn.org/stable/modules/svm.html), given the high dimensionality in stock markets. We then make use of Neural Networks, [RNN](https://en.wikipedia.org/wiki/Recurrent_neural_network) and [LSTM](https://en.wikipedia.org/wiki/Long_short-term_memory) specifically, since stock markets are time series in nature.

## Methodology 
Firstly, we analysed related studies to arrive with the above algorithms and understand the previous research better.

Secondly, we obtained historical data on the S&P index and its constituent stocks followed by created moving averages for this data and normalising them. The dataset was then split into training and testing sets.

![LSTM RNN results](/assets/lstmRnnValid.png)

Next, we conducted exploratory analysis by plotting out all fluctuation of stocks, cumulative returns and followed by a PCA analysis to elucidate the underlying stock which explains the most variance of the S&P. This is used to pick out stocks of interest.

![EXploratory analysis](/assets/PISPexploratory.png)

We then transformed the data to make it easier to work with, and also create some features such as the moving averages to help us with our analysis. 
Next, the above methods(Random Forest, XGBoost, Regressions [Simple, Lasso, ridge, support vector], Neural networks[RNN, LSTM]) were applied on the training set and validated with the testing set. We compared the results against each other and found that LSTM was the best model that was tested in this project, given its lower [MAPE](https://en.wikipedia.org/wiki/Mean_absolute_percentage_error) value.  

![Project results](/assets/PISPresults.png)

We then gave a presentation to a panel of judges, concluding the project. 

Thanks for reading!
After this project, I have done many projects such as Temasek Stock Pitch Competition or Automation with Python! Click [here](https://justin-czk.github.io/blog/) to find out more!
