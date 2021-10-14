
const Timer = ({start, now, totalTime}) => {
    if (!start){
      return <h3>Game starts from first press!</h3>
    }
    else if (!totalTime){
      return <h3><b>Timer:</b> {(now-start)/1000}s</h3>
    }
    return <h3><b>Your alphatime is:</b> {totalTime}s !</h3>
    
  }

export default Timer 