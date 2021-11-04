
export const setCurrentUser = (user) => {
    return async dispatch => {
        const data = user
        dispatch({
            type: 'CURRENTUSER',
            data
        })
    }
  }
  
const reducer = (state = "", action) => {
switch (action.type) {
    case 'CURRENTUSER':
    return action.data
    default: 
    return state
}
}

export default reducer