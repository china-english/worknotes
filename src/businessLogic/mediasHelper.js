/**
 * Created by zhaoyu on Nov 29, 2016.
 */

export default class MediasHelper {
  static getVideoRecordByVideoId (videoRecords = [], videoId) {
    return videoRecords.find(videoRecord => videoRecord.video === videoId)
  }
}
