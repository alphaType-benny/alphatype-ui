import react, {useState, useEffect} from 'react'

const AlphaInput = () =>{

  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

  return(
    <div>
      {alphabet.map( a => {
        return (
          <div>
          <label>{a}</label>
          <input
            type="text" 
            id={a}
            maxlength="10"
          />
        </div>
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
