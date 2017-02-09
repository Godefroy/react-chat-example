import socket from '../socket'

// Actions types
export const actions = {
    SEND_MESSAGE: 'SEND_MESSAGE',
    UPDATE_MESSAGE_FORM: 'UPDATE_MESSAGE_FORM'
}

export function sendMessage(text) {
    return (dispatch) => {
        socket.emit('msg', text, (data) => {
            if (data && data.error) {
                alert(data.error)
                return
            }
            dispatch({
                type: actions.SEND_MESSAGE
            })
        })
    }
}

export function updateForm(text) {
    return {
        type: actions.UPDATE_MESSAGE_FORM,
        text
    }
}
