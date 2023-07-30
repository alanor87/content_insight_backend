import { Request } from "express";

/** Type that augments express Request type with the userId from the decoded JWT payload and passing further down the router. */
type RequestUserIdType = Request & { userId?: string };

type UserType = {
  _id?: string;
  userEmail?: string;
  userPassword?: string;
  userToken?: string;
  userProjects?: [UserProjectType];
};

type ProjectIngestedDataType = {
  fileName: string;
  size: string;
};

type UserProjectType = {
  _id: string;
  projectName: string;
  projectCreationDate: string;
  projectURL: string;
  widgetURL: string;
  projectIngestedData: ProjectIngestedDataType[];
};

export { RequestUserIdType, UserType, UserProjectType, ProjectIngestedDataType };
