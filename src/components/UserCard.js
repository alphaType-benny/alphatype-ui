
import React from "react"
//import usersService from "../services/users";

const UserCard = ({user, allUsers, topPlayers, logout}) => {
    
    const currentUser = topPlayers.find(u=>u.username === user.username)
    let rank = "NA"
    let personalBest = "NA"
    
    if (currentUser !== undefined){
        if(currentUser.totalTime !== null){
            rank = 1 + topPlayers.findIndex(u=>u.username === user.username)
            personalBest = topPlayers.length === 0 ? null : currentUser.totalTime 
        }
    }

    return(
        <div>
            <h3>Welcome, {user.username}</h3>
            <p>Rank: {rank}</p>
            <p>Personal Best: {personalBest}s</p>
            <p># games recorded: </p>
            <br/>
            <button onClick={()=>logout()}>Logout</button>
        </div>        
    )
}

export default UserCard