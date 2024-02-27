import { Request, Response } from 'express';
import { Author } from '../../models/Author'; // Assuming you have an Author model

// Controller to add a new author

export const addAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const newAuthor = new Author({ name });
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    console.error('Error adding author:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
