import { type Request, type Response } from 'express'
import { Book } from '../../models/Book'

// Controller to delete a book
export const deleteBook = async (req: Request<{ bookId: string }>, res: Response): Promise<void> => {
  try {
    const bookId = req.params.bookId
    const deletedBook = await Book.findByIdAndDelete(bookId)
    if (!deletedBook) {
      res.status(404).json({ message: 'Book not found' })
      return
    }
    res.status(200).json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.error('Error deleting book:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
