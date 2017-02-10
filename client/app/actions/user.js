import socket from '../socket'

// Actions types
export const actions = {
    CHANGE_NICKNAME: 'CHANGE_NICKNAME'
}

export function changeNickname(nickname) {
    return (dispatch) => {
        socket.emit('nick', nickname, (user) => {
            if (user && user.error) {
                return alert(user.error)
            }
            // Save in LocalStorage
            localStorage.setItem('nickname', nickname)

            dispatch({
                type: actions.CHANGE_NICKNAME,
                user
            })
        })
    }
}
