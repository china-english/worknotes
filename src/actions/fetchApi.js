import fetch from 'isomorphic-fetch'
import {SERVER_URL} from '../constants/config'
import {checkHttpStatus, parseJSON} from '../businessLogic/utils'
import {ajaxCallError} from './ajaxStatusActions'

class fetchApi {
  static headers () {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  static get (route, params) {
    return this.fetchFunc(route, params, 'GET')
  }

  static post (route, params) {
    return this.fetchFunc(route, params, 'POST')
  }

  static patch (route, params) {
    return this.fetchFunc(route, params, 'PATCH')
  }

  static delete (route) {
    return this.fetchFunc(route, null, 'DELETE')
  }

  static put (route, parms) {
    return this.fetchFunc(route, parms, 'PUT')
  }

  static fetchFunc (route, params, verb) {
    const host = `${SERVER_URL}`
    const url = `${host}/api/v1/${route}`
    let options = Object.assign({method: verb}, params ? {body: JSON.stringify(params)} : null)
    options.header = fetchApi.headers()
    console.log(options)
    return fetch(url, options)
      .then(checkHttpStatus)
      .then(parseJSON)
      .then((json) => {
        return json
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}
export default fetchApi
