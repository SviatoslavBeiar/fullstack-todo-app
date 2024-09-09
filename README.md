# Todo Application with JWT Authentication

This project is a Todo application built with Spring Boot for the backend and React for the frontend. It includes JWT authentication for secure access and CRUD operations for managing todos.

## Project Structure

### Backend (Spring Boot)

1. **TodoResourceJpa**
   - **Package:** `com.in28minutes.rest.webservices.restfulwebservices.todo`
   - **Description:** REST controller for managing todos. It supports CRUD operations:
     - `GET /users/{username}/todos` - Retrieve all todos for a user.
     - `GET /users/{username}/todos/{id}` - Retrieve a specific todo by ID.
     - `DELETE /users/{username}/todos/{id}` - Delete a specific todo by ID.
     - `PUT /users/{username}/todos/{id}` - Update a specific todo by ID.
     - `POST /users/{username}/todos` - Create a new todo.

2. **JwtAuthenticationController**
   - **Package:** `com.in28minutes.rest.webservices.restfulwebservices.jwt`
   - **Description:** REST controller for JWT authentication. It includes:
     - `POST /authenticate` - Generates a JWT token based on the provided username and password.

3. **JwtSecurityConfig**
   - **Package:** `com.in28minutes.rest.webservices.restfulwebservices.jwt`
   - **Description:** Security configuration for handling JWT authentication and authorization. It includes:
     - RSA key pair generation for signing JWTs.
     - Configuration for stateless session management and OAuth2 resource server.

4. **RestfulWebServicesApplication**
   - **Package:** `com.in28minutes.rest.webservices.restfulwebservices`
   - **Description:** Main entry point for the Spring Boot application. It includes CORS configuration to allow requests from the frontend.

### Frontend (React)

1. **TodoComponent**
   - **Description:** React component for managing todos. It includes a form for creating and updating todos with validation.
   - **Usage:** Use `react-router-dom` to navigate between different views. The component interacts with the backend API to fetch and update todo data.

2. **api/TodoApiService**
   - **Description:** API service functions for interacting with the backend:
     - `createTodoApi` - Sends a request to create a new todo.
     - `retrieveTodoApi` - Fetches a todo by ID.
     - `updateTodoApi` - Updates an existing todo.

3. **security/AuthContext**
   - **Description:** Context for managing authentication state. Provides the current username and manages token storage.

4. **apiClient**
   - **Description:** Axios client configured to interact with the backend API running on `http://localhost:8080`.

## Getting Started

### Prerequisites

- Java 17 or later
- Node.js and npm
- MySQL or another relational database (if using database features)

### Backend Setup


