
import React, {useState} from "react"
import Timer from "./Timer"
import resultsService from "../services/results"

var timerInterval

const LetterInput = ({setTotalTime, localScore, setLocalScore}) =>{
    const [start, setStart] = useState("")
    const [now, setNow] = useState("")
    
    const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  
    const spellCheck = (idx, letter, value) =>{
  
      if (!start){
        setStart(Date.now())
      }
  
      if (letter === "a"){
        timerInterval = setInterval(() => {
          let varNow = Date.now()
          setNow(varNow)
        }, 100);
      }

      if (value === letter) {
        if(letter === "b"){
          const score = (now-start)/1000
          clearInterval(timerInterval)
          setLocalScore(score)
          resultsService.saveScore(score)
            .then(res => setTotalTime(score))
        }
        if(letter!=="z"){
          document.getElementById(idx+1).removeAttribute("disabled")
          document.getElementById(idx+1).focus()
        }
      }
    }
  
    const restart = () => {
      alphabet.map((a, idx) => {
        const disabled = idx !== 0 ? "disabled" : ""
        document.getElementById(idx).disabled = disabled
        document.getElementById(idx).value = ""
      })
      setStart("")
      setNow("")
      setLocalScore("")
      setTotalTime("")
    }

    return(
      <div>
        <br/>
        <Timer
          now={now}
          start={start}
          localScore = {localScore}
        />
        <div>
            {alphabet.map( (a, idx) => {
            return (
                <span key={idx}>
                {idx===13?<br/>:""}
                <label><b> &nbsp;{a}&nbsp; </b></label>
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
        <br/>
        <button onClick={()=>restart()}>Restart</button>
        <br/>
      </div>
    )
  }

export default LetterInput