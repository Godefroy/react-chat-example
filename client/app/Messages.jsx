import React from 'react'
import Message from './Message'
import socket from './socket'

class Messages extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }

    componentWillMount() {
        socket.on('msg', this.onNewMessage.bind(this))
    }

    componentWillUnmount() {
        socket.off('msg', this.onNewMessage.bind(this))
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    onNewMessage(message) {
        this.setState({
            messages: [...this.state.messages, message]
        })
    }

    scrollToBottom() {
        if (!this.container) return
        const scrollHeight = this.container.scrollHeight;
        const height = this.container.clientHeight;
        this.container.scrollTop = scrollHeight - height;
    }

    render() {
        const style = Object.assign({}, this.props.style, {
            overflow: 'auto'
        })
        return <div style={ style } ref={(ref) => this.container = ref}>
            { this.state.messages.map((msg) => <Message msg={msg} key={msg.id}/>)}
        </div>
    }
}

export default Messages