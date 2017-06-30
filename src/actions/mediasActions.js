/**
 * Created by zhaoyu on Oct 14, 2016.
 */
import fetch from 'isomorphic-fetch'

import {SERVER_URL} from '../constants/config'
import {checkHttpStatus, parseJSON, setParam} from '../businessLogic/utils'

// import examApi from '../api/mockExamApi';
// import exampaperApi from '../api/mockExampaperApi';
import * as types from '../constants/actionTypes'
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions'

export const loadVideosSuccess = (videos) => {
  return { type: types.LOAD_VIDEOS_SUCCESS, videos }
}

export const loadTedRandomVideosSuccess = videos => {
  return {type: types.LOAD_TED_RANDOM_VIDEOS_SUCCESS, videos}
}

export const updateVideosPageNumber = (page) => {
  return { type: types.UPDATE_VIDEOS_PAGE_NUMBER, page }
}

/* Load single video from the server */
export const loadVideoSuccess = (video) => {
  return { type: types.LOAD_VIDEO_SUCCESS, video }
}

export const increaseVideoPlayedCountSuccess = (video) => {
  return { type: types.INCREASE_VIDEO_PLAYED_COUNT_SUCCESS, video }
}

export const loadUserVideoRecordsSuccess = (videoRecords) => {
  return { type: types.LOAD_USER_VIDEO_RECORDS_SUCCESS, videoRecords }
}

export const loadUserVideoRecordSuccess = (videoRecord) => {
  return { type: types.LOAD_USER_VIDEO_RECORD_SUCCESS, videoRecord }
}

export const editVideoRecordSuccess = (videoRecord) => {
  return { type: types.EDIT_VIDEO_RECORD_SUCCESS, videoRecord }
}

export const setUserVideoFavoriteSuccess = (videoRecord) => {
  return { type: types.SET_VIDEO_FAVORITE_SUCCESS, videoRecord }
}

export const cancelUserVideoFavoriteSuccess = (videoRecord) => {
  return { type: types.CANCEL_VIDEO_FAVORITE_SUCCESS, videoRecord }
}

export const setUserVideoWatchLaterSuccess = (videoRecord) => {
  return { type: types.SET_USER_VIDEO_WATCH_LATER_SUCCESS, videoRecord }
}

export const cancelUserVideoWatchLaterSuccess = (videoRecord) => {
  return { type: types.CANCEL_USER_VIDEO_WATCH_LATER_SUCCESS, videoRecord }
}

/* Load all videos first page and counts from the server */
export const loadVideos = (page = 1, category = '') => {
  const categoryParam = setParam('category', category)
  return dispatch => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/videos/?${categoryParam}&page=${page}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(videos => {
        // console.log('response');
        // console.log(response);
        dispatch(updateVideosPageNumber(page))
        dispatch(loadVideosSuccess(videos))
        return Promise.resolve(videos)
      })
      .catch(error => {
        dispatch(ajaxCallError())
        return Promise.reject(error)
      })
  }
}

export const loadTEDVideos = (page = 1) => {
  return dispatch => {
    return dispatch(loadVideos(page, '1'))
  }
}

/* Load TED random videos */
export const loadTedRandomVideos = () => {
  return dispatch => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/videos/random_six_ted/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(videos => {
        // console.log('response');
        // console.log(response);
        dispatch(loadTedRandomVideosSuccess(videos))
        return Promise.resolve(videos)
      })
      .catch(error => {
        dispatch(ajaxCallError())
        return Promise.reject(error)
      })
  }
}

