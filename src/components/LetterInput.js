
import React, {useState, useEffect} from "react"
import Timer from "./Timer"
import resultsService from "../services/results"
import Button from 'react-bootstrap/Button';

let timerInterval

//Prevent user from DOM manipulating and cheating
let totalMatch = 0

const LetterInput = ({user, setTotalTime, localScore, setLocalScore}) =>{
  const [start, setStart] = useState("")
  const [now, setNow] = useState("")
  
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z']

  let alphaWithIdx = []
  alphabet.forEach((a,idx)=>{alphaWithIdx=alphaWithIdx.concat({a,idx})})

  const alphaRow1 = alphaWithIdx.slice(0,13)
  const alphaRow2 = alphaWithIdx.slice(13)

  useEffect(() => {
    restart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const escKey = (e) => {
    e.preventDefault()

    if(e.key === "Escape" || e.code === "Space"){
      restart()
    }
  }

  const changeBgColor = (color) => document.getElementsByClassName("ctr-display")[0].style.backgroundColor = color;

  const spellCheck = async (id, letter, value) =>{
    if(value !== " "){
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

      if (value.toUpperCase() === letter.toUpperCase()) {
        totalMatch += 1 
        changeBgColor(null)

        if(letter === "z" && totalMatch === alphabet.length){
          const score = (now-start)/1000
          clearInterval(timerInterval)
          await setLocalScore(score)
          await resultsService.saveScore(score)
          setTotalTime(score)
        }
        else{
          document.getElementById(id+1).removeAttribute("disabled")
          document.getElementById(id+1).focus()
        }
      }
      else{
        changeBgColor("red")
      }
    }
    else{restart()}
  }

  const restart = () => {

    for(let idx=0; idx<alphabet.length; idx++){
      const disabled = idx !== 0 ? "disabled" : ""
      document.getElementById(idx).disabled = disabled
      document.getElementById(idx).value = ""
    }

    totalMatch = 0
    setStart("")
    setNow("")
    setLocalScore("")
    setTotalTime("")

    changeBgColor(null)
    document.getElementById(0).focus()
    document.removeEventListener('keyup', escKey)
  }

  const inputField = (alpha) => {
    
    return(
      <div className="letterInput">
        {alpha.map(a => {
          return (
              <span key={a.idx}>
                <label><b>&nbsp;{a.a}&nbsp;</b></label>
                <input
                    disabled={a.idx !== 0 ? "disabled" : ""}
                    type="text"
                    id={a.idx}
                    maxLength="1"
                    onChange={(e)=>spellCheck(a.idx, a.a, e.target.value)}
                    style={{width: "20px", textAlign:"center"}}
                    autoComplete="off"
                />
              </span>
          )
        })}
      </div>
    )
  }

  return(
    <div>
      <Timer
        now={now}
        start={start}
        localScore = {localScore}
      />
      <br/>
      {inputField(alphaRow1)}
      {inputField(alphaRow2)}
      <br/>
      <Button variant="secondary" size="sm" onClick={()=>restart()}>Restart (Space Key)</Button>
    </div>
  )
}

export default LetterInput