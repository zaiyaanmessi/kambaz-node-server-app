import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  // Get all enrollments for a user
  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  // Get all users enrolled in a course - ADD THIS
  const findUsersForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = dao.findUsersForCourse(courseId);
    res.json(enrollments);
  };

  // Enroll a user in a course
  const enrollUserInCourse = (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    res.send(enrollment);
  };

  // Unenroll a user from a course
  const unenrollUserFromCourse = (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const status = dao.unenrollUserFromCourse(userId, courseId);
    res.send(status);
  };

  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.get("/api/courses/:courseId/enrollments", findUsersForCourse); // ADD THIS
  app.post("/api/users/:userId/enrollments/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/enrollments/:courseId", unenrollUserFromCourse);
}