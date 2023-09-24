import dotenv from "dotenv";
import "module-alias/register";                                                     // this one is for the path alias resolution in the js runtime.
import path from "path";
import express from "express";
import cors from "cors";
import * as api from "@/api";
import { tokenValidation } from "./middleware";
import { filesUploadProgress } from "./controllers/projects";

import type { ErrorRequestHandler } from "express";

dotenv.config();

const app = express();

const errorHandler: ErrorRequestHandler = (error, _, res, __) => {
  const { code = 500, message = "Server error." } = error;
  console.log(error);
  res.status(code).json({
    status: "error",
    code,
    message,
  });
};

const allowedCorsOrigin =
  process.env.NODE_ENV === "development" ? "*" : "this is to figure out later";

app.use(cors());                                                                    // for now a wildcard.
app.use(express.json());

app.use("/widget", api.widget);

/** Serving static react app to client, test mode for now, while still not sure if front and backend will be hosted separately or no. */
app.use("/", express.static(path.join(process.cwd(), "build/public/app")));
app.use(
  "/cabinet",
  express.static(path.join(process.cwd(), "build/public/app"))
);
app.use(
  "/cabinet/projects",
  express.static(path.join(process.cwd(), "build/public/app"))
);
app.use(
  "/cabinet/projects/:id",
  express.static(path.join(process.cwd(), "build/public/app"))
);
app.use(
  "/cabinet/stats",
  express.static(path.join(process.cwd(), "build/public/app"))
);
app.use(
  "/cabinet/billing",
  express.static(path.join(process.cwd(), "build/public/app"))
);
app.use(
  "/cabinet/settings",
  express.static(path.join(process.cwd(), "build/public/app"))
);

/** API endpoints */
app.use("/api/v1/auth", api.auth);
app.use("/api/v1/user", tokenValidation, api.user);
app.use("/api/v1/projects", tokenValidation, api.projects);

app.get("/api/v1/filesUploadProgress", filesUploadProgress);
app.use("/api/v1/getCompletion", api.getCompletion); // no token validation for now for testing purposes

/** 404 handler */
app.use((req, res) => {
  console.log(req.path);
  res.status(404).json({
    status: "error",
    message: "Not found!",
  });
  return;
});

/** Errors handler */
app.use(errorHandler);

setInterval(() => {
  const memoryUsage = process.memoryUsage();
  console.log(
    "Initial RSS (Resident Set Size):",
    memoryUsage.rss / (1024 * 1024),
    "MB"
  );
  console.log(
    "Initial Heap Total:",
    memoryUsage.heapTotal / (1024 * 1024),
    "MB"
  );
}, 5000);

export { app };
