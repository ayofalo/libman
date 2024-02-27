import mongoose, { type Document, Schema } from 'mongoose';

interface Book extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  authors: mongoose.Types.ObjectId[]; // Reference to authors by their ObjectId
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  authors: [{ type: Schema.Types.ObjectId, ref: 'Author', required: true }],
});

const Book = mongoose.model<Book>('Book', bookSchema);

export { Book };
