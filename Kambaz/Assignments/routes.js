import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {  // ✅ Removed db parameter
  const dao = AssignmentsDao();  // ✅ No db parameter

  // Get all assignments for a course
  const findAssignmentsForCourse = async (req, res) => {  // ✅ Added async
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);  // ✅ Added await
    res.json(assignments);
  };

  // Create a new assignment for a course
  const createAssignment = async (req, res) => {  // ✅ Added async
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      // ✅ Removed course: courseId (not needed for embedded)
    };
    const newAssignment = await dao.createAssignment(courseId, assignment);  // ✅ Pass courseId
    res.send(newAssignment);
  };

  // Delete an assignment
  const deleteAssignment = async (req, res) => {  // ✅ Added async
    const { courseId, assignmentId } = req.params;  // ✅ Extract courseId
    const status = await dao.deleteAssignment(courseId, assignmentId);  // ✅ Pass courseId
    res.send(status);
  };

  // Update an assignment
  const updateAssignment = async (req, res) => {  // ✅ Added async
    const { courseId, assignmentId } = req.params;  // ✅ Extract courseId
    const assignment = req.body;
    const status = await dao.updateAssignment(courseId, assignmentId, assignment);  // ✅ Pass courseId
    res.send(status);
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.delete("/api/courses/:courseId/assignments/:assignmentId", deleteAssignment);  // ✅ Updated path
  app.put("/api/courses/:courseId/assignments/:assignmentId", updateAssignment);  // ✅ Updated path
}