import { Response, NextFunction } from "express";
import Stripe from "stripe";
import { pinecone } from "@/db/connect-pinecone";
import { User, Project } from "@/models";
import { RequestUserIdType } from "@/types/common";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY_TEST || "");

async function deleteProject(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req;
    const { projectId }: { projectId: string } = req.body;

    const projectToDelete = await Project.findById(projectId);

    // Deleting subscription from Stripe, if the project has the subscription.
    if (projectToDelete?.subscription?.id) {
      await stripeInstance.subscriptions.cancel(
        projectToDelete.subscription.id
      );
    }

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

    // Removing deleted project vectors from the pinecone DB.
    await pinecone
      .Index("content-insight-1-index")
      ._delete({ deleteRequest: { namespace: userId, filter: { projectId } } });

    res.status(201).json(updatedUser?.userProjects);
  } catch (error: any) {
    error.message = "Error creating the project. \n" + error.message;
    next(error);
  }
}

export default deleteProject;
