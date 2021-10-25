
import React, {useState, useEffect} from "react"
import resultsService from "../services/results"
import LetterInput from "./LetterInput"
import Leaderboard from "./Leaderboard"
import UserCard from "./UserCard"
import Login from "./Login"

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

    return(
        <div className = "container">
            <div className="left-display">
                {
                user ?
                <UserCard
                    user = {user}
                    setUser = {setUser}
                />:
                <Login
                    setUser = {setUser}
                />
                }
            </div>
            <div className="ctr-display">
                <LetterInput
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

export default MainContainer