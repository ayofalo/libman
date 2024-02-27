import express = require('express');

import { type Router } from 'express';

import {
  registerUser,
  login,
} from '../../../controllers/userController/userController';

const userRouter: Router = express.Router();

/**
 * @swagger
 * /api/auth/v1/login:
 *   post:
 *     summary: User login.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: User logged in successfully.
 *       '401':
 *         description: Invalid credentials or user not found.
 */
userRouter.post('/api/auth/v1/login', login);
/**
 * @swagger
 * /api/auth/v1/register:
 *   post:
 *     summary: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - role
 *     responses:
 *       '201':
 *         description: User registered successfully.
 *       '400':
 *         description: Email already exists or invalid input.
 */

userRouter.post('/api/auth/v1/register', registerUser);

export default userRouter;
