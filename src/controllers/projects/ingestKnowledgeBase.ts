import { Response, NextFunction } from "express";
import {
  FilesUploadtempStorageType,
  RequestUserIdType,
} from "@/types/common";

let filesUploadRequestData: FilesUploadtempStorageType = {};

async function ingestKnowledgeBase(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    //Getting the incoming data and files.
    const files = req.files as Express.Multer.File[];
    const { userId = "" } = req;
    const { projectId = "", projectName = "" } = req.body;

    // Create the structure for filesUploadRequestData
    if (!filesUploadRequestData[userId]) {
      filesUploadRequestData[userId] = {};
    }

    filesUploadRequestData[userId][projectId] = {
      files,
      userId,
      projectId,
      projectName,
    };

    res.status(200).end();
  } catch (error: any) {
    error.message = "Error ingesting knowledge base. \n" + error.message;
    next(error);
  }
}

export default ingestKnowledgeBase;
export { filesUploadRequestData };
