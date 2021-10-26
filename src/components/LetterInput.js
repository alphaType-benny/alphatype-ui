
import React, {useState, useEffect} from "react"
import Timer from "./Timer"
import resultsService from "../services/results"

var timerInterval

const LetterInput = ({user, totalTime, setTotalTime, localScore, setLocalScore}) =>{
  const [start, setStart] = useState("")
  const [now, setNow] = useState("")
  
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z']

  useEffect(()=> {
    restart()
  }, [user])

  const escKey = (e) => {
    e.preventDefault()

    if(e.key === "Escape"){
      restart()
    }
  }

  const spellCheck = async (idx, letter, value) =>{

    if (!start){
      setStart(Date.now())
    }

    if (letter === "a"){
      timerInterval = setInterval(() => {
        let varNow = Date.now()
        setNow(varNow)
      }, 1);

      document.addEventListener('keyup', escKey)
    }

    if (value === letter) {
      if(letter === "z"){
        const score = (now-start)/1000
        clearInterval(timerInterval)
        await setLocalScore(score)
        await resultsService.saveScore(score)
        setTotalTime(score)
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

    document.getElementById(0).focus()
    document.removeEventListener('keyup', escKey)
  }

  return(
    <div>
      <Timer
        now={now}
        start={start}
        localScore = {localScore}
        totalTime = {totalTime}
      />
      <br/>
      <div className="letterInput">
          <div className="letter">
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
      </div>
      <br/>
      <button onClick={()=>restart()}>Restart (ESC Key)</button>
      <br/>
    </div>
  )
}

export default LetterInput