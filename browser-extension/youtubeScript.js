//global variables
var random_index = gen_random_index();
var slots_count = 0;
var thumbnail_src_idx = 0;
var title_href_count = 0;
var metadata_count = 0;


/* helpers */

// randomly generate a number from 1 to 3
function gen_random_index() {
  return Math.floor(Math.random() * 3) + 1;
}

// get index of the video of all suggested videos
function get_node_index(addedNode) {
  box = addedNode.closest('.style-scope.ytd-watch-next-secondary-results-renderer');
  //console.log(box);

  var index;

  if (box !== null){
    index = [].indexOf.call(box.parentNode.children, box);
    //console.log('(get_node_index) index: ' + index);
  }

  return index;
}

// generate tag for youtube url redirection/referencing
function generate_watch_tag(vidId) {
    tag = '/watch?v=' + vidId;
    //console.log(tag);
    return tag
};

/////

/* reload page if url changes */
var currentPage = window.location.href;
//listen for changes
setInterval(function(){
  if (currentPage != window.location.href)
  {
      // page has changed, set new page as 'current'
      currentPage = window.location.href;

      // reset global variables and generate new random index for replacement video
      console.log('url has changed');
      location.reload(true);
      random_index = gen_random_index();
      slots_count = 0;
      thumbnail_src_idx = 0;
      title_href_count = 0;
      metadata_count = 0;

      //alert('index is ' + random_index)
  }
}, 500);


// check for target elements' existence. passes to checkNode().
var init_observer = new MutationObserver(function(mutations){
  for (var i=0; i < mutations.length; i++){
    for (var j=0; j < mutations[i].addedNodes.length; j++){
      checkNode(mutations[i].addedNodes[j]);
    }
  }
});


// set mutation observer named init_observer
init_observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});


// does different stuff depending on what the node is
function checkNode(addedNode) {
  if (addedNode.nodeType === 1){

    // remove hover functionality of all videos
    if (addedNode.matches("ytd-moving-thumbnail-renderer")) {
      console.log("hover has loaded");
      console.log(addedNode);
      addedNode.remove();
    } 

    // detects creation of first 6 video thumbnail images. passes to change_thumbnail()
    if (addedNode.matches('ytd-compact-video-renderer #thumbnail #img')) {
      console.log("this simple thumbnail has initialized");
      //console.log(addedNode);

      index = get_node_index(addedNode);

      if (index !== null && (0 < index) && (index < 6)) {
        slots_count++;
        console.log(slots_count);
        // console.log(thumbnail_img_idx);
        // resetTimer();
        if (slots_count === 3) {
          //alert('thumbnails ready');
          change_thumbnail(random_index);
        }
      }
    }

    // detect and change href of thumbnail. could potentially be bundled in with thumbnail image change.
    if (addedNode.matches('ytd-compact-video-renderer .yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail')) {
      //console.log(addedNode);

      index = get_node_index(addedNode);
      if (index !== null && (0 < index) && (index < 6)) { 
        thumbnail_src_idx++;

        //thumbnail src callback
        if (thumbnail_src_idx === 3) {
            setTimeout(function(){
              console.log('changing thumbnail href');
              tag = generate_watch_tag('hY7m5jjJ9mM');

              div = document.querySelectorAll('ytd-compact-video-renderer .yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail')[random_index];
              div.setAttribute('href', tag);

              //console.log(div);

            }, 1000);

        }
      }
    }

    // detects creation of first 6 #dismissable elements
    if (addedNode.matches('ytd-compact-video-renderer #dismissable')) {
      index = get_node_index(addedNode);
      //console.log(index);
      if (index !== null && (0 < index) && (index < 6)) { 
        title_href_count++;
        metadata_count++;

        if (title_href_count === 3) {
          console.log('changing title')
          change_title(random_index);
        }

        if (metadata_count === 3) {
          console.log('changing metadata')
          change_metadata(random_index);
        }
      }
    }

  }
}
    //console.log(document.querySelector('.metadata.style-scope.ytd-compact-video-renderer'));

// Callback fxn which changes thumbnail after 1 sec delay
function change_thumbnail(r) {

  //alert('thumbnail callback');
  console.log('(change_thumbnail))');


    // Simulate a code delay
  setTimeout( function(){
    console.log('hello');
    //console.log(img);

    img = document.querySelectorAll('ytd-compact-video-renderer #thumbnail #img')[r];
    console.log(img);
    img.setAttribute('src', 'https://i.ytimg.com/vi/hY7m5jjJ9mM/default.jpg');
    console.log(img);
    //img.on('click', function(){console.log('hi')});
    //.on("click", function(){ myFunction(); });
    //img.setAttribute('class', 'inline-block style-scope ytd-thumbnail');

    // overlays = img.querySelector('ytd-thumbnail-overlay-side-panel-renderer');

    // if (overlays != null) {
    //   overlays.remove();
    //   console.log('removed overlay');
    // }

  }, 1000);


  setTimeout(function(){
    div = document.querySelectorAll('#thumbnail')[r];
    div.setAttribute('class', 'inline-block style-scope ytd-thumbnail');
    console.log(div);
    //div.css({"text-decoration":"none"});
  }, 1000);


}


function change_title(r) {
  setTimeout(function(){

//.yt-simple-endpoint.style-scope.ytd-compact-video-renderer

    console.log('(change_title))');
    console.log(r);

    tag = generate_watch_tag('hY7m5jjJ9mM');        
    div = document.querySelectorAll('.yt-simple-endpoint.style-scope.ytd-compact-video-renderer')[r];

    console.log(div);
    div.setAttribute('href', tag);

    // change video title
    title = div.querySelector('#video-title');
    title.setAttribute('title', rec_details['title']);
    title.setAttribute('aria-label', rec_details['title']);
    title.innerHTML = rec_details['title'];
    console.log(title)

    //remove badge renderer
    badge = div.querySelector('ytd-badge-supported-renderer');
    console.log('removing badge');
    if (badge != null) {
      badge.remove();
    }

    //div.setAttribute('class', 'style-scope ytd-compact-video-renderer');


  }, 1000);


  setTimeout(function(){
    div = document.querySelectorAll('.yt-simple-endpoint.style-scope.ytd-compact-video-renderer')[r];
    div.setAttribute('class', 'style-scope ytd-compact-video-renderer');
  }, 2000);
}



function change_metadata(r) {
  setTimeout(function(){

  console.log('changing metadata');
  div = document.querySelectorAll('ytd-compact-video-renderer .yt-simple-endpoint.style-scope.ytd-compact-video-renderer')[r];
  console.log(div);


  //remove badge renderer
  badge = div.querySelector('ytd-badge-supported-renderer');
  console.log(badge);
  if (badge != null) {
    badge.remove();
  }

  channel = div.querySelector('yt-formatted-string');
  channel.setAttribute('title', rec_details['channelTitle']);
  channel.innerHTML = rec_details['channelTitle'];

  metadata = div.querySelector('#metadata-line span');
  console.log(metadata);
  metadata.innerText = "Recommended for you";

  }, 1000);
}

/* sample data */

var rec_details = {
  'title': 'CATS will make you LAUGH YOUR HEAD OFF - Funny CAT compilation',
  'channelTitle': 'Tiger FunnyWorks',
  'videoId': 'hY7m5jjJ9mM',
  'thumbnails': {
    'default': {
        'url': 'https://i.ytimg.com/vi/hY7m5jjJ9mM/default.jpg',
        'width': 120,
        'height': 90
    }
  }
};
