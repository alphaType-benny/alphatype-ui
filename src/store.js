import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer'
import currentUserReducer from './reducers/currentUserReducer'
import resultReducer from './reducers/resultReducer'


const reducer = combineReducers({
  currentUser: currentUserReducer,
  user: userReducer,
  result: resultReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
  ))

export default store