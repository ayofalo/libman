import { type Request, type Response } from 'express'
import { Borrower } from '../../models/Borrowers'

// Controller to retrieve a borrower by ID
export const getBorrowers = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const borrowerId = req.params.id
    const borrower = await Borrower.findById(borrowerId)
    if (!borrower) {
      res.status(404).json({ message: 'Borrower not found' })
      return
    }
    res.status(200).json(borrower)
  } catch (error) {
    console.error('Error retrieving borrower:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
