import { type Request, type Response } from 'express';
import { Book } from '../../models/Book';

// Controller to update an existing book
export const updateBook = async (
  req: Request<{ bookId: string }, any, Book>,
  res: Response,
): Promise<void> => {
  try {
    const { bookId } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
    });
    if (updatedBook === null || updatedBook === undefined) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
