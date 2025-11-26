import model from "./model.js";
import enrollmentModel from "../Enrollments/model.js";

export default function CoursesDao(db) {
  
  const findAllCourses = () => {
    return model.find();
  };
  
  const findCoursesForEnrolledUser = async (userId) => {
    // Get all enrollments for this user from MongoDB
    const enrollments = await enrollmentModel.find({ user: userId });
    
    // Get course IDs from enrollments
    const courseIds = enrollments.map(enrollment => enrollment.course);
    
    // Find all courses with those IDs
    const courses = await model.find({ _id: { $in: courseIds } });
    
    return courses;
  };
  
  const createCourse = (course) => {
    // Remove _id if it exists, let MongoDB generate it
    delete course._id;
    return model.create(course);
  };
  
  const deleteCourse = (courseId) => {
    return model.deleteOne({ _id: courseId });
  };
  
  const updateCourse = (courseId, courseUpdates) => {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  };

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse 
  };
}