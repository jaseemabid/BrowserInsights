/*global $ */

$(function () {
	"use strict";
	var data = [
		['google.com', 12],
		['facebook.com', 9],
		['hackernews', 14],
		['en.wikipedia.com', 16],
		['twitter.com', 7],
		['Yahoo!', 9]
	],
		topSitesPlot = $.jqplot('inlineGraph1', [data], {
			title : {
				'text' : 'Top visited sites'
			},
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
					// Put data labels on the pie slices.
					// By default, labels show the percentage of the slice.
					showDataLabels : true
				}
			},
			legend : {
				show			: true,
				location		: 'e'
			}
		}),

		plot1 = $.jqplot('bigNumPlot', [[3, 7, 9, 1, 4, 6, 8, 2, 5]], {
			title : "Pages visited per minute",
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
});