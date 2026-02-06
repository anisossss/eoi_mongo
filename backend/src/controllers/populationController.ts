/**
 * CSIR EOI 8119/06/01/2026 - Population Data Controller
 * Handles population data operations and DataUSA API integration
 * 
 * Demonstrates proficiency in:
 * - RESTful API design
 * - External API integration
 * - Data caching
 * - Error handling
 */

import { Request, Response } from 'express';
import fetch from 'node-fetch';
import PopulationData from '../models/PopulationData';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

// DataUSA API endpoint (new Tesseract API)
const DATAUSA_API_URL = 'https://api.datausa.io/tesseract/data.jsonrecords?cube=pums_5&drilldowns=Year,Nation&measures=Total+Population';

// Interface for DataUSA API response (new format)
interface DataUSAResponse {
  annotations: {
    source_name: string;
    source_description: string;
    dataset_name: string;
    dataset_link: string;
    topic: string;
    subtopic: string;
  };
  page: {
    limit: number;
    offset: number;
    total: number;
  };
  columns: string[];
  data: Array<{
    'Nation ID': string;
    Nation: string;
    Year: number;
    'Total Population': number;
  }>;
}

/**
 * @desc    Fetch population data from DataUSA API
 * @route   GET /api/population/fetch
 * @access  Public
 */
export const fetchFromDataUSA = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    try {
      logger.info('Fetching data from DataUSA API...');

      const response = await fetch(DATAUSA_API_URL);

      if (!response.ok) {
        throw new AppError(`Failed to fetch data from DataUSA API: ${response.statusText}`, 502);
      }

      const apiResponse = (await response.json()) as DataUSAResponse;

      if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
        throw new AppError('Invalid response from DataUSA API', 502);
      }

      // Filter out invalid entries and transform data
      const validData = apiResponse.data.filter(item => item['Nation ID'] && item.Nation);
      
      // Transform and save data to database
      const populationData = validData.map((item) => ({
        idNation: item['Nation ID'],
        nation: item.Nation,
        idYear: item.Year,
        year: item.Year,
        population: item['Total Population'],
        slugNation: item.Nation.toLowerCase().replace(/\s+/g, '-'),
        source: 'DataUSA API',
        fetchedAt: new Date(),
      }));

      // Upsert data to avoid duplicates
      const bulkOps = populationData.map((data) => ({
        updateOne: {
          filter: { idNation: data.idNation, year: data.year },
          update: { $set: data },
          upsert: true,
        },
      }));

      await PopulationData.bulkWrite(bulkOps);

      logger.info(`Successfully fetched and stored ${populationData.length} records`);

      res.status(200).json({
        success: true,
        message: 'Population data fetched and stored successfully',
        data: {
          count: populationData.length,
          records: populationData,
          source: apiResponse.annotations,
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error('Error fetching from DataUSA API:', error);
      throw new AppError('Failed to fetch population data from external API', 502);
    }
  }
);

/**
 * @desc    Get all population data from database
 * @route   GET /api/population
 * @access  Public
 */
export const getAllPopulationData = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = (req.query.sortBy as string) || 'year';
    const order = req.query.order === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      PopulationData.find()
        .sort({ [sortBy]: order })
        .skip(skip)
        .limit(limit),
      PopulationData.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        records: data,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalRecords: total,
          recordsPerPage: limit,
        },
      },
    });
  }
);

/**
 * @desc    Get population data directly from DataUSA API (no caching)
 * @route   GET /api/population/direct
 * @access  Public
 */
