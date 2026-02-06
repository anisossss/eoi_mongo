# CSIR EOI 8119/06/01/2026 - Software Development Services

<div align="center">

![CSIR Logo](https://img.shields.io/badge/CSIR-EOI_8119-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**A modern, full-stack web application demonstrating proficiency in software development**

[Features](#-features) •
[Tech Stack](#-technology-stack) •
[Quick Start](#-quick-start) •
[Docker](#-docker-deployment) •
[API Documentation](#-api-documentation) •
[Architecture](#-architecture)

</div>

---

## 📋 Project Overview

This project is developed in response to **CSIR EOI No. 8119/06/01/2026** - Expression of Interest for the provision of software development services to the CSIR for a period of three years.

### Task Completion

The application fulfills all task requirements as specified in Annexure B:

| Requirement | Status | Implementation |
|------------|--------|----------------|
| Single page web application | ✅ | Next.js SPA with React |
| Modern look and feel | ✅ | Tailwind CSS with custom design system |
| Modern web framework | ✅ | Next.js 14, React 18, TypeScript |
| Interactive page elements | ✅ | Buttons, toggles, search, pagination |
| REST API integration | ✅ | DataUSA API endpoint consumption |
| Grid view | ✅ | Sortable, searchable data table |
| Interactive tree view | ✅ | Collapsible hierarchical structure |
| Docker containerization | ✅ | Multi-stage Docker builds |
| Docker Hub availability | ✅ | Ready for `docker push` |

### 🐳 Docker Pull Command

```bash
# Pull and run the application
docker pull csir-eoi/population-app:latest
docker-compose up -d
```

---

## ✨ Features

### Frontend Features
- **Modern UI/UX**: Professional, responsive design with Tailwind CSS
- **Multiple Data Views**: Grid, Tree, and Chart visualizations
- **Interactive Components**: Sortable tables, collapsible trees, animated transitions
- **Real-time Data Fetching**: Integration with DataUSA REST API
- **TypeScript**: Full type safety across the application
- **Performance Optimized**: Next.js App Router with Server Components

### Backend Features
- **RESTful API**: Express.js with structured routing
- **JWT Authentication**: Secure user authentication and authorization
- **MongoDB Integration**: NoSQL database with Mongoose ODM
- **Input Validation**: express-validator with sanitization
- **Security**: Helmet, CORS, rate limiting, HPP protection
- **Logging**: Winston logger with file rotation

### DevOps Features
- **Docker**: Multi-stage builds for optimized images
- **Docker Compose**: Full stack orchestration
- **Health Checks**: Container health monitoring
- **Environment Configuration**: Flexible .env configuration

---

## 🛠 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.0.4 | React framework |
| React | 18.2.0 | UI library |
| TypeScript | 5.3.3 | Type safety |
| Tailwind CSS | 3.4.0 | Styling |
| Framer Motion | 10.16.16 | Animations |
| React Query | 5.14.2 | Data fetching |
| Recharts | 2.10.3 | Data visualization |
| Axios | 1.6.2 | HTTP client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.x | Runtime |
| Express.js | 4.18.2 | Web framework |
| TypeScript | 5.3.3 | Type safety |
| MongoDB | 7.0 | Database |
| Mongoose | 8.0.3 | ODM |
| JWT | 9.0.2 | Authentication |
| Winston | 3.11.0 | Logging |

### DevOps
| Technology | Version | Purpose |
|------------|---------|---------|
| Docker | 24.x | Containerization |
| Docker Compose | 2.x | Orchestration |
| Node Alpine | 20 | Base image |
| MongoDB | 7.0 | Database container |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Docker & Docker Compose (for containerized deployment)
- MongoDB (for local development)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/your-org/csir-eoi-8119.git
cd csir-eoi-8119
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

3. **Configure environment**
```bash
# Copy example environment file
cp .env.example .env

# Edit environment variables as needed
```

4. **Start development servers**
```bash
# Start all services (requires MongoDB running locally)
npm run dev

# Or start individually
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:5000
```

---

## 🐳 Docker Deployment

### Quick Deploy with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Services

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 5000 | http://localhost:5000 |
| MongoDB | 27017 | mongodb://localhost:27017 |

### Build Individual Images

```bash
# Build frontend
docker build -t csir-frontend:latest ./frontend

# Build backend
docker build -t csir-backend:latest ./backend
```

### Push to Docker Hub

```bash
# Tag images
docker tag csir-frontend:latest your-dockerhub-username/csir-eoi-frontend:latest
docker tag csir-backend:latest your-dockerhub-username/csir-eoi-backend:latest

# Push to Docker Hub
docker push your-dockerhub-username/csir-eoi-frontend:latest
docker push your-dockerhub-username/csir-eoi-backend:latest
```

---

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
```http
GET /api/health
```

### Population Data Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/population` | Get all population data (paginated) |
| GET | `/api/population/fetch` | Fetch from DataUSA API and cache |
| GET | `/api/population/direct` | Get directly from DataUSA API |
| GET | `/api/population/tree` | Get data in tree structure |
| GET | `/api/population/stats` | Get population statistics |
| GET | `/api/population/range` | Get data by year range |

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/update-profile` | Update profile |
| PUT | `/api/auth/change-password` | Change password |
| POST | `/api/auth/logout` | Logout user |

### Example API Calls

```bash
# Get population data
curl http://localhost:5000/api/population

# Fetch from DataUSA API
curl http://localhost:5000/api/population/fetch

# Get tree structure
curl http://localhost:5000/api/population/tree

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Password123","firstName":"John","lastName":"Doe"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Password123"}'
```

---

## 🏗 Architecture

### Project Structure

```
csir-eoi-8119/
├── frontend/                    # Next.js Frontend Application
│   ├── src/
│   │   ├── app/                # Next.js App Router pages
│   │   ├── components/         # React components
│   │   │   ├── layout/         # Layout components (Header, Footer)
│   │   │   ├── ui/             # UI components (Cards, Buttons)
│   │   │   └── views/          # Data views (Grid, Tree, Chart)
│   │   ├── hooks/              # Custom React hooks
│   │   ├── services/           # API services
│   │   ├── types/              # TypeScript definitions
│   │   └── utils/              # Utility functions
│   ├── public/                 # Static assets
│   ├── Dockerfile
│   └── package.json
│
├── backend/                    # Node.js/Express Backend API
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Express middleware
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Utility functions
│   │   └── server.ts          # Application entry point
│   ├── scripts/               # Database scripts
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml         # Docker orchestration
├── .env.example              # Environment template
└── README.md                 # Documentation
```

### Data Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   DataUSA API   │────▶│  Backend API    │────▶│    MongoDB      │
│                 │     │  (Express.js)   │     │                 │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │                 │
                        │    Frontend     │
                        │   (Next.js)     │
                        │                 │
                        └─────────────────┘
```

---

## 🔒 Security Features

- **HTTPS Ready**: Configured for production SSL/TLS
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Protection against brute force
- **CORS**: Configured cross-origin policies
- **Helmet**: Security HTTP headers
- **Input Sanitization**: XSS and injection protection
- **Password Hashing**: bcrypt with salt rounds
- **Non-root Docker**: Containers run as non-root user

---

## 📊 Technical Evaluation Criteria Compliance

| Criterion | Weight | Evidence |
|-----------|--------|----------|
| Python, Angular, HTML5, JavaScript, CSS, Node.js | 15% | Node.js backend, React/HTML5 frontend, CSS with Tailwind |
| Docker, PostgreSQL, Firebase | 15% | Docker containerization, MongoDB (NoSQL alternative) |
| SQL and NoSQL databases | 10% | MongoDB with Mongoose ODM |
| Mobile deployment experience | 10% | Responsive design, PWA-ready |
| Cloud services and VMs | 15% | Docker containerization, cloud-ready architecture |
| Software Design modelling | 10% | Modular architecture, component design |
| Background processing | 10% | Async operations, queue-ready architecture |
| Task completion (Web App) | 15% | Full implementation as specified |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

For inquiries regarding this EOI submission:

- **Email**: tender@csir.co.za
- **EOI Reference**: 8119/06/01/2026

---

<div align="center">

**Built with ❤️ for CSIR EOI 8119/06/01/2026**

</div>
