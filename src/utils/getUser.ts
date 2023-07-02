import { User } from "@/models";
import { UserType } from "@/types/common";

async function getUser(filter: UserType, populate = true) {
  const user =  populate
    ? User.findOne(filter).populate("userProjects")
    : User.findOne(filter);
    if(!user) throw Error('User not found.');

    return user;
}

export default getUser;
