import resultsService from "../services/results";
import usersService from "../services/users";
import React, {useState, useEffect} from "react"

const sortResults = (scores) => {  
    return (scores.sort((a, b) => {
        return b.totalTime - a.totalTime;
    }))
}

const Leaderboard =  () => {
    const [topScores,setTopScores] = useState([])
    const [users,setUsers] = useState([])

    useEffect(()=>{
        resultsService.allResults()
            .then(res => setTopScores(sortResults(res)))

        usersService.getAll()
            .then(res => setUsers(res))
    },[])

    if(users.length!==0){
        const fastest = users[0].results
        const festestTime = fastest.sort((a,b)=>{
            return a.totalTime - b.totalTime
        })
        
        console.log("fastest", festestTime);
    }

    console.log("scores", topScores);
    


    return(
        <div>Leaderboard</div>
    )

}

export default Leaderboard