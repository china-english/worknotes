/**
 * Created by zhaoyu on 10/09/2016.
 */

export default class AssignmentsHelper {
  static getAssignmentById (assignments, id) {
    return assignments.find(assignment => assignment.id === id)
  }
}
