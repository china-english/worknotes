import fetch from 'isomorphic-fetch'
import {push} from 'react-router-redux'
import jwtDecode from 'jwt-decode'

import {SERVER_URL} from '../constants/config'
import {checkHttpStatus, parseJSON} from '../businessLogic/utils'
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions'

import {
  AUTH_LOGIN_USER_REQUEST,
  AUTH_LOGIN_USER_FAILURE,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGOUT_USER,
  LOAD_PERSON_INFO
} from '../constants/actionTypes'
import * as strings from '../constants/strings'

export const fetchPersonInfoSuccess = (person) => {
  return {
    type: LOAD_PERSON_INFO,
    payload: {
      person
    }
  }
}

export const fetchPersonInfo = (username, token) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/persons/${username}/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(fetchPersonInfoSuccess(response))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export function authLoginUserSuccess (token) {
  sessionStorage.setItem('token', token)
  return {
    type: AUTH_LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  }
}

export function authLoginUserFailure (error) {
  sessionStorage.removeItem('token')
  return {
    type: AUTH_LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function authLoginUserRequest () {
  return {
    type: AUTH_LOGIN_USER_REQUEST
  }
}

export function authLogout () {
  sessionStorage.removeItem('token')
  return {
    type: AUTH_LOGOUT_USER
  }
}

export function authLogoutAndRedirect () {
  return (dispatch) => {
    dispatch(authLogout())
    dispatch(push('/login'))
    return Promise.resolve() // TOOD: we need promise here because of tests, find a better way
  }
}

// todo: fix this function from authLoginUser to authLoginUserAndRedirect, add Promise in it. 20160913
export function authLoginUser (username, password, redirect = '/') {
  return (dispatch) => {
    dispatch(authLoginUserRequest())
    return fetch(`${SERVER_URL}/api/v1/accounts/login/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, password
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        try {
          // Validate if token is valid
          jwtDecode(response.token)
          dispatch(authLoginUserSuccess(response.token))
          dispatch(fetchPersonInfo(username, response.token))
          dispatch(push(redirect))
        } catch (e) {
          dispatch(authLoginUserFailure({
            response: {
              status: 403,
              statusText: 'Invalid token'
            }
          }))
          return strings.WRONG_USERNAME_PASSWORD_MESSAGE
        }
      })
      .catch(error => {
        dispatch(authLoginUserFailure(error))
        return strings.WRONG_USERNAME_PASSWORD_MESSAGE
      })
  }
}
