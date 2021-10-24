
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
            //   setErrorMessage(null)
            }, 5000)
          }
    }

    const title = newUser === false ? "Login" : "Sign up"

    const switchInput = () => {
        setNewUser(!newUser)
    }

    return (
        <div>
            <br/>
            <form onSubmit={handleLogin}>
                <h3>{title}</h3>
                <div>
                Username: 
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                Password: 
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <br/>
                <button type="submit">submit</button>
                
            </form>
            <br/>
            <div>
                New user? <button onClick={switchInput}>Sign Up</button>
            </div>
        </div>
    )
}

export default Login