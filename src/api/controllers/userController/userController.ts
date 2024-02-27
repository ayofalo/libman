import { type Request, type Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../../models/User';

export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, role } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword, role });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with success message
    res
      .status(201)
      .json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const accessToken = jwt.sign(
      { email: user.email, id: user._id, role: user.role }, // Include role in the payload
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '1h' }, // Expires in 1 hour
    );

    // Set the token as a cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      sameSite: 'strict', // Adjust as needed
      maxAge: 3600000, // 1 hour in milliseconds
    });

    // Send a success message
    res.status(200).json({ message: 'Login successful', accessToken });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
}
