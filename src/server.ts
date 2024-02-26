import express = require("express");
const serverless = require("serverless-http");
import { Request, Response, NextFunction } from "express";
import { getDatabaseConnection } from "./api/utils/getDatabaseConnection";
import * as mongoose from "mongoose";
import cors = require("cors");
import * as dotenv from "dotenv";
import setupSwagger from "../swagger";
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
import logger from "./api/utils/logger";
import * as bodyParser from "body-parser";
import authenticateUser from "./api/middleware/authenticateToken";
import { authorizeUser } from "./api/middleware/autorizeUser";
import authorPrivateRouter from "./api/routes/v1/authorRoutes/author.private.route";
import bookPrivateRouter from "./api/routes/v1/bookRoutes/book.private.route";
import borrowerPrivateRouter from "./api/routes/v1/borrowerRoutes/borrower.private.route";
import authorPublicRouter from "./api/routes/v1/authorRoutes/author.public.route";
import bookPublicRouter from "./api/routes/v1/bookRoutes/book.public.route";
import borrowerPublicRouter from "./api/routes/v1/borrowerRoutes/borrower.public.route";
import borrowerUserouter from "./api/routes/v1/borrowerRoutes/borrowerUser.route";
import userRouter from "./api/routes/v1/userRoutes/user.routes";

dotenv.config();

const app = express();

setupSwagger(app);

// CORS
app.use(cors());
// CORS headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Use cookie-parser middleware
app.use(cookieParser());
// Body parser
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
// Request logging middleware

app.use(morgan("combined")); // Use 'combined' format for logging

// Routes
app.use(userRouter);
app.use(authorPublicRouter);
app.use(bookPublicRouter);
app.use(borrowerPublicRouter);
app.use(authorizeUser, authenticateUser, bookPrivateRouter); //admin access
app.use(authorizeUser, authenticateUser, authorPrivateRouter); //admin access
app.use(authorizeUser, authenticateUser, borrowerPrivateRouter); //admin access
app.use(borrowerUserouter);

// Catch-all route handler for any other routes
app.use((req: Request, res: Response) => {
  res.status(404).send("Route not found");
});

getDatabaseConnection().then(() => {
  const port = process.env.PORT || 3001;
  const server = app.listen(port, async () => {
    logger.info(`Server started on port ${port}`);
  });

  process.on("SIGINT", async () => {
    try {
      logger.info("Server is shutting down...");

      // Close the Mongoose connection before exiting
      await mongoose.connection.close();

      logger.info("MongoDB connection closed.");

      // Close other resources or perform cleanup if needed

      server.close(() => {
        logger.info("Server has been terminated.");
        process.exit(0);
      });
    } catch (error: any) {
      logger.error(`Error during shutdown: ${error.message}`);
      process.exit(1);
    }
  });
});

export default app;

//module.exports.handler = serverless(app);