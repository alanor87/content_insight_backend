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
    const projectId = req.body.projectId || req.query.projectId;
    const project = await Project.findById(projectId);
    req.body.addWidgetLimitations = !project?.subscription?.isActive && req.get("Origin") !== BASE_URL;
    next();
  } catch (error: any) {
    next(error);
  }
}

export default subscriptionCheck;
