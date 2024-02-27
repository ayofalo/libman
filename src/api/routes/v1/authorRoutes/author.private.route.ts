import express = require('express');

import { type Router } from 'express';

// Import Controllers

// Author Controllers
import { getAuthors } from '../../../controllers/authorController/getAuthors';
import { addAuthor } from '../../../controllers/authorController/addAuthor';
import { updateAuthor } from '../../../controllers/authorController/updateAuthor';
import { deleteAuthor } from '../../../controllers/authorController/deleteAuthor';

const authorPrivateRouter: Router = express.Router();

/**
 * @swagger
 * /api/private/v1/admin/authors/{id}:
 *   get:
 *     summary: Retrieve author by ID
 *     description: Retrieve an author record by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the author
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       200:
 *         description: Author found and returned successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */

authorPrivateRouter.get('/api/private/v1/admin/authors/:id', getAuthors);

/**
 * @swagger
 * /api/private/v1/admin/authors:
 *   post:
 *     summary: Add a new author
 *     description: Add a new author to the database
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
 *         description: Author created successfully
 *       400:
 *         description: Bad request, missing or invalid data
 *       500:
 *         description: Internal server error
 */
authorPrivateRouter.post('/api/private/v1/admin/authors', addAuthor);

/**
 * @swagger
 * /api/private/v1/admin/authors/{authorId}:
 *   put:
 *     summary: Update an author by ID.
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         description: ID of the author to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Author'
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       '200':
 *         description: Author updated successfully.
 *       '404':
 *         description: Author not found.
 */

authorPrivateRouter.put(
  '/api/private/v1/admin/authors/:authorId',
  updateAuthor,
);

/**
 * @swagger
 * /api/private/v1/admin/authors/{authorId}:
 *   delete:
 *     summary: Delete an author by ID.
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         description: ID of the author to delete.
 *         schema:
 *           type: string
 *     security:
 *       - BearerAuth: []  # Apply BearerAuth security scheme
 *     responses:
 *       '200':
 *         description: Author deleted successfully.
 *       '404':
 *         description: Author not found.
 * securitySchemes:
 *   BearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT  # Specify the format if needed
 */
authorPrivateRouter.delete(
  '/api/private/v1/admin/authors/:authorId',
  deleteAuthor,
);

export default authorPrivateRouter;
