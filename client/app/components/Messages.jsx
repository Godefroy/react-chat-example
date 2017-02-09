import React from 'react'
import { connect } from 'react-redux'
import Message from './Message'

class Messages extends React.Component {
    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        if (!this.container) return
        const scrollHeight = this.container.scrollHeight;
        const height = this.container.clientHeight;
        this.container.scrollTop = scrollHeight - height;
    }

    render() {
        const { messages } = this.props.notifiers
        const style = Object.assign({}, this.props.style, {
            overflow: 'auto'
        })
        return <div style={ style } ref={(ref) => this.container = ref}>
            { messages.map((msg) => <Message msg={msg} key={msg.id}/>)}
        </div>
    }
}

Messages.propTypes = {
    style: React.PropTypes.object,
    notifiers: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        messages: state.messagesReducer
    }
})

export default connect(mapStateToProps)(Messages)
