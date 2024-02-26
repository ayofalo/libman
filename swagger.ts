// Import necessary modules
import express from "express";
import * as swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express-serve-static-core";

// Create Express app
const app = express();

// Swagger options

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management System",
      version: "1.0.0",
      description: "API documentation for LMS",
    },
    components: {
      schemas: {
        Author: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
          },
        },
        Book: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string" },
            authors: {
              type: "array",
              items: { $ref: "#/components/schemas/Author" },
            },
          },
        },
        BorrowedBook: {
          type: "object",
          properties: {
            bookId: { type: "string" },
            borrowedAt: { type: "string", format: "date-time" },
            deletedAt: { type: "string", format: "date-time" },
          },
        },
        Borrower: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            bookBorrowed: {
              type: "array",
              items: { $ref: "#/components/schemas/BorrowedBook" },
            },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "string" },
            email: { type: "string" },
            password: { type: "string" },
            role: { type: "string" },
          },
        },
      },
    },
  },
  // Paths to files containing OpenAPI definitions
  apis: [
    "./src/api/routes/v1/userRoutes/user.routes.ts",
    "./src/api/routes/v1/authorRoutes/author.public.route.ts",
    "./src/api/routes/v1/authorRoutes/author.private.route.ts",
    "./src/api/routes/v1/bookRoutes/book.public.route.ts",
    "./src/api/routes/v1/bookRoutes/book.private.route.ts",
    "./src/api/routes/v1/borrowerRoutes/borrower.public.route.ts",
    "./src/api/routes/v1/borrowerRoutes/borrower.private.route.ts",
    "./src/api/routes/v1/borrowerRoutes/borrowerUser.route.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app: Express) {
  app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export default setupSwagger;
