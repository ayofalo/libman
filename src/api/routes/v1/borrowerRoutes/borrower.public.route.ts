import express = require("express");

import { type Router } from "express";

// Import Controllers

// Borrower Controllers

import { retrieveBorrowers } from "../../../controllers/borrowerController/retrieveBorrower";
import { getBorrowedBooksByBorrower } from "../../../controllers/borrowerController/getBorrowedBooksByBorrower";

const borrowerPublicRouter: Router = express.Router();

/**
 * @swagger
 * /api/public/v1/borrowers:
 *   get:
 *     summary: Retrieve all borrowers.
 *     parameters:
 *       - name: page
 *         in: query
 *         description: "Page number for pagination (default: 1)"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: "Number of items per page (default: 10)"
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       '200':
 *         description: Borrowers retrieved successfully.
 *       '404':
 *         description: No borrowers found.
 */
borrowerPublicRouter.get("/", retrieveBorrowers);

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
  "/:borrowerId/borrowed-books",
  getBorrowedBooksByBorrower
);

export default borrowerPublicRouter;
