import React from 'react'
import {connect} from 'react-redux'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import ChannelIcon from 'material-ui/svg-icons/social/group'
// Actions
import {changeChannel} from '../actions/ui'

class ChannelsList extends React.Component {
    render() {
        const {notifiers, actions} = this.props
        // Show users list
        return <List>
            <Subheader>Channels</Subheader>
            { notifiers.channels.map((channel) => (
                <ListItem
                    key={ channel }
                    primaryText={ '#' + channel }
                    leftIcon={ <ChannelIcon /> }
                    style={ notifiers.currentChannel === channel ? {fontWeight: 'bold'} : {}}
                    onClick={ () => actions.changeChannel(channel) }
                />
            )) }
        </List>
    }
}

ChannelsList.propTypes = {
    notifiers: React.PropTypes.object,
    actions: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        currentChannel: state.uiReducer.get('currentChannel'),
        channels: state.channelsReducer.keySeq().toJS()
    }
})

const mapDispatchToProps = (dispatch) => ({
    actions: {
        changeChannel: (channel) => dispatch(changeChannel(channel))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChannelsList)
