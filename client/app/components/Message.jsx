import React from 'react'
import { connect } from 'react-redux'

const styles = {
    message: {
        marginBottom: 10
    }
}

class Message extends React.Component {
    render() {
        const {msg, notifiers} = this.props
        const user = notifiers.users.find(u => u.id == msg.userId)

        return <div style={ styles.message }>
            <strong>{ user ? user.nickname : '(Unknown)' }</strong><br />
            { msg.message }
        </div>
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
