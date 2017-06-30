import * as types from '../constants/actionTypes'
import fetch from 'isomorphic-fetch'
import {SERVER_URL} from '../constants/config'
import {ajaxCallError} from './ajaxStatusActions'

export const createKnowledgeSuccess = (knowledge) => {
  return {type: types.CREATE_KNOWLEDGE_SUCCESS, knowledge}
}
export const updateKnowledgeSuccess = (knowledge) => {
  return {type: types.UPDATE_KNOWLEDGE_SUCCESS, knowledge}
}
export const deleteKnowledgeSuccess = (knowledge) => {
  return {type: types.DELETE_KNOWLEDGE_SUCCESS, knowledge}
}

export const createKnowledge = (knowledge) => {
  const url = `${SERVER_URL}/api/v1/knowledge/`
  return dispatch => {
    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        knowledge
      )
    })
      .then(() => {
        dispatch(createKnowledgeSuccess(knowledge))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const updateKnowledge = (knowledge) => {
  const url = `${SERVER_URL}/api/v1/knowledge/${knowledge.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        knowledge
      )
    })
      .then(() => {
        dispatch(updateKnowledgeSuccess(knowledge))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const deleteKnowledge = (knowledge) => {
  const url = `${SERVER_URL}/api/v1/knowledge/${knowledge.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(deleteKnowledgeSuccess(knowledge))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}
