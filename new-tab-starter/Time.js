/*var yttplayer = document.getElementById("movie_player");

console.log(yttplayer.getPlayerState());

if (yttplayer.playerState == 1) {
	console.log("hi");
	if (window.localStorage.getItem("tracker") == null) {
	window.localStorage.setItem("tracker", parseInt(0, 10));
	}
} */



window.addEventListener("load", (event) => {
	window.localStorage.setItem("start", Date.now());
	if (window.localStorage.getItem("tracker") == null) {
	window.localStorage.setItem("tracker", parseInt(0, 10));
	}
})

const video = document.querySelector('video');


video.addEventListener('play', (event) => {
	window.localStorage.setItem("start", Date.now());
	if (window.localStorage.getItem("tracker") == null) {
	window.localStorage.setItem("tracker", parseInt(0, 10));
	}
})

video.addEventListener('pause', (event) => {
  var time_passed = Date.now()-(window.localStorage.getItem("start"));
  console.log(millisToMinutes(parseInt(window.localStorage.getItem("tracker"), 10)));
  var temp = millisToMinutes((parseInt(window.localStorage.getItem("tracker"), 10)) + millisToMinutes(parseInt(time_passed, 10));
  window.localStorage.setItem("tracker", temp);
  chrome.runtime.sendMessage(
	{greeting:window.localStorage.getItem("tracker")}, /// Send message
    function (response) {
        console.log(response);
    }
	);
  console.log(window.localStorage.getItem("tracker"));
})

video.addEventListener('ended', (event) => {
  var time_passed = Date.now()-(window.localStorage.getItem("start"));
  var temp = millisToMinutes(parseInt(window.localStorage.getItem("tracker"), 10)) + millisToMinutes(parseInt(time_passed, 10));
  window.localStorage.setItem("tracker", temp);
  chrome.runtime.sendMessage(
	{greeting:window.localStorage.getItem("tracker")}, /// Send message
    function (response) {
        console.log(response);
    }
	);
  console.log(window.localStorage.getItem("tracker"));
})



function millisToMinutes(millis) {
  var minutes = Math.ceil(millis / 60000);
  return minutes;
}
