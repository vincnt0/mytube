import config from '../config';

const trackedEventsKey = config.storageKeys.trackedEvents;
const totalTimeKey = config.storageKeys.totalTime;


function addEvent(event){
  return new Promise((resolve, reject) => {
    chrome.storage?.sync?.get([trackedEventsKey], result => {
      var trackedEvents = result[trackedEventsKey];
      trackedEvents.push(event);
      chrome.storage?.sync?.set({[trackedEventsKey]: trackedEvents});
      resolve(trackedEvents);
    })
  })
}

function printHistoryToConsole(){
  chrome.storage?.sync?.get([trackedEventsKey], result => {
    var trackedEvents = result[trackedEventsKey];
    console.log(trackedEvents);
  })
}

function getHistory(){
  return new Promise((resolve, reject) => {
    chrome.storage?.sync?.get([trackedEventsKey], result => {
      var trackedEvents = result[trackedEventsKey];
      resolve(trackedEvents);
    })
  })
}

function onTabLoad(url){
  var event = {
    timestamp: Date.now(),
    url: url,
    type: 'load'
  }
  addEvent(event);
}

function onTabUnload(url){
  var event = {
    timestamp: Date.now(),
    url: url,
    type: 'unload'
  }
  addEvent(event);
}

export default {
  printHistoryToConsole,
  getHistory,
  onTabLoad,
  onTabUnload
}