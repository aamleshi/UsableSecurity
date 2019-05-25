
/* check for url changes */
// store url on load
var currentPage = window.location.href;

// listen for changes
setInterval(function()
{
    if (currentPage != window.location.href)
    {
        // page has changed, set new page as 'current'
        currentPage = window.location.href;

        // do your thing...
        console.log('url has changed');
        //location.reload(true);
    }
}, 500);


/* check for target elements' existence. waits a calibrated amount to alter stuff */

var init_observer = new MutationObserver(function(mutations){
  for (var i=0; i < mutations.length; i++){
    for (var j=0; j < mutations[i].addedNodes.length; j++){
      checkNode(mutations[i].addedNodes[j]);
    }
  }
});


init_observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});


checkNode = function(addedNode) {
    if (addedNode.nodeType === 1){
    // if (addedNode.matches('.style-scope.ytd-watch-next-secondary-results-renderer')) {
    //  console.log(addedNode);
    //  index = [].indexOf.call(addedNode.parentNode.children, addedNode);
    //  console.log(index);
    // }

        if (addedNode.matches("ytd-moving-thumbnail-renderer")) {
            console.log("hover has loaded");
            console.log(addedNode);
            addedNode.remove();
            // console.log(addedNode.parentElement);
            // addedNode.parentElement.remove();

        } else if (addedNode.matches('#thumbnail #img')) {
            console.log("this simple thumbnail has initialized");
            console.log(addedNode);


            index = get_node_index(addedNode);


            if (index !== null && (0 < index) && (index < 4)) {
              console.log('index is between 0 and 4');
              overlays = addedNode.querySelector('#overlays');
              console.log(overlays);
            }

            /* check metadata */
        } 

        // if (addedNode.matches('#thumbnail #overlays')) {
        //     console.log(addedNode);
        // } 


        if (addedNode.matches(".yt-simple-endpoint.style-scope.ytd-compact-video-renderer")) {
            var tag = generate_watch_tag(rec_details['videoId']);
            console.log(tag);

            addedNode.setAttribute('href', tag);
            //console.log(addedNode.querySelector("#video-title"))
            // addedNode.setAttribute(href,tag);
            // title = addedNode;
            // title.setAttribute('title', rec_details['title']);
            // title.innerHTML = rec_details['title'];
        } 

        if (addedNode.matches('.yt-simple-endpoint.style-scope.ytd-compact-radio-renderer')) {
            // index = get_node_index(addedNode);
            
            // if (index !== null && (0 < index) && (index < 4)) {
            //   console.log(addedNode);
            // }

            console.log(addedNode);

        }
    }
}

        // overlay = addedNode.querySelector("overlays");
        // console.log(overlay);


//MutationRecord.addedNodes
// #thumbnail.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail
//.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail

/* tools */
function generate_watch_tag(vidId) {
    tag = '/watch?v=' + vidId;
    //console.log(tag);
    return tag
};

function change_thumbnail() {

}

function get_node_index(addedNode) {
  box = addedNode.closest('.style-scope.ytd-watch-next-secondary-results-renderer');
  console.log(box);

  var index;

  if (box !== null){
    index = [].indexOf.call(box.parentNode.children, box);
    console.log(index);
  }

  return index;
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
