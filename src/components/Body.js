
import React, {useState, useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import Notification from "./Notification"
import LetterInput from "./LetterInput"
import Leaderboard from "./Leaderboard"
import UserCard from "./UserCard"
import Login from "./Login"
import logoutButton from "./LogoutButton"
import { getAllUsers } from '../reducers/allUserReducer'
import { setToken } from '../reducers/resultReducer'
import { setCurrentUser } from '../reducers/currentUserReducer'

const Body = () => {
    const dispatch = useDispatch()

    const user = useSelector(state => state.currentUser)

    const [usersTopScore, setUsersTopScore ] = useState([])
    const [totalTime, setTotalTime] = useState("")
    const [notifClass, setNotifClass] = useState('')
    const [notifMessage, setNotifMessage] = useState('')
 
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          dispatch(setCurrentUser(user))
          dispatch(setToken(user.token))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(()=>{
        dispatch(getAllUsers())
    },[totalTime, dispatch])

    const notification = (notifClass, notifMessage) => {
        setNotifClass(notifClass)
        setNotifMessage(notifMessage)
        setTimeout(() => {
            setNotifMessage(null)
        }, 5000)
    }

    const loggedInDisplay = () => {
        return(
          <div className = "mainContainer">
            <div className="left-display">
                <UserCard
                    usersTopScore = {usersTopScore}
                />
                <div className="logoutWeb">
                    {logoutButton()}
                </div>
            </div>
            <div className="ctr-display">
                <LetterInput
                    totalTime = {totalTime}
                    setTotalTime = {setTotalTime}
                /> 
            </div>
            <div className = "right-display">
                <Leaderboard
                    totalTime = {totalTime}
                    usersTopScore = {usersTopScore}
                    setUsersTopScore = {setUsersTopScore}
                />
            </div>
            <div className="logoutMobile">
                {logoutButton()}
            </div>
        </div>
        )
    }

    const gamePreview = () => {
        return(
            <div classNmae="previewContainer">
                <div className = "mainContainer" style={{filter:"blur(4px)"}}>
                    <div className="left-display">
                        <h3 style={{margin:0}}>Welcome, NewPlayer</h3>
                    </div>
                    <div className="ctr-display">
                        <LetterInput
                            totalTime = {totalTime}
                            setTotalTime = {setTotalTime}
                        /> 
                    </div>
                    <div className = "right-display">
                        <Leaderboard
                            totalTime = {totalTime}
                            usersTopScore = {usersTopScore}
                            setUsersTopScore = {setUsersTopScore}
                        />
                    </div>
                </div>
                <Login
                    notification={notification}
                />
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
                loggedInDisplay() :
                <div> {gamePreview()} </div>
            }
        </div>
    )
}

export default Body