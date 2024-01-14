import { Project } from "@/models";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const { BASE_URL } = process.env;

/** Checking subscription for current projectId. Getting projectId from query string -
 *  when loading the widget script, and body for the styles and getCompletions.
 *  So if the subscription is not active - the widget does not load on the first place.
 *  And making sure that all other widget related endpoints are inaccessible as well. */
async function subscriptionCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // If this is a call from the demo widget in the client cabinet - let it through,
    // here the completions are available for the demo purposes without active subscription.
    if (req.get("Origin") === BASE_URL) {
      next();
      return;
    }
    const projectId = req.body.projectId || req.query.projectId;
    const project = await Project.findById(projectId);
    if (!project?.subscription?.isActive) {
      res.status(403).json({
        message:
          "Subscription is disactivated, please renew the subscription or contact the support",
      });
      return;
    }
    next();
  } catch (error: any) {
    next(error);
  }
}

export default subscriptionCheck;
