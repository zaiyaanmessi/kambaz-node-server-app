import model from "./model.js";

export default function EnrollmentsDao() {  // ✅ Removed (db) parameter

  const findEnrollmentsForUser = (userId) => 
    model.find({ user: userId });

  const findUsersForCourse = (courseId) => 
    model.find({ course: courseId });

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

  const unenrollUserFromCourse = (userId, courseId) => 
    model.deleteOne({ user: userId, course: courseId });

  return {
    findEnrollmentsForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}