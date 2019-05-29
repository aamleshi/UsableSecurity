// remove all overlays
// alter thumbnail
// alter metadata

//chrome.window.onDOMContentLoaded.addListener(make_suggestions);


// function make_suggestions() {
// 	document.querySelector("#related #items").querySelectorAll("#dismissable");
// };


console.log(document.readystate);

if(document.readyState !== 'complete') {
    window.addEventListener('load',afterWindowLoaded);
} else {
    afterWindowLoaded();
}

function afterWindowLoaded(){
    //Everything that needs to happen after the window is fully loaded.
    console.log("window has loaded");
    vid_container = document.querySelector("#related #items");
    //this is still null

    console.log(vid_container);

}

window.onload = function() {
    alert('Page loaded');}


// Takes all changes which haven’t been fired so far.
// var changes = init_observer.takeRecords();
// Stops the MutationObserver from listening for changes.
// init_observer.disconnect();

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