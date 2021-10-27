
import React, {useState, useEffect} from "react"
import Timer from "./Timer"
import resultsService from "../services/results"

var timerInterval

const LetterInput = ({user, totalTime, setTotalTime, localScore, setLocalScore}) =>{
  const [start, setStart] = useState("")
  const [now, setNow] = useState("")
  const [background, setBackground] = useState("")
  
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z']
  const alphaRow1 = alphabet.slice(0,13)
  const alphaRow2 = alphabet.slice(13)

  useEffect(() => {restart()}, [user])

  const escKey = (e) => {
    e.preventDefault()

    if(e.key === "Escape"){
      restart()
    }
  }

  const spellCheck = async (id, letter, value) =>{

    console.log("id", id);

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

      setBackground(null)

      if(letter === "z"){
        const score = (now-start)/1000
        clearInterval(timerInterval)
        await setLocalScore(score)
        await resultsService.saveScore(score)
        setTotalTime(score)
      }

      if(letter!=="z"){
        console.log("next triggered", id+1);
        document.getElementById(1).removeAttribute("disabled")
        document.getElementById(id+1).focus()
      }
    }

    if(value !== letter){
      setBackground("red")
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

    setBackground(null)
    document.getElementById(0).focus()
    document.removeEventListener('keyup', escKey)
  }

  const InputFields = ({alphabet, row}) => {
    return(
      <div className="letter">
        {alphabet.map((a, idx) => {
          const uniqueId = row === "1" ? idx : idx+alphaRow1.length
          
          return (
              <span key={uniqueId}>
              <label><b> &nbsp;{a}&nbsp; </b></label>
              <input
                  disabled={uniqueId !== 0 ? "disabled" : ""}
                  type="text"
                  id={uniqueId}
                  maxLength="1"
                  onChange={(e)=>spellCheck(uniqueId, a, e.target.value)}
                  style={{width: "20px"}}
                  autoComplete="off"
              />
              </span>
          )
        })}
      </div>
    )
  }

  return(
    <div style={{backgroundColor:background}}>
      <Timer
        now={now}
        start={start}
        localScore = {localScore}
        totalTime = {totalTime}
      />
      <br/>
      <div className="letterInput">
        <InputFields
          alphabet = {alphaRow1}
          row = "1"
        />
        <br/>
        <InputFields
          alphabet = {alphaRow2}
          row = "2"
        />
      </div>
      <br/>
      <button onClick={()=>restart()}>Restart (ESC Key)</button>
      <br/>
    </div>
  )
}

export default LetterInput