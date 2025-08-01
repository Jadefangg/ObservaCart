# 🛒 Observ-a-Cart

> **Modern E-commerce Platform with Full-Stack Observability**

Welcome to ObservaCart!
ObservaCart is a production-ready e-commerce platform built with microservices architecture and comprehensive observability. Featuring a modern React frontend with purple/green theming, microservices backend, and complete monitoring stack with OpenTelemetry, Prometheus, Grafana, and Jaeger.

## 🌟 Features

### 🎨 **Modern Frontend Experience**
- **React 18.2.0** with modern hooks and context
- **Webflow-inspired Design** with purple gradients and green accents
- **Fully Responsive** mobile-first design
- **Glassmorphism Navigation** with smooth animations
- **Product Catalog** with search and filtering
- **Shopping Cart** functionality
- **User Authentication** system
- **Order Management** interface

### 🏗️ **Microservices Architecture**
- **Product Service** - Catalog and inventory management
- **User Service** - Authentication and user profiles
- **Order Service** - Order processing and history
- **Frontend Service** - React SPA with API integration

### 📊 **Comprehensive Observability**
- **OpenTelemetry Collector** - Unified telemetry data collection
- **Prometheus** - Metrics monitoring and alerting
- **Grafana** - Rich dashboards and visualization
- **Jaeger** - Distributed tracing and request flow
- **Loki** - Centralized log aggregation
- **Promtail** - Automatic log collection

### 🎯 **Production-Ready Features**
- **Docker Compose** orchestration
- **Mock Data Integration** for standalone development
- **Error Handling** and graceful fallbacks
- **Loading States** and user feedback
- **Responsive Grid System** 
- **Modern CSS Architecture** with custom properties
- **Dark Theme** optimization

## 🏃‍♂️ Quick Start

### Prerequisites
- **Docker** and **Docker Compose**
- **Node.js 16+** (for frontend development)
- **Git**

### 🚀 Launch the Full Stack

```bash
# Clone the repository
git clone https://github.com/Jadefangg/ObservaCart.git
cd ObservaCart/observacart

# Start the observability stack
docker-compose up -d

# Start the frontend (in a separate terminal)
cd frontend
npm install
npm start
```

### 🌐 Access the Application

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3001 | React e-commerce application |
| **Grafana** | http://localhost:3000 | Monitoring dashboards |
| **Prometheus** | http://localhost:9090 | Metrics and alerting |
| **Jaeger** | http://localhost:16686 | Distributed tracing |

## 🏗️ Architecture

### System Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Product Service│    │   User Service  │
│   (Port 3001)   │    │   (Port 5001)   │    │   (Port 5002)   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴───────────────┐
                    │     Order Service           │
                    │     (Port 5003)             │
                    └─────────────┬───────────────┘
                                  │
            ┌─────────────────────┼─────────────────────┐
            │                     │                     │
    ┌───────▼───────┐    ┌───────▼───────┐    ┌───────▼───────┐
    │   Prometheus   │    │    Grafana    │    │    Jaeger     │
    │   (Port 9090)  │    │  (Port 3000)  │    │ (Port 16686)  │
    └────────────────┘    └───────────────┘    └───────────────┘
                                  │
                         ┌────────▼────────┐
                         │   Loki + OTEL   │
                         │  (Port 3100)    │
                         └─────────────────┘
