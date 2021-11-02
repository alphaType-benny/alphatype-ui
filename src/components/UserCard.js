
import React from "react"
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

const UserCard = ({user, allUsers, usersTopScore, logout}) => {
    
    const userTopScore = usersTopScore.find(u=>u.username === user.username)
    const userData = allUsers.find(u=>u.username === user.username)
    let rankDisplay = "No Rank"
    let personalBest = "No Game Played"
    let gamesPlayed = "0"
    
    if (userTopScore !== undefined){
        if(userTopScore.totalTime !== null){
            const rank = 1 + usersTopScore.findIndex(u=>u.username === user.username)
            rankDisplay = rank === 1 ? <Badge pill bg="warning" text="dark">Champ 🏆</Badge> : `Ranking: ${rank}`
            personalBest = usersTopScore.length === 0 ? null : `${userTopScore.totalTime}s`
            gamesPlayed = userData.results.length
        }
    }

    return(
        <div>
            <h3 style={{margin:0}}>Welcome, {user.username}</h3>
            <p> {rankDisplay}</p>
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
            <br/>
            <Button variant="outline-secondary" size="sm" onClick={()=>logout()}>Logout</Button>
        </div>        
    )
}

export default UserCard