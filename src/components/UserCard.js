
import React from "react"
//import usersService from "../services/users";

const UserCard = ({user, setUser}) => {

    const logout = () => {
        setUser(null)
        return window.localStorage.removeItem('loggedAppUser')
    }

    return(
        <div>
            <h3>Welcome {user.username}</h3>
            <br/>
            <button onClick={()=>logout()}>Logout</button>
        </div>        
    )
}

export default UserCard