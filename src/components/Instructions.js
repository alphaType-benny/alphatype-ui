
import React, {useState} from "react"
import Button from 'react-bootstrap/Button';

const Instructions = () => {
    const [showInst, setShowInst] = useState(false)

    const buttonDisplay = showInst ? "Hide Instructions" : "How to Play?"
    const instDisplay = showInst ? "" : "none"

    return (
        <div>
            <Button className="instruButton" variant="link" size="sm" style={{textDecoration:"none", color:"grey"}} onClick={()=>setShowInst(!showInst)}>
                {buttonDisplay}
            </Button> 
            <div style={{display:instDisplay}}>
                <h5>Mission:</h5>
                        <div>
                            <div>In the shortest amount of time, type the alphabet in sequence.</div>
                            <div><u>The ultimate goal is to claim the #1 spot in the Leaderboard!</u></div>
                        </div>
                        <br/>
                <h5>Instructions:</h5>
                    <div className="instrucList">
                        <ol>
                            <li>To begin the game, type the letter specified above the input field.</li>
                            <li>If a letter is typed correctly, the next letter will be prompted.</li>
                            <li>The background of the game will turn red if a letter is mistyped.</li>
                            <li>The timer will stop once the last letter ("z") is typed.</li>
                            <li>Happy alphaTyping!</li>
                        </ol>
                    </div>
            </div>
            
        </div>
    )
}

export default Instructions