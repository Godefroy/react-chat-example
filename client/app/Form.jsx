import React from 'react'
import socket from './socket'

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            message: ''
        }
    }

    render() {
        return <form { ...this.props } onSubmit={this.submit.bind(this)}>
            <input type="text"
                   value={this.state.message}
                   onChange={this.changeMessage.bind(this)} />
            <button>Envoyer</button>
        </form>
    }

    changeMessage(e) {
        this.setState({
            message: e.target.value
        })
    }

    submit(e) {
        e.preventDefault()

        // Change nickname
        const nickMatch = this.state.message.match(/\/nick ([a-z0-9_-]{3,20})/i)
        if (nickMatch) {
            socket.emit('nick', nickMatch[1])
        }
        // Send Message to server
        else {
            socket.emit('msg', this.state.message)
        }

        // Reset input value
        this.setState({
            message: ''
        })
    }
}

export default Form