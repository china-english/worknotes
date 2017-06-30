/**
 * Created by zhaoyu on Jun 29, 2017.
 */

import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
// import rootReducer from '../modules'
import rootReducer from '../reducers'

// configure middleware
// Redux reduxImmutableStateInvariant is a middleware
// that spits an error on you when you try to mutate
// your state either inside a dispatch or between
// dispatches. For development use only!

// Redux Thunk middleware allows you to write
// action creators that return a function instead
// of an action. The thunk can be used to delay the
// dispatch of an action, or to dispatch only if a certain condition is met.

export const history = createHistory()
const enhancers = []

const middleware = [
  thunk,
  routerMiddleware(history),
  reduxImmutableStateInvariant()
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

/**
 *
 *
 * @export
 * @param {any} initialState
 * @returns {void}
 */
export default function configureStore (initialState) {
  return createStore(
    rootReducer,
    initialState,
    composedEnhancers
  )
}
