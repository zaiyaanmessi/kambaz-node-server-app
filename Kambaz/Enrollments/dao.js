import model from "./model.js";

export default function EnrollmentsDao() {
  
  // Find all courses a user is enrolled in (with course details populated)
  async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments
      .map((enrollment) => enrollment.course)
      .filter((course) => course !== null);  // ✅ Filter out null courses
  }

  // Find all users enrolled in a course (with user details populated)
  async function findUsersForCourse(courseId) {
    try {
      const enrollments = await model.find({ course: courseId }).populate("user");
      return enrollments
        .filter((enrollment) => enrollment.user != null)  // ✅ Filter at enrollment level
        .map((enrollment) => enrollment.user)
        .filter((user) => user != null && user._id);  // ✅ Double check
    } catch (error) {
      console.error("Error finding users for course:", error);
      return [];
    }
  }

  // Enroll a user in a course
  function enrollUserInCourse(userId, courseId) {
    return model.create({
      user: userId,
      course: courseId,
      _id: `${userId}-${courseId}`,
    });
  }

  // Unenroll a user from a course
  function unenrollUserFromCourse(userId, courseId) {
    return model.deleteOne({ user: userId, course: courseId });
  }

  // Unenroll all users from a course (used when deleting a course)
  function unenrollAllUsersFromCourse(courseId) {
    return model.deleteMany({ course: courseId });
  }

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
  };
}