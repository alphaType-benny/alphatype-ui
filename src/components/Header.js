
const Header = ({user}) => {

    const padding = user ? "20px" : "10px"

    return(
        <div className="header" style={{padding: padding}}>
            <h1 className="gameTitle">alphaType</h1>
            {user ? "" : "A Typing Game"}
        </div>
    )
}

export default Header