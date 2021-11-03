
//State Management (Redux)
//Testing (Cypress?)
//Multi-view (i.e. About Page)

import React, {useState} from 'react'
import Header from "./components/Header"
import Body from "./components/Body"
import Footer from "./components/Footer"
import './App.css';

const App = () => {
  const [user, setUser] = useState("")

  return(
    <div className="App">
      <Header user={user} />
      <Body/>
      <Footer/>
    </div>
  )
} 

export default App;
