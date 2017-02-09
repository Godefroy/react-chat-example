import io from 'socket.io-client'

console.log('Connection...')

const socket = io('http://lonestone.studio:3000/')
socket.on('connect', () => {
    console.log('Connected!')
})
socket.on('disconnect', () => {
    console.log('Disconnected.')
})

export default socket