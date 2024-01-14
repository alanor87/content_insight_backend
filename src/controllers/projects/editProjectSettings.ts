import { Response, NextFunction } from "express";
import Stripe from "stripe";
import { Project } from "@/models";
import { checkProjectOwnership } from "@/utils";
import { RequestUserIdType, UserProjectType } from "@/types/common";
import dotenv from "dotenv";
dotenv.config();

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY_TEST || "");

async function editProjectSettings(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id, projectName, projectURL, widgetSettings }: UserProjectType =
      req.body;

    if (!checkProjectOwnership(req.userId || "", _id))
      throw Error("Project does not belong to this user");

    const oldProject = await Project.findById(_id);
    if (!oldProject) throw Error("Project not found.");

    // If the name of the project is about to change - it needs to be changed in the Stripe subsctriptio
    // description to be displayed correctly in the Stripe Customer Portal
    if (
      projectName !== oldProject?.projectName &&
      oldProject?.subscription?.id
    ) {
      stripeInstance.subscriptions.update(oldProject.subscription.id, {
        description: projectName,
      });
    }

    oldProject.set({ projectName, projectURL, widgetSettings });

    const updatedProject = await oldProject.save();

    res.status(200).json(updatedProject);
  } catch (error: any) {
    next(error);
  }
}

export default editProjectSettings;
