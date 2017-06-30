/**
 * Created by zhaoyu on Mar 2, 2017.
 */
// @flow
'use strict'

import fetch from 'isomorphic-fetch'

import { SERVER_URL } from '../constants/config'
import { checkHttpStatus, parseJSON } from '../businessLogic/utils'

import * as types from '../constants/actionTypes'
import type { Action, ThunkAction } from './types'
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'

/**
 * evaluations and assessments relations
 */

export const loadAssessmentsSuccess = (assessments: Array<Object>): Action => {
  return {type: types.LOAD_ASSESSMENTS_SUCCESS, assessments}
}

export const loadAssessmentSuccess = (assessment: Object): Action => {
  return {type: types.LOAD_ASSESSMENT_SUCCESS, assessment}
}

export const loadEvaluationSuccess = (evaluation: Object): Action => {
  return {type: types.LOAD_EVALUATION_SUCCESS, evaluation}
}

export const loadEvaluationResultsSuccess = (results: Array<Object>): Action => {
  return {type: types.LOAD_EVALUATION_RESULTS_SUCCESS, results}
}

export const loadAssessmentRelationSuccess = (relation: Object): Action => {
  return {type: types.LOAD_ASSESSMENT_RELATION_SUCCESS, relation}
}

export const loadAssessments = (): ThunkAction => {
  return (dispatch, getState) => {
    console.log(getState().auth.token)
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/assessments/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getState().auth.token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(assessments => {
        dispatch(loadAssessmentsSuccess(assessments))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}

export const loadAssessment = (id: string): ThunkAction => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/assessments/${id}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getState().auth.token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(loadAssessmentSuccess(response))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}

export const loadAssessmentRelation = (id: string, category: string, entityId: string): ThunkAction => {
  return (dispatch, getState) => {
    const url = `${SERVER_URL}/api/v1/assessments/${id}/${category}/?${category}=${entityId}`
    dispatch(beginAjaxCall())
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getState().auth.token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        // console.log(response);
        dispatch(loadAssessmentRelationSuccess(response))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}

export const cleanAssessmentRelation = (): Action => {
  return {type: types.CLEAN_ASSESSMENT_RELATION}
}

export const loadEvaluation = (id: string): ThunkAction => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/evaluations/${id}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getState().auth.token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        // console.log(response);
        dispatch(loadEvaluationSuccess(response))
        return response
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}

export const loadEvaluationResults = (id: string, category: string): ThunkAction => {
  return (dispatch, getState) => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/evaluations-results/${id}/results/?category=${category}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getState().auth.token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        // console.log(response);
        dispatch(loadEvaluationResultsSuccess(response))
        return response
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}

/**
 * score relations
 */

export const createPersonScoreRelationSuccess = (personScoreRelation: Object): Action => {
  return {type: types.CREATE_PERSON_SCORE_RELATION_SUCCESS, personScoreRelation}
}

export const createSchoolScoreRelationSuccess = (schoolScoreRelation: Object): Action => {
  return {type: types.CREATE_SCHOOL_SCORE_RELATION_SUCCESS, schoolScoreRelation}
}

export const activateScoresSuccess = (): Action => {
  return {type: types.ACTIVATE_SCORES_SUCCESS}
}

export const loadActivatedPeopleScoresCountSuccess = (count: number): Action => {
  return {type: types.LOAD_ACTIVATED_PEOPLE_SCORES_COUNT_SUCCESS, count}
}

export const loadActivatedSchoolsScoresCountSuccess = (count: number): Action => {
  return {type: types.LOAD_ACTIVATED_SCHOOLS_SCORES_COUNT_SUCCESS, count}
}

export const createPersonScoreRelation = (score: Object): ThunkAction => {
  let url = `${SERVER_URL}/api/v1/person-score-relations/`
  return (dispatch, getState) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getState().auth.token}`
      },
      body: JSON.stringify(
        score
      )
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(scoreRelation => {
        dispatch(createPersonScoreRelationSuccess(scoreRelation))
        return scoreRelation
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}

export const createSchoolScoreRelation = (score: Object): ThunkAction => {
  const url = `${SERVER_URL}/api/v1/school-score-relations/`
  return (dispatch, getState) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getState().auth.token}`
      },
      body: JSON.stringify(
        score
      )
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(scoreRelation => {
        dispatch(createSchoolScoreRelationSuccess(scoreRelation))
        return scoreRelation
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}

export const activateScores = (id: string, category: string): ThunkAction => {
  const url = `${SERVER_URL}/api/v1/evaluations/${id}/activate_scores/?category=${category}`
  return (dispatch, getState) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getState().auth.token}`
      },
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(result => {
        // console.log(result);
        dispatch(activateScoresSuccess())
        return result
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}

export const loadActivatedScoresCount = (id: string, category: string): ThunkAction => {
  const url = `${SERVER_URL}/api/v1/evaluations/${id}/activated_scores_count/?category=${category}`
  return (dispatch, getState) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${getState().auth.token}`
      },
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(result => {
        // console.log(result);
        if (category == 'people') {
          dispatch(loadActivatedPeopleScoresCountSuccess(result.count))
        } else {
          dispatch(loadActivatedSchoolsScoresCountSuccess(result.count))
        }
        return result
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw(error)
      })
  }
}
