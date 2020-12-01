
document.getElementById("vincent").addEventListener("click", () => {
  switchAccount('vincent45999@gmail.com');
})

document.getElementById("fakesheep").addEventListener("click", () => {
  switchAccount('f4kesheep@gmail.com');
})


function switchAccount(email){
  console.log("Trying to switch to ", email)
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "switchAccount", email: email});
  });
}