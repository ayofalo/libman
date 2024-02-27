import { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import { Book } from '../../models/Book';

// Controller to add a new book
export const addBook = async (
  req: Request<any, any, { title: string; authorId: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { title, authorId } = req.body;

    const newBook = new Book({
      title,
      authors: [new mongoose.Types.ObjectId(authorId)],
    });

    const savedBook = await newBook.save();

    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
