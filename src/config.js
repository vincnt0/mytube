export default {
  storageKeys: {          //chrome storage api keys
    timedBlocks: "timed_blocks",
    tempUnblock: "temp_unblock",
    blockRecommended: "block_recommended"
  },
  blockedRequests: {      //internal site requests that should also be blocked
    youtubei: ["browse"], //youtubei api requests with this key get blocked
    root: ["watch"]       //root requests to youtube.com/{value} get blocked
  },
  unblockTime: 15000
}