

/* using jquery */
$(document).ready(function(){
	//console.log($("ytd-watch-flexy.style-scope.ytd-page-manager.hide-skeleton"));

	//body = document.getElementsByTagName("body");
	//console.log(body);

	/* in plain javascript */
	// ytd_app_obj = document.getElementsByTagName('ytd-app');
	// console.log(ytd_app_obj);
	// console.log(typeof(ytd_app_obj));

	// ytd_app = ytd_app_obj[0];
	// console.log(ytd_app);

	/* same thing in jquery */
	wut = $('ytd-app');
	console.log(wut[0]);
	console.log(typeof(wut));
	console.log(typeof(wut[0]));

	huh = $('#content');
	console.log(huh);

	// huh = wut.getElementById('#content');
	// console.log(huh);
});
alert("hello1");

// x = divChild.getElementById("columns").getElementById("primary").getElementById("primary-inner").getElementById("related");
// y = x.getElementsByClassName("style-scope ytd-watch-flexy").getElementById("style-scope ytd-watch-next-secondary-results-renderer")[1];
// vid = y.getElementById("dismissable").getElementsByClassName("style-scope ytd-compact-video-renderer");

/* Note: neither of these work */
// content = ytd_app.querySelector('#content');
// console.log(content);

// content1 = document.querySelector('#content');
// console.log(content1);
//content = ytd_app.childNodes;
//console.log(content);


/* using jquery */
$(document).ready(function(){ 
	var ytd_app = $('ytd-app');

	console.log($('ytd-app'));
	console.log($('ytd-compact-video-renderer'));
	console.log($('div#contents.style-scope.ytd-compact-autoplay-renderer'));
	console.log(ytd_app.find('#contents.style-scope.ytd-compact-autoplay-renderer'));

	console.log(ytd_app.find('#content #page-manager'));

	//var ytd_app_obj = document.getElementsByTagName('ytd-app');
	//console.log($(ytd_app_obj).children('#content.style-scope.ytd-app'));
	//console.log($("#items").find("ytd-watch-next-secondary-results-renderer"));
	//console.log($('ytd-compact-video-renderer'));
	//console.log($(typeof('ytd-compact-video-renderer')));

	//console.log($('ytd-watch-next-secondary-results-renderer'));
// class: style-scope ytd-watch-next-secondary-results-renderer

//ytd-compact-video-renderer
//class="style-scope ytd-watch-next-secondary-results-renderer";


	//console.log($('ytd-compact-video-renderer[class^="style-scope ytd-watch-next-secondary-results-renderer"]'));
	//console.log($('ytd-app'))


});

