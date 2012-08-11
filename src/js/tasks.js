if(!localStorage.hasOwnProperty("analytics_loadTime")){
	localStorage["analytics_loadTime"]=0;
}
else{
	chrome.webNavigation.onCompleted.addListener(function(data){
		var p = window.performance.timing;
		localStorage.analytics_loadTime=(p.domComplete-p.navigationStart)+parseInt(localStorage.analytics_loadTime);
		console.log(localStorage.analytics_loadTime);
	});
};
