/* Backbone.js views */

/*globals MyApp, Backbone, $, _ */

"use strict";
MyApp.Views = {
	TopSitesView : Backbone.View.extend({
		id : "inlineGraph1",
		title : "Top visited sites",
		initialize : function () {
			this.render();
		},
		_data : function (m,n) {
			var top = MyApp.dataInstance.get('mostVisited').slice(m,n);
			console.log("top", top);
			var data1 = _.map(top, function(i) {return [i.key, i.value]; });
			return [data1];
		},
		render : function () {

			var that = this,
				plot = $.jqplot(that.id, that._data(0,5), {
					title : that.title,
					textColor : "#ff0000",
					grid : {
						drawGridLines	: false,
						shadow			: false,
						borderWidth		: 0,
						background		: '#efefef',
						borderColor		: '#fffff'
					},
					seriesDefaults: {
						// Make this a pie chart.
						renderer: $.jqplot.PieRenderer,
						rendererOptions : {
							showDataLabels : true
						}
					},
					legend : {
						show			: true,
						location		: 'e'
					}
				});

			var map = _.map(that._data(6,10)[0], function(i) {
				return i[0];
			});

			$("ul#metricsList").append(
				["<li><a>Other top sites you visited are ", map.join(', '),  " etc.</a></li>"].join("")
			);

		}
	}),
	PagesPerTimeView : Backbone.View.extend({
		id : "bigNumPlot",
		className : "offset2 span4 small",
		title : "Pages visited per minute",
		_data : function () {
			return [[3, 7, 9, 1, 4, 6, 8, 2, 5]];
		},
		initialize : function () {
			console.log("Bind event here");
			this.render();
		},
		render : function () {
			var plot = $.jqplot(this.id, this._data(), {
				title : this.title,
				grid : {
					drawGridLines	: false,
					shadow			: false,
					borderWidth		: 0,
					background		: '#efefef',
					borderColor		: '#fffff'
				},
				axes : {
					xaxis : {
						renderer			: $.jqplot.CategoryAxisRenderer,
						showTickMarks		: false,
						showTicks			: false
					},
					yaxis : {
						showTickMarks : true,
						showTicks : true
					}
				}
			});
			$("div#bigNumGraph span.num").html(_.last(this._data()[0]));
		}
	}),
	ScatterPlotView : Backbone.View.extend({
		id : "inlineGraph2",
		title : "Browsing activity",
		_data : function () {
			var data = this.model.get('punchcard'),
				vals =  _.values(data),
				ret = [];
			_.each(vals, function(val){
				ret.push( _.values(val));
			});
			return ret;
		},
		initialize : function () {
			console.log("Bind event here");
			this.render();
		},
		render : function () {

			var that = this;
			MyApp.data = [];

			_(7).times(function (i) {
				_(24).times(function (j) {
					var d = that._data();
					MyApp.data.push(d[i][j]);
				});
			});

			MyApp.data = _.map(MyApp.data, function(i) { return ((i*i)/12); });
			console.log("wd" , MyApp.data);
			dots();
		}
	})


};
