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
