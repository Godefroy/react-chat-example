import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';

// Reducers
import channelsReducer from './reducers/channels'
import messagesReducer from './reducers/messages'
import uiReducer from './reducers/ui'
import userReducer from './reducers/user'

// Combine Reducers
var reducers = combineReducers({
    channelsReducer,
    messagesReducer,
    uiReducer,
    userReducer
})

export default createStore(
    reducers,
    applyMiddleware(thunk)
)
