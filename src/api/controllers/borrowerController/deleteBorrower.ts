import { type Request, type Response } from 'express'
import { Borrower } from '../../models/Borrowers'

// Controller to delete a borrower
export const deleteBorrower = async (req: Request<{ borrowerId: string }>, res: Response): Promise<void> => {
  try {
    const borrowerId = req.params.borrowerId
    const deletedBorrower = await Borrower.findByIdAndDelete(borrowerId)
    if (deletedBorrower === null || deletedBorrower === undefined) {
      res.status(404).json({ message: 'Borrower not found' })
      return
    }
    res.status(200).json({ message: 'Borrower deleted successfully' })
  } catch (error) {
    console.error('Error deleting borrower:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
