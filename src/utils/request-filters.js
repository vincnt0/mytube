import config from './config';
import { isSideRequest } from './request-filter';

const blocks_key = config.storageKeys.timedBlocks;

const youtubeiMainRequests = config.blockedRequests.youtubei;
const rootMainRequests = config.blockedRequests.root;

//#region Timed Blocker

var blocks = [];

chrome.storage.sync.get([blocks_key], result => {
  //console.log("Initial blocks from storage: ", result[blocks_key]);
  blocks = result[blocks_key];
})

chrome.storage.sync.onChanged.addListener((changes, namespace) => {
  for(var key in changes){
    if(key === blocks_key){
      //console.log("Received new blocks from storage: ", blocks);
      blocks = changes[key].newValue;
    }
  }
})

export function isBlocked(){
  var now = new Date(Date.now());
  var timestamp = now.getHours() * 60 + now.getMinutes();

  var blocked = false;

  blocks?.forEach((block) => {
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




export function isSideRequest(page) {
  return !isMainRequest(page);
}


export function isMainRequest(page) {
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





export function isRevisit(page){

}