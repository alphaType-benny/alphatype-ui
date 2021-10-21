
//Add timer on keypress
//Stop timer when z is pressed
//Login page (username)
//Top 5 highscore players
//Style page
//About (multipage)

import React from 'react'
import LetterInput from "./components/LetterInput"
import Login from "./components/Login"
import Leaderboard from "./components/Leaderboard"

const App = () => {

  return(
    <div style={{textAlign: 'center'}}>
      <h1>alphatype</h1>
      <LetterInput/>
      <Leaderboard/>
      <Login/>
    </div>
  )
} 

export default App;
