import React from 'react'
import UsersList from './UsersList'

class SideBar extends React.Component {
    render() {
        return <div { ...this.props }>
            <strong>Users</strong>
            <UsersList />
        </div>
    }
}

export default SideBar