
import React, {useState, useEffect} from "react"
import Timer from "./Timer"
import resultsService from "../services/results"

let timerInterval

//Prevent user from DOM manipulating and cheating
let totalMatch = 0

const LetterInput = ({user, totalTime, setTotalTime, localScore, setLocalScore}) =>{
  const [start, setStart] = useState("")
  const [now, setNow] = useState("")
  const [background, setBackground] = useState("")
  
  
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
  'n','o','p','q','r','s','t','u','v','w','x','y','z']

  let alphaWithIdx = []
  alphabet.map((a,idx)=>{alphaWithIdx=alphaWithIdx.concat({a,idx})})

  const alphaRow1 = alphaWithIdx.slice(0,13)
  const alphaRow2 = alphaWithIdx.slice(13)

  useEffect(() => {restart()}, [user])

  const escKey = (e) => {
    e.preventDefault()

    if(e.key === "Escape"){
      restart()
    }
  }

  const spellCheck = async (id, letter, value) =>{

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
      totalMatch += 1 
      setBackground(null)
      console.log(totalMatch, alphabet.length);

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

    if(value !== letter){
      setBackground("red")
    }
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

    setBackground(null)
    document.getElementById(0).focus()
    document.removeEventListener('keyup', escKey)
  }

  const inputField = (alpha) => {
    
    return(
      <div className="letter">
        {alpha.map(a => {
          return (
              <span key={a.idx}>
              <label><b> &nbsp;{a.a}&nbsp; </b></label>
              <input
                  disabled={a.idx !== 0 ? "disabled" : ""}
                  type="text"
                  id={a.idx}
                  maxLength="1"
                  onChange={(e)=>spellCheck(a.idx, a.a, e.target.value)}
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
      {inputField(alphaRow1)}
      <br/>
      {inputField(alphaRow2)}
      <br/>
      <button onClick={()=>restart()}>Restart (ESC Key)</button>
      <br/>
    </div>
  )
}

export default LetterInput