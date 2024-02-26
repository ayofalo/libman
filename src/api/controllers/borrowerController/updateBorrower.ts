import { Request, Response } from 'express';
import { Borrower } from '../../models/Borrowers';
import { Types } from 'mongoose';

interface BorrowedBook {
  bookId: Types.ObjectId;
  borrowedAt: Date;
}
// Controller to update an existing borrower
// Add a book to the list of books borrowed by a borrower
export const addBookToBorrowed = async (req: Request<{ borrowerId: string }, any, { bookId: string }>, res: Response): Promise<void> => {
  try {
    const borrowerId = req.params.borrowerId;
    const bookId = req.body.bookId;

    // Convert bookId to ObjectId
    const bookObjectId = new Types.ObjectId(bookId);

    // Find the borrower by ID
    const borrower = await Borrower.findById(borrowerId);

    
    if (!borrower) {
      res.status(404).json({ message: 'Borrower not found' });
      return;
    }

    // Check if the book is already borrowed by the borrower
    const existingBookIndex = borrower.bookBorrowed.findIndex(book => book.bookId.equals(bookObjectId));
    if (existingBookIndex !== -1) {
      res.status(400).json({ message: 'Book already borrowed by the borrower' });
      return;
    }

    // Add the book to the list of books borrowed with borrowing timestamp
    const borrowedBook: BorrowedBook = {
      bookId: bookObjectId,
      borrowedAt: new Date(),
    };
    borrower.bookBorrowed.push(borrowedBook);
    await borrower.save();

    res.status(200).json(borrower);
  } catch (error) {
    console.error('Error adding book to borrowed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
