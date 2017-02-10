import React from 'react'
import {connect} from 'react-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
// Actions
import {sendMessage} from '../actions/messages'
import {updateForm} from '../actions/ui'

class MessageForm extends React.Component {
    /*componentWillMount() {
        // Auto-nick
        const nickname = localStorage.getItem('nickname')
        if (nickname) {
            this.props.actions.changeNickname(nickname)
        }
    }*/

    render() {
        const {style, notifiers} = this.props
        return <form onSubmit={ this.submit.bind(this) }>
            <Paper style={{padding: '0 15px'}}>
                <TextField
                    hintText='Message...'
                    fullWidth
                    value={ notifiers.text }
                    onChange={ this.changeText.bind(this) }
                />
            </Paper>
        </form>
    }

    changeText(e) {
        this.props.actions.updateForm(e.target.value)
    }

    submit(e) {
        e.preventDefault()
        const {actions, notifiers} = this.props

        // Send Message to server
        actions.sendMessage(notifiers.currentChannel, notifiers.text)

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
        text: state.uiReducer.get('text')
    }
})

const mapDispatchToProps = (dispatch) => ({
    actions: {
        updateForm: (text) => dispatch(updateForm(text)),
        sendMessage: (channel, text) => dispatch(sendMessage(channel, text))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
