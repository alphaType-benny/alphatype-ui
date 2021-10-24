
const Timer = ({start, now, gameFinish}) => {
    if (!start){
      return <h3>Game starts from first press!</h3>
    }
    else if (!gameFinish){
      return <h3 className="timer"><b>Timer:</b> {(now-start)/1000}s</h3>
    }
    return <h3><b>Your alphatime is:</b> {gameFinish}s !</h3>
    
  }

export default Timer 