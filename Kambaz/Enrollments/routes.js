import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  // Get all enrollments for a user
  const findEnrollmentsForUser = async (req, res) => {  // ✅ Add async
    const { userId } = req.params;
    const enrollments = await dao.findEnrollmentsForUser(userId);  // ✅ Add await
    res.json(enrollments);
  };

  // Get all users enrolled in a course
  const findUsersForCourse = async (req, res) => {  // ✅ Add async
    const { courseId } = req.params;
    const enrollments = await dao.findUsersForCourse(courseId);  // ✅ Add await
    res.json(enrollments);
  };

  // Enroll a user in a course
  const enrollUserInCourse = async (req, res) => {  // ✅ Add async
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollment = await dao.enrollUserInCourse(userId, courseId);  // ✅ Add await
    res.send(enrollment);
  };

  // Unenroll a user from a course
  const unenrollUserFromCourse = async (req, res) => {  // ✅ Add async
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const status = await dao.unenrollUserFromCourse(userId, courseId);  // ✅ Add await
    res.send(status);
  };

  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.get("/api/courses/:courseId/enrollments", findUsersForCourse);
  app.post("/api/users/:userId/enrollments/:courseId", enrollUserInCourse);
  app.delete("/api/users/:userId/enrollments/:courseId", unenrollUserFromCourse);
}