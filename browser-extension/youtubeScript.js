/* using jquery */
var f = (function(e){ 

	console.log(e)
	videos = document.querySelector("#related #items").children;


	vid = videos[0];
	console.log(vid);
	console.log(vid.getElementsByTagName("img"));
	thumbnail = vid.getElementsByTagName("img")[0];
	thumbnail.src = "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80";



	/* doesn't work for some reason */
	//console.log($('ytd_app').find('ytd-compact-video-renderer'));
	//console.log($('ytd_app').find('ytd-compact-video-renderer.style-scope.ytd-watch-next-secondary-results-renderer'));

/* thing im trying to find */
//<ytd-compact-video-renderer class="style-scope ytd-watch-next-secondary-results-renderer">;


});

setTimeout(f, 5000);