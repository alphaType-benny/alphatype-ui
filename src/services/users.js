
import axios from "axios"

const baseUrl = '/api/users'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return (response.data)
}

const signUp = (body) => {
    const request = axios.post(baseUrl, body)
    return request.then(response => (response.data))
}

const usersService = {getAll, signUp}
  
export default usersService
