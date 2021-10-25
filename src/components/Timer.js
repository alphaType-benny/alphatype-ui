
const Timer = ({start, now, localScore, totalTime}) => {
  const liveScore = (now-start)/1000

    if (!start){
      return <h3>Game starts from first press!</h3>
    }
    else if (!localScore){
      return <h3 className="timer"><b>Timer:</b> {liveScore.toFixed(3)}s</h3>
    }
    return <h3><b>Your alphatime is:</b> {localScore}s !</h3>
    
  }

export default Timer 