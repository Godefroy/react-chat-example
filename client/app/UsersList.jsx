import React from 'react'
import socket from './socket'

class UsersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentWillMount() {
        socket.on('userslist', this.onUsersChange.bind(this))
        socket.on('useradd', this.onUserAdd.bind(this))
        socket.on('userdel', this.onUserDel.bind(this))
    }

    componentWillUnmount() {
        socket.off('userslist', this.onUsersChange.bind(this))
        socket.off('useradd', this.onUserAdd.bind(this))
        socket.off('userdel', this.onUserDel.bind(this))
    }

    onUsersChange(users) {
        this.setState({users})
    }

    onUserAdd(user) {
        const users = this.state.users.filter((u) => u.id !== user.id)
        this.setState({
            users: [...users, user]
        })
    }

    onUserDel(userId) {
        this.setState({
            users: this.state.users.filter((u) => u.id !== userId)
        })
    }

    render() {
        const users = this.state.users.sort((a, b) => {
            return a.nickname.toLowerCase() < b.nickname.toLowerCase()
        })
        return <ul { ...this.props }>
            { users.map((user) => <li key={ user.id }>{ user.nickname }</li>) }
        </ul>
    }
}

export default UsersList