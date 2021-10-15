
import React, {useState} from 'react'

const Login = () =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) =>{
        event.preventDefault()
        console.log("logging in", username, password);
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