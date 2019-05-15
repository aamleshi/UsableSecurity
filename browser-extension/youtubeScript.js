/* using jquery */
$(document).ready(function(){ 
	/* this worked once upon a time? */
	console.log($("ytd-app"));
	console.log($("ytd-app > div#content"));
	console.log($("ytd-compact-video-renderer.ytd-watch-next-secondary-results-renderer:not([expansion='collapsed']).ytd-watch-next-secondary-results-renderer"));

	/* doesn't work for some reason */
	//console.log($('ytd_app').find('ytd-compact-video-renderer'));
	//console.log($('ytd_app').find('ytd-compact-video-renderer.style-scope.ytd-watch-next-secondary-results-renderer'));

/* thing im trying to find */
//<ytd-compact-video-renderer class="style-scope ytd-watch-next-secondary-results-renderer">;


});