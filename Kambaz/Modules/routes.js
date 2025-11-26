import ModulesDao from "../Modules/dao.js";

export default function ModulesRoutes(app) {
  const dao = ModulesDao();

  const findModulesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesForCourse(courseId);
    res.json(modules);
  };

  const createModuleForCourse = async (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      // ✅ Removed course: courseId (not needed for embedded modules)
    };
    const newModule = await dao.createModule(courseId, module);  // ✅ Pass courseId
    res.send(newModule);
  };

  const deleteModule = async (req, res) => {
    const { courseId, moduleId } = req.params;  // ✅ Extract courseId
    const status = await dao.deleteModule(courseId, moduleId);  // ✅ Pass courseId
    res.send(status);
  };

  const updateModule = async (req, res) => {
    const { courseId, moduleId } = req.params;  // ✅ Extract courseId
    const moduleUpdates = req.body;
    const status = await dao.updateModule(courseId, moduleId, moduleUpdates);  // ✅ Pass courseId
    res.send(status);
  };

  // ✅ Updated route paths to include courseId
  app.get("/api/courses/:courseId/modules", findModulesForCourse);
  app.post("/api/courses/:courseId/modules", createModuleForCourse);
  app.put("/api/courses/:courseId/modules/:moduleId", updateModule);
  app.delete("/api/courses/:courseId/modules/:moduleId", deleteModule);
}