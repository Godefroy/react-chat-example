import React from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import {List} from 'material-ui/List'
import Message from './Message'

// Max number of messages to display
const maxDisplayed = 100

// Max duration in seconds between two grouped messages
const groupMaxTimelapse = 30

const styles = {
    container: {
        height: '400px',
        overflowY: 'auto'
    }
}

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
        // Note: Messages are immutable
        const messages = this.props.notifiers.messages
        // Take last messsages
            .slice(-maxDisplayed)
            // Group message from the same author
            .reduce((list, msg) => {
                if (list.size !== 0) {
                    const lastI = list.size - 1
                    const lastMsg = list.get(lastI)
                    if (lastMsg.get('userId') === msg.get('userId') &&
                        msg.get('date') - lastMsg.get('date') < groupMaxTimelapse * 1000) {
                        const message = lastMsg.get('message') + "\n" + msg.get('message')
                        return list.update(lastI, (item) => item.set('message', message))
                    }
                }
                return list.push(msg)
            }, Immutable.List())

        return <div>
            <Paper>
                <Subheader>#general</Subheader>
            </Paper>
            <div style={ styles.container } ref={(ref) => this.container = ref}>
                <List>
                    { messages.map((msg) => <Message msg={msg} key={msg.get('id')}/>)}
                </List>
            </div>
        </div>
    }
}

Messages.propTypes = {
    notifiers: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        messages: state.messagesReducer
    }
})

export default connect(mapStateToProps)(Messages)
