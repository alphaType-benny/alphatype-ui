
//Add timer on keypress
//Stop timer when z is pressed
//Login page (username)
//Top 5 highscore players
//Style page
//About (multipage)

import React, {useState, useEffect} from 'react'

const AlphaInput = () =>{
  const [start, setStart] = useState("")
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  const timer = () =>{
    let offset, clock, interval

    const start = () =>{
      offset = Date.now()
    }

    const delta = () =>{
      const now = Date.now()
      const d = now - offset
      offset = now
      return d
    }

    const update = () =>{
      clock += delta()
      render()
    }

    const render = () =>{
      console.log(clock);
    }

    interval = setInterval(update(), 1)

    const stop = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }

    const reset = () =>{
      clock = 0 
      render(0)
    }

    return (
      {start, stop, reset}
    )
  }

  const spellCheck = (idx, letter, value) =>{

    if (letter === "a"){
      setStart(Date.now)
      const interval = setInterval(() => {
        console.log("log!");
      }, 1000);
      //clearInterval()
    }

    if (value === letter) {
      if(letter === "b"){
        let finish = Date.now()
        console.log(`Finished in ${(finish-start)/1000}`)
      }
      return letter!=="z" ? document.getElementById(idx+1).focus() : null
    }
  }

  return(
    <div>
      {alphabet.map( (a, idx) => {
        return (
          <span key={idx}>
          {idx===13?<br/>:""}
          <label> {a} </label>
          <input
            type="text" 
            id={idx}
            maxLength="1"
            onChange={(e)=>spellCheck(idx, a, e.target.value)}
            style={{width: "10px"}}
          />
        </span>
        )
      })}
    </div>
  )
}

const App = () => {



  return(
    <div>
      <h2>alphatype</h2>
      <AlphaInput/>
    </div>
  )
} 

export default App;
