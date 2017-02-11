import React from 'react'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
// Actions
import {changeNickname} from '../actions/user'
import {updateMessageForm} from '../actions/ui'

class Menu extends React.Component {
    render() {
        const {notifiers, actions} = this.props

        const iconMenu = <IconMenu
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <MenuItem
                primaryText='Change nickname'
                onTouchTap={ () => actions.updateMessageForm('/nick ' + notifiers.nickname) }/>
            <MenuItem
                primaryText='Join a channel'
                onTouchTap={ () => actions.updateMessageForm('/join #') }/>
            <MenuItem
                primaryText={ 'Quit channel #' + notifiers.currentChannel }
                onTouchTap={ () => actions.updateMessageForm('/quit #' + notifiers.currentChannel) }/>
        </IconMenu>

        return <AppBar
            title='Chat'
            iconElementLeft={ <span /> }
            iconElementRight={ iconMenu }
        />
    }
}

Menu.propTypes = {
    actions: React.PropTypes.object,
    notifiers: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        nickname: state.userReducer.get('nickname'),
        currentChannel: state.uiReducer.get('currentChannel')
    }
})

const mapDispatchToProps = (dispatch) => ({
    actions: {
        updateMessageForm: (text) => dispatch(updateMessageForm(text))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
