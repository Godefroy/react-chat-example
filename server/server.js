const server = require('http').createServer();
const io = require('socket.io')(server);
const uuid = require('node-uuid')

const users = []

io.on('connection', (socket) => {
    const userId = uuid.v4()
    const user = {
        id: userId,
        nickname: 'User' + userId,
        socket
    }

    // User disconnection
    socket.on('disconnect', () => {
        users.splice(users.indexOf(user), 1)
    })

    // Change Nickname
    socket.on('nick', (nickname, reply) => {
        if (typeof (nickname) !== 'string') {
            reply({
                error: "Nickname missing"
            })
            return
        }
        user.nickname = nickname.substr(0, 30)
    })

    socket.on('msg', (message, reply) => {
        if (typeof (message) !== 'string') {
            reply({
                error: "Message missing"
            })
            return
        }
        broadcast('msg', {
            id: uuid.v4(),
            userId,
            message,
            date: new Date().getTime()
        })
    })

    // Broadcast new Users List
    broadcast('userslist', users.map((user) => {
        return {
            id: user.id,
            nickname: user.nickname
        }
    }))
})


const broadcast = (eventName, data) => {
    users.forEach((user) => {
        user.socket.emit(eventName, data)
    })
}

server.listen(3000);
