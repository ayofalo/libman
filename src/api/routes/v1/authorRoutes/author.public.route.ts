import express = require('express');

import { type Router } from 'express';

// Import Controllers

// Author Controllers
import { getAuthors } from '../../../controllers/authorController/getAuthors';
import { retrieveAuthor } from '../../../controllers/authorController/retrieveAuthor';

const authorPublicRouter: Router = express.Router();

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
 *     responses:
 *       200:
 *         description: Author found and returned successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */

authorPublicRouter.get('/api/public/v1/authors/:id', getAuthors);

/**
 * @swagger
 * /api/public/v1/authors:
 *   get:
 *     summary: Retrieve all authors.
 *     responses:
 *       '200':
 *         description: Authors retrieved successfully.
 *       '404':
 *         description: No authors found.
 */

authorPublicRouter.get('/api/public/v1/authors', retrieveAuthor);

export default authorPublicRouter;
