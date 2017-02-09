import React from 'react'
import {connect} from 'react-redux'
// Actions
import {changeNickname} from '../actions/users'
import {updateForm, sendMessage} from '../actions/messageForm'

class MessageForm extends React.Component {
    componentWillMount() {
        // Auto-nick
        const nickname = localStorage.getItem('nickname')
        if (nickname) {
            this.props.actions.changeNickname(nickname)
        }
    }

    render() {
        const {style, notifiers} = this.props
        return <form style={ style } onSubmit={this.submit.bind(this)}>
            <input type="text"
                   value={notifiers.text}
                   onChange={this.changeText.bind(this)}/>
            <button>Envoyer</button>
        </form>
    }

    changeText(e) {
        this.props.actions.updateForm(e.target.value)
    }

    submit(e) {
        e.preventDefault()
        const {actions, notifiers} = this.props

        // Change nickname
        const nickMatch = notifiers.text.match(/\/nick ([a-z0-9_-]{3,20})/i)
        if (nickMatch) {
            actions.changeNickname(nickMatch[1])
        }
        // Send Message to server
        else {
            actions.sendMessage(notifiers.text)
        }

        // Reset input value
        actions.updateForm('')
    }
}

MessageForm.propTypes = {
    style: React.PropTypes.object,
    actions: React.PropTypes.object,
    notifiers: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        text: state.messageFormReducer.get('text')
    }
})

const mapDispatchToProps = (dispatch) => ({
    actions: {
        updateForm: (text) => dispatch(updateForm(text)),
        sendMessage: (text) => dispatch(sendMessage(text)),
        changeNickname: (nickname) => dispatch(changeNickname(nickname)),
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm)
