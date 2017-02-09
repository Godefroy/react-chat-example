import Immutable from 'immutable'
import {createReducer} from 'redux-immutablejs'
import {actions} from '../actions/messageForm'

const initialState = Immutable.fromJS({
    text: ''
})

export default createReducer(initialState, {
    [actions.UPDATE_MESSAGE_FORM]: (state, {text}) => {
        return state.merge({text})
    }
})
