// App init

/*globals MyApp, Backbone, $, _ */

$(function () {
	"use strict";

	MyApp.dataInstance = new MyApp.Models.RawData();

	MyApp.activity = new MyApp.Views.PagesPerTimeView();

	MyApp.dataInstance.on("history", function() {
		MyApp.scatter = new MyApp.Views.ScatterPlotView({
			model : MyApp.dataInstance
		});

		MyApp.top = new MyApp.Views.TopSitesView({
			model : MyApp.dataInstance
		});


	});

	MyApp.dataInstance.on('LT',function(){
		console.log("Triggered. Load Time : ", localStorage.analytics_loadTime);
	});
});
