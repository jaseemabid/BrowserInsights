/* Backbone.js models */

/*globals MyApp, Backbone */

"use strict";
MyApp.Models = {
	RawData : Backbone.Model.extend({
		initialize : function () {
		var microsecondsPerYear = 1000 * 60 * 60 * 24 * 7*365;
		var oneYearAgo = (new Date).getTime() - microsecondsPerYear;

		/**
		* URL and Frequency! 
		* Punchcard!
		* All unique Domain names and their frequency or a year!
		*/
		chrome.history.search({
				'text': '',				// Return every history item....
				'startTime': oneYearAgo,	// that was accessed less than one week ago.
				'maxResults' : 100000
			},
			function(historyItems) {
				var re=/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
				var mostVisited={};
				var punchcard={};
				console.log("abc");
				for (var i = 0; i < historyItems.length; ++i) {
						//console.log(historyItems[i].url);
						var a = re.exec(historyItems[i].url);
						var lvt = historyItems[i].lastVisitTime;
						var d = new Date();
						d.setTime(lvt*1000);
						d.toUTCString();
						//console.log(d);
						var day = d.getDay()+"";
						var time = d.getHours()+"";
						if(!punchcard.hasOwnProperty(day)){
							punchcard[day]={};
						}
						if(!punchcard[day].hasOwnProperty(time)){
							punchcard[day][time]=0;
						}else{
							punchcard[day][time]+=1;
						}
						try{
							if(mostVisited.hasOwnProperty(a[3])){
								mostVisited[a[3]]+=historyItems[i].visitCount;
							}
							else{
								mostVisited[a[3]]=historyItems[i].visitCount;
							}
						}
						catch(e){	}
				}
				this['mostVisited'] = mostVisited;
				console.log("Most Visited", mostVisited);
				this['punchcard'] = punchcard;
				console.log('Punchcard', punchcard);
				console.log(punchcard);
			});
		}
	})
};

