# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "employee"
}
```

**Success Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "5f7d3a...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "employee"
  }
}
```

### Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "5f7d3a...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "employee"
  }
}
```

## Employee Endpoints

### Get All Employees
```http
GET /employees
```

**Query Parameters:**
- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of records per page (default: 10)
- `sort` (optional): Sort field (e.g., "-createdAt" for descending order)
- `select` (optional): Fields to select (comma-separated)

**Success Response:**
```json
{
  "success": true,
  "count": 50,
  "pagination": {
    "next": { "page": 2, "limit": 10 },
    "prev": null
  },
  "data": [
    {
      "id": "5f7d3a...",
      "employeeId": "EMP0001",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "department": "IT",
      "position": "Software Developer",
      "status": "active"
    }
    // ... more employees
  ]
}
```

### Create Employee
```http
POST /employees
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "department": "IT",
  "position": "Software Developer",
  "salary": 75000,
  "hireDate": "2023-01-15",
  "status": "active",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "emergencyContact": {
    "name": "Jane Doe",
    "relationship": "Spouse",
    "phone": "+1234567891"
  }
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": "5f7d3a...",
    "employeeId": "EMP0001",
    // ... rest of employee data
  }
}
```

### Get Employee Statistics
```http
GET /employees/stats
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "departmentStats": [
      {
        "_id": "IT",
        "count": 20,
        "avgSalary": 85000,
        "totalSalary": 1700000
      }
      // ... other departments
    ],
    "statusStats": [
      {
        "_id": "active",
        "count": 45
      }
      // ... other statuses
    ],
    "totalEmployees": 50,
    "activeEmployees": 45
  }
}
```

## Error Responses

### Validation Error
```json
{
  "success": false,
  "error": "ValidationError",
  "message": "Please provide all required fields",
  "errors": {
    "firstName": "First name is required",
    "email": "Please add a valid email"
  }
}
```

### Authentication Error
```json
{
  "success": false,
  "error": "AuthenticationError",
  "message": "Not authorized to access this route"
}
```

## Authentication

All protected routes require a Bearer token in the Authorization header:

```http
Authorization: Bearer <your-token-here>
```

## Rate Limiting

- 100 requests per IP per 10 minutes for public routes
- 300 requests per IP per 10 minutes for authenticated routes

## File Upload

### Upload Employee Photo
```http
PUT /employees/:id/photo
```

**Request:**
- Content-Type: multipart/form-data
- Field name: photo
- Accepted formats: jpg, jpeg, png
- Max file size: 1MB

**Success Response:**
```json
{
  "success": true,
  "data": {
    "photo": "photo_5f7d3a.jpg"
  }
}
``` 