
//Add timer on keypress
//Stop timer when z is pressed
//Login page (username)
//Top 5 highscore players
//Style page
//About (multipage)

import react, {useState, useEffect} from 'react'

const AlphaInput = () =>{

  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  const displayResult = () =>{
    console.log("finsih")
  }

  const spellCheck = (idx, letter, value) =>{
      if (value === letter) {
        return letter!=="z" ? document.getElementById(idx+1).focus() : displayResult()
      }
  }

  return(
    <div>
      {alphabet.map( (a, idx) => {
        return (
          <span key={idx}>
          {idx===13?<br/>:""}
          <label>{a}</label>
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
