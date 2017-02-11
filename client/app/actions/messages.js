import store from '../store'
import socket from '../socket'
import {changeNickname} from './user'
import {changeChannel} from './ui'
import {joinChannel, quitChannel} from './channels'

// Actions types
export const actions = {
    ADD_MESSAGE: 'ADD_MESSAGE',
    SEND_MESSAGE: 'SEND_MESSAGE'
}

// Listen to "msg" event
socket.on('msg', (message) => {
    store.dispatch({
        type: actions.ADD_MESSAGE,
        message
    })
})

export function sendMessage(channel, text) {
    // Commands
    let match
    if (match = text.match(/^\/nick ([a-z0-9_-]{3,20})$/i)) {
        return changeNickname(match[1])
    }
    if (match = text.match(/^\/join #?([a-z0-9_-]{3,20})$/i)) {
        return joinChannel(match[1])
    }
    if (match = text.match(/^\/quit$/i)) {
        return quitChannel(channel)
    }

    // No command
    // Send Message
    return (dispatch) => {
        socket.emit('msg', {channel, text}, (data) => {
            if (data && data.error) {
                return alert(data.error)
            }
            dispatch({
                type: actions.SEND_MESSAGE
            })
        })
    }
}
