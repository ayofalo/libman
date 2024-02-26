import { Request, Response } from 'express';
import { Borrower } from '../../models/Borrowers';


// Controller to add a new borrower
//this should take the user and make his role turn to borrower 
export const addBorrower = async (req: Request<any, any, Borrower>, res: Response): Promise<void> => {
    try {
      const newBorrower = new Borrower(req.body);
      const savedBorrower = await newBorrower.save();
      res.status(201).json(savedBorrower);
    } catch (error) {
      console.error('Error adding borrower:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };