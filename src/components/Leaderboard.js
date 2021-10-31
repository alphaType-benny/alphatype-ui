
import React, {useEffect} from "react"

const sortResults = (scores) => {  
    return (scores.sort((b, a) => {
        return b.totalTime - a.totalTime;
    }))
}

const Leaderboard =  ({usersTopScore, setUsersTopScore, allUsers}) => {

  useEffect(() => {
    let topScores = []

    if(allUsers.length!==0){
      allUsers.forEach(u => {
        let userScore = "No Score"
        if(u.results.length !== 0){
            userScore = sortResults(u.results)[0].totalTime
            const userData = {"username": u.username, "totalTime": userScore }
            topScores = topScores.concat(userData)
        }
      })
      console.log(topScores);
      setUsersTopScore(sortResults(topScores))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUsers])

  return(
    <div >
      <h3><u>Leaderboard</u></h3>
      <table className="leaderboard">
      <tbody style={{textAlign: "left"}}>
          <tr>
            <th>User</th>
            <th>Time</th>
          </tr>
          
          {(usersTopScore.slice(0,5)).map((p, idx) => {
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