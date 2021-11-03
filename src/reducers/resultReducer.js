import resultsService from "../services/results"

export const setToken = (token) => {
    return async dispatch => {
    //const data = await anecdoteService.createNew(content)
        await resultsService.setToken(token)
        console.log(token);
        dispatch({
        type: 'SETTOKEN'
        })
  }
}

const reducer = (state = [], action) => {
    switch (action.type) {
      case 'SETTOKEN':
        return state
      default: 
        return state
    }
  }
  
  export default reducer