
import React, {useState} from "react"
import LetterInput from "./LetterInput"
import Login from "./Login"
import Leaderboard from "./Leaderboard"

const MainContainer = () => {
    const [user, setUser] = useState("")

    return(
        <div className = "container">
                <div className="ctr-display">
                    {
                    user ? 
                    <LetterInput/> : 
                    <Login
                        setUser={setUser}
                    />
                    }
                </div>
                <div className="right-display"><Leaderboard/></div>
        </div>
    )
}

export default MainContainer