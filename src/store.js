import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import allUsersReducer from './reducers/allUserReducer'
import currentUserReducer from './reducers/currentUserReducer'
import resultReducer from './reducers/resultReducer'
import topScoreReducer from './reducers/topScoresReducer'


const reducer = combineReducers({
  currentUser: currentUserReducer,
  users: allUsersReducer,
  result: resultReducer,
  topScore: topScoreReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
  ))

export default store