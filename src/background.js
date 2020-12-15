import config from './config';

const blocks_key = config.storageKeys.timedBlocks;
const unblockTime = config.unblockTime;

//#region Temporary Enable

var iconContextItem = {
  "id": "mytube-icon",
  "title": "Enable",
  "contexts": ["browser_action"]
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

function isTempUnblocked(){
  return tempUnblocked;
}

//#endregion Temporary Enable



//#region Timed Blocker

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

  //console.log("Timestamp ", timestamp, " is blocked: ", blocked)

  return blocked;
}

//#endregion Timed Blocker



//#region Request Blocker

function requestListener(page) {

  var now = new Date(Date.now());
  var timestamp = now.getHours() * 60 + now.getMinutes();

  const reject = { cancel: true };
  const allow = { cancel: false };

  // Allow all side requests
  if(page.type !== "main_frame"){
    console.log("Allowing side request: ", page.url);
    return allow;
  }
  
  if(isTempUnblocked()){
    console.log("Temp Unblocked: ", page.url);
    return allow;
  }

  // cancel request if current time is blocked
  if(isBlocked(timestamp)){
    console.log(`Blocking: ${page.url}, (${page.method}, ${page.type})`);
    return reject;
  }

  console.log("Default Allow: ", page.url);
  return allow;
}

chrome.webRequest.onBeforeRequest.addListener(
  requestListener,
  { urls: ['https://www.youtube.com/*'] },
  ['blocking']
);

//#endregion Request Blocker