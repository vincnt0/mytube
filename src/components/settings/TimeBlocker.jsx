import * as React from 'react';

const blocks_key = "timed_blocks";
const save_msg_time = 2000; //in ms


 /**
  * 
  */
export default function TimeBlocker(){
  /**
   * Array of objects with from and to timestamp strings (HH:MM).
   * From and to values have to be translated to numbers of minutes when interacting with chrome storage.
   */
  var [blocks, setBlocks] = React.useState([]);
  var [displaySaveMsg, setDisplaySaveMsg] = React.useState(false);

  var save = () => {
    // read html
    var readBlocks = blocks.map((block, index) => {
      var parseTimeString = (string) => {
        var split = string.split(":");
        return parseInt(split[0]) * 60 + parseInt(split[1]);
      }

      return {
        from: parseTimeString(block.from), 
        to: parseTimeString(block.to)
      }
    })

    //save to chrome sync storage
    chrome.storage?.sync.set({[blocks_key]: readBlocks}
      //, () => {console.log("Blocks saved: ", readBlocks);}
    )

    setDisplaySaveMsg(true);
    setTimeout(() => {
      setDisplaySaveMsg(false);
    }, save_msg_time)
  }


  React.useEffect(() => { //executed on componentDidMount
    var format = (number) => {
      var string = number.toString();
      if(string.length < 2) string = "0" + string;
      return string;
    }
    
    var parseTimeStamp = (stamp) => {
      var hours = format(Math.floor(stamp / 60));
      var minutes = format(stamp % 60);
      return hours + ":" + minutes;
    }
    
    console.log("Effect triggered");

    chrome.storage?.sync.get([blocks_key], result => {
      console.log("Initializing blocks with ", result[blocks_key]);
      if(!!result[blocks_key]){
        setBlocks(result[blocks_key].map((block) => {
          var parsed = {from: parseTimeStamp(block.from), to: parseTimeStamp(block.to)};
          console.log("setting react internal state to: ", parsed);
          return parsed;
        }
      ))}
    })
  }, []);


  var addBlock = () => {
    setBlocks([...blocks, {from: "00:00", to: "00:00"}]);
  }

  var updateBlock = (index, prop) => (event) => {
    console.log("Updating: ", event);
    setBlocks(blocks.map((block, i) => {
      if(i === index){
        block[prop] = event.target.value;
      }
      return block;
    }))
  }


  return (
    <div className="large">
      <h2>Timed Blocker Intervals:</h2>

      <div>
        { 
          blocks.map((block, index) => {
            var {from, to} = block;
            return <div id={"block-time-"+index} key={"block-time-"+index}>
              <label htmlFor={"block-time-"+index+"-from"}>from: </label>
              <input      id={"block-time-"+index+"-from"} 
                value={from} onChange={updateBlock(index, "from")}
                type="time" className="large">
              </input>
              <label htmlFor={"block-time-"+index+"-to"}  > , to: </label>
              <input      id={"block-time-"+index+"-to"}   
                value={to} onChange={updateBlock(index, "to")}
                type="time" className="large">
              </input>
            </div>;
          })
        }
        {
          blocks.length === 0 ? "No Time Block Rules yet." : undefined
        }
      </div>

      <div>
        <button onClick={addBlock} className="large">Add Block Interval</button>
        <button onClick={save} className="large">Save</button>
        <div style={{display: displaySaveMsg?'inline':'none'}} className="large">Saved successfully!</div>
      </div>

    </div>
  );
}