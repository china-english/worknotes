// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap-theme.css'
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import configureStore, { history } from './store/configureStore'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore(window.INITIAL_STATE)

// const token = sessionStorage.getItem('token')
// if (token !== null) {
//   store.dispatch(authLoginUserSuccess(token))
// }

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
