import model from "./model.js";

export default function EnrollmentsDao(db) {

  // Find all enrollments for a specific user
  const findEnrollmentsForUser = (userId) => 
    model.find({ user: userId });

  // Find all users enrolled in a course
  const findUsersForCourse = (courseId) => 
    model.find({ course: courseId });

  // Enroll a user in a course
  const enrollUserInCourse = async (userId, courseId) => {
    // Check if already enrolled
    const existingEnrollment = await model.findOne({ 
      user: userId, 
      course: courseId 
    });
    
    if (existingEnrollment) {
      return existingEnrollment;
    }
    
    // Create new enrollment
    const newEnrollment = await model.create({ 
      user: userId, 
      course: courseId 
    });
    
    return newEnrollment;
  };

  // Unenroll a user from a course
  const unenrollUserFromCourse = (userId, courseId) => 
    model.deleteOne({ user: userId, course: courseId });

  return {
    findEnrollmentsForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}