import * as React from 'react';
import config from '../../config';

const unblock_key = config.storageKeys.tempUnblock;
const default_unblock_time = config.defaultUnblockTime;

export default function TempUnblocker(){
  var [unblock, setUnblock] = React.useState(0);
  var [unblockMins, setUnblockMins] = React.useState(default_unblock_time);
  var [intervalId, setIntervalId] = React.useState();

  React.useEffect(() => {
    chrome.storage?.sync.get([unblock_key], result => {
      if(!!result[unblock_key]){
        var nowSecs = Math.floor(Date.now() / 1000);
        var secs = result[unblock_key] - nowSecs;
        if(secs > 0){
          var mins = Math.floor(secs/60);
          setUnblockMins(mins);
          setUnblock(secs)
          resetCountdown(secs);
        }
      }
    })
  }, [])

  var resetCountdown = (secs) => {
    console.log("secs", secs)
    if(!!intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    var counter = secs;
    setIntervalId(setInterval(() => {
      if(counter <= 0){
        clearInterval(intervalId);
        setIntervalId(null);
      }else{
        counter--;
        setUnblock(counter);
        console.log("Tick")
      }
    }, 1000));
    console.log("Countdown: ", intervalId)
  }

  var changeUnblock = (event) => {
    setUnblockMins(event.target.value < 0 ? 0 : event.target.value);
  }

  var unblockClick = () => {
    console.log("unblockMins", unblockMins)
    setUnblock(unblockMins * 60);
    resetCountdown(unblockMins * 60);
    var secs = Math.floor(Date.now() / 1000)
    secs += unblockMins * 60;

    console.log("Saving Unblock: ", secs);
    //save to chrome sync storage
    chrome.storage?.sync.set({[unblock_key]: secs});
  }

  return <div>
    <div className="unblocker-header">
      <h3>Temporary Unblocker: </h3> 
      <div>{unblock ? `${Math.floor(unblock/60)}:${unblock%60} remaining` : "not active"}</div> 
    </div>
    <div className="unblocker-body">
      Unblock for <input type="number" defaultValue={unblockMins} onChange={changeUnblock}></input> minutes. 
      <button onClick={unblockClick}>Unblock</button>
    </div>
  </div>
}