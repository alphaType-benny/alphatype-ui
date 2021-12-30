
import React, {useState} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from '../reducers/currentUserReducer'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'



const UserCard = ({usersTopScore}) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.currentUser)
    const allUsers = useSelector(state => state.users)

    const userTopScore = usersTopScore.find(u=>u.username === user.username)
    const userData = allUsers.find(u=>u.username === user.username)
    
    let rankDisplay = "No Rank"
    let personalBest = "No Game Played"
    let gamesPlayed = "0"
    //const buttonDisplay = showTop10 ? "Show Less" : "Show More"
    
    if (userTopScore !== undefined){
        if(userTopScore.totalTime !== null){
            const rank = 1 + usersTopScore.findIndex(u=>u.username === user.username)
            rankDisplay = rank === 1 ? <Badge pill bg="warning" text="dark">Champ 🏆</Badge> : `Global Ranking: ${rank}`
            personalBest = usersTopScore.length === 0 ? null : `${userTopScore.totalTime}s`
            gamesPlayed = userData.results.length
        }
    }


    const logout = () => {
        //setUser(null) 
        dispatch(setCurrentUser(null))
        return window.localStorage.removeItem('loggedAppUser')
    }

    return(
        <div className="userCard">
            <h3 style={{margin:0}}>Welcome, {user.username}</h3>
            <div className="rankDisplay"> {rankDisplay}</div>
            <table className="userStats">
                <tbody style={{textAlign: "left"}}>
                    <tr>
                        <td style={{minWidth: "120px"}}>Personal Best:</td>
                        <td>{personalBest}</td>
                    </tr>
                    <tr>
                        <td>Games played:</td>
                        <td>{gamesPlayed}</td>
                    </tr>
                </tbody>
            </table>
            <Button className="logoutButton" variant="outline-secondary" size="sm" onClick={()=>logout()}>Logout</Button>
        </div>        
    )
}

export default UserCard