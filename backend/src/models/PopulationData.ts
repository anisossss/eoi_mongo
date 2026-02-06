/**
 * CSIR EOI 8119/06/01/2026 - Population Data Model
 * MongoDB schema for storing DataUSA population data
 * 
 * Demonstrates proficiency in:
 * - MongoDB/NoSQL database design
 * - Data modeling
 * - Mongoose schemas
 */

import mongoose, { Document, Schema } from 'mongoose';

// Population data interface
export interface IPopulationData extends Document {
  _id: mongoose.Types.ObjectId;
  idNation: string;
  nation: string;
  idYear: number;
  year: number;
  population: number;
  slugNation: string;
  source: string;
  fetchedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Population data schema
const populationDataSchema = new Schema<IPopulationData>(
  {
    idNation: {
      type: String,
      required: [true, 'Nation ID is required'],
      index: true,
    },
    nation: {
      type: String,
      required: [true, 'Nation name is required'],
      trim: true,
    },
    idYear: {
      type: Number,
      required: [true, 'Year ID is required'],
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      index: true,
    },
    population: {
      type: Number,
      required: [true, 'Population is required'],
      min: [0, 'Population cannot be negative'],
    },
    slugNation: {
      type: String,
      required: [true, 'Nation slug is required'],
      lowercase: true,
    },
    source: {
      type: String,
      default: 'DataUSA API',
    },
    fetchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index for unique nation-year combinations
populationDataSchema.index({ idNation: 1, year: 1 }, { unique: true });

// Index for sorting and querying
populationDataSchema.index({ year: -1 });
populationDataSchema.index({ population: -1 });
populationDataSchema.index({ nation: 1 });

// Virtual for formatted population
populationDataSchema.virtual('formattedPopulation').get(function (this: IPopulationData) {
  return this.population.toLocaleString('en-US');
});

// Virtual for population in millions
populationDataSchema.virtual('populationInMillions').get(function (this: IPopulationData) {
  return (this.population / 1000000).toFixed(2);
});

// Static method to get latest data
populationDataSchema.statics.getLatest = function () {
  return this.find().sort({ year: -1 }).limit(10);
};

// Static method to get by year range
populationDataSchema.statics.getByYearRange = function (startYear: number, endYear: number) {
  return this.find({
    year: { $gte: startYear, $lte: endYear },
  }).sort({ year: -1 });
};

const PopulationData = mongoose.model<IPopulationData>('PopulationData', populationDataSchema);

export default PopulationData;
