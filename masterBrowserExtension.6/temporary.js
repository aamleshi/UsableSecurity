curr_time = Date.now();
UID = "0006";

function sendRequest(url, endpoint, RID, Field, Payload) {
	var req = endpoint + RID + Field + Payload
	console.log(req)
	const Http = new XMLHttpRequest();
	Http.open("POST", url, true);
	Http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	Http.send(req);
	Http.onreadystatechange = (e) => {
		console.log(Http.responseText)

	}
}



chrome.storage.local.get("time", function(data) {
	if (!data.time) {
		chrome.storage.local.set({"time": 0}, function() {
			console.log("cool");
		});
		}
});

/*(chrome.storage.local.set({"time": 0}, function(data) {
	console.log("hi");
})); */


chrome.storage.local.get("cul_time", function(data) {
	if (!data.cul_time) {
		chrome.storage.local.set({"cul_time": 0}, function() {
			console.log("cool");
		});
		}
});

/*(chrome.storage.local.set({"cul_time": 0}, function(data) {
	console.log("hi");
})); */

var today = new Date();

chrome.storage.local.get("last_send", function(data) {
	if (!data.last_send) {
		chrome.storage.local.set({"last_send": Date.now()}, function() {
			console.log("cool");
		});
		}
});

/*(chrome.storage.local.set({"last_send": new Date(now.getFullYear(), now.getMonth(), now.getDate()-1, 24, 0, 0, 0).getTime()}, function(data) {
	console.log("hi");
})); */



chrome.runtime.onMessage.addListener (
function handleMessage(request, sender, sendResponse) {
	if (sender.tab.url.split(".")[1] === "youtube") {
		chrome.storage.local.get("cul_time", function(data) {
			chrome.storage.local.set({"time": parseInt(request.greeting, 10) - parseInt(data.cul_time, 10)}, function() {
				console.log("hi");
			});
		});
		chrome.storage.local.get("cul_time", function(data) {
			console.log(data.cul_time);
		});
	}
	if (sender.tab.url.split(".")[1] === "amazon") {
		//console.log("bye");
		console.log(request.greeting);
		RID = Math.floor(Math.random()*90000) + 10000;
		var url = 'https://docs.google.com/forms/d/e/1FAIpQLSdi-6HKIh4F-Gd5leRD1eJMkLShzS6jxUyo0Yy61KmaX-ELXA/formResponse';
		var endpoint = 'entry.1387091585=';
		sendRequest(url, endpoint, RID, 'NAME', request.PRODUCT);
		sendRequest(url, endpoint, RID, 'URL', request.URL);
		sendRequest(url, endpoint, RID, 'UID', UID);
	}
}
);

function send_data() {
	chrome.storage.local.get("cul_time", function(data) {
		chrome.storage.local.get("time", function(data2) {
			var dataPacket = parseInt(data2.time, 10);
			RID = Math.floor(Math.random()*90000) + 10000;
			var url = 'https://docs.google.com/forms/d/e/1FAIpQLSeqLlkHDjfZj3EBIZWuHkONTKDlKFqJmcLVSWDQzMywHLZQPg/formResponse';
			var endpoint = 'entry.520508685=';
			sendRequest(url, endpoint, RID, 'TIME', dataPacket);
			sendRequest(url, endpoint, RID, 'UID', UID);
			var temp = parseInt(data2.time, 10) + parseInt(data.cul_time, 10);
			chrome.storage.local.set({"cul_time": temp}, function(data) {
				console.log("HELLO");
			});

		});
});
chrome.storage.local.set({"last_send": Date.now()}, function(data) {
	console.log("hiya");
});
// today = new Date();
}


//var millisTill10 = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 39, 0, 0) - today;

setInterval (function () {

chrome.storage.local.get("last_send", function(data) {
	if (Date.now() - data.last_send > 1000*60*60*3) {//1000*60*60*3) {
		send_data();
	}
});
}, 1000*60)
//setTimeout(send_data, millisTill10);