
import React, {useState, useEffect} from "react"
import resultsService from "../services/results"
import usersService from "../services/users"
import Notification from "./Notification"
import LetterInput from "./LetterInput"
import Leaderboard from "./Leaderboard"
import UserCard from "./UserCard"
import Login from "./Login"

const MainContainer = ({user, setUser}) => {
    
    const [allUsers, setAllUsers] = useState([])
    const [usersTopScore, setUsersTopScore ] = useState([])
    const [totalTime, setTotalTime] = useState("")
    const [notifClass, setNotifClass] = useState('')
    const [notifMessage, setNotifMessage] = useState('')
    
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          resultsService.setToken(user.token)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    usersTopScore = {usersTopScore}
                    logout = {logout}
                />
            </div>
            <div className="ctr-display">
                <LetterInput
                    user = {user}
                    totalTime = {totalTime}
                    setTotalTime = {setTotalTime}
                /> 
            </div>
            <div className = "right-display">
                <Leaderboard
                    totalTime = {totalTime}
                    usersTopScore = {usersTopScore}
                    setUsersTopScore = {setUsersTopScore}
                    allUsers = {allUsers}
                />
            </div>
        </div>
        )
    }

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
                    user={user}
                    setUser = {setUser}
                    notification={notification}
                />
            }
        </div>
    )
}

export default MainContainer