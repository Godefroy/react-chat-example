import React from 'react'
import {connect} from 'react-redux'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import UserIcon from 'material-ui/svg-icons/social/person'

class UsersList extends React.Component {
    render() {
        // Sort users by nickname
        const users = this.props.notifiers.users.sort((a, b) => {
            return a.get('nickname').toLowerCase() > b.get('nickname').toLowerCase() ? 1 : -1
        })

        // Show users list
        return <List>
            <Subheader>Connected Users</Subheader>
            { users.map((user) => <ListItem
                key={ user.get('id') }
                primaryText={ user.get('nickname') }
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
        users: state.usersReducer
    }
})

export default connect(mapStateToProps)(UsersList)
