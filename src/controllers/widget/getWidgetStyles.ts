import { Project } from "@/models";
import { Request, Response, NextFunction } from "express";

async function getWidgetStyles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projectId, addWidgetLimitations } = req.body;
    if(addWidgetLimitations) res.status(403).send();

    const project = await Project.findById(projectId);

    if (!project) throw Error("Project not found, can not load widget styles.");

    res.json(project.widgetSettings);
  } catch (error: any) {
    next(error);
  }
}

export default getWidgetStyles;
