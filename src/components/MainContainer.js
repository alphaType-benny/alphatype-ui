
import React, {useState, useEffect} from "react"
import resultsService from "../services/results"
import LetterInput from "./LetterInput"
import Leaderboard from "./Leaderboard"
import UserCard from "./UserCard"
import Login from "./Login"
import Notification from "./Notification"

const MainContainer = () => {
    const [user, setUser] = useState("")
    const [totalTime, setTotalTime] = useState("")
    const [localScore, setLocalScore] = useState("")

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          resultsService.setToken(user.token)
        }
    }, [])

    const logout = () => {
        setUser(null)
        return window.localStorage.removeItem('loggedAppUser')
    }

    const loggedInDisplay = () => {
        return(
          <div className = "mainContainer">
            <div className="left-display">
                <UserCard
                    user = {user}
                    logout = {logout}
                />
            </div>
            <div className="ctr-display">
                <LetterInput
                    user = {user}
                    totalTime = {totalTime}
                    setTotalTime = {setTotalTime}
                    localScore = {localScore}
                    setLocalScore = {setLocalScore}
                /> 
            </div>
            <div className = "right-display">
                <Leaderboard
                    totalTime = {totalTime}
                />
            </div>
        </div>
        )
    }

    return(
        <div>
        {
            user ?
            loggedInDisplay()
            :
            <Login
              setUser = {setUser}
            />
        }
        </div>
    )
}

export default MainContainer