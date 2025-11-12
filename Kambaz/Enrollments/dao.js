import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  // Find all enrollments for a specific user
  function findEnrollmentsForUser(userId) {
    const { enrollments } = db;
    return enrollments.filter((enrollment) => enrollment.user === userId);
  }

  // Find all users enrolled in a course
  function findUsersForCourse(courseId) {
    const { enrollments } = db;
    return enrollments.filter((enrollment) => enrollment.course === courseId);
  }

  // Enroll a user in a course
  function enrollUserInCourse(userId, courseId) {
    const { enrollments } = db;
    // Check if already enrolled
    const existingEnrollment = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (existingEnrollment) {
      return existingEnrollment;
    }
    // Create new enrollment
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments = [...db.enrollments, newEnrollment];
    return newEnrollment;
  }

  // Unenroll a user from a course
  function unenrollUserFromCourse(userId, courseId) {
    const { enrollments } = db;
    db.enrollments = enrollments.filter(
      (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
    return { status: "ok" };
  }

  return {
    findEnrollmentsForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}