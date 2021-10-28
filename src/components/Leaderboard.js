
import React, {useState, useEffect} from "react"

const sortResults = (scores) => {  
    return (scores.sort((b, a) => {
        return b.totalTime - a.totalTime;
    }))
}

const Leaderboard =  ({totalTime, topPlayers, setTopPlayers, allUsers}) => {
      
  let usersTopScore = []

  useEffect(() => {
    if(allUsers.length!==0){
      allUsers.map(u => {
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
  }, [allUsers])

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