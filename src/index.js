// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap-theme.css'
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
registerServiceWorker()
