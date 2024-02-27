import mongoose, { type Document, Schema } from 'mongoose';

export interface User extends Document {
  id: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model<User>('User', userSchema);

export { User };
