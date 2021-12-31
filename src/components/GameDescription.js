
const GameDescription = () => {

    return (
        <div className="gameDescText">
            <h5>What is alphaType?</h5>
            <p>It is a game that tests your ability to type the alphabet in the fastest possible time.</p>
            <p>You will be ranked amongst the best alphaTypers in the world! </p>
            <div className="gameDescImgs">
                <img
                    src="/hands-and-keyboard-svgrepo-com.svg"
                    className="gameDescImg"
                    alt="timer"
                    height="120"
                    width="120"
                />
                <img
                    src="/speed-svgrepo-com.svg"
                    className="gameDescImg"
                    alt="timer"
                    height="70"
                    width="70"
                />
            </div>
        </div>
    )
}

export default GameDescription