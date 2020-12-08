chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.action === "showPageAction"){
    console.log("showingPageAction")
    chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
      chrome.pageAction.show(tabs[0].id);
    })
  }
})



/*
var linkContextItem = {
  "id": "mytube",
  "title": "MyTube",
  "contexts": ["link"]
};
chrome.contextMenus.create(linkContextItem);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if(info.id === linkContextItem.id){
    console.log("info:", info, ", tab:", tab);
    var {linkUrl, pageUrl} = info;

  }
})
*/