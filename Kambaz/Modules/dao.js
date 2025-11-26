import { v4 as uuidv4 } from "uuid";
import model from "../Courses/model.js";  // ✅ Import courses model instead

export default function ModulesDao() {
  
  // Find all modules for a specific course
  const findModulesForCourse = async (courseId) => {
    const course = await model.findById(courseId);
    return course ? course.modules : [];
  };

  // Create a new module in a course
  const createModule = async (courseId, module) => {
    const newModule = { ...module, _id: uuidv4() };
    await model.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } }
    );
    return newModule;
  };

  // Update a module in a course
  const updateModule = async (courseId, moduleId, moduleUpdates) => {
    const course = await model.findById(courseId);
    const module = course.modules.id(moduleId);
    Object.assign(module, moduleUpdates);
    await course.save();
    return module;
  };

  // Delete a module from a course
  const deleteModule = async (courseId, moduleId) => {
    const status = await model.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
    return status;
  };

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}