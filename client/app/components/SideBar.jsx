import React from 'react'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import UsersList from './UsersList'
import ChannelsList from './ChannelsList'

class SideBar extends React.Component {
    render() {
        return <Paper>
            <ChannelsList />
            <Divider />
            <UsersList />
        </Paper>
    }
}

export default SideBar