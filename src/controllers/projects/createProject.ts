import { User, Project } from "@/models";
import { RequestUserIdType, UserProjectType } from "@/types/common";
import { Response, NextFunction } from "express";

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
