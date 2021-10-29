
import React from "react"
import Button from 'react-bootstrap/Button';


const UserCard = ({user, allUsers, topPlayers, logout}) => {
    
    const userTopScore = topPlayers.find(u=>u.username === user.username)
    const userData = allUsers.find(u=>u.username === user.username)
    let rank = "No Rank"
    let personalBest = "No Game Played"
    let gamesPlayed = "0"
    
    if (userTopScore !== undefined){
        if(userTopScore.totalTime !== null){
            rank = 1 + topPlayers.findIndex(u=>u.username === user.username)
            personalBest = topPlayers.length === 0 ? null : userTopScore.totalTime
            gamesPlayed = userData.results.length
        }
    }

    return(
        <div>
            <h3 style={{margin:0}}>Welcome, {user.username}</h3>
            <p>Ranking: {rank}</p>
            <table className="userStats">
                <tbody style={{textAlign: "left"}}>
                    <tr>
                        <td style={{minWidth: "120px"}}>Personal Best:</td>
                        <td>{personalBest}s</td>
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