
import React, {useState, useEffect} from "react"
import usersService from "../services/users";

const sortResults = (scores) => {  
    return (scores.sort((b, a) => {
        return b.totalTime - a.totalTime;
    }))
}

const Leaderboard =  ({totalTime}) => {
    const [users,setUsers] = useState([])
    const [topPlayers,setTopPlayers] = useState([])
    let usersTopScore = []

    useEffect(()=>{
        usersService.getAll()
            .then(res => setUsers(res))
            
    },[totalTime])


    useEffect(()=>{
        if(users.length!==0){
            users.map(u => {
                let userScore = "No Score"
                if(u.results.length !== 0){
                    //need to be more efficient
                    userScore = sortResults(u.results)[0].totalTime
                    const userData = {"username": u.username, "totalTime": userScore }
                    usersTopScore = usersTopScore.concat(userData)
                }
            })

            setTopPlayers(sortResults(usersTopScore).slice(0,5))
        }
    }, [users])

    return(
        <div>
            <h3>Leaderboard</h3>
            <div>
                {topPlayers.map((p, idx) => {
                    return(
                        <div key={idx}>
                            <span>{idx+1}- {p.username} </span>
                            <span>{p.totalTime}s</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Leaderboard