import React from 'react'
import {ListItem} from 'material-ui/List'
import UserIcon from 'material-ui/svg-icons/social/person'
import {connect} from 'react-redux'

class Message extends React.Component {
    render() {
        const {msg, notifiers} = this.props
        const user = notifiers.users.find(u => u.get('id') == msg.get('userId'))
        const nickname = user ? user.get('nickname') : '(Unknown)'

        return <ListItem disabled leftIcon={ <UserIcon />} style={{ lineHeight: '1.5em'}}>
            <strong>{ nickname }</strong>
            <p style={{whiteSpace: 'pre-line'}}>{ msg.get('message') }</p>
        </ListItem>
    }
}

Message.propTypes = {
    msg: React.PropTypes.object.isRequired,
    notifiers: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        users: state.usersReducer
    }
})

export default connect(mapStateToProps)(Message)
