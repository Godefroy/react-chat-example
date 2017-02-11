import React from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import UserIcon from 'material-ui/svg-icons/social/person'

class UsersList extends React.Component {
    render() {
        const {notifiers} = this.props
        // Sort users by nickname
        const users = notifiers.users.sort((a, b) => {
            // Current user first
            if (a.get('id') == notifiers.userId) return -1
            if (b.get('id') == notifiers.userId) return 1
            // Sort by name
            return a.get('nickname').toLowerCase() > b.get('nickname').toLowerCase() ? 1 : -1
        })

        // Show users list
        return <List>
            <Subheader>Connected Users</Subheader>
            { users.map((user) => <ListItem
                key={ user.get('id') }
                primaryText={
                    user.get('nickname')
                    + (user.get('id') == notifiers.userId ? ' (you)' : '')
                }
                //leftAvatar={<Avatar src="static/images/user123.jpg"/>}
                leftIcon={ <UserIcon /> }
            />) }
        </List>
    }
}

UsersList.propTypes = {
    notifiers: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        // Take users of current channel
        users: state.channelsReducer.get(state.uiReducer.get('currentChannel')) || Immutable.List(),
        userId: state.userReducer.get('id')
    }
})

export default connect(mapStateToProps)(UsersList)
