import { Request, Response } from 'express';
import { Author } from '../../models/Author';
// Controller to delete an author
export const deleteAuthor = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { authorId } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(authorId);
    if (deletedAuthor === null || deletedAuthor === undefined) {
      res.status(404).json({ message: 'Author not found' });
      return;
    }
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
