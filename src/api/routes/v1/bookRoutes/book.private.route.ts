import express = require('express');

import { type Router } from 'express';

// Import Controllers
// Book Controllers

import { addBook } from '../../../controllers/bookController/addBook';
import { updateBook } from '../../../controllers/bookController/updateBook';
import { deleteBook } from '../../../controllers/bookController/deleteBook';

const bookPrivateRouter: Router = express.Router();

/**
 * @swagger
 * /api/private/v1/admin/books:
 *   post:
 *     summary: Add a new book
 *     description: Add a new book to the library
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       500:
 *         description: Internal server error
 */

bookPrivateRouter.post('/api/private/v1/admin/books', addBook);

/**
 * @swagger
 * /api/private/v1/admin/books/{bookId}:
 *   put:
 *     summary: Update a book by ID.
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Book'
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       '200':
 *         description: Book updated successfully.
 *       '404':
 *         description: Book not found.
 */

bookPrivateRouter.put('/api/private/v1/admin/books/:bookId', updateBook);

/**
 * @swagger
 * /api/private/v1/admin/books/{bookId}:
 *   delete:
 *     summary: Delete a book by ID.
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         description: ID of the book to delete.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       '200':
 *         description: Book deleted successfully.
 *       '404':
 *         description: Book not found.
 */
bookPrivateRouter.delete('/api/private/v1/admin/books/:bookId', deleteBook);

export default bookPrivateRouter;
