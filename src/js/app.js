// App init

/*globals MyApp, Backbone, $, _ */

$(function () {
	"use strict";
	MyApp.top = new MyApp.Views.TopSitesView();
	MyApp.activity = new MyApp.Views.PagesPerTimeView();
});
