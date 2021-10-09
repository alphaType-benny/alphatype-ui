
//Add timer on keypress
//Stop timer when z is pressed
//Login page (username)
//Top 5 highscore players
//Style page
//About (multipage)

import React, {useState} from 'react'
var timerInterval

const Timer = ({start, now, time}) => {
  if (!start){
    return <h3>Timer starts from first press!</h3>
  }
  else if (!time){
    return <h3><b>Timer:</b> {(now-start)/1000}s</h3>
  }
  return <h3><b>Your alphatime is:</b> {(now-start)/1000}s !</h3>
  
}

const AlphaInput = () =>{
  const [start, setStart] = useState("")
  const [now, setNow] = useState("")
  const [totalTime, setTotalTime] = useState("")
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  const spellCheck = (idx, letter, value) =>{

    if (!start){
      setStart(Date.now())
    }

    if (value === letter) {
      if (letter === "a"){
        timerInterval = setInterval(() => {
          let varNow = Date.now()
          setNow(varNow)
        }, 1);
      }
      if(letter === "z"){
        clearInterval(timerInterval)
        setTotalTime((now-start)/1000)
      }
      if(letter!=="z"){
        document.getElementById(idx+1).removeAttribute("disabled")
        document.getElementById(idx+1).focus()
      }
    }

  }

  return(
    <div>
      <Timer
        now={now}
        start={start}
        time={totalTime}
      />
      {alphabet.map( (a, idx) => {
        return (
          <span key={idx}>
          {idx===13?<br/>:""}
          <label> {a} </label>
          <input
            disabled={idx !== 0 ? "disabled" : ""}
            type="text" 
            id={idx}
            maxLength="1"
            onChange={(e)=>spellCheck(idx, a, e.target.value)}
            style={{width: "10px"}}
            autocomplte="false"
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
