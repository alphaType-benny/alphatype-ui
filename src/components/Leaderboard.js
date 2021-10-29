
import React, {useEffect} from "react"

const sortResults = (scores) => {  
    return (scores.sort((b, a) => {
        return b.totalTime - a.totalTime;
    }))
}

const Leaderboard =  ({topPlayers, setTopPlayers, allUsers}) => {
      
  let usersTopScore = []

  useEffect(() => {
    if(allUsers.length!==0){
      allUsers.map(u => {
        let userScore = "No Score"
        if(u.results.length !== 0){
            userScore = sortResults(u.results)[0].totalTime
            const userData = {"username": u.username, "totalTime": userScore }
            usersTopScore = usersTopScore.concat(userData)
        }
      })

      setTopPlayers(sortResults(usersTopScore).slice(0,5))
    }
  }, [allUsers])

  return(
    <div >
      <h3><u>Leaderboard</u></h3>
      <table className="leaderboard">
        <tbody style={{textAlign: "left"}}>
          <th>User</th>
          <th>Time</th>
          {topPlayers.map((p, idx) => {
            return(
              <tr key={idx}>
                <td style={{minWidth: "100px"}}>{idx+1}- {p.username}&nbsp;</td>
                <td>{p.totalTime}s</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard