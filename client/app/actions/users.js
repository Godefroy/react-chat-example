import store from '../store'
import socket from '../socket'

// Actions types
export const actions = {
    CHANGE_NICKNAME: 'CHANGE_NICKNAME',
    UPDATE_USERS: 'UPDATE_USERS',
    ADD_USER: 'ADD_USER',
    DEL_USER: 'DEL_USER'
}

// Listen to "msg" event
socket.on('userslist', (users) => {
    store.dispatch(updateUsers(users))
})
socket.on('useradd', (user) => {
    store.dispatch(addUser(user))
})
socket.on('userdel', (userId) => {
    store.dispatch(delUser(userId))
})

export function changeNickname(nickname) {
    return (dispatch) => {
        socket.emit('nick', nickname, (data) => {
            if (data && data.error) {
                alert(data.error)
                return
            }
            dispatch({
                type: actions.CHANGE_NICKNAME
            })
        })
    }
}

export function updateUsers(users) {
    return {
        type: actions.UPDATE_USERS,
        users
    }
}

export function addUser(user) {
    return {
        type: actions.ADD_USER,
        user
    }
}

export function delUser(userId) {
    return {
        type: actions.DEL_USER,
        userId
    }
}
