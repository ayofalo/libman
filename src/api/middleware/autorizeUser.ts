import { type Request, type Response, type NextFunction } from "express";
import { type JwtPayload } from "jsonwebtoken";
import * as jwt from "jsonwebtoken";
import { type User } from "../models/User";

export function authorizeUser(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.sendStatus(403); // Forbidden
    }

    // Decode the JWT token
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    // Extract user information from the decoded token
    const user = decodedToken as User;

    // Check if the user has the required role (e.g., 'admin')
    if (user.role !== "admin") {
      return res.sendStatus(403); // Forbidden
    }

    // Attach the user to the request for further use
    req.user = user;

    next();
  } catch (error) {
    console.error("Error authorizing user:", error);
    return res.sendStatus(403); // Forbidden
  }
}
