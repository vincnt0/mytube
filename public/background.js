chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.todo === "showPageAction"){
    chrome.tabs.query({active:true, currentWindow:true}, (tabs) => {
      chrome.pageAction.show(tabs[0].id);
    })
  }
})


var contextMenuItem = {
  "id": "mytube",
  "title": "MyTube",
  "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((info, tab) => {
  
})