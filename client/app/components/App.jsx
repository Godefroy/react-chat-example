import React from 'react'
import {connect} from 'react-redux'
import {Grid, Row, Col} from 'react-bootstrap'
import ConnectBox from './ConnectBox'
import MessageForm from './MessageForm'
import Messages from './Messages'
import SideBar from './SideBar'
import Menu from './Menu'

class App extends React.Component {
    render() {
        const {notifiers} = this.props
        return !notifiers.connected
            ? <ConnectBox />
            : <div>
            <Menu />
            <Grid fluid>
                <Row>
                    <Col xs={4} md={3}>
                        <SideBar />
                    </Col>
                    <Col xs={8} md={9}>
                        <Messages />
                        <MessageForm />
                    </Col>
                </Row>
            </Grid>
        </div>
    }
}

App.propTypes = {
    notifiers: React.PropTypes.object
}

const mapStateToProps = (state) => ({
    notifiers: {
        connected: state.userReducer.get('id') !== null
    }
})

export default connect(mapStateToProps)(App)
