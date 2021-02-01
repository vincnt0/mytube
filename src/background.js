import filters from './utils/request-filters';


//#region Request Handling

chrome.webRequest.onBeforeRequest.addListener(
  function requestListener(page) {

    const reject = { cancel: true };
    const allow = { cancel: false };
  
    // Allow all side requests
    if(filters.isSideRequest(page)){
      //console.log("Allowing side request: ", page.url);
      return allow;
    }
    
    if(filters.isTempUnblocked()){
      //console.log("Temp Unblocked: ", page.url);
      return allow;
    }
  
    // cancel request if current time is blocked
    if(filters.isBlocked()){
      //console.log(`Blocking: ${page.url}, (${page.method}, ${page.type})`);
      return reject;
    }
  
    if(filters.isRevisit()){
      return reject;
    }
  
    //console.log("Default Allow: ", page.url);
    return allow;
  },
  { urls: ['https://www.youtube.com/*'] },
  ['blocking']
);

//#endregion Request Handling




//#region Time Tracking

  chrome.tabs.onActivated.addListener((info) => {
    console.log("Activated Tab", info);
  })

  chrome.tabs.onRemoved.addListener((info) => {
    console.log("Removed Tab", info);
  })

  chrome.windows.onCreated.addListener((info) => {
    console.log("Window Created", info)
  })

  chrome.windows.onFocusChanged.addListener((info) => {
    console.log("Window Focus Changed", info)
  })

  chrome.windows.onRemoved.addListener((info) => {
    console.log("Window Removed", info)
  })
  //onLeaveChrome

//#endregion Time Tracking
