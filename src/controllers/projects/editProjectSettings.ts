import { Project } from "@/models";
import { RequestUserIdType, UserProjectType } from "@/types/common";
import { getUser } from "@/utils";
import { Response, NextFunction } from "express";

async function editProjectSettings(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id, projectName, projectURL, widgetSettings }: UserProjectType = req.body;
    const currentUser = await getUser({ _id: req.userId }, false);
    const isUserProject = currentUser?.userProjects?.find(
      (project) => project._id?.toString() === _id
    );
    if (!isUserProject) throw Error("Project does not belong to this user");

    const updatedProject = await Project.findOneAndUpdate({_id}, {projectName, projectURL, widgetSettings}, {new: true});
    if (!updatedProject) throw Error("Project not found.");

    res.status(200).json(updatedProject);
  } catch (error: any) {
    next(error);
  }
}

export default editProjectSettings;
