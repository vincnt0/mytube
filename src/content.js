
setTimeout(() => {
  document.getElementById("related").remove();
}, 1000)

/*
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if(request.action === "switchAccount"){
    console.log("switching Account");
    var email = request.email;

    document.getElementById("avatar-btn").click();

    setTimeout(() => {
      var links = document.getElementsByTagName("ytd-compact-link-renderer");
      for(var i = 0; i < links.length; i++){
        link = links.item(i);
        if(link.children[0].children[0].children[1].innerHTML === "Switch Account"){
          container.children[0].click();
        }
      };
    }, 4000);

    
    setTimeout(() => {
      var accountContainers = document.getElementsByTagName("ytd-account-item-section-renderer");
      var container;
      for(var i = 0; i < accountContainers.length; i++){
        container = accountContainers.item(i);
        if(container.children[0].children[0].children[0].innerHTML === email){
          container.children[1].click();
        }
      };
    }, 8000);

  }
})
*/