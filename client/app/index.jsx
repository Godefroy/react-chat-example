import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
// Material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'bootstrap/dist/css/bootstrap.css'
// Redux
import {Provider} from 'react-redux'
import store from './store'
// Components
import App from './components/App'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render App

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <MuiThemeProvider>
                    <Component />
                </MuiThemeProvider>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./components/App', () => render(App))
}