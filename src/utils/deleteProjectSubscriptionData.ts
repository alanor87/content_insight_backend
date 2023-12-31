import { Project } from "@/models";

/** Removal of the stripe subscription data for the current user from DB.
 * For the case when user removes the subscription for the current project.*/
async function deleteProjectSubscriptionData(subscriptionId: string) {
  try {
    const project = await Project.findOne({
      "subscription.id": subscriptionId,
    });

    // Removing subscription data from the object. If this is called on the project deletion cause of the webhook call
    // and the project is already removed from the database - ? operator just skips the operation, no error thrown.
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
