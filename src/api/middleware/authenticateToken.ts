import { type Request, type Response, type NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// User interface
interface User {
  id: string;
  email: string;
}

// Extended the existing Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// Defined an interface that extends the Request interface to include the custom property
interface AuthenticatedRequest extends Request {
  authenticatedUserId?: string;
}

const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = (req.headers.Authorization
    || req.headers.authorization) as string; // Bearer <Token>
  const [, token] = authorizationHeader.split(' ');

  if (!token) {
    return res.status(401).send('Unauthorized- No token');
  }

  try {
    // Verify the token
    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);

    // Attach the user ID to the request for further use
    req.authenticatedUserId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};

export default authenticateUser;
