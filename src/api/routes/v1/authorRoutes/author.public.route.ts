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

authorPublicRouter.get('/:id', getAuthors);

/**
 * @swagger
 * /api/public/v1/authors:
 *   get:
 *     summary: Retrieve all authors.
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
 *         description: Authors retrieved successfully.
 *       '404':
 *         description: No authors found.
 */

authorPublicRouter.get('/', retrieveAuthor);

export default authorPublicRouter;
