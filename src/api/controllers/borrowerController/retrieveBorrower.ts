import { type Request, type Response } from "express";
import { Borrower } from "../../models/Borrowers";

export const retrieveBorrowers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit as string) || 10; // Default to 10 items per page if not provided

    // Calculate the skip value based on the page and limit
    const skip = (page - 1) * limit;

    // Find all borrowers with pagination
    const borrowers = await Borrower.find().skip(skip).limit(limit);

    if (!borrowers || borrowers.length === 0) {
      res.status(404).json({ message: "No borrowers found" });
      return;
    }

    res.status(200).json(borrowers);
  } catch (error) {
    console.error("Error retrieving borrowers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
