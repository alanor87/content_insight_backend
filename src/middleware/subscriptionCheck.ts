import { Project } from "@/models";
import { Request, Response, NextFunction } from "express";

/** Checking subscription for current projectId. Getting projectId from query string -
 *  when loading the widget script, and body for the styles and getCompletions.
 *  So if the subscription is not active - the widget does not load on the first place.
 *  And making sure that all other widget related endpoints are inaccessible as well. */
async function subscriptionCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const projectId = req.body.projectId || req.query.projectId;
  const project = await Project.findById(projectId);
  if (!project?.subscription?.isActive) {
    res
      .status(403)
      .json(
        {message : "Subscription is disactivated, please renew the subscription or contact the support"}
      );
    return;
  }
  next();
}

export default subscriptionCheck;
