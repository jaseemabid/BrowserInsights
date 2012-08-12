/* Backbone.js models */

/*globals MyApp, Backbone, chrome */

"use strict";
MyApp.Models = {
	RawData : Backbone.Model.extend({
		defaults: {
			"mostVisited":  {},
			"punchcard": {}
		},
		initialize : function () {
			var microsecondsPerYear = 1000 * 60 * 60 * 24 * 7,
				oneYearAgo = (new Date()).getTime() - microsecondsPerYear,
				that = this;

			/**
			 * URL and Frequency!
			 * Punchcard!
			 * All unique Domain names and their frequency or a year!
			 */

			chrome.history.search({
				'text'			: '',			// Return every history item....
				'startTime'		: oneYearAgo,	// that was accessed less than one week ago.
				'maxResults'	: 100000
			}, function (historyItems) {
				function compare(a,b){if(a.value>b.value){return -1;}else if(a.value<b.value){return 1;}else{return 0;}};
				var re = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/,
					mostVisited = {},
					punchcard = {},
					i,
					a,
					lvt,
					d,
					day,
					time,
					sorted;
				for (i = 0; i < historyItems.length; ++i) {
					//console.log(historyItems[i].url);
					a = re.exec(historyItems[i].url);
					lvt = historyItems[i].lastVisitTime;
					d = new Date();
					d.setTime(lvt * 1000);
					d.toUTCString();
					//console.log(d);
					day = d.getDay() + "";
					time = d.getHours() + "";
					if (!punchcard.hasOwnProperty(day)) {
						punchcard[day] = {};
					}
					if (!punchcard[day].hasOwnProperty(time)) {
						punchcard[day][time] = 0;
					} else {
						punchcard[day][time] += 1;
					}
					try {
						if (mostVisited.hasOwnProperty(a[3])) {
							mostVisited[a[3]] += historyItems[i].visitCount;
						} else {
							mostVisited[a[3]] = historyItems[i].visitCount;
						}
					}
					catch (e) {
					}
					sorted=[];
					for(key in mostVisited){
						d={'key':key,'value':mostVisited[key]};
						sorted.push(d);
					}

					sorted.sort(compare);
				}
				that.set({
					mostVisited : sorted,
					punchcard : punchcard,
					totalLoadTime : localStorage.analytics_loadTime
				});
				that.trigger("history");
				console.log("Total Load Time", localStorage.analytics_loadTime);
			});
		}
	})
};
