/**
 * CSIR EOI 8119/06/01/2026 - Population Data Routes
 * Routes for population data operations
 * 
 * Demonstrates proficiency in:
 * - RESTful API routing
 * - Express Router
 * - Query parameter handling
 */

import { Router } from 'express';
import {
  fetchFromDataUSA,
  getAllPopulationData,
  getDirectFromAPI,
  getByYearRange,
  getStatistics,
  getTreeData,
} from '../controllers/populationController';
import { paginationValidation, yearRangeValidation } from '../middleware/validation';

const router = Router();

/**
 * @route   GET /api/population/fetch
 * @desc    Fetch population data from DataUSA API and store in database
 * @access  Public
 */
router.get('/fetch', fetchFromDataUSA);

/**
 * @route   GET /api/population/direct
 * @desc    Get population data directly from DataUSA API (no caching)
 * @access  Public
 */
router.get('/direct', getDirectFromAPI);

/**
 * @route   GET /api/population/tree
 * @desc    Get population data in tree structure for visualization
 * @access  Public
 */
router.get('/tree', getTreeData);

/**
 * @route   GET /api/population/stats
 * @desc    Get population statistics
 * @access  Public
 */
router.get('/stats', getStatistics);

/**
 * @route   GET /api/population/range
 * @desc    Get population data by year range
 * @access  Public
 */
router.get('/range', yearRangeValidation, getByYearRange);

/**
 * @route   GET /api/population
 * @desc    Get all population data with pagination
 * @access  Public
 */
router.get('/', paginationValidation, getAllPopulationData);

export default router;
