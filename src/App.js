
//Style page
//About (multipage)
//Reset Game when logging out (And when escape key?)
//Timer updates late. Need fix
//User card -> stats (i.e. # games played, recent scores)
//Add date/time data to each game
//Notifications

import React from 'react'
import MainContainer from "./components/MainContainer"
import './App.css';

const App = () => {

  return(
    <div style={{textAlign: 'center'}}>
      <h1>alphatype</h1>
      <MainContainer/>
    </div>
  )
} 

export default App;
