import getUser from "./getUser";


/** Check if the project belongs to the user by ids. Throws in case of mismatch. */
async function checkProjectOwnership(userId: string, projectId: string) {
  const user = await getUser({ _id: userId }, false);
  if (
    !user?.userProjects?.length ||
    !user?.userProjects?.find(project => project._id.toString() === projectId)
  )
    throw Error("Project does not belong to this user.");
}

export default checkProjectOwnership;
