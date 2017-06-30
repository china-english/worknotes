import fetch from 'isomorphic-fetch'

import {ajaxCallError} from './ajaxStatusActions'

import * as types from '../constants/actionTypes'
import {SERVER_URL} from '../constants/config'
import {checkHttpStatus, parseJSON} from '../businessLogic/utils'

export const loadSubjectsSuccess = (subjects) => {
  return { type: types.LOAD_SUBJECTS_SUCCESS, subjects }
}

export const loadSubjectKnowledgeSuccess = (knowledgeList) => {
  return { type: types.LOAD_SUBJECT_KNOWLEDGE_SUCCESS, knowledgeList }
}

export const loadSubjects = () => {
  console.log('load subject')
  const url = `${SERVER_URL}/api/v1/subjects/`
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((subjects) => {
        dispatch(loadSubjectsSuccess(subjects))
        return Promise.resolve(subjects)
      })
      .catch(error => {
        dispatch(ajaxCallError())
        return Promise.reject(error)
      })
  }
}

export const loadSubjectKnowledge = (subjectId) => {
  const url = `${SERVER_URL}/api/v1/subjects/${subjectId}/knowledge/`
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((knowledge) => {
        dispatch(loadSubjectKnowledgeSuccess(knowledge))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}
