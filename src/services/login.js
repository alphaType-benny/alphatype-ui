
import axios from "axios"

const baseUrl = '/api/login'

const userLogin = async (credentials) => {

    const request = axios.post(baseUrl, credentials)
    const res = await request
    return res.data

}

const loginService = {userLogin}

export default loginService