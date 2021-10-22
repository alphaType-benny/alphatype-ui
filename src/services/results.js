import axios from "axios"

const baseUrl = '/api/results'

const allResults = async () => {
    const req = await axios.get(baseUrl)

    return req.data

}

const resultsService = {allResults}

export default resultsService