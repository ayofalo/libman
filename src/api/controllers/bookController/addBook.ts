// import { Request, Response } from 'express';
// import { Book } from '../../models/Book'; // Import the BookModel from the appropriate location

// // Controller to add a new book
// export const addBook = async (req: Request<any, any, Book>, res: Response): Promise<void> => {
//     try {
//       const newBook = new Book(req.body);
//       const savedBook = await newBook.save();
//       res.status(201).json(savedBook);
//     } catch (error) {
//       console.error('Error adding book:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };

import { type Request, type Response } from 'express'
import { Book } from '../../models/Book' // Import the BookModel from the appropriate location
import mongoose from 'mongoose'

// Controller to add a new book
export const addBook = async (req: Request<any, any, { title: string, authorId: string }>, res: Response): Promise<void> => {
  try {
    const { title, authorId } = req.body

    // Create a new Book instance
    const newBook = new Book({
      title,
      authors: [new mongoose.Types.ObjectId(authorId)] // Convert authorId to ObjectId
    })

    // Save the new book to the database
    const savedBook = await newBook.save()

    // Respond with the saved book
    res.status(201).json(savedBook)
  } catch (error) {
    // Handle errors
    console.error('Error adding book:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
