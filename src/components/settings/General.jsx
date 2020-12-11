import * as React from 'react';

function clearStorage(){
  if(confirm("WARNING: This will delete all settings and selections you have made within this extension. Are you sure you want to proceed?")){
    chrome.storage?.sync.clear();
  }
}

export default function General(){

  return <>
  <div>
    <button onClick={clearStorage}>
      Clear Extension Storage
    </button>
    Warning: Resets all other extensions settings and preferences!
  </div>
  </>
}