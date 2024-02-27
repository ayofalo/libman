import { type Request, type Response } from 'express';
import { Author } from '../../models/Author';

// Define the controller function to retrieve authors
export const getAuthors = async (
  req: Request<any, any, any, { id: string }>,
  res: Response,
): Promise<void> => {
  try {
    const authorId = req.params.id;

    // Find the author by ID in the database
    const author = await Author.findById(authorId);

    // If author is not found, send a 404 response
    if (author === null || author === undefined) {
      res.status(404).json({ message: 'Author not found' });
      return;
    }
    // If author is found, send a 200 response with the author data
    res.status(200).json(author);
  } catch (error) {
    // If an error occurs, log the error and send a 500 response
    console.error('Error retrieving author:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
