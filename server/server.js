const server = require('http').createServer();
const io = require('socket.io')(server);
const uuid = require('node-uuid')

const nicknameRegex = /[a-z0-9_-]{3,30}/i
const channelRegex = /[a-z0-9_-]{3,30}/i
const emptyReply = () => {
}

// List of connected Users
const users = []

// List of users id by channel
// { "general": [id1, id2, ...] }
const channels = {}


io.on('connection', (socket) => {
    const user = {
        id: uuid.v4(),
        nickname: null,
        socket
    }
    users.push(user)

    // User disconnection
    socket.on('disconnect', () => {
        // Remove from users
        users.splice(users.indexOf(user), 1)
        // Remove from channels
        Object.keys(channels).forEach((channel) => {
            const userIds = channels[channel]
            const i = userIds.indexOf(user.id)
            if (i !== -1) userIds.splice(i, 1)
        })
        deleteEmptyChannels()
        if (user.nickname !== null) {
            broadcastUserChannels(user.id, 'disconnect', user.id, user.id)
        }
    })

    // Change Nickname
    socket.on('nick', (nickname, reply = emptyReply) => {
        if (!nicknameRegex.test(nickname)) {
            return reply({
                error: 'NICKNAME_INVALID'
            })
        }
        if (users.some((u) => u.nickname !== null && u.nickname.toLowerCase() === nickname.toLowerCase())) {
            return reply({
                error: 'NICKNAME_RESERVED'
            })
        }

        user.nickname = nickname
        broadcastUserChannels(user.id, 'nick', {
            id: user.id,
            nickname
        })
        reply({
            id: user.id,
            nickname
        })
    })

    // Join / Create a Channel
    socket.on('join', (channel, reply = emptyReply) => {
        if (!channelRegex.test(channel)) {
            return reply({
                error: 'CHANNEL_INVALID'
            })
        }
        if (user.nickname === null) {
            return reply({
                error: 'NICKNAME_UNDEFINED'
            })
        }
        // Create channel if it doestn't exist
        if (typeof(channels[channel]) === 'undefined') {
            channels[channel] = []
        }
        const userIds = channels[channel]

        // Already in this channel
        if (userIds.includes(user.id)) {
            return reply()
        }
        userIds.push(user.id)

        broadcastChannel(channel, 'join', {
            channel,
            user: {
                id: user.id,
                nickname: user.nickname
            }
        }, [user.id])

        // Reply with the list of connected users
        reply(users.filter((u) => userIds.includes(u.id))
            .map((u) => {
                return {
                    id: u.id,
                    nickname: u.nickname
                }
            }))
    })

    // Quit a Channel
    socket.on('quit', (channel, reply = emptyReply) => {
        if (typeof(channels[channel]) === 'undefined' || !channels[channel].includes(user.id)) {
            return reply()
        }
        const userIds = channels[channel]
        userIds.splice(userIds.indexOf(user.id), 1)
        deleteEmptyChannels()

        broadcastChannel(channel, 'quit', {
            channel,
            userId: user.id
        }, [user.id])
        reply()
    })

    // Send a message on a channel
    socket.on('msg', ({channel, text}, reply = emptyReply) => {
        if (typeof (text) !== 'string') {
            return reply({
                error: 'INVALID_MESSAGE'
            })
        }
        if (typeof(channels[channel]) === 'undefined' || !channels[channel].includes(user.id)) {
            return reply({
                error: 'CHANNEL_NOT_FOUND'
            })
        }

        broadcastChannel(channel, 'msg', {
            id: uuid.v4(),
            userId: user.id,
            channel,
            text,
            date: new Date().getTime()
        })
    })
})


const broadcast = (eventName, data, excludeIds = []) => {
    users.filter((user) => !excludeIds.includes(user.id))
        .forEach((user) => user.socket.emit(eventName, data))
}

const broadcastChannel = (channel, eventName, data, excludeIds = []) => {
    const userIds = channels[channel]
    if (typeof(userIds) === 'undefined') return
    users.filter((user) => userIds.includes(user.id) && !excludeIds.includes(user.id))
        .forEach((user) => user.socket.emit(eventName, data))
}

const broadcastUserChannels = (userId, eventName, data, excludeIds = []) => {
    Object.keys(channels)
    // Take channels containing userId
        .filter((channel) => channels[channel].includes(userId))
        // Take user ids from channels
        .reduce((userIds, channel) => [...userIds, ...channels[channel]], [])
        // Unique ids
        .filter((id, i, userIds) => userIds.indexOf(id) === i && !excludeIds.includes(id))
        // Get users from userIds
        .map((id) => users.find((u) => u.id === id))
        // Send event
        .forEach((user) => user.socket.emit(eventName, data))
}

const deleteEmptyChannels = () => {
    Object.keys(channels).forEach((channel) => {
        if (channels[channel].length === 0) {
            delete channels[channel]
        }
    })
}

server.listen(3000)
