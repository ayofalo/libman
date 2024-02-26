import { type Request, type Response } from 'express'
import { Author } from '../../models/Author' // Assuming you have an Author model
// Controller to update an existing author
export const updateAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorId = req.params.authorId
    const { name } = req.body
    const updatedAuthor = await Author.findByIdAndUpdate(authorId, { name }, { new: true })
    if (updatedAuthor === null || updatedAuthor === undefined) {
      res.status(404).json({ message: 'Author not found' })
      return
    }
    res.status(200).json(updatedAuthor)
  } catch (error) {
    console.error('Error updating author:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
