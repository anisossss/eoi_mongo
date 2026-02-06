# Docker Hub Deployment Instructions

## CSIR EOI 8119/06/01/2026 - Pull Request Command

This document provides the **PULL REQUEST COMMAND** as required by the EOI task specification.

---

## Quick Start - Pull Command

```bash
# Pull the application from Docker Hub
docker pull csireoi8119/population-app:latest

# Or pull individual services
docker pull csireoi8119/population-frontend:latest
docker pull csireoi8119/population-backend:latest
```

---

## Running the Application

### Option 1: Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/csir-eoi/8119-software-development.git
cd 8119-software-development

# Start all services
docker-compose up -d

# View the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

### Option 2: Running Individual Containers

```bash
# Create a network
docker network create csir-network

# Run MongoDB
docker run -d \
  --name csir-mongodb \
  --network csir-network \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=csir_secure_password_2026 \
  -p 27017:27017 \
  mongo:7.0

# Run Backend
docker run -d \
  --name csir-backend \
  --network csir-network \
  -e MONGODB_URI=mongodb://admin:csir_secure_password_2026@csir-mongodb:27017/csir_eoi_db?authSource=admin \
  -e JWT_SECRET=csir_jwt_secret_key_2026 \
  -p 5000:5000 \
  csireoi8119/population-backend:latest

# Run Frontend
docker run -d \
  --name csir-frontend \
  --network csir-network \
  -e NEXT_PUBLIC_API_URL=http://localhost:5000/api \
  -p 3000:3000 \
  csireoi8119/population-frontend:latest
```

---

## Building and Pushing to Docker Hub

### Prerequisites
1. Docker Hub account
2. Docker installed and logged in

### Build Commands

```bash
# Build images
docker-compose build

# Or build individually
docker build -t csireoi8119/population-frontend:latest ./frontend
docker build -t csireoi8119/population-backend:latest ./backend
```

### Push Commands

```bash
# Login to Docker Hub
docker login

# Push images
docker push csireoi8119/population-frontend:latest
docker push csireoi8119/population-backend:latest
```

---

## Environment Variables

### Frontend
| Variable | Default | Description |
|----------|---------|-------------|
| NEXT_PUBLIC_API_URL | http://localhost:5000/api | Backend API URL |
| NEXT_PUBLIC_DATAUSA_API | https://datausa.io/api/data | DataUSA API URL |

### Backend
| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Server port |
| MONGODB_URI | - | MongoDB connection string |
| JWT_SECRET | - | JWT signing key |
| CORS_ORIGIN | http://localhost:3000 | Allowed CORS origin |

---

## Health Checks

```bash
# Check frontend health
curl http://localhost:3000

# Check backend health
curl http://localhost:5000/api/health
```

---

## Task Compliance

This Docker deployment fulfills the EOI task requirements:

- ✅ Application containerized with Docker
- ✅ Runs in Docker container
- ✅ Available in hub.docker.com registry
- ✅ PULL REQUEST COMMAND provided

---

## Support

For questions regarding this submission:
- **Email**: tender@csir.co.za
- **EOI Reference**: 8119/06/01/2026

---

**CSIR EOI 8119/06/01/2026 - Software Development Services**
