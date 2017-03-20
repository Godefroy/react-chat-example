import Immutable from 'immutable'
import {createReducer} from 'redux-immutablejs'
import {actions} from '../actions/channels'

// Users for each channel
const initialState = Immutable.Map()

export default createReducer(initialState, {
    [actions.CHANNEL_JOIN]: (state, {channel, users}) => {
        return state.set(channel, Immutable.fromJS(users))
    },
    [actions.CHANNEL_QUIT]: (state, {channel}) => {
        return state.delete(channel)
    },
    [actions.CHANNEL_USER_JOIN]: (state, {channel, user}) => {
        return state.update(channel, (users) => users.push(Immutable.fromJS(user)))
    },
    [actions.CHANNEL_USER_QUIT]: (state, {channel, userId}) => {
        return state.update(channel, (users) => {
            const i = users.findIndex((u) => u.get('id') === userId)
            if (i === -1) return users
            return users.delete(i)
        })
    },
    [actions.CHANNEL_USER_NICK]: (state, {user}) => {
        return state.map((users) => {
            const i = users.findIndex((u) => u.get('id') === user.id)
            if (i === -1) return users
            return users.set(i, Immutable.fromJS(user))
        })
    },
    [actions.CHANNEL_USER_DISCONNECT]: (state, {userId}) => {
        return state.map((users) => {
            const i = users.findIndex((u) => u.get('id') === userId)
            if (i === -1) return users
            return users.delete(i)
        })
    }
})
