import { type Request, type Response } from 'express';
import { Author } from '../../models/Author';

export const retrieveAuthor = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = !isNaN(parseInt(req.query.page as string))
      ? parseInt(req.query.page as string)
      : 1; // Default to page 1 if not provided
    const limit = !isNaN(parseInt(req.query.limit as string))
      ? parseInt(req.query.limit as string)
      : 10; // Default to 10 items per page if not provided

    // Calculate the skip value based on the page and limit
    const skip = (page - 1) * limit;

    // Find all authors with pagination
    const authors = await Author.find().skip(skip).limit(limit);

    if (!authors || authors.length === 0) {
      res.status(404).json({ message: 'No authors found' });
      return;
    }

    res.status(200).json(authors);
  } catch (error) {
    console.error('Error retrieving authors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
