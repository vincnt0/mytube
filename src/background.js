import config from './config';

const blocks_key = config.storageKeys.timedBlocks;
const unblock_key = config.storageKeys.tempUnblock;

const youtubeiMainRequests = config.blockedRequests.youtubei;
const rootMainRequests = config.blockedRequests.root;

function isTempUnblocked(){
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([unblock_key], result => {
      var unblock = result[unblock_key];
      console.log("Unblock from storage: ", unblock);
      // resolve to true if unblock timestamp has not passed yet
      if(!unblock || unblock <= 0) resolve(false);
      else if(Math.floor(Date.now() / 1000) < unblock) resolve(true);
      else resolve(false);
    })
  })
}

function isBlocked(timestamp){
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([blocks_key], result => {
      var blocks = result[blocks_key];
      console.log("Blocks from storage: ", blocks);
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

      resolve(blocked);
    })
  })
}

function isMainRequest(page) {
  if(page.type === "main_frame") return true;
  else if(page.type === "xmlhttprequest"){
    var urlParts = page.url.split("?")[0].split("/"); //"https", "", "www.youtube.com", "youtubei", etc
    switch(urlParts[3]){
      case "youtubei":
        if(youtubeiMainRequests.includes(urlParts[5])) 
          return true;
      break;
      default:
        if(rootMainRequests.includes(urlParts[3])) 
          return true;
      break;
    }
  }else return false;
}


async function requestListener(page) {

  var now = new Date(Date.now());
  var timestamp = now.getHours() * 60 + now.getMinutes();

  const reject = { cancel: true };
  const allow = { cancel: false };

  // Allow all side requests
  if(!isMainRequest(page)){
    console.log("Allowing side request: ", page.url);
    return allow;
  }
  
  if(await isTempUnblocked()){
    console.log("Temp Unblocked: ", page.url);
    return allow;
  }

  // cancel request if current time is blocked
  if(await isBlocked(timestamp)){
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