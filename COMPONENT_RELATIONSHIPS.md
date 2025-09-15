# Market Pulse - Component Relationships & Data Flow Diagrams

## 🔄 System Interaction Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACE LAYER                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        STATE MANAGEMENT LAYER                              │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐                    │
│  │  AuthStore  │    │WatchlistStore│   │  UI State   │                    │
│  │  (Zustand)  │    │  (Zustand)  │   │  (React)    │                    │
│  └─────────────┘    └─────────────┘    └─────────────┘                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          API SERVICE LAYER                                │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │ UserService │    │ArticleService│   │AnalysisService│  │MarketDataService│ │
│  │   (Axios)   │    │   (Axios)   │   │   (Axios)   │   │   (Axios)   │ │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND SERVICES LAYER                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🧩 Component Dependency Map

### Frontend Components
```
App.jsx
├── Header.jsx
│   ├── AuthModal.jsx
│   │   └── useAuthStore (Zustand)
│   └── useAuthStore (Zustand)
├── Pages
│   ├── HomePage.jsx
│   ├── MarketsPage.jsx
│   ├── ChartsPage.jsx
│   └── CommunityPage.jsx
└── Footer.jsx
```

### State Management Dependencies
```
useAuthStore (Zustand)
├── userService (API)
├── localStorage
└── React Components
    ├── Header.jsx
    ├── AuthModal.jsx
    └── App.jsx

useWatchlistStore (Zustand)
├── userService (API)
└── React Components
    └── ChartsPage.jsx (future)
```

### API Service Dependencies
```
api.js
├── axios (HTTP client)
├── Backend Services
│   ├── User Service (localhost:8082)
│   ├── Article Service (localhost:8083)
│   └── Analysis Service (localhost:5002)
└── React Components
    ├── AuthModal.jsx
    ├── Header.jsx
    └── Future Components
```

## 🔗 Data Flow Diagrams

### 1. User Authentication Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │    │  Frontend   │    │  Backend    │    │  Database   │
│  Interface  │    │   (React)   │    │ (Spring)    │    │(PostgreSQL) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ 1. Click Login   │                   │                   │
       │─────────────────>│                   │                   │
       │                   │ 2. Show Modal    │                   │
       │                   │                   │                   │
       │ 3. Enter Creds   │                   │                   │
       │─────────────────>│                   │                   │
       │                   │ 4. API Call      │                   │
       │                   │─────────────────>│                   │
       │                   │                   │ 5. Validate User │
       │                   │                   │─────────────────>│
       │                   │                   │ 6. Return User  │
       │                   │                   │<─────────────────│
       │                   │ 7. JWT Token     │                   │
       │                   │<─────────────────│                   │
       │ 8. Success UI     │                   │                   │
       │<─────────────────│                   │                   │
```

### 2. Real-time Sentiment Analysis Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   News      │    │  Analysis   │    │   Redis     │    │  Article    │
│   Input     │    │  Service    │    │  Message    │    │  Storage    │
│  (External) │    │  (Python)   │    │   Broker    │    │ (Spring)    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ 1. News Article   │                   │                   │
       │─────────────────>│                   │                   │
       │                   │ 2. Process Text  │                   │
       │                   │                   │                   │
       │                   │ 3. Sentiment     │                   │
       │                   │    Analysis      │                   │
       │                   │                   │                   │
       │                   │ 4. Publish to    │                   │
       │                   │    Redis         │                   │
       │                   │─────────────────>│                   │
       │                   │                   │ 5. Subscribe &   │
       │                   │                   │    Store         │
       │                   │                   │<─────────────────│
       │                   │                   │                   │
       │                   │ 6. Frontend      │                   │
       │                   │    Polling       │                   │
       │                   │<─────────────────│                   │
```

