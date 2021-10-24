import axios from "axios"

const baseUrl = '/api/results'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
  }

const allResults = async () => {
    const req = await axios.get(baseUrl)

    return req.data
}

const saveScore = async (score) => {
    const config = {
        headers: { Authorization: token },
    }

    const scoreString = JSON.stringify(score)
    const response = await axios.post(baseUrl, {scoreString}, config)
    
    return response.data
}

const resultsService = {allResults, setToken, saveScore}

export default resultsService