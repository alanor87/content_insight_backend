import { Response, NextFunction } from "express";
import { pinecone } from "@/db/connect-pinecone";
import { User, Project } from "@/models";
import { getStripeInstance } from "@/utils";
import { RequestUserIdType } from "@/types/common";

const stripeInstance = getStripeInstance();

async function deleteProject(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId = "" } = req;
    const { projectId }: { projectId: string } = req.body;

    const projectToDelete = await Project.findById(projectId);

    if (!projectToDelete)
      throw Error("Project with id " + projectId + "not found.");

    // Deleting subscription from Stripe, if the project has the subscription.
    if (projectToDelete.subscription?.id)
      await stripeInstance.subscriptions?.cancel(
        projectToDelete.subscription.id
      );

    // Removing deleted project vectors from the pinecone DB, if there are any.
    if (projectToDelete.projectPineconeVectorsIdList.length)
      await pinecone
        .Index("content-insight-1-index")
        .namespace(userId)
        .deleteMany(projectToDelete.projectPineconeVectorsIdList);

    // Removing project from DB.
    await Project.findByIdAndDelete(projectId);

    // Removing deleted projectId entry from the user DB entry.
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { userProjects: projectId },
      },
      { new: true }
    ).populate("userProjects");

    res.status(201).json(updatedUser?.userProjects);
  } catch (error: any) {
    error.message = "Error deleting the project. \n" + error.message;
    next(error);
  }
}

export default deleteProject;
