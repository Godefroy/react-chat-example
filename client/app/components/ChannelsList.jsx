import React from 'react'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import ChannelIcon from 'material-ui/svg-icons/social/group'

class ChannelsList extends React.Component {
    render() {
        // Show users list
        return <List>
            <Subheader>Channels</Subheader>
            <ListItem
                primaryText='#general'
                leftIcon={<ChannelIcon />}
            />
        </List>
    }
}

export default ChannelsList
