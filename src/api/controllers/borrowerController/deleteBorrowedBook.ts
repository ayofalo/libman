import { type Request, type Response } from 'express';
import { Borrower } from '../../models/Borrowers';

export const deleteBorrowedBook = async (req: Request<{ borrowerId: string, bookId: string }>, res: Response): Promise<void> => {
  try {
    const { borrowerId } = req.params;
    const { bookId } = req.params;

    // Find the borrower by ID
    const borrower = await Borrower.findById(borrowerId);

    if (borrower === null || borrower === undefined) {
      res.status(404).json({ message: 'Borrower not found' });
      return;
    }

    // Find the index of the book to be deleted
    const bookIndex = borrower.bookBorrowed.findIndex((book) => book.bookId.equals(bookId));

    if (bookIndex === -1) {
      res.status(404).json({ message: 'Book not found in borrower\'s list' });
      return;
    }

    // Update the deletedAt field of the corresponding book object
    borrower.bookBorrowed[bookIndex].deletedAt = new Date();
    await borrower.save();

    res.status(200).json(borrower);
  } catch (error) {
    console.error('Error deleting borrowed book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
