
import React, {useState, useEffect} from "react"
import { useSelector } from 'react-redux'
import Timer from "./Timer"
import resultsService from "../services/results"
import Button from 'react-bootstrap/Button';

let timerInterval
let totalKeyPress = 0

const LetterInput = ({setTotalTime}) =>{
  const [start, setStart] = useState("")
  const [now, setNow] = useState("")
  const [localScore, setLocalScore] = useState("")
  const user = useSelector(state => state.currentUser)
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
        
        changeBgColor(null)

        if(letter === "z" && totalKeyPress >= alphabet.length){
          const score = (now-start)/1000
          clearInterval(timerInterval)
          await setLocalScore(score)
          await resultsService.saveScore(score)
          setTotalTime(score)
        }
        else if(letter === "z" && totalKeyPress < alphabet.length){
          restart()
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

    for(let i=0; i<alphabet.length; i++){
      const disabled = i !== 0 ? "disabled" : ""
      document.getElementById(i).disabled = disabled
      document.getElementById(i).value = ""
    }

    setStart("")
    setNow("")
    setLocalScore("")
    setTotalTime("")
    totalKeyPress = 0

    changeBgColor(null)
    document.getElementById(0).focus()
    document.removeEventListener('keyup', escKey)
  }

  const inputField = (alpha) => {
    
    return(
      <div className="letterInputFlex">
        {alpha.map(a => {
          return (
              <span key={a.idx} className="letterInputSpan">
                <label><b>&nbsp;{a.a}&nbsp;</b></label>
                <input
                    disabled={a.idx !== 0 ? "disabled" : ""}
                    type="text"
                    id={a.idx}
                    maxLength="1"
                    onChange={(e)=>spellCheck(a.idx, a.a, e.target.value)}
                    onKeyDown={()=>totalKeyPress += 1}
                    className="letterInput"
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
      <div className="letterInputFields">
        {inputField(alphaRow1)}
        {inputField(alphaRow2)}
      </div>
      <Button variant="secondary" size="sm" onClick={()=>restart()}>Restart (Space Key)</Button>
    </div>
  )
}

export default LetterInput