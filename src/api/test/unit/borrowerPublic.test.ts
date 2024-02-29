import { describe, it, expect } from '@jest/globals';
import request, { Response } from 'supertest';
import mongoose from 'mongoose';
import app from '../../../server';
import { User } from '../../models/User';
import { Borrower } from '../../models/Borrowers';
import { Book } from '../../models/Book';
import { Author } from '../../models/Author';

describe('Borrower Public routes', () => {
  let borrower: Borrower;

  beforeEach(async () => {
    try {
      borrower = await Borrower.create({
        name: 'Fredrick',
        bookBorrowed: [
          {
            bookId: new mongoose.Types.ObjectId('65d9f2d51fc8f167f78ef46f'),
            borrowedAt: new Date('2024-02-24T15:55:15.325Z'),
          },
          {
            bookId: new mongoose.Types.ObjectId('65da1163cd4a14d09018772a'),
            borrowedAt: new Date('2024-02-24T15:55:15.325Z'),
          },
        ],
      });
    } catch (error) {
      console.error('Error creating test data:', error);
    }
  });

  afterEach(async () => {
    try {
      await borrower.deleteOne();
    } catch (error) {
      console.error('Error deleting test data:', error);
    }
  });

  it('should retrieve all borrowers', async () => {
    const response: Response = await request(app).get(
      '/api/public/v1/borrowers',
    );
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  it('should retrieve borrowed books by borrower ID', async () => {
    // Replace :borrowerId with the actual ID of the borrower created in beforeEach
    const response: Response = await request(app).get(
      `/api/public/v1/borrowers/${borrower._id}/borrowed-books`,
    );

    expect(response.status).toBe(200);
    // Add more assertions as needed
  });
});
