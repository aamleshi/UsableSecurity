
// references used:
// https://stackoverflow.com/questions/36808309/chrome-extension-page-update-twice-then-removed-on-youtube


// chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
// //Send message to content Script -> Page was changed
// //or execute parser from here 
// // chrome.tabs.executeScript

// });


// To handle youtube video page
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  console.log("something happened");
  console.log(details);
  console.log(details.frameId);
    if(details.frameId === 0) {
        // Fires only when details.url === currentTab.url
        chrome.tabs.get(details.tabId, function(tab) {
            if(tab.url === details.url) {
                console.log("onHistoryStateUpdated");
            }
        });
    }
});