export const getDirectFromAPI = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    try {
      logger.info('Fetching data directly from DataUSA API...');

      const response = await fetch(DATAUSA_API_URL);

      if (!response.ok) {
        throw new AppError(`Failed to fetch data from DataUSA API: ${response.statusText}`, 502);
      }

      const apiResponse = (await response.json()) as DataUSAResponse;

      // Filter out invalid entries and transform data
      const validData = apiResponse.data.filter(item => item['Nation ID'] && item.Nation);

      // Transform data for consistent response format
      const transformedData = validData.map((item) => ({
        idNation: item['Nation ID'],
        nation: item.Nation,
        idYear: item.Year,
        year: item.Year,
        population: item['Total Population'],
        slugNation: item.Nation.toLowerCase().replace(/\s+/g, '-'),
        formattedPopulation: item['Total Population'].toLocaleString('en-US'),
        populationInMillions: (item['Total Population'] / 1000000).toFixed(2),
      }));

      res.status(200).json({
        success: true,
        message: 'Data fetched directly from DataUSA API',
        data: {
          records: transformedData,
          source: apiResponse.annotations,
          fetchedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error('Error fetching directly from DataUSA API:', error);
      throw new AppError('Failed to fetch population data from external API', 502);
    }
  }
);

/**
 * @desc    Get population data by year range
 * @route   GET /api/population/range
 * @access  Public
 */
export const getByYearRange = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const startYear = parseInt(req.query.startYear as string) || 2010;
    const endYear = parseInt(req.query.endYear as string) || new Date().getFullYear();

    const data = await PopulationData.find({
      year: { $gte: startYear, $lte: endYear },
    }).sort({ year: -1 });

    res.status(200).json({
      success: true,
      data: {
        records: data,
        yearRange: { startYear, endYear },
        count: data.length,
      },
    });
  }
);

/**
 * @desc    Get population statistics
 * @route   GET /api/population/stats
 * @access  Public
 */
export const getStatistics = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const stats = await PopulationData.aggregate([
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          minPopulation: { $min: '$population' },
          maxPopulation: { $max: '$population' },
          avgPopulation: { $avg: '$population' },
          minYear: { $min: '$year' },
          maxYear: { $max: '$year' },
        },
      },
    ]);

    const yearlyGrowth = await PopulationData.aggregate([
      { $sort: { year: 1 } },
      {
        $group: {
          _id: '$nation',
          years: {
            $push: {
              year: '$year',
              population: '$population',
            },
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        summary: stats[0] || {
          totalRecords: 0,
          minPopulation: 0,
          maxPopulation: 0,
          avgPopulation: 0,
          minYear: 0,
          maxYear: 0,
        },
        yearlyData: yearlyGrowth,
      },
    });
  }
);

/**
 * @desc    Get tree structure data for visualization
 * @route   GET /api/population/tree
 * @access  Public
 */
export const getTreeData = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    // First try to get from database
    let data = await PopulationData.find().sort({ year: -1 });

    // If no data in database, fetch from API
    if (data.length === 0) {
      try {
        const response = await fetch(DATAUSA_API_URL);
        if (response.ok) {
          const apiResponse = (await response.json()) as DataUSAResponse;
          const validData = apiResponse.data.filter(item => item['Nation ID'] && item.Nation);
          data = validData.map((item) => ({
            idNation: item['Nation ID'],
            nation: item.Nation,
            idYear: item.Year,
            year: item.Year,
            population: item['Total Population'],
            slugNation: item.Nation.toLowerCase().replace(/\s+/g, '-'),
          })) as any;
        }
      } catch (error) {
        logger.error('Error fetching tree data:', error);
      }
    }

    // Transform data into tree structure
    const treeData = {
      id: 'root',
      name: 'Population Data',
      children: data.reduce((acc: any[], item: any) => {
        const nationIndex = acc.findIndex((n) => n.name === item.nation);
        
        const yearNode = {
          id: `${item.idNation}-${item.year}`,
          name: `Year ${item.year}`,
          value: item.population,
          formattedValue: item.population.toLocaleString('en-US'),
          populationInMillions: (item.population / 1000000).toFixed(2) + 'M',
        };

        if (nationIndex === -1) {
          acc.push({
            id: item.idNation,
            name: item.nation,
            children: [yearNode],
          });
        } else {
          acc[nationIndex].children.push(yearNode);
        }

        return acc;
      }, []),
    };

    res.status(200).json({
      success: true,
      data: treeData,
    });
  }
);

export default {
  fetchFromDataUSA,
  getAllPopulationData,
  getDirectFromAPI,
  getByYearRange,
  getStatistics,
  getTreeData,
};
