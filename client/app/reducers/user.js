import Immutable from 'immutable'
import {createReducer} from 'redux-immutablejs'
import {actions} from '../actions/user'

const initialState = Immutable.fromJS({
    id: null,
    nickname: 'Anonymous'
})

export default createReducer(initialState, {
    [actions.CHANGE_NICKNAME]: (state, {user}) => {
        return Immutable.fromJS(user)
    }
})
