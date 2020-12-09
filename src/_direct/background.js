chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.action === "showPageAction"){
    console.log("showingPageAction")
    chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
      chrome.pageAction.show(tabs[0].id);
    })
  }
})

var iconContextItem = {
  "id": "mytube-icon",
  "title": "Enable",
  "contexts": ["page_action"]
};
chrome.contextMenus.create(iconContextItem);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if(info.id === iconContextItem.id){
    //Enable here
  }
})

const blocks_key = "mytube-blocks";
var blocks = [];

chrome.storage.sync.get([blocks_key], result => {
  console.log("Initial blocks from storage: ", result[blocks_key]);
  blocks = result[blocks_key];
})

chrome.storage.sync.onChanged.addListener((changes, namespace) => {
  for(var key in changes){
    if(key === blocks_key){
      console.log("Received new blocks from storage: ", blocks);
      blocks = changes[key].newValue;
    }
  }
})

function requestListener(page) {
  var now = new Date(Date.now());
  var cancel = true;
  //Enable between 21 and 1
  if(now.getHours() < 2 || now.getHours() >= 21){
    cancel = false;
  }

  return {
    cancel: cancel,
  };
}

chrome.webRequest.onBeforeRequest.addListener(
  requestListener,
  { urls: ['https://www.youtube.com/*'] },
  ['blocking']
);

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