import { Project } from "@/models";

/** Removal of the stripe subscription data for the current user from DB.
 * For the case when user removes the subscription for the current project.
 */
async function deleteProjectSubscriptionData(subscriptionId: string) {
  try {
    const project = await Project.findOne({
      "subscription.id": subscriptionId,
    });

    // Removing subscription data from the object.
    await project?.updateOne({
      subscription: {
        id: "",
        isActive: false,
        lastPaid: "",
      },
    });
  } catch (error: any) {
    console.log("Error deleting subscription data : ", error.message);
  }
}

export default deleteProjectSubscriptionData;
