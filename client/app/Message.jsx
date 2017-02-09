import React from 'react'

const styles = {
    message: {
        marginBottom: 10
    }
}

class Message extends React.Component {
    render() {
        const {msg} = this.props
        return <div style={ styles.message }>
            <strong>{ msg.userId.substr(0, 8) }</strong><br />
            { msg.message }
        </div>
    }
}

export default Message