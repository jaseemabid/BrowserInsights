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

	$("div#listGraph span#loadTime").html(parseInt(localStorage.analytics_loadTime / 1000));
	MyApp.dataInstance.on('LT',function(){
		$("div#listGraph span#loadTime").html(parseInt(localStorage.analytics_loadTime / 1000));
	});
	
	

});
