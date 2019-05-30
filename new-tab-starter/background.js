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

chrome.runtime.onMessage.addListener(
	function handleMessage(request, sender, sendResponse) {
		console.log(request.greeting);
		RID = Math.random();
		var url = 'https://docs.google.com/forms/d/e/1FAIpQLSdi-6HKIh4F-Gd5leRD1eJMkLShzS6jxUyo0Yy61KmaX-ELXA/formResponse';
		var endpoint = 'entry.1387091585=';
		sendRequest(url, endpoint, RID, 'NAME', request.PRODUCT);
		sendRequest(url, endpoint, RID, 'URL', request.URL);
		sendRequest(url, endpoint, RID, 'UID', request.UID);
	}
)

// chrome.runtime.onMessage.addListener(
// 	function handleMessage(request, sender, sendResponse) {
// 		console.log(request.greeting);
// 		sendResponse({ farewell: "goodbye" });
// 		const Http = new XMLHttpRequest();
// 		var url = 'https://docs.google.com/forms/d/e/1FAIpQLSeoSX4poMzl8lC98pAhjVMHszlmVP2oW3m-DlJB9t8tGCqKHw/formResponse';
// 		var req = 'entry.867543096=' + request.greeting;
// 		Http.open("POST", url, true);
// 		Http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// 		Http.send(req);
// 		Http.onreadystatechange = (e) => {
// 			console.log(Http.responseText)

// 		}

// 	}
// )
