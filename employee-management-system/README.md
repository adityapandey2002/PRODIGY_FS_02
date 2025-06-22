# Employee Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-green.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?logo=react&logoColor=%2361DAFB)

A modern, full-stack employee management system built with the MERN stack.

[Features](#features) •
[Architecture](#system-architecture) •
[Quick Start](#quick-start) •
[Screenshots](#screenshots)

</div>

## 🎯 Overview

The Employee Management System is a comprehensive solution for managing employee data, attendance, and organizational structure. It provides a user-friendly interface for HR personnel and administrators to manage employee information efficiently.

## ✨ Features

### 🔐 User Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control
- Password recovery system
- Session management

### 👥 Employee Management
- Automated employee ID generation
- Comprehensive employee profiles
- Document management
- Emergency contact information

### 📊 Analytics & Reporting
- Department-wise statistics
- Employee status tracking
- Salary distribution analysis
- Custom report generation

### 🛠 Advanced Features
- Real-time search and filtering
- Bulk data import/export
- Audit logging
- Responsive design

## 🏗 System Architecture

### Component Structure
```mermaid
graph TD
    A[Employee Management System] --> B[Frontend - React]
    A --> C[Backend - Node.js/Express]
    A --> D[Database - MongoDB]
    
    B --> B1[Components]
    B --> B2[Context API]
    B --> B3[Services]
    B --> B4[Hooks]
    
    C --> C1[Routes]
    C --> C2[Controllers]
    C --> C3[Models]
    C --> C4[Middleware]
```

### Data Flow
```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Middleware
    participant B as Backend API
    participant D as Database

    U->>F: Login/Access
    F->>B: Auth Request
    B->>D: Validate
    D->>B: User Data
    B->>F: JWT Token
    F->>U: Access Granted

    U->>F: CRUD Operation
    F->>A: Request + Token
    A->>B: Validated Request
    B->>D: Database Operation
    D->>B: Response
    B->>F: Updated Data
    F->>U: UI Update
```

### Database Schema
```mermaid
erDiagram
    EMPLOYEE ||--o{ DEPARTMENT : belongs_to
    EMPLOYEE {
        string employeeId
        string firstName
        string lastName
        string email
        string phone
        string department
        number salary
        date hireDate
        string status
    }
    DEPARTMENT {
        string name
        string description
        string manager
    }
    USER ||--o{ EMPLOYEE : manages
    USER {
        string name
        string email
        string role
        string password
    }
```

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 14.0.0
- MongoDB ≥ 4.4
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd employee-management-system
```

2. **Set up the backend**
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
npm run dev
```

3. **Set up the frontend**
```bash
cd frontend
npm install
npm start
```

## 📚 Detailed Documentation

### Directory Structure
```
employee-management-system/
├── backend/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── server.js       # Server entry point
├── frontend/
│   ├── public/         # Static files
│   └── src/
│       ├── components/ # React components
│       ├── context/    # Context providers
│       ├── hooks/      # Custom hooks
│       ├── pages/      # Page components
│       ├── services/   # API services
│       └── styles/     # Global styles
└── docs/              # Documentation
```

### Key Technologies

#### Backend
- **Express.js**: Web framework
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication
- **Multer**: File uploads
- **Winston**: Logging

#### Frontend
- **React**: UI library
- **React Router**: Navigation
- **React Hook Form**: Forms
- **Styled Components**: Styling
- **Axios**: HTTP client

## 🔗 API Reference

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API documentation.

## 💻 Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Code Style
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks

## 🌐 Deployment

### Backend Deployment
1. Set up environment variables
2. Configure MongoDB connection
3. Set up Node.js environment
4. Deploy using PM2 or similar

### Frontend Deployment
1. Build the React application
2. Configure environment variables
3. Deploy to hosting service

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- MongoDB for the database
- Express.js community
- React.js team
- Node.js community
- All contributors

## 📞 Support

For support, email support@example.com or join our Slack channel.

## 📸 Application Showcase

<div align="center">

### 📊 Dashboard & Analytics
<img src="./screenshots/EMS-dashboard.jpg" width="100%" alt="Dashboard"/>

*Comprehensive dashboard displaying real-time employee metrics, department statistics, and key performance indicators*

### 👥 Employee Management Interface

<table>
<tr>
    <td width="50%">
        <img src="./screenshots/EMS-employee-page.jpg" width="100%" alt="Employee List"/>
        <p align="center"><em>Employee Directory with Advanced Filtering</em></p>
    </td>
    <td width="50%">
        <img src="./screenshots/EMS-add-employee-page.jpg" width="100%" alt="Add Employee"/>
        <p align="center"><em>Intuitive Employee Registration Form</em></p>
    </td>
</tr>
</table>

### 👤 Profile Management & Search

<table>
<tr>
    <td width="50%">
        <img src="./screenshots/EMS-profile-page.jpg" width="100%" alt="Employee Profile"/>
        <p align="center"><em>Detailed Employee Profile Dashboard</em></p>
    </td>
    <td width="50%">
        <img src="./screenshots/EMS-searching-a-employee.jpg" width="100%" alt="Search Feature"/>
        <p align="center"><em>Smart Search with Real-time Results</em></p>
    </td>
</tr>
</table>

### 🔐 Secure Authentication System

<table>
<tr>
    <td width="50%">
        <img src="./screenshots/EMS-login.jpg" width="100%" alt="Login Page"/>
        <p align="center"><em>Modern Authentication Interface</em></p>
    </td>
    <td width="50%">
        <img src="./screenshots/EMS-login-successfull-page.jpg" width="100%" alt="Login Success"/>
        <p align="center"><em>Secure Login Confirmation</em></p>
    </td>
</tr>
</table>

### 📱 Responsive Design
*The application is fully responsive and works seamlessly across desktop, tablet, and mobile devices.*

### 🔍 Key Features Demonstrated
- Real-time Dashboard Analytics
- Intuitive Employee Management
- Advanced Search Capabilities
- Secure Authentication System
- Professional User Interface
- Role-based Access Control
- Data Visualization
- Responsive Design

</div> 