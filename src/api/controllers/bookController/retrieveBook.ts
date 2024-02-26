import { type Request, type Response } from 'express'
import { Book } from '../../models/Book'

// Controller to list all books with pagination
export const retrieveBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = !isNaN(parseInt(req.query.page as string)) ? parseInt(req.query.page as string) : 1 // Default to page 1 if not provided
    const limit = !isNaN(parseInt(req.query.limit as string)) ? parseInt(req.query.limit as string) : 10 // Default to 10 items per page if not provided

    // Check for NaN after parsing query parameters
    if (isNaN(page) || isNaN(limit)) {
      res.status(400).json({ message: 'Invalid page or limit parameter' })
      return
    }

    // Calculate the skip value based on the page and limit
    const skip = (page - 1) * limit

    // Find all books with pagination
    const books = await Book.find().skip(skip).limit(limit)

    // Check if books array is empty
    if (books.length === 0) {
      res.status(404).json({ message: 'No books found' })
      return
    }

    res.status(200).json(books)
  } catch (error) {
    console.error('Error listing books with pagination:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
