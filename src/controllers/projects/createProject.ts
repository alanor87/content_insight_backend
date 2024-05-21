import { User, Project } from "@/models";
import { RequestUserIdType, UserProjectType } from "@/types/common";
import { Response, NextFunction } from "express";

import dotenv from "dotenv";
dotenv.config();

async function createProject(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req;
    const { projectName, projectURL }: Partial<UserProjectType> = req.body;
    const newProject = await Project.create({
      projectName,
      projectURL,
      projectCreationDate: Date.now(),
      subscription : {
        stripeMode: process.env.NODE_ENV === "production" ? "live" : "test",
      }
    });

    await User.findByIdAndUpdate(userId, {
      $push: { userProjects: newProject._id },
    });

    res.status(201).json(newProject);
  } catch (error: any) {
    error.message = "Error creating the project. \n" + error.message;
    next(error);
  }
}

export default createProject;
