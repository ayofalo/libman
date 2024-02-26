import express = require("express");

import { type Router } from "express";

// Import Controllers
// Book Controllers

import { retrieveBook } from "../../../controllers/bookController/retrieveBook";

// Author Controllers

import { retrieveAuthor } from "../../../controllers/authorController/retrieveAuthor";
import { getBooksByAuthorId } from "../../../controllers/bookController/getBooks";

// Borrower Controllers

import { retrieveBorrowers } from "../../../controllers/borrowerController/retrieveBorrower";
import { getBorrowedBooksByBorrower } from "../../../controllers/borrowerController/getBorrowedBooksByBorrower";

const borrowerPublicRouter: Router = express.Router();

/**
 * @swagger
 * /api/public/v1/borrowers:
 *   get:
 *     summary: Retrieve all borrowers.
 *     responses:
 *       '200':
 *         description: Borrowers retrieved successfully.
 *       '404':
 *         description: No borrowers found.
 */
borrowerPublicRouter.get(
  "/api/public/v1/api/public/v1/borrowers",
  retrieveBorrowers
);

/**
 * @swagger
 * /api/public/v1/{borrowerId}/borrowed-books:
 *   get:
 *     summary: Retrieve borrowed books by borrower ID.
 *     parameters:
 *       - in: path
 *         name: borrowerId
 *         required: true
 *         description: ID of the borrower whose borrowed books to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Borrowed books retrieved successfully.
 *       '404':
 *         description: Borrower not found or no books borrowed by the borrower.
 */

borrowerPublicRouter.get(
  "/api/public/v1/api/public/v1/:borrowerId/borrowed-books",
  getBorrowedBooksByBorrower
);

export default borrowerPublicRouter;
