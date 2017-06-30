/**
 * Created by zhaoyu on 6/8/16.
 */

import fetch from 'isomorphic-fetch'
import {SERVER_URL} from '../constants/config'
import {checkHttpStatus, parseJSON} from '../businessLogic/utils'
// import exampaperApi from '../api/mockExampaperApi';
import * as types from '../constants/actionTypes'
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions'

export const loadExamUserExampapersSuccess = (exampapers) => {
  return { type: types.LOAD_EXAM_USER_EXAMPAPERS_SUCCESS, exampapers }
}

export const loadExamUserExampapers = (examId = '', token = '') => {
  return (dispatch) => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/exams/${examId}/user_exampapers/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(loadExamUserExampapersSuccess(response))
        return Promise.resolve(response)
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const createExamUserExampaperSuccess = (exampaper) => {
  return {
    type: types.CREATE_EXAMPAPER_SUCCESS,
    exampaper
  }
}

export const createExamUserExampaper = (examId, token) => {
  return (dispatch) => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/exams/${examId}/create_exampaper/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(createExamUserExampaperSuccess(response))
        // return the created exampaper
        return response
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadExampaperSuccess = (exampaper) => {
  return { type: types.LOAD_EXAMPAPER_SUCCESS, exampaper }
}

export const loadExampaper = (exampaperId, token) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/exampapers/${exampaperId}/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(loadExampaperSuccess(response))
        // return the loaded exampaper
        return Promise.resolve(response)
      })
      .catch(error => {
        console.log(error)
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const updateItemAnswerSuccess = (item) => {
  return {
    type: types.UPDATE_ITEM_ANSWER_SUCCESS,
    item
  }
}

export const updateItemAnswerLocally = (exampaperId, itemType, itemId, answer) => {
  return {
    type: types.UPDATE_ITEM_ANSWER_LOCALLY,
    exampaperId,
    itemType,
    itemId,
    answer
  }
}

// recalculate multiselection's answer
const newItemAnswer = (item, answer) => {
  let result = ''
  const origin_answer = item.user_answer == null ? '' : item.user_answer
  const ansIndex = origin_answer.indexOf(answer)
  if (ansIndex >= 0) {
    result =
      origin_answer.slice(0, ansIndex) +
      origin_answer.slice(ansIndex + 1, origin_answer.length)
  } else {
    result = origin_answer + answer
  }
  return result
}

export const updateItemAnswer = (exampaperId, item, answer, token) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    dispatch(updateItemAnswerLocally(exampaperId, item.type, item.id, answer))
    let newAnswer = answer
    if (item.type == 'multiselection') {
      newAnswer = newItemAnswer(item, answer)
    }
    return fetch(`${SERVER_URL}/api/v1/exampapers/${item.type}s/${item.relationsId}/`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        user_answer: newAnswer
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(updateItemAnswerSuccess(response))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

function submitExampaperSuccess (exampaperId) {
  return {
    type: types.SUBMIT_EXAMPAPER_SUCCESS,
    exampaperId
  }
}

export const submitExampaper = (exampaperId) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/exampapers/${exampaperId}/`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        // Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        is_submitted: true
      })
    })
      .then(() => {
        dispatch(submitExampaperSuccess(exampaperId))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}
