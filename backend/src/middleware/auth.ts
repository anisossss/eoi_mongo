/**
 * CSIR EOI 8119/06/01/2026 - Authentication Middleware
 * JWT-based authentication and authorization
 * 
 * Demonstrates proficiency in:
 * - JWT authentication
 * - Role-based access control
 * - Express middleware
 * - Security best practices
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { AppError, asyncHandler } from './errorHandler';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

// JWT payload interface
interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

/**
 * Generate JWT token
 */
export const generateToken = (user: IUser): string => {
  const secret = process.env.JWT_SECRET || 'default-secret-key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn }
  );
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET || 'default-secret-key';
  return jwt.verify(token, secret) as JwtPayload;
};

/**
 * Authentication middleware
 * Protects routes by verifying JWT token
 */
export const authenticate = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    // Check for token in Authorization header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies
    if (!token && req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new AppError('Access denied. No token provided.', 401);
    }

    try {
      // Verify token
      const decoded = verifyToken(token);

      // Get user from database
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        throw new AppError('User belonging to this token no longer exists.', 401);
      }

      if (!user.isActive) {
        throw new AppError('User account has been deactivated.', 401);
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError('Invalid token. Please log in again.', 401);
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError('Token expired. Please log in again.', 401);
      }
      throw error;
    }
  }
);

/**
 * Authorization middleware
 * Restricts access based on user roles
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      throw new AppError('User not authenticated.', 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('You do not have permission to perform this action.', 403);
    }

    next();
  };
};

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't require authentication
 */
export const optionalAuth = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    let token: string | undefined;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id).select('-password');
        if (user && user.isActive) {
          req.user = user;
        }
      } catch {
        // Token invalid, continue without user
      }
    }

    next();
  }
);

export default { authenticate, authorize, optionalAuth, generateToken, verifyToken };
