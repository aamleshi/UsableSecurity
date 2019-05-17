/* using jquery */
var f = (function(e){ 

	console.log(e)
	videos = document.querySelector("#related #items").children;


	vid = videos[1];
	console.log(vid);
	console.log(vid.getElementsByTagName("img"));
	thumbnail = vid.getElementsByTagName("img")[0];
	thumbnail.src = "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80";

});

setTimeout(f, 5000);



/* note - careful not to touch 'mix', which is the 1st recommended vid*/
