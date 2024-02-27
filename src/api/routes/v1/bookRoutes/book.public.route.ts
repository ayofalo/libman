import express = require('express');

import { type Router } from 'express';

// Import Controllers
// Book Controllers

import { retrieveBook } from '../../../controllers/bookController/retrieveBook';
import { getBooksByAuthorId } from '../../../controllers/bookController/getBooks';

const bookPublicRouter: Router = express.Router();

/**
 * @swagger
 * /api/public/v1/books/{authorId}:
 *   get:
 *     summary: Retrieve books by author ID.
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         description: ID of the author whose books to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Books retrieved successfully.
 *       '404':
 *         description: Author not found or no books found for the author.
 */

bookPublicRouter.get('/api/public/v1/books/:authorId', getBooksByAuthorId);

/**
 * @swagger
 * /api/public/v1/books:
 *   get:
 *     summary: Retrieve all books.
 *     responses:
 *       '200':
 *         description: Books retrieved successfully.
 *       '404':
 *         description: No books found.
 */
bookPublicRouter.get('/api/public/v1/books', retrieveBook);

export default bookPublicRouter;
