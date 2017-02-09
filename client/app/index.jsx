import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// Redux
import { Provider } from 'react-redux'
import store from './store'
// Components
import App from './App'

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
}

render(App)

if (module.hot) {
    module.hot.accept('./App', () => render(App))
}