export default {
  storageKeys: {          //chrome storage api keys
    timedBlocks: "timed_blocks",
    blockRecommended: "block_recommended",
    trackedEvents: "tracked_events",
    totalTime: "tracked_time"
  },
  blockedRequests: {      //internal site requests that should also be blocked
    youtubei: ["browse"], //youtubei api requests with this key get blocked
    root: ["watch"]       //root requests to youtube.com/{value} get blocked
  },
}