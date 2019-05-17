chrome.runtime.onMessage.addListener (
function handleMessage(request, sender, sendResponse) {
	sendResponse({farewell: "goodbye"});
    const Http = new XMLHttpRequest();
    var url = 'https://sheets.googleapis.com/v4/spreadsheets/1fyDFOC-aV5dD_FW-zOPJ9Ksw2nUaWs1KsFBsxjdCLqE/values/AmazonHist!1:2/?key=AIzaSyC_dGBnQF_813V5N4EKUwVrfuTsgWxBsNM';
    //var url='https://sheets.googleapis.com/v4/spreadsheets/1fyDFOC-aV5dD_FW-zOPJ9Ksw2nUaWs1KsFBsxjdCLqE/values/Sheet1!A1:C5';
   // url = url + '?key=AIzaSyC_dGBnQF_813V5N4EKUwVrfuTsgWxBsNM';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
    console.log(Http.responseText)
}
}
)
