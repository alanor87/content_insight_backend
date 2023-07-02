"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@/models");
const utils_1 = require("@/utils");
async function editProjectMetadata(req, res, next) {
    try {
        const { _id, projectName, projectURL } = req.body;
        const currentUser = await (0, utils_1.getUser)({ _id: req.userId }, false);
        const isUserProject = currentUser?.userProjects?.find((project) => project._id?.toString() === _id);
        const updatedProject = await models_1.Project.findOneAndUpdate({ _id }, { projectName, projectURL }, { new: true });
        if (!isUserProject)
            throw Error("Project does not belong to this user");
        if (!updatedProject)
            throw Error("Project not found.");
        res.status(200).json(updatedProject);
    }
    catch (error) {
        next(error);
    }
}
exports.default = editProjectMetadata;
