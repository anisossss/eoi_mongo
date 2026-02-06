/**
 * CSIR EOI 8119/06/01/2026 - MongoDB Initialization Script
 * Initializes the database with collections and sample data
 * 
 * This script runs when the MongoDB container is first created
 */

// Switch to the application database
db = db.getSiblingDB('csir_eoi_db');

// Create collections with validation
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'password', 'firstName', 'lastName'],
      properties: {
        email: {
          bsonType: 'string',
          description: 'Email address - required and must be a string',
        },
        password: {
          bsonType: 'string',
          description: 'Hashed password - required',
        },
        firstName: {
          bsonType: 'string',
          description: 'First name - required',
        },
        lastName: {
          bsonType: 'string',
          description: 'Last name - required',
        },
        role: {
          enum: ['user', 'admin', 'moderator'],
          description: 'User role',
        },
        isActive: {
          bsonType: 'bool',
          description: 'Account status',
        },
      },
    },
  },
});

db.createCollection('populationdatas', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['idNation', 'nation', 'year', 'population'],
      properties: {
        idNation: {
          bsonType: 'string',
          description: 'Nation ID - required',
        },
        nation: {
          bsonType: 'string',
          description: 'Nation name - required',
        },
        year: {
          bsonType: 'int',
          description: 'Year - required',
        },
        population: {
          bsonType: 'long',
          description: 'Population count - required',
        },
      },
    },
  },
});

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ isActive: 1 });
db.users.createIndex({ createdAt: -1 });

db.populationdatas.createIndex({ idNation: 1, year: 1 }, { unique: true });
db.populationdatas.createIndex({ year: -1 });
db.populationdatas.createIndex({ population: -1 });
db.populationdatas.createIndex({ nation: 1 });

// Insert sample population data (US Census data from DataUSA API)
db.populationdatas.insertMany([
  {
    idNation: '01000US',
    nation: 'United States',
    idYear: 2022,
    year: NumberInt(2022),
    population: NumberLong(333287557),
    slugNation: 'united-states',
    source: 'DataUSA API - Seed Data',
    fetchedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    idNation: '01000US',
    nation: 'United States',
    idYear: 2021,
    year: NumberInt(2021),
    population: NumberLong(329725481),
    slugNation: 'united-states',
    source: 'DataUSA API - Seed Data',
    fetchedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    idNation: '01000US',
    nation: 'United States',
    idYear: 2020,
    year: NumberInt(2020),
    population: NumberLong(326569308),
    slugNation: 'united-states',
    source: 'DataUSA API - Seed Data',
    fetchedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    idNation: '01000US',
    nation: 'United States',
    idYear: 2019,
    year: NumberInt(2019),
    population: NumberLong(324697795),
    slugNation: 'united-states',
    source: 'DataUSA API - Seed Data',
    fetchedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    idNation: '01000US',
    nation: 'United States',
    idYear: 2018,
    year: NumberInt(2018),
    population: NumberLong(322903030),
    slugNation: 'united-states',
    source: 'DataUSA API - Seed Data',
    fetchedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// Create a default admin user (password: Admin@123456)
// Note: In production, this should be changed immediately
db.users.insertOne({
  email: 'admin@csir.co.za',
  // This is a bcrypt hash of 'Admin@123456' - DO NOT use in production without changing
  password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.IpAbHAGqj3GC.K',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
});

print('CSIR EOI Database initialized successfully!');
print('Collections created: users, populationdatas');
print('Indexes created for optimal performance');
print('Sample data inserted');
