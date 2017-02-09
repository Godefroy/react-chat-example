import React from 'react'
import Form from './Form'
import Messages from './Messages'
import SideBar from './SideBar'
import socket from './socket'

const styles = {
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 200,
        padding: 20,
        borderRight: '2px solid #eee'
    },
    messages: {
        position: 'absolute',
        top: 0,
        bottom: 70,
        left: 240,
        right: 0,
        padding: 20
    },
    form: {
        position: 'absolute',
        bottom: 0,
        left: 240,
        right: 0,
        height: 30,
        padding: 20,
        borderTop: '2px solid #eee'
    }
}

export default class App extends React.Component {
    render() {
        return <div style={ styles.container }>
            <SideBar style={ styles.sidebar }/>
            <Messages style={ styles.messages }/>
            <Form style={ styles.form }/>
        </div>
    }
}
