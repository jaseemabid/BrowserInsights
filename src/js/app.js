// App init

/*globals MyApp, Backbone, $, _ */

$(function () {
	"use strict";
	MyApp.top = new MyApp.Views.TopSitesView();
	MyApp.activity = new MyApp.Views.PagesPerTimeView();
	MyApp.data = new MyApp.Models.RawData();


	MyApp.data.on("history", function() {
		MyApp.scatter = new MyApp.Views.ScatterPlotView({
			model : MyApp.data
		});

	MyApp.data.on('LT',function(){
		console.log("Triggered. Load Time : ", localStorage.analytics_loadTime);
	});
});
