import store from '../store'
import socket from '../socket'

// Actions types
export const actions = {
    ADD_MESSAGE: 'ADD_MESSAGE'
}

// Listen to "msg" event
socket.on('msg', (message) => {
    store.dispatch(addMessage(message))
})

export function addMessage(message) {
    return {
        type: actions.ADD_MESSAGE,
        message
    }
}
