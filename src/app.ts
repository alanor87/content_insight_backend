import dotenv from "dotenv";
import "module-alias/register"; // this one is for the path alias resolution in the js runtime.
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

// Routes should be in order from less to the most permissive, 
// if we are about to use an array of routes in a single app.use() middleware assignment.
const commonRoutes = [
  "/cabinet/settings",
  "/cabinet/billing",
  "/cabinet/stats",
  "/cabinet/projects/:id",
  "/cabinet/projects",
  "/cabinet",
  "/",
];

const allowedCorsOrigin =
  process.env.NODE_ENV === "development" ? "*" : "this is to figure out later";

app.use(cors()); // for now a wildcard.
app.use(express.json());


/** Widget endpoint */
app.use("/widget", api.widget);


/** Static assets endpoints */
app.use(
  commonRoutes,
  express.static(path.join(process.cwd(), "build/public/app"))
);
// Separate one for the checkoutResult, Express does not want to pass the query string to the url
// when you have route as folder rather tan a file.
app.use(
  "/cabinet/billing/checkoutResult",
  express.static(path.join(process.cwd(), "build/public/app/index.html"))
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

export { app };
