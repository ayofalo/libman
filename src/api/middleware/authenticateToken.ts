import { type Request, type Response, type NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

// Define the User interface
interface User {
  id: string
  email: string
  // Add more fields as needed
}

// Extend the existing Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

// Define an interface that extends the Request interface to include the custom property
interface AuthenticatedRequest extends Request {
  authenticatedUserId?: string // Define the custom property and its type
}

const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken // The JWT is stored in the 'token' cookie

  if (!token) {
    return res.status(401).send('Unauthorized- No token')
  }

  try {
    // Verify the token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!)

    // Attach the user ID to the request for further use
    req.authenticatedUserId = decoded.userId

    next() // Add a return statement here
  } catch (error) {
    // console.error(error);
    return res.status(401).send('Unauthorized')
  }
}

export default authenticateUser
