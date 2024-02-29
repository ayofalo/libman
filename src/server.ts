import express = require('express');
import { Request, Response, NextFunction } from 'express';
import cors = require('cors');
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import setupSwagger from '../swagger';
import logger from './api/utils/logger';
import authenticateUser from './api/middleware/authenticateToken';
import { authorizeUser } from './api/middleware/authorizeUser';
import authorPrivateRouter from './api/routes/v1/authorRoutes/author.private.route';
import bookPrivateRouter from './api/routes/v1/bookRoutes/book.private.route';
import borrowerPrivateRouter from './api/routes/v1/borrowerRoutes/borrower.private.route';
import authorPublicRouter from './api/routes/v1/authorRoutes/author.public.route';
import bookPublicRouter from './api/routes/v1/bookRoutes/book.public.route';
import borrowerPublicRouter from './api/routes/v1/borrowerRoutes/borrower.public.route';
import borrowerUserouter from './api/routes/v1/borrowerRoutes/borrowerUser.route';
import userRouter from './api/routes/v1/userRoutes/user.routes';
import { getDatabaseConnection } from './api/utils/getDatabaseConnection';

const serverless = require('serverless-http');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

setupSwagger(app);

// CORS
app.use(cors());
// CORS headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Request logging middleware

app.use(morgan('combined')); // Use 'combined' format for logging

// Routes
app.use('/api/auth/v1', userRouter);
app.use('/api/public/v1/authors', authorPublicRouter);
app.use('/api/public/v1/books', bookPublicRouter);
app.use('/api/public/v1/borrowers', borrowerPublicRouter);
app.use('/api/private/v1/borrowers', borrowerUserouter); // borrower acccess
app.use(
  '/api/private/v1/admin/books',
  authorizeUser,
  authenticateUser,
  bookPrivateRouter,
); // admin access
app.use(
  '/api/private/v1/admin/authors',
  authorizeUser,
  authenticateUser,
  authorPrivateRouter,
); // admin access
app.use(
  '/api/private/v1/admin/borrowers',
  authorizeUser,
  authenticateUser,
  borrowerPrivateRouter,
); // admin access

// Catch-all route handler for any other routes
app.use((req: Request, res: Response) => {
  res.status(404).send('Route not found');
});

// Error-handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal Server Error' });
});

getDatabaseConnection().then(() => {
  if (process.env.NODE_ENV === 'test') return;

  const port = process.env.PORT || 3001;
  const server = app.listen(port, async () => {
    logger.info(`Server started on port ${port}`);
  });

  process.on('SIGINT', async () => {
    try {
      logger.info('Server is shutting down...');

      if (mongoose.connection) {
        await mongoose.connection.close();
      }

      logger.info('MongoDB connection closed.');

      // Close other resources or perform cleanup if needed

      server.close(() => {
        logger.info('Server has been terminated.');
        process.exit(0);
      });
    } catch (error: any) {
      logger.error(`Error during shutdown: ${error.message}`);
      process.exit(1);
    }
  });
});

export default app;

module.exports.handler = serverless(app);
