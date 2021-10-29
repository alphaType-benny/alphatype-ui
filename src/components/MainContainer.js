
import React, {useState, useEffect} from "react"
import resultsService from "../services/results"
import usersService from "../services/users";
import Notification from "./Notification"
import LetterInput from "./LetterInput"
import Leaderboard from "./Leaderboard"
import UserCard from "./UserCard"
import Login from "./Login"

const MainContainer = () => {
    const [user, setUser] = useState("")
    const [allUsers, setAllUsers] = useState([])
    const [topPlayers,setTopPlayers] = useState([])
    const [totalTime, setTotalTime] = useState("")
    const [localScore, setLocalScore] = useState("")
    const [notifClass, setNotifClass] = useState('')
    const [notifMessage, setNotifMessage] = useState('')
    
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          resultsService.setToken(user.token)
        }
    }, [])

    useEffect(()=>{
        usersService.getAll()
          .then(res => setAllUsers(res))
    },[totalTime])

    const notification = (notifClass, notifMessage) => {
        setNotifClass(notifClass)
        setNotifMessage(notifMessage)
        setTimeout(() => {
            setNotifMessage(null)
        }, 5000)
    }

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
                    allUsers = {allUsers}
                    topPlayers = {topPlayers}
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
                    topPlayers = {topPlayers}
                    setTopPlayers = {setTopPlayers}
                    allUsers = {allUsers}
                />
            </div>
        </div>
        )
    }

    const fade = false

    return(
        <div>
            
                <div className="notifFlex">
                    <Notification
                        notifClass={notifClass}
                        notifMessage={notifMessage}
                    />
                </div>
                
                {
                    user ?
                    loggedInDisplay()
                    :
                    <Login
                    setUser = {setUser}
                    notification={notification}
                    />
                }
            
        </div>
    )
}

export default MainContainer