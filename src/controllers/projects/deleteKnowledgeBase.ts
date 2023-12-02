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
    const { userId } = req;

    await pinecone
      .Index("content-insight-1-index")
      ._delete({ deleteRequest: { namespace: userId, filter: { projectId } } });

    // Deleting ingested files entries from the mongoDB.
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        projectIngestedData: [],
      },
      { new: true }
    );
    
    console.log('Deletinon completed, \n projectName : ' + projectName + '\n projectId : ' + projectId);
    res.status(200).json(updatedProject);
  } catch (error: any) {
    error.message = "Error deleting knowledge base. \n" + error.message;
    next(error);
  }
}

export default deleteKnowledgeBase;
