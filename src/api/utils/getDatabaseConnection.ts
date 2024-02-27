import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import logger from '../utils/logger'; // Assuming you have a logger utility

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

// Database connection
const db = process.env.MONGO_URI as string; // Use the environment variable for MongoDB URI

export const getDatabaseConnection = async () => {
  try {
    const connection = await mongoose.connect(db);
    logger.info('MongoDB connected...');
    return connection; // Return the Mongoose connection object if needed
  } catch (error: any) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    throw error; // Propagate the error to the calling code
  }
};
