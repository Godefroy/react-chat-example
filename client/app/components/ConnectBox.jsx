import React from 'react'
import {connect} from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import UserIcon from 'material-ui/svg-icons/social/person'
// Actions
import {updateNicknameForm} from '../actions/ui'
import {changeNickname} from '../actions/user'
import {joinChannel} from '../actions/channels'

class ConnectBox extends React.Component {
    componentWillMount() {
        const {notifiers, actions} = this.props
        if (notifiers.inputNickname != '') return
        // Auto-nick
        const nickname = localStorage.getItem('nickname')
        if (nickname) {
            actions.updateForm(nickname)
        }
    }

    render() {
        const {notifiers, actions} = this.props
        return <Dialog
            title='Login'
            actions={<FlatButton
                label='Connect'
                primary={ true }
                onTouchTap={ this.handleConnect.bind(this) }
            />}
            modal={ false }
            open={ true }
        >
            <form onSubmit={ this.handleConnect.bind(this) }>
                <p>
                    Choose a nickname:
                </p>
                <Menu disableAutoFocus={true}>
                    <MenuItem leftIcon={<UserIcon />} disabled={true}>
                        <TextField
                            hintText='Nickname...'
                            autoFocus
                            value={ notifiers.inputNickname }
                            onChange={ (e) => actions.updateForm(e.target.value) }
                        />
                    </MenuItem>
                </Menu>
            </form>
        </Dialog>
    }

    handleConnect(e) {
        if (e) e.preventDefault()
        const {notifiers, actions} = this.props
        actions.changeNickname(notifiers.inputNickname)
    }
}

ConnectBox.propTypes = {
    notifiers: React.PropTypes.object,
    actions: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        inputNickname: state.uiReducer.get('inputNickname')
    }
})

const mapDispatchToProps = (dispatch) => ({
    actions: {
        updateForm: (nickname) => dispatch(updateNicknameForm(nickname)),
        changeNickname: (nickname) => {
            changeNickname(nickname)((action) => {
                dispatch(action)
                dispatch(joinChannel('general'))
            })
        }
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectBox)
