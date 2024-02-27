import { describe, it, expect } from '@jest/globals';
import request, { Response } from 'supertest';
import app from '../../../server';
import { Author } from '../../models/Author';

describe(' Author Public routes', () => {
  let author: Author;

  beforeEach(async () => {
    author = await Author.create({
      name: 'Ayodele Falowo',
    });
  });

  afterEach(() => {
    author.deleteOne();
  });

  it('should retrieve all authors', async () => {
    const response: Response = await request(app).get('/api/public/v1/authors');
    expect(response.status).toBe(200);
  });

  it('should retrieve paginated authors', async () => {
    const page = 1; // Specify the page number you want to test
    const limit = 1; // Specify the limit per page
    const response: Response = await request(app).get(
      `/api/public/v1/authors?page=${page}&limit=${limit}`,
    );

    expect(response.status).toBe(200);
    const books = response.body.length;

    expect(books).toEqual(1);
  });
});
