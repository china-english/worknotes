/**
 * Created by zhaoyu on Jun 29, 2017.
 */

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
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

const middlewares = [thunk, reduxImmutableStateInvariant()]

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
    applyMiddleware(...middlewares)
  )
}
