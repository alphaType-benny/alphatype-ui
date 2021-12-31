
import React, {useState} from 'react'
import loginService from "../services/login"
import resultsService from "../services/results"
import usersService from "../services/users"
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../reducers/currentUserReducer'
import Button from 'react-bootstrap/Button'
import GameDescription from "./GameDescription"

const Login = ({notification}) =>{

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newUser, setNewUser] = useState(true)
    
    const handleLogin = async (event) => {
        event.preventDefault()
        
        if(newUser){
            try {
                await usersService.signUp({username, password})
            }
            catch (exception){
                notification("danger", <div>
                Invalid Credentials
                <br/>
                Username must be unique and have 3-12 characters
                <br/>
                Password must have at least 3 characters
                </div>)
                setPassword('')
                return
            }
        }

        try {
            const user = await loginService.userLogin({username, password})
            window.localStorage.setItem('loggedAppUser', JSON.stringify(user))

            resultsService.setToken(user.token)
            setUsername('')
            setPassword('')
            
            dispatch(setCurrentUser(user))
            
            notification("success", `Welcome ${user.username} & Happy alphaTyping!`)
          } catch (exception) {
            setPassword('')
            notification("danger", "Wrong/Invalid Credentials")
          }
    }

    const inputTitle = newUser === false ? "Login to Play" : "Create Account"
    const promptText = newUser === false ? "New User?" : "Existing User?"
    const promptOption = newUser !== false ? "Login" : "Sign Up"

    const switchInput = () => {
        setNewUser(!newUser)
        setUsername('')
        setPassword('')
    } 

    return (
        <div>
            <div className="loginContainer">
                <div className="loginDisplay">
                    <form onSubmit={handleLogin}>
                        <h3>{inputTitle}</h3>
                        <br/>
                        <div className="loginField">
                        Username:&nbsp;
                            <input
                            type="text"
                            value={username}
                            name="Username"
                            size="12"
                            onChange={({ target }) => setUsername(target.value)}
                            />
                        </div>
                        <div className="loginField">
                        Password:&nbsp;
                            <input
                            type="password"
                            value={password}
                            name="Password"
                            size="12"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        </div>
                        <Button className="loginButton" variant="secondary" type="submit">Submit</Button>
                    </form>
                    <div className="toggleLoginSignUp">
                        <div>{promptText}</div>
                        <Button variant="link" style={{paddingTop: '0'}} onClick={switchInput}>{promptOption}</Button>
                    </div>
                </div>
                
            </div>
            <div className="gameDescription">
                {newUser ? <GameDescription/> : ""}
            </div>
        </div>
    )
}

export default Login