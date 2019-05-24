var time;
var last_send;
if (chrome.storage.local.get("cul_time", function(data) {
	if (data.cul_time == null){
		chrome.storage.local.set({"cul_time": 0});
	}
});

chrome.runtime.onMessage.addListener (
function handleMessage(request, sender, sendResponse) {
	if (sender.tab.url.split(".")[1] === "youtube") {
		chrome.storage.local.get("cul_time", function(data) {
			time = parseInt(request.greeting, 10) - parseInt(data.cul_time, 10);
		});
	}
	if (sender.tab.url.split(".")[1] === "amazon") {
		//console.log("bye");
		sendResponse({farewell: "goodbye"});
    	const Http = new XMLHttpRequest();
    	var url = 'https://docs.google.com/forms/d/e/1FAIpQLSeoSX4poMzl8lC98pAhjVMHszlmVP2oW3m-DlJB9t8tGCqKHw/formResponse'; 
    	var req = 'entry.867543096=' + request.greeting;
    	Http.open("POST", url, true);
    	Http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    	Http.send(req);
    	Http.onreadystatechange=(e)=>{
    	//console.log(Http.responseText)

	}
	}


}
)

function send_data() {
	if (typeof time === 'undefined') {
		// send 0 time watched to google sheets
	}
	else {
		//send information to google sheets
		chrome.storage.local.get("cul_time", function(data) {
			var temp = parseInt(data.cul_time, 10) + time;
			chrome.storage.local.set({"cul_time": temp});
		});
	}
	var last_send = new Date();
}

var now = new Date();
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 24, 0, 0, 0) - now;
if (typeof last_send !== "undefined") {
     if (now - last_send > 86400000) {
     	send_data();
     } // it's been more than 24 hours since the last send
}
setTimeout(send_data(), millisTill10);