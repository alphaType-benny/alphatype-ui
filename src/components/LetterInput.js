
import React, {useState} from "react"
import Timer from "./Timer"

var timerInterval

const LetterInput = () =>{
    const [start, setStart] = useState("")
    const [now, setNow] = useState("")
    const [totalTime, setTotalTime] = useState("")
    const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  
    const spellCheck = (idx, letter, value) =>{
  
      if (!start){
        setStart(Date.now())
      }
  
      if (letter === "a"){
        timerInterval = setInterval(() => {
          let varNow = Date.now()
          setNow(varNow)
          console.log(now);
        }, 1);
      }

      if (value === letter) {
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
      <div className = "container" style={{border:"1px black solid"}}>
        <br/>
        <Timer
          now={now}
          start={start}
          totalTime={totalTime}
        />
        <div>
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
                    style={{width: "20px"}}
                    autoComplete="off"
                />
                </span>
            )
            })}
        </div>
      </div>
    )
  }

export default LetterInput