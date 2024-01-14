import dotenv from "dotenv";
import "module-alias/register"; // this one is for the path alias resolution in the js runtime.
import path from "path";
import express from "express";
import cors from "cors";
import * as api from "@/api";
import { subscriptionCheck, tokenValidation } from "./middleware";
import { filesUploadProgress } from "./controllers/projects";

import type { ErrorRequestHandler } from "express";

dotenv.config();

const app = express();
app.disable('x-powered-by');

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
  "/cabinet/projects/:id",
  "/cabinet/projects",
  "/cabinet/settings",
  "/cabinet/billing",
  "/cabinet/stats",
  "/cabinet",
  "/",
];

const allowedCorsOrigin =
  process.env.NODE_ENV === "development" ? "*" : "this is to figure out later";


app.use(cors()); // for now a wildcard.

/** Stripe webhook endpoint, requires a different middleware to be applied than json,
 * that goes for all other api routes. */
app.use("/api/v1/webhooks", express.raw({ type: 'application/json' }), api.webhooks);

app.use(express.json());

/** Widget endpoint */
app.use("/widget", subscriptionCheck, api.widget);

/** Static assets endpoints */
app.use(
  commonRoutes,
  express.static(path.join(process.cwd(), "build/public/app"))
);
// Separate one for the checkoutResult, Express does not want to pass the query string to the url
// when you have route as folder rather than a file.
app.use(
  "/cabinet/billing/checkoutResult",
  express.static(path.join(process.cwd(), "build/public/app/index.html"))
);

/** API endpoints */
app.use("/api/v1/auth", api.auth);
app.use("/api/v1/user", tokenValidation, api.user);
app.use("/api/v1/projects", tokenValidation, api.projects);

app.get("/api/v1/filesUploadProgress", filesUploadProgress);
// no token validation for now for testing purposes, checking if the subscription is active.
app.use("/api/v1/getCompletion", subscriptionCheck, api.getCompletion); 


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