export const loadVideo = (videoId) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    // noinspection JSUnresolvedFunction
    return fetch(`${SERVER_URL}/api/v1/videos/${videoId}/`, {
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
        dispatch(loadVideoSuccess(response))
        return Promise.resolve()
        // return response;
      })
      .catch(error => {
        console.log(error)
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

// this function currently is not required.
// export const increaseVideoPlayedCount = (token, videoId) => {
//   return (dispatch) => {
//     dispatch(beginAjaxCall());
//     return fetch(`${SERVER_URL}/api/v1/videos/${videoId}/increase_played_count/`, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         Authorization: `JWT ${token}`
//       }
//     })
//       .then(checkHttpStatus)
//       .then(parseJSON)
//       .then(played_count => {
//         // get the latest video plyaed_count number
//         dispatch(increaseVideoPlayedCountSuccess(played_count));
//       })
//       .catch(error => {
//         dispatch(ajaxCallError());
//         throw(error);
//       });
//   };
// };

export const loadUserVideoRecords = (token) => {
  return (dispatch) => {
    dispatch(beginAjaxCall())
    return fetch(`${SERVER_URL}/api/v1/video-records/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(videoRecords => {
        // console.log('loadUserVideoRecordSet Success');
        dispatch(loadUserVideoRecordsSuccess(videoRecords))
        return Promise.resolve(videoRecords)
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const loadUserVideoRecord = (videoId, token) => {
  return (dispatch) => {
    dispatch(beginAjaxCall())
    console.log('begin fetch:')
    console.log(token)
    return fetch(`${SERVER_URL}/api/v1/videos/${videoId}/record/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(videoRecord => {
        console.log('loadUserVideoRecord Success')
        console.log(videoRecord)
        dispatch(loadUserVideoRecordSuccess(videoRecord))
        return Promise.resolve(videoRecord)
      })
      .catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const increaseUserVideoPlayedCount = (videoRecord, token) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    console.log('video record: ')
    console.log(videoRecord)
    // noinspection JSUnresolvedFunction
    return fetch(`${SERVER_URL}/api/v1/video-records/${videoRecord.id}/increase_played_count/`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `JWT ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(videoRecord => {
        console.log('increase user video played count success')
        dispatch(editVideoRecordSuccess(videoRecord))
      }).catch(error => {
        console.log(error)
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}
//
// export const createUserVideoRecord = (videoId, token) => {
//   return dispatch => {
//     dispatch(beginAjaxCall());
//     console.log('video Id: ');
//     console.log(videoId);
//     console.log(typeof videoId);
//     console.log('token: ');
//     console.log(token);
//     return fetch(`${SERVER_URL}/api/v1/video-records/`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `JWT ${token}`
//       },
//       body: JSON.stringify({
//         // user info will be added through backend
//         video: videoId,
//         play_later: false,
//         played_count: 1,
//         is_favorite: false,
//       })
//     })
//       .then(checkHttpStatus)
//       .then(parseJSON)
//       .then((videoRecord) => {
//         console.log(videoRecord);
//         dispatch(editVideoRecordSuccess(videoRecord));
//       }).catch(error => {
//         console.log(error);
//         dispatch(ajaxCallError());
//         throw(error);
//       });
//   };
// };

export const updateUserVideoFavorite = (videoRecord, token, is_favorite = true) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    console.log('video record: ')
    console.log(videoRecord)
    // noinspection JSUnresolvedFunction
    return fetch(`${SERVER_URL}/api/v1/video-records/${videoRecord.id}/update_favorite/`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        is_favorite
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(videoRecord => {
        if (videoRecord.is_favorite) {
          dispatch(setUserVideoFavoriteSuccess(videoRecord))
        } else {
          dispatch(cancelUserVideoFavoriteSuccess(videoRecord))
        }
        return Promise.resolve(videoRecord)
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}

export const updateUserVideoWatchLater = (videoRecord, token, play_later = true) => {
  return dispatch => {
    dispatch(beginAjaxCall())
    console.log('video record: ')
    console.log(videoRecord)
    // noinspection JSUnresolvedFunction
    return fetch(`${SERVER_URL}/api/v1/video-records/${videoRecord.id}/update_play_later/`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`
      },
      body: JSON.stringify({
        play_later
      })
    })
      .then(checkHttpStatus)
      .then(parseJSON)
      .then(videoRecord => {
        if (videoRecord.play_later) {
          dispatch(setUserVideoWatchLaterSuccess(videoRecord))
        } else {
          dispatch(cancelUserVideoWatchLaterSuccess(videoRecord))
        }
      }).catch(error => {
        dispatch(ajaxCallError())
        throw (error)
      })
  }
}
