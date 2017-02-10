// Actions types
export const actions = {
    CHANGE_CHANNEL: 'CHANGE_CHANNEL',
    UPDATE_MESSAGE_FORM: 'UPDATE_MESSAGE_FORM'
}

export function changeChannel(channel) {
    return {
        type: actions.CHANGE_CHANNEL,
        channel
    }
}

export function updateForm(text) {
    return {
        type: actions.UPDATE_MESSAGE_FORM,
        text
    }
}
