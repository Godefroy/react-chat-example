import Immutable from 'immutable'
import {createReducer} from 'redux-immutablejs'
import {actions} from '../actions/ui'

const initialState = Immutable.fromJS({
    currentChannel: '',
    text: ''
})

export default createReducer(initialState, {
    [actions.CHANGE_CHANNEL]: (state, {channel}) => {
        return state.set('currentChannel', channel)
    },
    [actions.UPDATE_MESSAGE_FORM]: (state, {text}) => {
        return state.merge({text})
    }
})
