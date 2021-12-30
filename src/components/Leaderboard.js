
import React, {useState, useEffect} from "react"
import { useSelector} from 'react-redux'
import Button from 'react-bootstrap/Button';

const sortResults = (scores) => {  
    return (scores.sort((b, a) => {
        return b.totalTime - a.totalTime;
    }))
}

const Leaderboard =  ({usersTopScore, setUsersTopScore}) => {

  const [showTop10, setShowTop10] = useState(false)
  const allUsers = useSelector(state => state.users)

  useEffect(() => {
    let topScores = []

    if(allUsers.length!==0){
      allUsers.forEach(u => {
        let userScore = "No Score"
        if(u.results.length !== 0){
            userScore = sortResults(u.results)[0].totalTime
            const userData = {"username": u.username, "totalTime": userScore }
            topScores = [...topScores, userData]
        }
      })
      setUsersTopScore(sortResults(topScores))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUsers])

  const scoreToShow = showTop10 ? 10 : 5 
  const buttonDisplay = showTop10 ? "Show Less" : "Show More"
  const extraPadding = showTop10 ? "0" : "20px"

  const topUsers = () => {
    let rank
    return(
      (usersTopScore.slice(0,scoreToShow)).map((p, idx) => {
        const top3 = ["🏆","🥈","🥉"]

        if(idx<=2){
          rank = `${top3[idx]} `
        }
        else{
          rank =<b>{idx+1}.</b>
        }

        return(
          <tr key={idx}>
            <td style={{minWidth: "30px", textAlign:"center"}}>{rank}</td>
            <td style={{minWidth: "130px"}}>{p.username}&nbsp;</td>
            <td>{p.totalTime}s</td>
          </tr>
        )
      })
    )
  }
 
  return(
    <div className="leaderContainer">
      <h3 style={{paddingTop:extraPadding}}><u>Leaderboard</u></h3>
      <table className="leaderboard">
      <tbody style={{textAlign: "left"}}>
        <tr>
          <th></th>
          <th>User</th>
          <th>Time</th>
        </tr>
        {topUsers()}
      </tbody>
        
      </table>
      <Button variant="link" size="sm" style={{textDecoration:"none", color:"grey"}} onClick={()=>setShowTop10(!showTop10)}>
        {buttonDisplay}
      </Button>
    </div>
  )
}

export default Leaderboard