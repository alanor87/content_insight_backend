import { Schema } from "mongoose";

const ProjectSchema = new Schema(
  {
    projectName: {
      type: String,
    },
    projectCreationDate: {
      type: Date,
    },
    projectURL: {
      type: String,
    },
    projectIngestedData: [
      {
        fileName: {
          type: String,
        },
        size: {
          type: String,
        },
      },
    ],
    ownedByUserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timeStamps: true }
);

export default ProjectSchema;
