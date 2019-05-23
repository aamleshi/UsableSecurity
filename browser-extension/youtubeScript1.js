/* using jquery */

/* master function */
// change this to not be var?
var generate_all_recs = (function(e){ 

	// get container div
	videos = document.querySelector('#related #items').children;
	console.log(videos.length);

	// this is hardcoded; could generate random number for number children there are
	// this needs to get data from somewhere
	vid = videos[1];
	console.log(vid);
	console.log(vid.getElementsByTagName('img'));
	thumbnail = vid.getElementsByTagName('img')[0];
	thumbnail.src = 'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80';

	console.log(videos[2]);
	generate_rec(cats, videos[2]);


	//document.querySelectorAll("#related #items")[0].querySelector("#img")



});


// call after 5000 ms; TODO: check for changing content on YT and run fxn.
setTimeout(generate_all_recs, 5000);



//TODO: links are fucked up
//TODO: content and bkgd script should detect changing content on YT, which loads pages dynamically
//and causes problems. see: https://stackoverflow.com/questions/49665031/content-script-only-loading-on-reload-refresh
function generate_rec(rec_details, vid) {
	
	console.log(vid); 
	//console.log(rec_details['thumbnails']['default']['url']);
	thumbnail = vid.getElementsByTagName('img')[0];
	thumbnail.src = rec_details['thumbnails']['default']['url'];

	console.log(vid.getElementsByClassName("metadata style-scope ytd-compact-video-renderer"));
	metadata = vid.getElementsByClassName("metadata style-scope ytd-compact-video-renderer")[0];
	console.log(metadata);


	/* set new link  ??? */
	metadata.setAttribute('href', watch_tag);
	//x.getElementsByTagName("video-title")

	/* set new title */
	// get title div
	title_div = metadata.getElementsByClassName('yt-simple-endpoint style-scope ytd-compact-video-renderer')[0];
	title_div.setAttribute('href', watch_tag);

	// replace title in 2 other places
	title = metadata.getElementsByTagName("span")[0];
	title.setAttribute('video-title', rec_details['title']);
	title.setAttribute('aria-label', rec_details['title']);
	title.innerText = rec_details['title'];

	//get text that gives metadata such as viewcount
	text = metadata.getElementsByClassName('compact style-scope ytd-compact-video-renderer')[0];

	text_div = text.getElementsByTagName('div');
	console.log(text_div);

	// replace channel title
	text_div[1].getElementsByTagName('yt-formatted-string');
	text_div[1].getElementsByTagName('yt-formatted-string')[0].innerText = rec_details['channelTitle'];

	// Add 'recommended for you' blurb
	//TODO: make this not hardcoded
	text_div[6].innerText = "Recommended for you";

	/* gets rid of hover thumbnail of old vid */
	hover = vid.getElementsByTagName('a')[0].getElementsByTagName('div');
	console.log(hover);
	while (hover.length > 0) {
		console.log(hover[0]);
    	hover[0].remove();
	};

	/* set new link */
	link = vid.getElementsByTagName('a')[0];
	console.log(link);
	watch_tag = generate_watch_tag(rec_details['videoId']);
	link.setAttribute('href', watch_tag);


};

function generate_watch_tag(vidId) {
	tag = '/watch?v=' + vidId;
	console.log(tag);
	return tag
};



/* mock recommendation data */
var cats = {
  'title': 'CATS will make you LAUGH YOUR HEAD OFF - Funny CAT compilation',
  'channelTitle': 'Tiger FunnyWorks',
  'videoId': 'hY7m5jjJ9mM',
  'thumbnails': {
  	'default': {
  		'url': 'https://i.ytimg.com/vi/hY7m5jjJ9mM/default.jpg',
  		'width': 120,
  		'height': 90
  	}, 
  	'medium': {
  		'url': 'https://i.ytimg.com/vi/hY7m5jjJ9mM/mqdefault.jpg',
  		'width': 320,
  		'height': 180
  	},
  	'high': {
  		'url': 'https://i.ytimg.com/vi/hY7m5jjJ9mM/hqdefault.jpg',
  		'width': 480,
  		'height': 360
  	}
  }
};


/* note - careful not to touch 'mix', which is the 1st recommended vid*/
