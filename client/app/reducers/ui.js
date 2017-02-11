import Immutable from 'immutable'
import {createReducer} from 'redux-immutablejs'
import {actions} from '../actions/ui'
import {actions as channelsActions} from '../actions/channels'

const initialState = Immutable.fromJS({
    currentChannel: '',
    inputNickname: '',
    inputMessage: ''
})

export default createReducer(initialState, {
    [actions.CHANGE_CHANNEL]: (state, {channel}) => {
        return state.set('currentChannel', channel)
    },
    [channelsActions.CHANNEL_JOIN]: (state, {channel}) => {
        return state.set('currentChannel', channel)
    },
    [actions.UPDATE_NICKNAME_FORM]: (state, {inputNickname}) => {
        return state.merge({inputNickname})
    },
    [actions.UPDATE_MESSAGE_FORM]: (state, {inputMessage}) => {
        return state.merge({inputMessage})
    }
})
