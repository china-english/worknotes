/**
 * Created by zhaoyu on Dec 05 2016.
 */

import * as types from '../constants/actionTypes'
import initialState from './initialState'

function actionTypeEndsInSuccess (type) {
  return type.substring(type.length - 8) == '_SUCCESS'
}

const ajaxStatusReducer = (state = initialState.ajaxCallInProgress, action) => {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return state + 1
  } else if (actionTypeEndsInSuccess(action.type)) {
    return state - 1
  } else if (action.type == types.AJAX_CALL_ERROR) {
    return state - 1
  }
  return state
}

export default ajaxStatusReducer
