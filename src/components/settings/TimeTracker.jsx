import * as React from 'react';
import format from '../../utils/format';

import '../../styles/popup.css';

export default function TimeTracker(){
  var [time, setTime] = React.useState(60);

  React.useEffect(() => {
    //retrieve tracked data from storage and display 
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      setTime(time+1);
    }, 1000);
  }, [time])

  var parseTimeStamp = (secs) => {
    var h = Math.floor(secs / 3600);
    var m = Math.floor((secs % 3600) / 60);
    var s = Math.floor(secs % 60);

    return `${format(h)}:${format(m)}:${format(s)}`;
  }

  return <div className="timetracker">
    <h3 className="timetracker-title">Time Spent Today:</h3>
    <div className="timetracker-display">
      {parseTimeStamp(time)}
    </div>
  </div>;
}