### 3. Watchlist Management Flow
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │    │  Frontend   │    │  Backend    │    │  Database   │
│  Interface  │    │   (React)   │    │ (Spring)    │    │(PostgreSQL) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ 1. Add Stock      │                   │                   │
       │─────────────────>│                   │                   │
       │                   │ 2. API Call      │                   │
       │                   │─────────────────>│                   │
       │                   │                   │ 3. Save to DB    │
       │                   │                   │─────────────────>│
       │                   │                   │ 4. Confirmation │
       │                   │                   │<─────────────────│
       │                   │ 5. Success       │                   │
       │                   │<─────────────────│                   │
       │ 6. UI Update      │                   │                   │
       │<─────────────────│                   │                   │
```

## 🔄 State Synchronization

### Authentication State Sync
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AUTHENTICATION STATE                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
            ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
            │   Header    │  │  AuthModal  │  │     App     │
            │  Component  │  │ Component   │  │  Component  │
            └─────────────┘  └─────────────┘  └─────────────┘
                    │                │                │
                    └────────────────┼────────────────┘
                                      │
                                      ▼
                              ┌─────────────┐
                              │ AuthStore   │
                              │ (Zustand)   │
                              └─────────────┘
                                      │
                                      ▼
                              ┌─────────────┐
                              │localStorage │
                              │ (Persist)   │
                              └─────────────┘
```

### Real-time Data Sync
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           REAL-TIME DATA FLOW                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
            ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
            │  Analysis   │  │    Redis    │  │  Article    │
            │  Service    │  │   Pub/Sub   │  │  Storage    │
            └─────────────┘  └─────────────┘  └─────────────┘
                    │                │                │
                    └────────────────┼────────────────┘
                                      │
                                      ▼
                              ┌─────────────┐
                              │ Frontend    │
                              │ Polling     │
                              └─────────────┘
                                      │
                                      ▼
                              ┌─────────────┐
                              │ UI Update   │
                              │ (React)     │
                              └─────────────┘
```

## 🏗️ Service Communication Patterns

### 1. Synchronous Communication
- **User Authentication**: Frontend → User Service → Database → Response
- **Watchlist Operations**: Frontend → User Service → Database → Response
- **Profile Updates**: Frontend → User Service → Database → Response

### 2. Asynchronous Communication
- **News Processing**: External → Analysis Service → Redis → Article Storage
- **Sentiment Updates**: Analysis Service → Redis → Frontend Polling
- **Real-time Notifications**: Backend → Redis → Frontend Polling

### 3. Event-Driven Communication
- **Article Publication**: Analysis Service publishes to Redis channel
- **Data Updates**: Services subscribe to relevant Redis channels
- **State Changes**: Frontend components react to state updates

## 🔒 Security & Authentication Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Client    │    │   Frontend  │    │   Backend   │    │  Database   │
│  Browser    │    │   (React)   │    │ (Spring)    │    │(PostgreSQL) │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ 1. Initial Load   │                   │                   │
       │─────────────────>│                   │                   │
       │                   │ 2. Check Token   │                   │
       │                   │    (localStorage)│                   │
       │                   │                   │                   │
       │ 3. Token Valid?  │                   │                   │
       │                   │                   │                   │
       │ 4. API Request    │                   │                   │
       │    + Token        │                   │                   │
       │─────────────────>│                   │                   │
       │                   │ 5. Validate JWT  │                   │
       │                   │─────────────────>│                   │
       │                   │                   │ 6. Check User    │
       │                   │                   │─────────────────>│
       │                   │                   │ 7. User Data    │
       │                   │                   │<─────────────────│
       │                   │ 8. Authorized    │                   │
       │                   │<─────────────────│                   │
       │ 9. Protected      │                   │                   │
       │    Content        │                   │                   │
       │<─────────────────│                   │                   │
```

## 📊 Performance Optimization Patterns

### 1. Caching Strategy
- **Frontend**: Component state, API responses
- **Backend**: Database queries, computed results
- **Redis**: Session data, real-time updates

### 2. Lazy Loading
- **Components**: Load on demand
- **Routes**: Code splitting
- **Data**: Pagination, infinite scroll

### 3. Real-time Updates
- **Polling**: Fallback for compatibility
- **WebSockets**: Future implementation
- **Server-Sent Events**: News updates

This component relationship structure ensures a clean, maintainable, and scalable architecture where each component has a clear responsibility and well-defined interfaces.

