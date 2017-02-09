import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';

// Reducers
import usersReducer from './reducers/users'
import messagesReducer from './reducers/messages'
import messageFormReducer from './reducers/messageForm'

// Combine Reducers
var reducers = combineReducers({
    usersReducer,
    messagesReducer,
    messageFormReducer
})

export default createStore(
    reducers,
    applyMiddleware(thunk)
)
