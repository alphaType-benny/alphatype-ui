
//State Management (Redux)
//Multi-view (i.e. About Page)
//Testing (Cypress?)

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
      <Body user={user} setUser={setUser} />
      <Footer/>
    </div>
  )
} 

export default App;
