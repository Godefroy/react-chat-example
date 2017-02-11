// Actions types
export const actions = {
    CHANGE_CHANNEL: 'CHANGE_CHANNEL',
    UPDATE_NICKNAME_FORM: 'UPDATE_NICKNAME_FORM',
    UPDATE_MESSAGE_FORM: 'UPDATE_MESSAGE_FORM'
}

export function changeChannel(channel) {
    return {
        type: actions.CHANGE_CHANNEL,
        channel
    }
}

export function updateMessageForm(inputMessage) {
    return {
        type: actions.UPDATE_MESSAGE_FORM,
        inputMessage
    }
}

export function updateNicknameForm(inputNickname) {
    return {
        type: actions.UPDATE_NICKNAME_FORM,
        inputNickname
    }
}
