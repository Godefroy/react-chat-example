import store from '../store'
import socket from '../socket'

// Actions types
export const actions = {
    CHANNEL_JOIN: 'CHANNEL_JOIN',
    CHANNEL_QUIT: 'CHANNEL_QUIT',
    CHANNEL_USER_JOIN: 'CHANNEL_USER_JOIN',
    CHANNEL_USER_QUIT: 'CHANNEL_USER_QUIT',
    CHANNEL_USER_NICK: 'CHANNEL_USER_NICK',
    CHANNEL_USER_DISCONNECT: 'CHANNEL_USER_DISCONNECT'
}

// Listen to server events
socket.on('join', ({channel, user}) => {
    store.dispatch( {
        type: actions.CHANNEL_USER_JOIN,
        channel,
        user
    })
})
socket.on('quit', ({channel, userId}) => {
    store.dispatch( {
        type: actions.CHANNEL_USER_QUIT,
        channel,
        userId
    })
})
socket.on('nick', (user) => {
    store.dispatch( {
        type: actions.CHANNEL_USER_NICK,
        user
    })
})
socket.on('disconnect', (userId) => {
    store.dispatch( {
        type: actions.CHANNEL_USER_DISCONNECT,
        userId
    })
})

export function joinChannel(channel) {
    return (dispatch) => {
        socket.emit('join', channel, (users) => {
            if (users && users.error) {
                return alert(users.error)
            }
            dispatch({
                type: actions.CHANNEL_JOIN,
                channel,
                users
            })
        })
    }
}

export function quitChannel(channel) {
    return (dispatch) => {
        socket.emit('quit', channel, (data) => {
            if (data && data.error) {
                return alert(data.error)
            }
            dispatch({
                type: actions.CHANNEL_QUIT,
                channel
            })
        })
    }
}
