import { pinecone } from "@/db/connect-pinecone";
import { User, Project } from "@/models";
import { RequestUserIdType } from "@/types/common";
import { Response, NextFunction } from "express";

async function deleteProject(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req;
    const { projectId }: { projectId: string } = req.body;

    // Removing project from mongoDB.
    await Project.findByIdAndDelete(projectId);

    // Removing deleted projectId entry from the user DB entry.
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { userProjects: projectId },
      },
      { new: true }
    );

    // Removing deleted project vectors from the pinecone DB.
    await pinecone
      .Index("content-insight-1")
      ._delete({ deleteRequest: { namespace: userId, filter: { projectId } } });

    res.status(201).json(updatedUser?.userProjects);
  } catch (error: any) {
    error.message = "Error creating the project. \n" + error.message;
    next(error);
  }
}

export default deleteProject;
