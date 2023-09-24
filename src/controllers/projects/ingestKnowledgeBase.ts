import { Response, NextFunction } from "express";
import { uploadedFilesCache, generateId } from "@/utils";
import { RequestUserIdType } from "@/types/common";

async function ingestKnowledgeBase(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const files = req.files as Express.Multer.File[];                               // Getting the incoming data and files.
    const { userId = "" } = req;
    const { projectId = "", projectName = "" } = req.body;

    uploadedFilesCache.set(generateId(userId + projectId), {                        // Writing uploaded files to a temporary storage.
      files,
      userId,
      projectId,
      projectName,
    });
    
    console.log(uploadedFilesCache.getStats());

    res.status(200).end();
  } catch (error: any) {
    error.message = "Error ingesting knowledge base. \n" + error.message;
    next(error);
  }
}

export default ingestKnowledgeBase;
