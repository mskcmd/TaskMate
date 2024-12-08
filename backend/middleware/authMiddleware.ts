import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/generateToken';

declare global {
    namespace Express {
      interface Request {
        user?: any; 
      }
    }
  }

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { access_token: accessToken } = req.cookies;

    if (!accessToken) {
      res.status(401).json({ message: "Access token is missing. Authentication required." });
      return; 
    }

    const decodedToken = verifyToken(accessToken);

    if (!decodedToken) {
      res.status(401).json({ message: "Invalid or expired access token. Please login again." });
      return; 
    }

    req.user = decodedToken.data; 
    next(); 
  } catch (error) {
    console.error("Authentication middleware error:", error);
    res.status(500).json({ message: "An error occurred during authentication." });
  }
};
