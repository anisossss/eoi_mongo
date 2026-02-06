/**
 * CSIR EOI 8119/06/01/2026 - Validation Middleware
 * Input validation using express-validator
 * 
 * Demonstrates proficiency in:
 * - Input validation
 * - Data sanitization
 * - Express middleware
 * - Security best practices
 */

import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

/**
 * Validate request and handle errors
 */
export const validate = (req: Request, _res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => {
      if ('path' in error) {
        return `${error.path}: ${error.msg}`;
      }
      return error.msg;
    });

    throw new AppError(`Validation failed: ${errorMessages.join(', ')}`, 400);
  }

  next();
};

/**
 * User registration validation rules
 */
export const registerValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .toLowerCase(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter'),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters')
    .escape(),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters')
    .escape(),
  validate,
];

/**
 * User login validation rules
 */
export const loginValidation = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .toLowerCase(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  validate,
];

/**
 * Update user validation rules
 */
export const updateUserValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters')
    .escape(),
  body('lastName')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters')
    .escape(),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .toLowerCase(),
  validate,
];

/**
 * Change password validation rules
 */
export const changePasswordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('New password must contain at least one number')
    .matches(/[a-zA-Z]/)
    .withMessage('New password must contain at least one letter'),
  validate,
];

/**
 * MongoDB ObjectId validation
 */
export const objectIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  validate,
];

/**
 * Pagination query validation
 */
export const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
  query('sortBy')
    .optional()
    .isString()
    .trim(),
  query('order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Order must be either "asc" or "desc"'),
  validate,
];

/**
 * Year range validation for population data
 */
export const yearRangeValidation = [
  query('startYear')
    .optional()
    .isInt({ min: 1900, max: 2100 })
    .withMessage('Start year must be between 1900 and 2100')
    .toInt(),
  query('endYear')
    .optional()
    .isInt({ min: 1900, max: 2100 })
    .withMessage('End year must be between 1900 and 2100')
    .toInt(),
  validate,
];

export default {
  validate,
  registerValidation,
  loginValidation,
  updateUserValidation,
  changePasswordValidation,
  objectIdValidation,
  paginationValidation,
  yearRangeValidation,
};
