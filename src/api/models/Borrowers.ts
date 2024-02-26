import mongoose, { type Document, Schema, type Types } from "mongoose";
// the Borrower interface
interface Borrower extends Document {
  _id: Types.ObjectId;
  name: string;
  bookBorrowed: BorrowedBook[];
}

// the BorrowedBook interface
interface BorrowedBook {
  bookId: Types.ObjectId;
  borrowedAt: Date;
  deletedAt?: Date;
}

// the borrowerSchema
const borrowerSchema = new Schema<Borrower>({
  name: { type: String, required: true },
  bookBorrowed: [
    {
      bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
      borrowedAt: { type: Date, default: Date.now },
      deletedAt: { type: Date },
    },
  ],
});
const Borrower = mongoose.model<Borrower>("Borrower", borrowerSchema);

export { Borrower };
