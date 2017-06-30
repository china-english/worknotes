/**
 *
 * Created by zhaoyu on 10/02/16.
 */
import fetch from 'isomorphic-fetch'

import {SERVER_URL} from '../constants/config'
import {checkHttpStatus, parseJSON} from '../businessLogic/utils'

import * as types from '../constants/actionTypes'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'

export const loadAssignmentsSuccess = (assignments) => {
  return {type: types.LOAD_ASSIGNMENTS_SUCCESS, assignments}
}

export const loadAssignmentSuccess = (assignment) => {
  return {type: types.LOAD_ASSIGNMENT_SUCCESS, assignment}
}

export const loadAssignmentSubmissionsSuccess = (submissions) => {
  return {type: types.LOAD_ASSIGNMENT_SUBMISSIONS_SUCCESS, submissions}
}

export const loadAssignmentReviewsSuccess = (reviews) => {
  return {type: types.LOAD_ASSIGNMENT_REVIEWS_SUCCESS, reviews}
}

export const loadAssignments = () => {
  return dispatch => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/assignments/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(loadAssignmentsSuccess(response.results))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadAssignment = (id) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/assignments/${id}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(loadAssignmentSuccess(response))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadAssignmentSubmissions = (id) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/assignments/${id}/submissions/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        console.log(response)
        dispatch(loadAssignmentSubmissionsSuccess(response))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadAssignmentReviews = (id) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/assignments/${id}/reviews/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(loadAssignmentReviewsSuccess(response.results))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}
