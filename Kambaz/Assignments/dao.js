import { v4 as uuidv4 } from "uuid";
import model from "../Courses/model.js";  // ✅ Import courses model

export default function AssignmentsDao() {  // ✅ No db parameter
  
  // Find all assignments for a course
  async function findAssignmentsForCourse(courseId) {
    const course = await model.findById(courseId);
    return course ? course.assignments : [];
  }

  // Create a new assignment in a course
  async function createAssignment(courseId, assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    await model.updateOne(
      { _id: courseId },
      { $push: { assignments: newAssignment } }
    );
    return newAssignment;
  }

  // Update an assignment in a course
  async function updateAssignment(courseId, assignmentId, assignmentUpdates) {
    const course = await model.findById(courseId);
    const assignment = course.assignments.id(assignmentId);
    Object.assign(assignment, assignmentUpdates);
    await course.save();
    return assignment;
  }

  // Delete an assignment from a course
  async function deleteAssignment(courseId, assignmentId) {
    const status = await model.updateOne(
      { _id: courseId },
      { $pull: { assignments: { _id: assignmentId } } }
    );
    return status;
  }

  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
  };
}