import { useState, useEffect } from "react";

//function that waits until the user has stopped typing for a specified amount of time before returning the 
//search term. This reduced the number of API calls during search significantly
export default function useDebounce(input, ms) {
  
  //debounced refers to the 
  const [debounced, setDebounced] = useState("");

  //fires every time the input changes
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(input), ms);
    return () => clearTimeout(timeout);
  }, [input, ms]);

  //returns value that is updated after the setTimeout occurs
  return debounced;
}
