# EIO1 - Architecture Documentation

## CSIR EOI 8119 - Population Data Visualization

### System Architecture

```mermaid
flowchart TB
    subgraph client [Client Layer]
        Browser[Web Browser]
        NextJS[Next.js Frontend]
    end

    subgraph api [API Layer]
        Express[Express.js Server]
        Auth[JWT Authentication]
        Routes[API Routes]
    end

    subgraph data [Data Layer]
        MongoDB[(MongoDB)]
        DataUSA[DataUSA API]
    end

    subgraph infra [Infrastructure]
        Docker[Docker Containers]
        DockerHub[Docker Hub Registry]
    end

    Browser --> NextJS
    NextJS --> Express
    Express --> Auth
    Auth --> Routes
    Routes --> MongoDB
    Routes --> DataUSA
    Docker --> DockerHub
```

### Component Diagram

```mermaid
flowchart LR
    subgraph frontend [Frontend Components]
        App[App Layout]
        Header[Header]
        GridView[Grid View]
        TreeView[Tree View]
        ChartView[Chart View]
    end

    subgraph backend [Backend Services]
        Server[Express Server]
        AuthController[Auth Controller]
        PopulationController[Population Controller]
        UserModel[User Model]
        PopulationModel[Population Model]
    end

    subgraph external [External Services]
        DataAPI[DataUSA API]
        MongoDBService[MongoDB]
    end

    App --> Header
    App --> GridView
    App --> TreeView
    App --> ChartView

    GridView --> Server
    TreeView --> Server
    ChartView --> Server

    Server --> AuthController
    Server --> PopulationController

    AuthController --> UserModel
    PopulationController --> PopulationModel
    PopulationController --> DataAPI

    UserModel --> MongoDBService
    PopulationModel --> MongoDBService
```

### Data Flow Sequence

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant MongoDB
    participant DataUSA

    User->>Frontend: Request population data
    Frontend->>Backend: GET /api/population/fetch
    Backend->>DataUSA: Fetch population data
    DataUSA-->>Backend: Return JSON data
    Backend->>MongoDB: Cache data
    MongoDB-->>Backend: Confirm saved
    Backend-->>Frontend: Return processed data
    Frontend->>Frontend: Render Grid/Tree/Chart
    Frontend-->>User: Display visualization
```

### Technology Stack

| Layer    | Technology   | Purpose          |
| -------- | ------------ | ---------------- |
| Frontend | Next.js 14   | React framework  |
| Frontend | React 18     | UI library       |
| Frontend | TypeScript   | Type safety      |
| Frontend | Tailwind CSS | Styling          |
| Backend  | Node.js      | Runtime          |
| Backend  | Express.js   | Web framework    |
| Backend  | Mongoose     | ODM              |
| Database | MongoDB 7    | NoSQL database   |
| Auth     | JWT          | Authentication   |
| DevOps   | Docker       | Containerization |

### Deployment Architecture

```mermaid
flowchart TB
    subgraph dockerCompose [Docker Compose Stack]
        FE[Frontend Container<br/>Port 3000]
        BE[Backend Container<br/>Port 5000]
        DB[MongoDB Container<br/>Port 27017]
    end

    subgraph network [Docker Network]
        csirNetwork[csir-network]
    end

    subgraph volumes [Persistent Storage]
        mongoData[mongodb_data]
    end

    FE --> csirNetwork
    BE --> csirNetwork
    DB --> csirNetwork
    DB --> mongoData

    User[User] --> FE
    FE --> BE
    BE --> DB
```
