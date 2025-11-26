import model from "./model.js";

export default function CoursesDao() {  // ✅ Removed db parameter
  
  const findAllCourses = () => {
    return model.find({}, { name: 1, description: 1 });
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
    createCourse,
    deleteCourse,
    updateCourse 
  };
}