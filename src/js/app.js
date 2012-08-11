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
	});
});
