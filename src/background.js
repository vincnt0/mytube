import config from './config';

const blocks_key = config.storageKeys.timedBlocks;
const unblockTime = config.unblockTime;

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.action === "showPageAction"){
    console.log("showingPageAction")
    chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
      chrome.pageAction.show(tabs[0].id);
    })
  }
})
*/

var iconContextItem = {
  "id": "mytube-icon",
  "title": "Enable",
  "contexts": ["page_action"]
};
chrome.contextMenus.create(iconContextItem);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if(info.menuItemId === iconContextItem.id){
    //Enable here
    tempUnblocked = true;
    setTimeout(() => {
      tempUnblocked = false;
    }, unblockTime)
  }
})

var tempUnblocked = false;

function isUnblocked(){
  return tempUnblocked;
}

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

function isBlocked(timestamp){
  var blocked = false;

  blocks.forEach((block) => {
    if(blocked) return;
    if(block.from <= block.to){
      if(block.from <= timestamp && timestamp <= block.to){
        blocked = true;
      }
    }else{
      if(block.from >= timestamp || timestamp >= block.to){
        blocked = true;
      }
    }
  })

  console.log("Timestamp ", timestamp, " is blocked: ", blocked)

  return blocked;
}

function requestListener(page) {
  var now = new Date(Date.now());
  var cancel = false;

  // cancel request if current time is blocked
  var timestamp = now.getHours() * 60 + now.getMinutes();
  if(isBlocked(timestamp)){
    cancel = true;
  }

  if(isUnblocked(page)){
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