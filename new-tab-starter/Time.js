console.log("Time.js")
window.localStorage.setItem("start", Date.now());

document.addEventListener("visibilitychange", handleVisibilityChange, true);

window.addEventListener("beforeunload", handleUnload, true);


/*(document.body || document.documentElement).addEventListener('transitionend',
  function(event) {
    if (event.target.id === "progress") {
      start_listen();
}
}, true);


function start_listen() {

video = document.querySelector('video');

if (video) {
video.removeEventListener('play', forstart, true);

video.removeEventListener('pause', forpause, true);

video.removeEventListener('ended', forpause, true);

video.addEventListener('play', forstart, true);

video.addEventListener('pause', forpause, true);

video.addEventListener('ended', forpause, true);


//video.addEventListener('emptied', forpause, true);
//video.addEventListener('abort', forpause, true);
}
} */

function millisToMinutes(millis) {
  var minutes = Math.floor(millis / 60000);
  return minutes;
}

/*function forpause () {
  var time_passed = Date.now()-(window.localStorage.getItem("start"));
  console.log(millisToMinutes(parseInt(window.localStorage.getItem("tracker"), 10)));
  var temp = millisToMinutes(parseInt(window.localStorage.getItem("tracker"), 10)) + millisToMinutes(parseInt(time_passed, 10));
  window.localStorage.setItem("tracker", temp);
  chrome.runtime.sendMessage(
  {greeting:window.localStorage.getItem("tracker")},
    function (response) {
        console.log(response);
    }
  );
  console.log(window.localStorage.getItem("tracker"));
  return;

}

function forstart () {
  window.localStorage.setItem("start", Date.now());
  if (window.localStorage.getItem("tracker") == null) {
  window.localStorage.setItem("tracker", parseInt(0, 10));
  }
  return;

} */

function handleVisibilityChange () {
  if (!window.localStorage.getItem("tracker")) {
  window.localStorage.setItem("tracker", 0);
}
  video = document.querySelector('video');

  // Back on Youtube
  if (document.visibilityState === "visible") {
    if (video && !video.paused) {
      return;
    }
   else {
    window.localStorage.setItem("start", Date.now());
   } 
  }

  // Off of Youtube
  if (document.visibilityState === "hidden" && (video && video.paused)) {
    var time_passed = Date.now()-(window.localStorage.getItem("start"));
    var temp = parseInt(window.localStorage.getItem("tracker"), 10) + millisToMinutes(parseInt(time_passed, 10));
    window.localStorage.setItem("tracker", temp);
    chrome.runtime.sendMessage(
      {greeting:window.localStorage.getItem("tracker")},
      function (response) {
        console.log(response);
      }
    );
    console.log(window.localStorage.getItem("tracker"));
  }
}

function handleUnload () {
    console.log("hi");
    if (!window.localStorage.getItem("tracker")) {
  window.localStorage.setItem("tracker", 0);
  }

  if (!window.localStorage.getItem("start")) {
  window.localStorage.setItem("start", Date.now());
  }

    var time_passed = parseInt(Date.now()-(window.localStorage.getItem("start")), 10);
    window.localStorage.setItem("time_passed", time_passed);
    var temp = parseInt(window.localStorage.getItem("tracker"), 10) + millisToMinutes(parseInt(time_passed, 10));
    window.localStorage.setItem("tracker", temp);
    chrome.runtime.sendMessage(
      {greeting:window.localStorage.getItem("tracker")},
      function (response) {
        console.log(response);
      }
    );
    console.log(window.localStorage.getItem("tracker"));
}