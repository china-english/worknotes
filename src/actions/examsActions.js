/**
 * Created by zhaoyu on 6/8/16.
 */
import fetch from 'isomorphic-fetch'
import {SERVER_URL} from '../constants/config'
import * as types from '../constants/actionTypes'

import {checkHttpStatus, parseJSON} from '../businessLogic/utils'

import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions'

export const loadExamsSuccess = (exams) => {
  return { type: types.LOAD_EXAMS_SUCCESS, exams }
}

export const updateExamsPageNumber = (page) => {
  return { type: types.UPDATE_EXAMS_PAGE_NUMBER, page }
}

/* Load single exam from the server */
export const loadExamSuccess = (exam) => {
  return { type: types.LOAD_EXAM_SUCCESS, exam }
}

export const loadKSFSSuccess = (KSFS) => {
  return { type: types.LOAD_KSFS_SUCCESS, KSFS}
}

/* Load single exam results pivot by party from the server */
export const loadExamPivotByPartySuccess = (payload) => {
  return { type: types.LOAD_EXAM_PIVOT_BY_PARTY_SUCCESS, payload }
}

export const createExamSuccess = (exam) => {
  return { type: types.CREATE_EXAM_SUCCESS, exam }
}

export const updateExamSuccess = (exam) => {
  return { type: types.UPDATE_EXAM_SUCCESS, exam }
}

export const hideExamSuccess = (examId) => {
  return { type: types.HIDE_EXAM_SUCCESS, examId }
}

export const createBoilerplateSuccess = (boilerplate) => {
  return { type: types.CREATE_BOILERPLATE_SUCCESS, boilerplate }
}

export const updateBoilerplateSuccess = (boilerplate) => {
  return { type: types.UPDATE_BOILERPLATE_SUCCESS, boilerplate }
}

export const loadExams = (subject = '', page = 1) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/exams/?page=${page}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        dispatch(updateExamsPageNumber(page))
        dispatch(loadExamsSuccess(response))
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadExam = (examId) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    // noinspection JSUnresolvedFunction
    return fetch(`${SERVER_URL}/api/v1/exams/${examId}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(exam => {
        dispatch(loadExamSuccess(exam))
        return Promise.resolve(exam)
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadExamPivotByParty = (examId) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/exam-results-by-party/?exam=${examId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(response => {
        // dispatch(loadExamPivotByPartySuccess({examId, response}));
        return response.results
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const createExam = (exam, token) => {
  let url = `${SERVER_URL}/api/v1/exams-editor/`
  return dispatch => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify(
        exam
      )
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((exam) => {
        dispatch(createExamSuccess(exam))
        return Promise.resolve(exam)
      })
      .catch(error => {
        console.log(error)
        dispatch(ajaxCallError())
        // throw(error);
        return Promise.reject(error)
      })
  }
}

export const partialUpdateExam = (exam, token) => {
  let url = `${SERVER_URL}/api/v1/exams-editor/${exam.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify(
        exam
      )
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((exam) => {
        console.log('partial updated exam: ', exam)
        dispatch(updateExamSuccess(exam))
        return Promise.resolve(exam)
      }).catch(error => {
        console.log(error)
        dispatch(ajaxCallError())
        // throw(error);
        return Promise.reject(error)
      })
  }
}

export const updateExam = (exam, token) => {
  let url = `${SERVER_URL}/api/v1/exams-editor/${exam.id}/`
  return dispatch => {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify(
        exam
      )
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((exam) => {
        console.log('updated exam: ', exam)
        dispatch(updateExamSuccess(exam))
        return Promise.resolve(exam)
      }).catch(error => {
        console.log(error)
        dispatch(ajaxCallError())
        // throw(error);
        return Promise.reject(error)
      })
  }
}

export const deleteExam = (examId) => {
  const url = `${SERVER_URL}/api/v1/exams-editor/${examId}/`
  return dispatch => {
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        dispatch(hideExamSuccess(examId))
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const createBoilerplate = (boilerplate, token) => {
  let url = `${SERVER_URL}/api/v1/boilerplates/`
  return dispatch => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify(
        boilerplate
      )
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((boilerplate) => {
        dispatch(createBoilerplateSuccess(boilerplate))
        return Promise.resolve(boilerplate)
      })
      .catch(error => {
        console.log(error)
        dispatch(ajaxCallError())
        return Promise.reject(error)
      })
  }
}

export const updateBoilerplate = (boilerplate, token) => {
  let url = `${SERVER_URL}/api/v1/boilerplates/${boilerplate['exam']}/`
  return dispatch => {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify(
        boilerplate
      )
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((boilerplate) => {
        dispatch(updateBoilerplateSuccess(boilerplate))
        return Promise.resolve(boilerplate)
      })
      .catch(error => {
        console.log(error)
        dispatch(ajaxCallError())
        return Promise.reject(error)
      })
  }
}

export const loadKSFS = () => {
  return dispatch => {
    dispatch(beginAjaxCall())
    // noinspection JSUnresolvedFunction
    return fetch(`${SERVER_URL}/api/v1/lib/ksfs/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(KSFS => {
        dispatch(loadKSFSSuccess(KSFS))
        return Promise.resolve(KSFS)
      })
      .catch(error => {
        dispatch(ajaxCallError())
        return Promise.reject(error)
      })
  }
}
