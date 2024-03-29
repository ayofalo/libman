import { describe, it, expect } from '@jest/globals';
import * as mongoose from 'mongoose';
import request, { Response } from 'supertest';
import app from '../../../server';
import { Book } from '../../models/Book';
import { Author } from '../../models/Author';

describe('Book Public routes', () => {
  let book: Book;
  let author: Author;

  beforeEach(async () => {
    author = await Author.create({
      name: 'Ayodele Falowo',
    });
    book = await Book.create({
      title: 'Things Fall Apart',
      authors: [new mongoose.Types.ObjectId(author.id)],
    });
  });

  afterEach(() => {
    author.deleteOne();
    book.deleteOne();
  });

  it('should retrieve books by book ID', async () => {
    const response: Response = await request(app).get(
      `/api/public/v1/books/${author.id}`,
    );
    expect(response.status).toBe(200);

    const authorResponse = response.body;

    expect(authorResponse.length).toBe(1);
    expect(authorResponse[0].title).toBe('Things Fall Apart');
  });

  it('should retrieve all books', async () => {
    const response: Response = await request(app).get('/api/public/v1/books');
    expect(response.status).toBe(200);
  });

  it('should retrieve paginated books', async () => {
    const page = 1; // Specify the page number you want to test
    const limit = 1; // Specify the limit per page
    const response: Response = await request(app).get(
      `/api/public/v1/books?page=${page}&limit=${limit}`,
    );

    expect(response.status).toBe(200);
    const books = response.body.length;

    expect(books).toEqual(1);
  });
  it('should handle undefined routes with a 404 status code', async () => {
    const response = await request(app).get('/nonexistent-route');
    // console.log(response);
    expect(response.status).toBe(404);
    expect(response.text).toBe('Route not found');
  });
});
