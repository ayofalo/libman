import { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import { Book } from '../../models/Book';

// Controller to get books by author ID
export const getBooksByAuthorId = async (
  req: Request<{ authorId: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { authorId } = req.params;

    // Convert authorId to a mongoose.Types.ObjectId
    const authorObjectId = new mongoose.Types.ObjectId(authorId);

    // Find books by author ID
    const books = await Book.find({ authors: authorObjectId });

    if (!books || books.length === 0) {
      res.status(404).json({ message: 'No books found for the author' });
      return;
    }

    res.status(200).json(books);
  } catch (error) {
    console.error('Error retrieving books by author ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
