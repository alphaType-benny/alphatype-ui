import resultsService from "../services/results";
import usersService from "../services/users";
import React, {useState, useEffect} from "react"

const sortResults = (scores) => {  
    return (scores.sort((b, a) => {
        return b.totalTime - a.totalTime;
    }))
}

const Leaderboard =  () => {
    // const [topScores,setTopScores] = useState([])
    const [users,setUsers] = useState([])
    let usersTopScore = []
    let topPlayers = []

    useEffect(()=>{
        // resultsService.allResults()
        //     .then(res => setTopScores(sortResults(res)))

        usersService.getAll()
            .then(res => setUsers(res))
    },[])


    if(users.length!==0){
        users.map(u => {
            
            //need to be more efficient
            const userScore = sortResults(u.results)[0].totalTime
            const userData = {"username": u.username, "totalTime": userScore }

            usersTopScore = usersTopScore.concat(userData)
        })

        topPlayers = sortResults(usersTopScore).slice(0,3)
    }

    return(
        <div>
            <h3>Leaderboard</h3>
            <div>
                {topPlayers.map((p, idx) => {
                    return(
                        <div>
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