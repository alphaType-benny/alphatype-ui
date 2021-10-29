
import React from "react"
//import usersService from "../services/users";

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
            console.log(userData.results.length);
        }
    }

    return(
        <div>
            <h3 style={{margin:0}}>Welcome, {user.username}</h3>
            <p>Ranking: {rank}</p>
            <table className="userStats">
                <tbody>
                    <tr>
                        <td>Personal Best:</td>
                        <td>{personalBest}s</td>
                    </tr>
                    <tr>
                        <td>Games played:</td>
                        <td>{gamesPlayed}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <button onClick={()=>logout()}>Logout</button>
        </div>        
    )
}

export default UserCard