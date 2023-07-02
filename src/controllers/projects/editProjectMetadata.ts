import { Project, User } from "@/models";
import { RequestUserIdType, UserProjectType } from "@/types/common";
import { getUser } from "@/utils";
import { Response, NextFunction } from "express";

async function editProjectMetadata(
  req: RequestUserIdType,
  res: Response,
  next: NextFunction
) {
  try {
    const { _id, projectName, projectURL }: UserProjectType = req.body;
    const currentUser = await getUser({ _id: req.userId }, false);
    const isUserProject = currentUser?.userProjects?.find(
      (project) => project._id?.toString() === _id
    );
    const updatedProject = await Project.findOneAndUpdate({_id}, {projectName, projectURL}, {new: true});

    if (!isUserProject) throw Error("Project does not belong to this user");
    if (!updatedProject) throw Error("Project not found.");

    res.status(200).json(updatedProject);
  } catch (error: any) {
    next(error);
  }
}

export default editProjectMetadata;
