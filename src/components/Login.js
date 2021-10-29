
import React, {useState} from 'react'
import loginService from "../services/login"
import resultsService from "../services/results"
import usersService from "../services/users"
import Button from 'react-bootstrap/Button';

const Login = ({setUser, notification}) =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newUser, setNewUser] = useState(false)

    const handleLogin = async (event) => {
        event.preventDefault()
        
        if(newUser){
            try {
                await usersService.signUp({username, password})
            }
            catch (exception){
                notification("danger", "Invalid Credentials")
                return
            }
        }

        try {
            const user = await loginService.userLogin({
              username, password
            })

            window.localStorage.setItem(
                'loggedAppUser', JSON.stringify(user)
            )

            resultsService.setToken(user.token)
            setUsername('')
            setPassword('')
            setUser(user)
            notification("success", `Welcome ${user.username} & Happy alphaTyping!`)
          } catch (exception) {
            notification("danger", "Wrong/Invalid Credentials")
          }
    }

    const inputTitle = newUser === false ? "Login" : "Sign Up"
    const promptText = newUser === false ? "New User?" : "Existing User?"
    const promptOption = newUser !== false ? "Login" : "Sign Up"

    const switchInput = () => {
        setNewUser(!newUser)
        setUsername('')
        setPassword('')
    }

    return (
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
                    <br/>
                    <Button variant="secondary" type="submit">Submit</Button>
                
                </form>
                <br/>
                <div className="toggleLoginSignUp">
                    <div>{promptText}</div>
                    <Button variant="link" style={{paddingTop: '0'}} onClick={switchInput}>{promptOption}</Button>
                </div>
            </div>
        </div>
    )
}

export default Login