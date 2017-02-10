import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import MessageForm from './MessageForm'
import Messages from './Messages'
import SideBar from './SideBar'
import Menu from './Menu'

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
}

export default class App extends React.Component {
    render() {
        return <div style={ styles.container }>
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
