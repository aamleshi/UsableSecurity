//global variable
var random_index = gen_random_index();
//alert('index is ' + random_index)

function gen_random_index() {
  return Math.floor(Math.random() * 3) + 1;
}

/* reload page */
var currentPage = window.location.href;
//listen for changes
setInterval(function()
{
  if (currentPage != window.location.href)
  {
      // page has changed, set new page as 'current'
      currentPage = window.location.href;

      // do your thing...
      console.log('url has changed');
      location.reload(true);
      random_index = gen_random_index();
      //alert('index is ' + random_index)
  }
}, 500);



/* helpers */
var thumbnail_img_idx = [];
var thumbnail_src_idx = 0;
var title_href_count = 0;

function get_node_index(addedNode) {
  box = addedNode.closest('.style-scope.ytd-watch-next-secondary-results-renderer');
  //console.log(box);

  var index;

  if (box !== null){
    index = [].indexOf.call(box.parentNode.children, box);
    console.log('(get_node_index) index: ' + index);
  }

  return index;
}

function generate_watch_tag(vidId) {
    tag = '/watch?v=' + vidId;
    //console.log(tag);
    return tag
};



// Define callback function to get notified on changes
function thumbnail_callback() {
    // do something
  //alert('thumbnail callback');
  console.log('callback');


    // Simulate a code delay
  setTimeout( function(){
    console.log('hello');
    //console.log(img);

    img = document.querySelectorAll('#thumbnail #img')[random_index];
    console.log(img);
    img.setAttribute('src', 'https://i.ytimg.com/vi/hY7m5jjJ9mM/default.jpg');

    console.log(img);

  }, 1000);


}


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



function checkNode(addedNode) {
  if (addedNode.nodeType === 1){

    if (addedNode.matches("ytd-moving-thumbnail-renderer")) {
      console.log("hover has loaded");
      console.log(addedNode);
      addedNode.remove();
    // console.log(addedNode.parentElement);
    // addedNode.parentElement.remove();

    } 

    if (addedNode.matches('#thumbnail #img')) {
      console.log("this simple thumbnail has initialized");
      console.log(addedNode);

      index = get_node_index(addedNode);

      if (index !== null && (0 < index) && (index < 4)) {
        thumbnail_img_idx.push(index);
        // console.log(thumbnail_img_idx);
        // resetTimer();
        if (thumbnail_img_idx.length === 3) {
          //alert('thumbnails ready');
          console.log(thumbnail_img_idx);
          thumbnail_callback();
        }
      }
    }

    if (addedNode.matches('.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail')) {
      //console.log(addedNode);

      index = get_node_index(addedNode);
      if (index !== null && (0 < index) && (index < 4)) { 
        thumbnail_src_idx++;

        //thumbnail src callback
        if (thumbnail_src_idx === 3) {
            setTimeout(function(){
              console.log('changing thumbnail href');
              tag = generate_watch_tag('hY7m5jjJ9mM');

              div = document.querySelectorAll('.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail')[random_index];
              div.setAttribute('href', tag);

              //console.log(div);

            }, 1000);

        }
      }
    }


    if (addedNode.matches('#dismissable')) {
      // console.log(addedNode);
      // console.log(addedNode.querySelector('.yt-simple-endpoint.style-scope.ytd-compact-video-renderer'));

      index = get_node_index(addedNode);
      //console.log(index);
      if (index !== null && (0 < index) && (index < 4)) { 
        title_href_count++;

        if (title_href_count === 3) {
          console.log('changing title and src')
          change_title();
        }
      }

    }


  }
}
    //console.log(document.querySelector('.metadata.style-scope.ytd-compact-video-renderer'));

function change_title() {
      setTimeout(function(){
        console.log('changing title href');

        tag = generate_watch_tag('hY7m5jjJ9mM');        
        div = document.querySelectorAll('.yt-simple-endpoint.style-scope.ytd-compact-video-renderer')[random_index];
        console.log(div);
        div.setAttribute('href', tag);



      }, 5000);
}


// if (thumbnails_ready === true) {
//   alert('true');
//   videos = videos = document.querySelector('.style-scope.ytd-watch-next-secondary-results-renderer').children;
//   // console.log(videos.length);
//    console.log(videos);
// }
