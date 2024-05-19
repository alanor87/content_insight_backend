import { pinecone } from "@/db/connect-pinecone";
import { Project } from "@/models";
import { Response, NextFunction } from "express";
import { RequestUserIdType } from "@/types/common";

async function deleteKnowledgeBase(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId = "", projectName = "" } = req.body;
    const { userId = "" } = req;

    const project = await Project.findById(projectId);
    const projectPineconeVectorsIdList = project!.projectPineconeVectorsIdList;

    // Deleting the vectors in pincone DB by their ids.
    await pinecone
      .Index("content-insight-1-index")
      .namespace(userId)
      .deleteMany(projectPineconeVectorsIdList);

    // Deleting ingested files and pinecone vector id entries lists from the mongoDB.
    project!.projectPineconeVectorsIdList = [];
    project!.projectIngestedData = [];
    const updatedProject = await project?.save();

    console.log(
      "Deletinon completed, \n projectName : " +
        projectName +
        "\n projectId : " +
        projectId
    );
    res.status(200).json(updatedProject);
  } catch (error: any) {
    error.message = "Error deleting knowledge base. \n" + error.message;
    next(error);
  }
}

export default deleteKnowledgeBase;
