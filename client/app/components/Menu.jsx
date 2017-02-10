import React from 'react'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
// Actions
import {changeNickname} from '../actions/user'

class Menu extends React.Component {
    render() {
        const {nickname} = this.props.notifiers
        return <AppBar
            title='Chat'
            iconElementRight={<FlatButton label={ nickname }/>}
        />
    }
}

Menu.propTypes = {
    actions: React.PropTypes.object,
    notifiers: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        nickname: state.userReducer.get('nickname')
    }
})

const mapDispatchToProps = (dispatch) => ({
    actions: {
        changeNickname: (nickname) => dispatch(changeNickname(nickname))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
