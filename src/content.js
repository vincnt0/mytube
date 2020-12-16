import config from './config';
const block_recommended_key = config.storageKeys.blockRecommended;

chrome.storage?.sync.get([block_recommended_key], result => {
  if(result[block_recommended_key]){
    removeRecommended();
  }
})

function removeRecommended() {
  document.getElementById("related").remove();
}

