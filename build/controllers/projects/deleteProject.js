"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_pinecone_1 = require("@/db/connect-pinecone");
const models_1 = require("@/models");
async function deleteProject(req, res, next) {
    try {
        const { userId } = req;
        const { projectId } = req.body;
        // Removing project from mongoDB.
        await models_1.Project.findByIdAndDelete(projectId);
        // Removing deleted projectId entry from the user DB entry.
        const updatedUser = await models_1.User.findByIdAndUpdate(userId, {
            $pull: { userProjects: projectId },
        }, { new: true }).populate('userProjects');
        // Removing deleted project vectors from the pinecone DB.
        await connect_pinecone_1.pinecone
            .Index("content-insight-1")
            ._delete({ deleteRequest: { namespace: userId, filter: { projectId } } });
        res.status(201).json(updatedUser?.userProjects);
    }
    catch (error) {
        error.message = "Error creating the project. \n" + error.message;
        next(error);
    }
}
exports.default = deleteProject;
