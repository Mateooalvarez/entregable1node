import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user as { id: string; role: string };
    next();
  });
}

export function authorizeEmployee(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user && req.user.role === 'employee') {
    next();
  } else {
    res.sendStatus(403);
  }
}
