import dotenv from "dotenv";
// this one is for the path alias resolution in the js runtime.
import "module-alias/register";
import path from "path";
import express from "express";
import cors from "cors";
import * as api from "@/api";
import { tokenValidation } from "./middleware";

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

app.use(cors()); // for now a wildcard.
app.use(express.json());

app.use("/widget", api.widget);

/** Serving static react app to client, test mode for now, while still not sure if front and backend will be hosted separately or no. */
app.use("/", express.static(path.join(process.cwd(), "build/public")));
app.use("/cabinet", express.static(path.join(process.cwd(), "build/public")));

/** Serving static small test page with a tiny chat interface. */
app.use(
  "/apiTest",
  express.static(path.join(process.cwd(), "build/public/apiTest"))
);

app.use("/api/v1/auth", api.auth);
app.use("/api/v1/user", tokenValidation, api.user);
app.use("/api/v1/projects", tokenValidation, api.projects);
app.use("/api/v1/getCompletion", api.getCompletion); // no token validation for now for testing purposes

app.use((req, res) => {
  console.log(req.path);
  res.status(404).json({
    status: "error",
    message: "Not found!",
  });
  return;
});

app.use(errorHandler);

export { app };
