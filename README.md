# Syntecxhub User CRUD API

A RESTful User Management API built with **Node.js, Express.js, MongoDB, and Mongoose**. This project demonstrates how to create, retrieve, update, and delete user records, validate incoming data, handle common API errors, and test endpoints using Postman.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Data Model](#data-model)
- [Testing with Postman](#testing-with-postman)
- [Error Handling and Validation](#error-handling-and-validation)
- [Git and GitHub Workflow](#git-and-github-workflow)
- [Security Considerations](#security-considerations)
- [Learning Outcomes](#learning-outcomes)
- [Author and Repository](#author-and-repository)

## Project Overview

The Syntecxhub User CRUD API is a backend application that provides HTTP endpoints for managing user information.

CRUD stands for:

- **Create:** Add a new user.
- **Read:** Retrieve one user or a list of users.
- **Update:** Modify an existing user's information.
- **Delete:** Remove a user from the database.

The API uses Express.js to handle HTTP requests, Mongoose to define the user data model and communicate with MongoDB, and MongoDB Atlas to host the database in the cloud.

This project was developed as a practical backend assignment to demonstrate REST API development, database integration, input validation, error handling, API testing, and version control.

## Features

- Create users with validated information.
- Retrieve all registered users.
- Retrieve a specific user by their MongoDB ID.
- Update an existing user's information.
- Delete a user by ID.
- Validate user names, email addresses, and optional ages.
- Enforce unique email addresses at the database level.
- Automatically record document creation and update timestamps.
- Handle invalid IDs, missing users, and invalid input.
- Use environment variables to configure the application securely.
- Test API endpoints using Postman.
- Track and publish source code using Git and GitHub.

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime for the backend |
| Express.js | Web framework for defining API routes |
| MongoDB Atlas | Cloud-hosted NoSQL database |
| Mongoose | MongoDB object modeling and schema validation |
| dotenv | Loads environment variables from `.env` |
| Postman | Sends HTTP requests and tests API behavior |
| Git | Tracks source code changes |
| GitHub | Hosts the project repository |
| Visual Studio Code | Development environment |
| Linux | Development operating system |

## Project Structure

The repository is organized as follows:

```text
Syntecxhub-User-CRUD-API/
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

**File responsibilities**

- `server.js` — Configures Express, loads environment variables, parses JSON request bodies, connects to MongoDB, mounts the user routes, and handles unmatched routes and errors.
- `models/User.js` — Defines the Mongoose user schema and its validation rules.
- `routes/userRoutes.js` — Implements the user CRUD endpoints.
- `.env` — Stores local configuration, including the MongoDB connection URI and server port. This file must not be committed to GitHub.
- `.gitignore` — Prevents files such as `.env` and `node_modules/` from being tracked.
- `package.json` — Defines the project metadata, dependencies, and npm scripts.
- `package-lock.json` — Records the dependency versions used for reproducible installations.
- `README.md` — Documents the project, installation instructions, API endpoints, and testing procedure.

> The `.env` file is part of your local setup, but it should not appear in the public GitHub repository.

## Prerequisites

Before running the project, make sure you have the following:

1. **Node.js and npm** installed.
2. **Visual Studio Code** or another code editor.
3. **A MongoDB Atlas account** with a database deployment.
4. **Postman** installed for testing the endpoints.
5. **Git** installed and configured.

Check your Node.js, npm, and Git installations in the terminal:

```bash
node --version
npm --version
git --version
```

If these commands return version numbers, the corresponding tools are available.

## Installation and Setup

### 1. Clone the GitHub repository

Open a terminal and navigate to the directory where you want to store the project.

Clone the repository:

```bash
git clone (Created Git Repository)
```

Enter the project directory:

```bash
cd Syntecxhub-User-CRUD-API
```

If you already have the project on your computer, open that existing folder in VS Code instead of cloning it again.

### 2. Install dependencies

Run:

```bash
npm install
```

This installs the dependencies declared in `package.json` and generates or updates `node_modules/` as necessary.

### 3. Configure MongoDB Atlas

The API requires a MongoDB database.

1. Sign in to MongoDB Atlas.
2. Create or select a database deployment.
3. Configure a database user with appropriate permissions.
4. Configure network access so your development machine can connect.
5. Obtain the application's MongoDB connection URI.

The connection URI typically follows this pattern:

```text
mongodb+srv://<username>:<password>@<cluster-host>/<database-name>?retryWrites=true&w=majority
```

Replace the placeholders with your actual database credentials and cluster information. Your exact URI may contain additional connection options.

Do not publish your real connection URI or database password.

### 4. Create the environment file

In the project root, create a file named `.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/<database-name>?retryWrites=true&w=majority
```

Replace the example URI with your actual MongoDB Atlas connection string.

The application reads `PORT` to determine which port to use and `MONGODB_URI` to connect to the database.

If your password contains special characters, make sure they are URL-encoded in the connection URI where required.

### 5. Verify `.gitignore`

Your `.gitignore` file should contain at least:

```gitignore
node_modules/
.env
```

This prevents Git from tracking the local dependency directory and environment configuration file.

**Important:** Adding `.env` to `.gitignore` does not remove it from Git history if it was already committed. If credentials were exposed, rotate them in MongoDB Atlas.

## Running the Application

### Development mode

Start the development server with:

```bash
npm run dev
```

This uses the development script configured in `package.json`, typically with Nodemon to restart the application when files change.

### Standard mode

Alternatively, run:

```bash
npm start
```

The server should connect to MongoDB Atlas and start listening on the configured port.

If the application uses the default port, open:

```text
http://localhost:5000
```

The root route is intended as a simple server test endpoint. The API endpoints are available under `/api/users`.

If the server fails to start, check that your `.env` file exists, your MongoDB URI is correct, your Atlas network access permits the connection, and your dependencies are installed.

## API Documentation

**Base URL**

```text
http://localhost:5000
```

**Users endpoint**

```text
/api/users
```

### Endpoint summary

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users` | Create a user |
| GET | `/api/users` | Retrieve all users |
| GET | `/api/users/:id` | Retrieve a user by ID |
| PUT | `/api/users/:id` | Update a user by ID |
| DELETE | `/api/users/:id` | Delete a user by ID |

### 1. Create a user

**Request**

```http
POST /api/users
Content-Type: application/json
```

**Example request body**

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "age": 25
}
```

The name and email are required. Age is optional.

A successful request should return the newly created user, including its generated MongoDB `_id` and timestamp fields.

### 2. Retrieve all users

**Request**

```http
GET /api/users
```

Returns the collection of users stored in the database.

If no users have been created, the response should be an empty array:

```json
[]
```

Typical success status: `200 OK`.

### 3. Retrieve a user by ID

**Request**

```http
GET /api/users/:id
```

Replace `:id` with the MongoDB `_id` of an existing user.

Example:

```http
GET /api/users/REPLACE_WITH_USER_ID
```

If the user exists, the API returns the matching record. A valid but nonexistent ID should produce a not-found response.

Typical statuses: `200 OK` when found, `404 Not Found` when no matching user exists.

### 4. Update a user

**Request**

```http
PUT /api/users/:id
Content-Type: application/json
```

Example request body for updating only the age:

```json
{
  "age": 30
}
```

The endpoint supports partial updates, so you can send only the fields you want to change, provided the implementation validates those fields appropriately.

A successful update returns the updated user or another response defined by the route implementation.

Typical success status: `200 OK`.

### 5. Delete a user

**Request**

```http
DELETE /api/users/:id
```

Replace `:id` with the ID of the user to delete.

A successful request removes the user from the database. If the user does not exist, the API should return a not-found response.

Typical statuses: `200 OK` or `204 No Content` on success, depending on the implementation; `404 Not Found` if the user does not exist.

## Data Model

The user schema is defined in `models/User.js`.

| Field | Type | Rules |
|---|---|---|
| `_id` | ObjectId | Generated automatically by MongoDB |
| `name` | String | Required; minimum length of 2 characters |
| `email` | String | Required, lowercase, unique, and validated against an email pattern |
| `age` | Number | Optional; when supplied, must be between 1 and 120 |
| `createdAt` | Date | Generated automatically by Mongoose timestamps |
| `updatedAt` | Date | Updated automatically by Mongoose timestamps |

The `createdAt` and `updatedAt` fields are managed by Mongoose when the schema has timestamps enabled.

**Example user document**

```json
{
  "_id": "REPLACE_WITH_GENERATED_OBJECT_ID",
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "age": 25,
  "createdAt": "2026-01-01T10:00:00.000Z",
  "updatedAt": "2026-01-01T10:00:00.000Z"
}
```

The ID and timestamp values above are illustrative. Actual values are generated when a document is created.

Email uniqueness should be enforced by a MongoDB unique index. Mongoose's `unique` option is an index declaration, not a normal schema validator, so duplicate-key errors should also be handled appropriately by the application.

## Testing with Postman

Postman was used to test the API locally, including the successful retrieval of an empty user collection.

The collection is named **Syntecxhub User CRUD API**. *This collection file has been saved under Postman Folder for references.*

Before testing, start the backend using:

```bash
npm run dev
```

In Postman, use the base URL:

```text
http://localhost:5000
```

### Recommended test collection

| # | Request name | Method | Endpoint | Purpose |
|---|---|---|---|---|
| 1 | Create User | POST | `/api/users` | Create a valid user |
| 2 | Get All Users | GET | `/api/users` | Retrieve all users |
| 3 | Get User By ID | GET | `/api/users/{{userId}}` | Retrieve one user |
| 4 | Update User | PUT | `/api/users/{{userId}}` | Update a user's age |
| 5 | Delete User | DELETE | `/api/users/{{userId}}` | Delete a user |
| 6 | Create User - Missing Email | POST | `/api/users` | Test required-field validation |
| 7 | Create User - Duplicate Email | POST | `/api/users` | Test email uniqueness |
| 8 | Get User - Invalid ID | GET | `/api/users/not-a-valid-id` | Test invalid MongoDB ID handling |

### Example test: Create User

1. Select `POST`.
2. Enter `http://localhost:5000/api/users`.
3. Open **Body → raw → JSON**.
4. Enter:

```json
{
  "name": "Peter Doe",
  "email": "peter.doe@example.com",
  "age": 25
}
```

5. Click **Send**.
6. Check the response status and returned user object.
7. Copy the generated `_id` for use in subsequent requests.

### Using the user ID

For requests that require a user ID, replace `{{userId}}` with the actual `_id` returned by the create request, or configure a Postman collection variable named `userId`.

For example, the update request body can be:

```json
{
  "age": 30
}
```

### Validation tests

**Missing email:** Send a request without the email field:

```json
{
  "name": "Missing Email Test",
  "age": 25
}
```

The request should be rejected because email is required.

**Duplicate email:** First create a user, then submit another create request with the same email address. The API should reject the duplicate if the unique index is configured correctly and the error is handled.

**Invalid ID:** Send a request to:

```http
GET /api/users/not-a-valid-id
```

The API should respond with a client error rather than crashing. The exact response status depends on the route's error handling.

For reliable testing, use a distinct email address for the successful create request, and test the duplicate-email case only after that user exists.

## Error Handling and Validation

The application is designed to handle common API errors, including:

- Missing required fields.
- Invalid email formats.
- Names shorter than the minimum allowed length.
- Ages outside the allowed range.
- Duplicate email addresses.
- Invalid MongoDB ObjectId values.
- Requests for users that do not exist.
- Requests to undefined endpoints.
- Database connection or server errors.

### Common HTTP status codes

| Status | Meaning | Example |
|---|---|---|
| `200 OK` | Request completed successfully | Retrieving users |
| `201 Created` | Resource created successfully | Creating a user |
| `400 Bad Request` | Invalid request data | Missing required fields |
| `404 Not Found` | Resource or endpoint not found | User ID does not exist |
| `409 Conflict` | Resource conflicts with existing data | Duplicate email, if implemented this way |
| `500 Internal Server Error` | Unexpected server error | Unhandled server-side failure |

These are conventional REST API status codes. The exact code for a particular error depends on how the route and error middleware are implemented; consult the actual response when testing.

## Git and GitHub Workflow

The project is version-controlled using Git and hosted on GitHub.

Useful commands when working on the project:

### Check the current state

```bash
git status
```

### Stage changes

```bash
git add .
```

Before staging, verify that `.env` is ignored and does not contain tracked secrets.

### Commit changes

```bash
git commit -m "Add README"
```

### Push changes to GitHub

```bash
git push origin main
```

After pushing, open the repository on GitHub and confirm that `README.md` appears on the repository homepage.

If Git reports that the remote branch contains changes you do not have locally, fetch and reconcile those changes carefully before pushing. Avoid force-pushing over remote history.

## Security Considerations

- Never commit `.env` or expose MongoDB credentials.
- Use a dedicated database user with only the permissions the application needs.
- Restrict MongoDB Atlas network access to trusted sources where practical.
- Validate all incoming data on the server.
- Handle database errors without exposing credentials or sensitive connection details.
- Keep dependencies updated and review security advisories.
- Use HTTPS and appropriate authentication and authorization if deploying the API for real users.
- Do not assume a unique email index is created immediately in every environment; verify the database index when testing duplicate-email behavior.

This project is intended as a learning assignment. Additional controls such as authentication, authorization, rate limiting, and production deployment configuration may be needed before using it in a real-world application.

## Learning Outcomes

Through this project, the following backend development concepts are practiced:

- Creating a RESTful API with Express.js.
- Organizing code into models, routes, and server configuration.
- Connecting an application to MongoDB Atlas.
- Defining schemas and validating data with Mongoose.
- Implementing CRUD operations.
- Handling HTTP status codes and common API errors.
- Testing endpoints with Postman.
- Managing configuration through environment variables.
- Protecting sensitive configuration using `.gitignore`.
- Tracking changes and publishing code with Git and GitHub.

## Author and Repository

**Project:** Syntecxhub User CRUD API  
**Purpose:** Practical backend development assignment  
**License:** No license has been specified. Unless a license is added to the repository, reuse is not automatically granted.

---

*Built as a practical learning project using Node.js, Express.js, MongoDB Atlas, Mongoose, Postman, Git, and GitHub.*
