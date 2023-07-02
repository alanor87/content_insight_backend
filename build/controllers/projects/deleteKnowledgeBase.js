"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_pinecone_1 = require("@/db/connect-pinecone");
const models_1 = require("@/models");
async function deleteKnowledgeBase(req, res, next) {
    try {
        const { projectId = "", projectName = "" } = req.body;
        const { userId } = req;
        await connect_pinecone_1.pinecone
            .Index("content-insight-1")
            ._delete({ deleteRequest: { namespace: userId, filter: { projectId } } });
        // Deleting ingested files entries from the mongoDB.
        const updatedProject = await models_1.Project.findByIdAndUpdate(projectId, {
            projectIngestedData: [],
        }, { new: true });
        console.log('Deletinon completed, \n projectName : ' + projectName + '\n projectId : ' + projectId);
        res.status(200).json(updatedProject);
    }
    catch (error) {
        error.message = "Error deleting knowledge base. \n" + error.message;
        next(error);
    }
}
exports.default = deleteKnowledgeBase;
