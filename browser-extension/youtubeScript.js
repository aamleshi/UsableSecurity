
/* reload page */
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


/* helpers */
var thumbnail_img_idx = [];

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


// Define callback function to get notified on changes
function thumbnail_callback(array) {
    // do something
  alert('thumbnail callback');
  console.log('callback');


    // Simulate a code delay
  setTimeout( function(){
    console.log('hello');

    random_index = Math.floor(Math.random() * (3) + 1);
    img = document.querySelectorAll('#thumbnail #img')[random_index];
    img.setAttribute('src', 'https://i.ytimg.com/vi/hY7m5jjJ9mM/default.jpg');

    console.log(img);

  }, 500 );


  // console.log(videos.length);
  //console.log(videos);
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
          alert('thumbnails ready');
          console.log(thumbnail_img_idx);
          thumbnail_callback(thumbnail_img_idx);
        }
      }
    }
      
  }
}

// if (thumbnails_ready === true) {
//   alert('true');
//   videos = videos = document.querySelector('.style-scope.ytd-watch-next-secondary-results-renderer').children;
//   // console.log(videos.length);
//    console.log(videos);
// }
