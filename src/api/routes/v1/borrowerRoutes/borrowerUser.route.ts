import express = require("express");

import { type Router } from "express";

import { addBookToBorrowed } from "../../../controllers/borrowerController/updateBorrower"; // to add books borrowed and delete books borrowed
import { deleteBorrowedBook } from "../../../controllers/borrowerController/deleteBorrowedBook";

const borrowerUserRouter: Router = express.Router();

/**
 * @swagger
 * /api/private/v1/borrowers/{borrowerId}:
 *   put:
 *     summary: Add a book to borrowed list
 *     description: Add a book to the list of books borrowed by a borrower
 *     parameters:
 *       - in: path
 *         name: borrowerId
 *         required: true
 *         description: ID of the borrower
 *         schema:
 *           type: string
 *       - in: body
 *         name: book
 *         description: Book object to be added to the borrowed list
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             author:
 *               type: string
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       200:
 *         description: Book added successfully to the borrowed list
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

borrowerUserRouter.put("/:borrowerId", addBookToBorrowed);

/**
 * @swagger
 * /api/private/v1/borrowers/{borrowerId}/books/{bookId}:
 *   delete:
 *     summary: Delete a borrowed book
 *     description: Delete a book from the list of books borrowed by a borrower
 *     parameters:
 *       - in: path
 *         name: borrowerId
 *         required: true
 *         description: ID of the borrower
 *         schema:
 *           type: string
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to be deleted from borrowed list
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       200:
 *         description: Book deleted successfully from the borrowed list
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */

borrowerUserRouter.delete("/:borrowerId/books/:bookId", deleteBorrowedBook);

export default borrowerUserRouter;
