/**
 * CSIR EOI 8119/06/01/2026 - Routes Index
 * Central route configuration
 * 
 * Demonstrates proficiency in:
 * - Express Router configuration
 * - API versioning
 * - Route organization
 */

import { Router } from 'express';
import authRoutes from './authRoutes';
import populationRoutes from './populationRoutes';

const router = Router();

// API info endpoint
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'CSIR EOI 8119/06/01/2026 API',
    version: '1.0.0',
    description: 'Software Development Services API demonstrating proficiency in modern web development',
    endpoints: {
      auth: {
        base: '/api/auth',
        routes: {
          register: 'POST /api/auth/register',
          login: 'POST /api/auth/login',
          me: 'GET /api/auth/me',
          updateProfile: 'PUT /api/auth/update-profile',
          changePassword: 'PUT /api/auth/change-password',
          logout: 'POST /api/auth/logout',
        },
      },
      population: {
        base: '/api/population',
        routes: {
          getAll: 'GET /api/population',
          fetch: 'GET /api/population/fetch',
          direct: 'GET /api/population/direct',
          tree: 'GET /api/population/tree',
          stats: 'GET /api/population/stats',
          range: 'GET /api/population/range',
        },
      },
      health: 'GET /api/health',
    },
    documentation: {
      swagger: '/api/docs',
    },
    technologies: [
      'Node.js',
      'Express.js',
      'TypeScript',
      'MongoDB',
      'JWT Authentication',
      'Docker',
    ],
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/population', populationRoutes);

export default router;
