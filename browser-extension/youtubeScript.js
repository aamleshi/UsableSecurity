

var init_observer = new MutationObserver(function(mutations){
  for (var i=0; i < mutations.length; i++){
    for (var j=0; j < mutations[i].addedNodes.length; j++){
      checkNode(mutations[i].addedNodes[j]);
      //checkMovingTHumbnail(mutations[i].addedNodes[j]);
      	//remove overlays for our suggestions
      //checkMetadata
    }
  }

});

init_observer.observe(document.documentElement, {
  childList: true,
  subtree: true
});

checkNode = function(addedNode) {
  if (addedNode.nodeType === 1){
    if (addedNode.matches('.yt-simple-endpoint.inline-block.style-scope.ytd-thumbnail')){
    	console.log("this simple thumbnail has initialized");
    	console.log(addedNode);
      //SmartUnderline.init(addedNode);

      	//addedNode.href = "hello";

    }

    else if (addedNode.matches('#related #items #dismissable #thumbnail')) {
    	console.log("moving thumbnail has rendered");
    	console.log(addedNode);
    	//set or disable moving thumbnail
    }
  }
}

// var foo = document.querySelector("#related #items #dismissable .yt-simple-endpoint.style-scope.ytd-compact-video-renderer");

// var change_observer = new MutationObserver(function(mutations){
//   // for (var i=0; i < mutations.length; i++){
//   //   for (var j=0; j < mutations[i].addedNodes.length; j++){
//   //     checkNodeB(mutations[i].addedNodes[j]);
//   //   }
//   // }
// 	mutations.forEach(function(mutation) {
// 	  console.log(mutation.attributeName + ' changed from ' +
// 	              '"' + mutation.oldValue + '" to "' +
// 	              mutation.target.getAttribute(mutation.attributeName) + '"');
// 	});
// });

// change_observer.observe(foo, {
//   attributes: true,
//   attributeOldValue: true
// });


// checkNodeB = function(addedNode) {
//   if (addedNode.nodeType === 1 && addedNode.className === 'yt-simple-endpoint style-scope ytd-compact-video-renderer'){
//     //addedNode.src = optimizeSrc(addedNode.src)
//     console.log('change detected');
//   }
// }

// optimizeSrc = function(src) {
//   console.log("optimizeSrc");
// }


// function set_var() {
// 	var videos = document.querySelector("#related #items #dismissable");
// 	var foo = document.querySelector("#related #items #dismissable .yt-simple-endpoint.style-scope.ytd-compact-video-renderer");

// }
