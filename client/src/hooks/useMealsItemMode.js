import { useState } from 'react'

//hook used to manage the meal item display state
//controls the functionality to change the mode such as the confirm, add, or show modes
export default function useMealsItemMode(modeInit) {
  
  const [mode, setMode] = useState(modeInit);
  const [history, setHistory] = useState([modeInit])
  let updatedHistory = [...history];

  //move to a new mode and keep track of the mode history in an array
  const transition = (modeInit, replace = false) => {
    if(replace) {
      updatedHistory.splice(-1, 1, modeInit);
    } 
    
    if (!replace) {
      
      updatedHistory.push(modeInit);
    }
    
    setHistory(updatedHistory);
    return setMode(updatedHistory.slice(-1)[0]);
  };

  //this function gets called to traverse backward in the application mode pannels
  const back = () => {
    console.log(updatedHistory)
    if (updatedHistory.length > 1) {
      updatedHistory.pop();
      console.log(updatedHistory)
      setHistory(updatedHistory);
      return setMode(updatedHistory.slice(-1)[0]);
    }
  };

  return { mode, transition, back };

};
