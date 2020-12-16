import React from 'react';
import config from '../../config';

const block_recommended_key = config.storageKeys.blockRecommended;

export default function RecommendedBlocker() {
  var [blockRecommended, setBlockRecommended] = React.useState(false);

  React.useEffect(() => {
    chrome.storage?.sync.get([block_recommended_key], result => {
      console.log("loading... ", result[block_recommended_key])
      setBlockRecommended(!!result[block_recommended_key])
    })
  }, [])

  var change = (event) => {
    setBlockRecommended(event.target.checked);
    chrome.storage?.sync.set({[block_recommended_key]: event.target.checked})
  }

  return <div className="recommended-blocker">
    <div>Block Recommended Section: </div>
    <input type="checkbox" checked={blockRecommended} onChange={change}></input>
  </div>
}