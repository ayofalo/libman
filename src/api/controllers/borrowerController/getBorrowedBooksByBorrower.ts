import { type Request, type Response } from 'express'
import { Borrower } from '../../models/Borrowers'
import mongoose from 'mongoose'

export const getBorrowedBooksByBorrower = async (req: Request<{ borrowerId: string }>, res: Response): Promise<void> => {
  try {
    const borrowerId = req.params.borrowerId

    const borrowerObjectId = new mongoose.Types.ObjectId(borrowerId)

    // Find the borrower by ID
    const borrower = await Borrower.findById(borrowerObjectId)

    if (borrower === null || borrower === undefined) {
      res.status(404).json({ message: 'Borrower not found' })
      return
    }

    // Filter out deleted books and return the list of borrowed books

    const borrowedBooks = borrower.bookBorrowed.filter((book) => book.deletedAt === null || book.deletedAt === undefined)

    res.status(200).json(borrowedBooks)
  } catch (error) {
    console.error('Error retrieving borrowed books by borrower:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
