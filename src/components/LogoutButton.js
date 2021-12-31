
import React from "react"
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../reducers/currentUserReducer'
import Button from 'react-bootstrap/Button'

const LogoutButton = () => {

    const dispatch = useDispatch()

    const logout = () => {
        //setUser(null) 
        dispatch(setCurrentUser(null))
        return window.localStorage.removeItem('loggedAppUser')
    }

    return(
        <div>
            <Button className="logoutButton" variant="outline-secondary" size="sm" onClick={()=>logout()}>Logout</Button>
        </div>        
    )
}

export default LogoutButton