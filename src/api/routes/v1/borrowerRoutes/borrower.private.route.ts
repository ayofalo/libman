import express = require('express');

import { type Router } from 'express';

// Import Controllers

// Borrower Controllers

import { getBorrowers } from '../../../controllers/borrowerController/getBorrowers';
import { addBorrower } from '../../../controllers/borrowerController/addBorrower';
import { addBookToBorrowed } from '../../../controllers/borrowerController/updateBorrower'; // to add books borrowed and delete books borrowed
import { deleteBorrowedBook } from '../../../controllers/borrowerController/deleteBorrowedBook';
import { deleteBorrower } from '../../../controllers/borrowerController/deleteBorrower';

const borrowerPrivateRouter: Router = express.Router();

/**
 * @swagger
 * /api/private/v1/admin/borrowers/{id}:
 *   get:
 *     summary: Retrieve borrower by ID
 *     description: Retrieve a borrower record by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the borrower
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       200:
 *         description: Borrower found and returned successfully
 *       404:
 *         description: Borrower not found
 *       500:
 *         description: Internal server error
 */
borrowerPrivateRouter.get('/api/private/v1/admin/borrowers/:id', getBorrowers);

/**
 * @swagger
 * /api/private/v1/admin/borrowers:
 *   post:
 *     summary: Add a new borrower
 *     description: Add a new borrower to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       201:
 *         description: Borrower created successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       500:
 *         description: Internal server error
 */
borrowerPrivateRouter.post('/api/private/v1/admin/borrowers', addBorrower);

/**
 * @swagger
 * /api/private/v1/admin/borrowers/{borrowerId}:
 *   put:
 *     summary: Add a book to borrowed list for a borrower.
 *     parameters:
 *       - in: path
 *         name: borrowerId
 *         required: true
 *         description: ID of the borrower.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/BorrowedBook'
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       '200':
 *         description: Book added to borrower's list successfully.
 *       '404':
 *         description: Borrower not found.
 */
borrowerPrivateRouter.put(
  '/api/private/v1/admin/borrowers/:borrowerId',
  addBookToBorrowed,
);

/**
 * @swagger
 * /api/private/v1/admin/borrowers/{borrowerId}:
 *   delete:
 *     summary: Delete a borrower by ID.
 *     parameters:
 *       - in: path
 *         name: borrowerId
 *         required: true
 *         description: ID of the borrower to delete.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       '200':
 *         description: Borrower deleted successfully.
 *       '404':
 *         description: Borrower not found.
 */
borrowerPrivateRouter.delete(
  '/api/private/v1/admin/borrowers/:borrowerId',
  deleteBorrower,
);

/**
 * @swagger
 * /api/private/v1/admin/borrowers/{borrowerId}/books/{bookId}:
 *   delete:
 *     summary: Delete a borrowed book from a borrower's list.
 *     parameters:
 *       - in: path
 *         name: borrowerId
 *         required: true
 *         description: ID of the borrower.
 *         schema:
 *           type: string
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to delete from the borrower's list.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       '200':
 *         description: Borrowed book deleted successfully.
 *       '404':
 *         description: Borrowed book not found.
 */
borrowerPrivateRouter.delete(
  '/api/private/v1/admin/borrowers/:borrowerId/books/:bookId',
  deleteBorrowedBook,
);

export default borrowerPrivateRouter;
