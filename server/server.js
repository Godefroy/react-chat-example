const server = require('http').createServer();
const io = require('socket.io')(server);
const uuid = require('node-uuid')

const emptyReply = () => {
}

const users = []

io.on('connection', (socket) => {
    const userId = uuid.v4()
    const user = {
        id: userId,
        nickname: 'User' + userId.substr(0, 8),
        socket
    }
    users.push(user)

    // User disconnection
    socket.on('disconnect', () => {
        users.splice(users.indexOf(user), 1)
        broadcast('userdel', userId)
    })

    // Change Nickname
    socket.on('nick', (nickname, reply) => {
        reply = reply || emptyReply
        if (!/[a-z0-9_-]{3,30}/i.test(nickname)) {
            reply({
                error: "Nickname missing"
            })
            return
        }
        user.nickname = nickname

        broadcast('useradd', {
            id: user.id,
            nickname
        })

        reply()
    })

    socket.on('msg', (message, reply) => {
        reply = reply || emptyReply
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
    broadcast('useradd', {
        id: user.id,
        nickname: user.nickname
    }, user.id)
    socket.emit('userslist', users.map((user) => {
        return {
            id: user.id,
            nickname: user.nickname
        }
    }))
})


const broadcast = (eventName, data, excludeIds) => {
    excludeIds = excludeIds || []
    users.forEach((user) => {
        if (excludeIds.indexOf(user.id) !== -1) return
        user.socket.emit(eventName, data)
    })
}

server.listen(3000);
