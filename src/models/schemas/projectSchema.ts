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
    widgetSettings: {
      widgetHeaderColor: {
        type: String,
        default: "#ac84e1",
      },
      widgetBackgroundColor: {
        type: String,
        default: "#f0f0f0",
      },
      widgetBorderColor: {
        type: String,
        default: "#f0f0f0",
      },
      widgetBorderWidth: {
        type: String,
        default: "0",
      },
      widgetBorderRadius: {
        type: String,
        default: "5",
      },
    },
    ownedByUserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    subscription: {
      id: { type: String },
      isActive: {
        type: Boolean,
        default: false,
      },
      lastPaid: { type: Number },
    },
  },
  { versionKey: false, timeStamps: true }
);

export default ProjectSchema;