```

### Technology Stack

#### Frontend
- **React 18.2.0** - Modern UI library with hooks
- **React Router 6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Bootstrap 5.3** - CSS framework (customized)
- **Custom CSS** - Modern design system with variables
- **Framer Motion** - Smooth animations

#### Backend (Microservices)
- **Python/Flask** - Lightweight web framework
- **OpenTelemetry** - Observability instrumentation
- **Docker** - Containerization
- **RESTful APIs** - Service communication

#### Observability Stack
- **OpenTelemetry Collector 0.99.0** - Telemetry pipeline
- **Prometheus 2.52.0** - Metrics monitoring
- **Grafana 11.1.0** - Data visualization
- **Jaeger 1.56** - Distributed tracing
- **Loki 3.0.0** - Log aggregation
- **Promtail 3.0.0** - Log collection agent

## 📁 Project Structure

```
observacart/
├── 📁 frontend/                 # React application
│   ├── 📁 public/               # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable UI components
│   │   ├── 📁 pages/           # Application pages
│   │   ├── 📁 services/        # API service layer
│   │   ├── 📁 styles/          # CSS and styling
│   │   └── App.js              # Main application component
│   └── package.json            # Frontend dependencies
├── 📁 product-service/         # Product microservice
├── 📁 user-service/            # User management microservice
├── 📁 order-service/           # Order processing microservice
├── 📁 grafana/                 # Grafana configuration
│   ├── 📁 dashboards/          # Pre-built dashboards
│   └── 📁 provisioning/        # Data source configuration
├── 📁 prometheus/              # Prometheus configuration
├── 📁 loki/                    # Loki configuration
├── 📄 docker-compose.yaml      # Service orchestration
├── 📄 opentelemetry-collector-config.yaml
└── 📄 README.md               # This file
```

## 🎨 UI/UX Features

### Design System
- **Purple Gradient Theme** with green accent colors
- **Modern Button System** with hover effects and animations
- **Glassmorphism Navigation** with backdrop blur
- **Responsive Grid Layout** (1-4 columns adaptive)
- **Custom CSS Properties** for consistent theming
- **Dark Mode Optimized** for better user experience

### Components
- **Hero Section** with animated background patterns
- **Product Cards** with hover transformations
- **Loading Spinners** with smooth animations
- **Modern Forms** with focus states
- **Badge System** for status indicators
- **Navigation** with active state indicators

### Responsive Breakpoints
- **Mobile**: < 480px (1 column)
- **Tablet**: 480px - 768px (2 columns)
- **Desktop**: 768px - 1024px (3 columns)
- **Large**: > 1024px (4 columns)

## 📊 Observability Features

### Metrics (Prometheus)
- **Application Performance** monitoring
- **Business Metrics** tracking
- **Resource Utilization** alerts
- **Custom Metrics** via OpenTelemetry

### Tracing (Jaeger)
- **Request Flow** visualization
- **Service Dependencies** mapping
- **Performance Bottlenecks** identification
- **Error Tracking** across services

### Logging (Loki)
- **Centralized Log Collection** from all containers
- **Structured Logging** with labels
- **Log Correlation** with traces and metrics
- **Real-time Log Streaming**

### Dashboards (Grafana)
- **System Overview** dashboard
- **Service Health** monitoring
- **Business Metrics** visualization
- **Alert Management** and notifications

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm install           # Install dependencies
npm start            # Start development server
npm run build        # Build for production
npm test             # Run test suite
```

### Backend Services
```bash
# Start individual services (when implemented)
cd product-service
python app.py

cd user-service
python app.py

cd order-service
python app.py
```

### Observability Stack
```bash
# Start monitoring services
docker-compose up grafana prometheus jaeger loki

# View logs
docker-compose logs -f [service-name]

# Stop all services
docker-compose down
```

## 🌐 API Documentation

### Product Service (Port 5001)
```bash
GET    /products           # List all products
GET    /products/:id       # Get product details
POST   /products           # Create new product
PUT    /products/:id       # Update product
DELETE /products/:id       # Delete product
```

### User Service (Port 5002)
```bash
POST   /auth/login         # User authentication
POST   /auth/register      # User registration
GET    /users/profile      # Get user profile
PUT    /users/profile      # Update user profile
```

### Order Service (Port 5003)
```bash
GET    /orders             # List user orders
POST   /orders             # Create new order
GET    /orders/:id         # Get order details
PUT    /orders/:id         # Update order status
```

## 🔍 Monitoring & Alerting

### Key Metrics to Monitor
- **Response Time** - API endpoint performance
- **Error Rate** - Application error percentage
- **Throughput** - Requests per second
- **User Activity** - Page views and interactions
- **Business KPIs** - Orders, revenue, conversions

### Pre-configured Alerts
- High error rate (>5%)
- Slow response time (>2s)
- Service unavailability
- Resource exhaustion

## 🚀 Deployment

### Production Checklist
- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Database migrations completed
- [ ] Monitoring alerts enabled
- [ ] Backup strategy implemented
- [ ] Load balancer configured

### Docker Production Build
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Maintain responsive design principles
- Add proper error handling and loading states
- Include tests for new features
- Update documentation for API changes

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenTelemetry Community** for observability standards
- **Grafana Labs** for monitoring tools
- **React Team** for the amazing framework
- **Docker** for containerization platform


---

<div align="center">

**Built with ❤️ **

[🌟 Star](https://github.com/Jadefangg/ObservaCart) • [🐛 Report Bug](https://github.com/Jadefangg/ObservaCart/issues) • [✨ Request Feature](https://github.com/Jadefangg/ObservaCart/issues)

</div>
