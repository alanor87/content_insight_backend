import { Schema } from "mongoose";


import dotenv from "dotenv";
dotenv.config();


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
    widgetURL: {
      type: String,
      default: process.env.DEFAULT_WIDGET_URL,
    },
    ownedByUserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timeStamps: true }
);

export default ProjectSchema;
