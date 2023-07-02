"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
async function createProject(req, res, next) {
    try {
        const { userId } = req;
        const { projectName, projectURL } = req.body;
        const newProject = await models_1.Project.create({
            projectName,
            projectURL,
            projectCreationDate: Date.now(),
        });
        await models_1.User.findByIdAndUpdate(userId, {
            $push: { userProjects: newProject._id },
        });
        res.status(201).json(newProject);
    }
    catch (error) {
        error.message = "Error creating the project. \n" + error.message;
        next(error);
    }
}
exports.default = createProject;
