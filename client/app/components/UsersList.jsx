import React from 'react'
import {connect} from 'react-redux'

class UsersList extends React.Component {
    render() {
        // Sort users by nickname
        const users = this.props.notifiers.users.sort((a, b) => {
            return a.nickname.toLowerCase() > b.nickname.toLowerCase() ? 1 : -1
        })

        const {style} = this.props

        // Show users list
        return <ul style={ style }>
            { users.map((user) => <li key={ user.id }>{ user.nickname }</li>) }
        </ul>
    }
}

UsersList.propTypes = {
    actions: React.PropTypes.object,
    notifiers: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        users: state.usersReducer
    }
})

export default connect(mapStateToProps)(UsersList)
