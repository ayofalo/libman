import * as mongoose from "mongoose";
import { type Document, Schema } from "mongoose";

interface Author extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
}

//  mongoose schema for author entity
const authorSchema = new Schema<Author>({
  name: { type: String, required: true },
  // Define other author attributes
});

//  mongoose model for author
const Author = mongoose.model<Author>("Author", authorSchema);

export { Author };
