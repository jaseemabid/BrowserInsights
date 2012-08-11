// Backbone.js collections

/*globals MyApp, Backbone */

"use strict";
MyApp.Collections = {
	RawDataCollection : Backbone.Model.extend({
		model: MyApp.Model.RawData,
		initialize : function () {
		}
	})
};