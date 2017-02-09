import Immutable from 'immutable'
import {createReducer} from 'redux-immutablejs'
import {actions} from '../actions/messages'

const initialState = Immutable.List()

export default createReducer(initialState, {
    [actions.ADD_MESSAGE]: (state, {message}) => {
        return state.push(message)
    }
})
