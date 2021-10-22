
import React, {useState} from 'react'
import loginService from "../services/login"

const Login = ({setUser}) =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    //const [user, setUser] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
            const user = await loginService.userLogin({
              username, password,
            })
            setUser(user)
            setUsername('')
            setPassword('')
          } catch (exception) {
            // setErrorMessage('Wrong Credentials')
            setTimeout(() => {
            //   setErrorMessage(null)
            }, 5000)
          }
    }

    return (
        <div>
            <br/>
            <form onSubmit={handleLogin}>
                <div>
                Username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                Password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <button type="submit">login</button>
            </form>
                
        </div>
    )
}

export default Login