
export const getTopScores = (data) => {
    return async dispatch => {
        console.log("allUsersInsideReducer", data);
        // console.log(data)
        
        dispatch({
            type: 'GETALL',
            data
        })
    }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'GETALL':
      return action.data
    default: 
      return state
  }
}

export default reducer
