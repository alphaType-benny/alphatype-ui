
import React, {useState} from 'react'
import loginService from "../services/login"
import resultsService from "../services/results"
import usersService from "../services/users"

const Login = ({setUser}) =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newUser, setNewUser] = useState(false)

    const handleLogin = async (event) => {
        event.preventDefault()
        
        if(newUser){
            await usersService.signUp({username, password})
        }

        try {
            const user = await loginService.userLogin({
              username, password
            })

            window.localStorage.setItem(
                'loggedAppUser', JSON.stringify(user)
            )

            console.log(user);
            resultsService.setToken(user.token)
            
            setUsername('')
            setPassword('')
            setUser(user)
          } catch (exception) {
            // setErrorMessage('Wrong Credentials')
            setTimeout(() => {
            // setErrorMessage(null)
            }, 5000)
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
            <div className="ctr-display">
                <form onSubmit={handleLogin}>
                    <h3>{inputTitle}</h3>
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
                    <button type="submit">Submit</button>
                
                </form>
                <br/>
                <div>
                    {promptText} <button onClick={switchInput}>{promptOption}</button>
                </div>
            </div>
        </div>
    )
}

export default Login