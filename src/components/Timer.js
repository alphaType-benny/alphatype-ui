
const Timer = ({start, now, localScore, totalTime}) => {
  const liveScore = (now-start)/1000

  const timerState = () =>{
    if (!start){
      return <h3>To start game, begin typing</h3>
    }
    else if (!localScore){
      return <h3><b>Timer:</b> {liveScore.toFixed(3)}s</h3>
    }
    return <h3><b>Your alphaTime is:</b> {localScore}s !</h3>
  }
  
  return(
    <div className="timer">
      {timerState()}
    </div>
  )
    
  }

export default Timer 