
//Prevent same username to be used
//Multi-view (i.e. About Page)
//letter above input field?
//User card -> stats (i.e. # games played, recent scores)
//Testing (Cypress?)
//Notifications
//Style page

import React from 'react'
import MainContainer from "./components/MainContainer"
import Footer from "./components/Footer"
import './App.css';

const App = () => {

  return(
    <div className="App">
      <h1 className="gameTitle">alphaType</h1>
      <MainContainer/>
      <Footer/>
    </div>
  )
} 

export default App;
