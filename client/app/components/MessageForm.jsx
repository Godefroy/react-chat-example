import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
// Actions
import {sendMessage} from '../actions/messages'
import {updateMessageForm} from '../actions/ui'

class MessageForm extends React.Component {
    render() {
        const {notifiers, actions} = this.props
        return <form onSubmit={ this.submit.bind(this) }>
            <Paper style={{padding: '0 15px'}}>
                <TextField
                    hintText='Message...'
                    fullWidth
                    autoFocus
                    value={ notifiers.inputMessage }
                    onChange={ (e) => actions.updateForm(e.target.value) }
                />
            </Paper>
        </form>
    }

    submit(e) {
        e.preventDefault()
        const {actions, notifiers} = this.props

        // Send Message to server
        actions.sendMessage(notifiers.currentChannel, notifiers.inputMessage)

        // Reset input value
        actions.updateForm('')
    }
}

MessageForm.propTypes = {
    actions: React.PropTypes.object,
    notifiers: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        currentChannel: state.uiReducer.get('currentChannel'),
        inputMessage: state.uiReducer.get('inputMessage')
    }
})

const mapDispatchToProps = (dispatch) => ({
    actions: {
        updateForm: (text) => dispatch(updateMessageForm(text)),
        sendMessage: (channel, text) => dispatch(sendMessage(channel, text))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
