import Immutable from 'immutable'
import {createReducer} from 'redux-immutablejs'
import {actions} from '../actions/users'

const initialState = Immutable.List()

export default createReducer(initialState, {
    [actions.UPDATE_USERS]: (state, {users}) => {
        return Immutable.fromJS(users)
    },
    [actions.ADD_USER]: (state, {user}) => {
        return state.filter((u) => u.get('id') !== user.id).push(Immutable.fromJS(user))
    },
    [actions.DEL_USER]: (state, {userId}) => {
        return state.filter((u) => u.get('id') !== userId)
    }
})
