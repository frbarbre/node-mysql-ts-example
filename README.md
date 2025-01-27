# Express TypeScript API with MySQL

A RESTful API built with Express.js, TypeScript, and MySQL, featuring users, posts, and comments functionality.

## Prerequisites

- Docker and Docker Compose
- Node.js (v18 or higher)
- npm
- Git

## Getting Started

1. Clone the repository and install dependencies:

```bash
git clone [repository-url]
cd [project-directory]
npm install
```

2. Set up environment variables:

   - Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   - Configure the following variables in `.env`:

   ```
   PORT=8000
   DB_HOST=mysql
   DB_PORT=3306
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=mydatabase
   ```

3. Development Mode

   To run the project in development mode with hot-reload:

   ```bash
   docker-compose -f docker-compose-dev.yml up --build
   ```

   This will:

   - Start the Node.js server with hot-reload
   - Set up MySQL database
   - Initialize database with required tables
   - Mount local files for development

4. Production Testing

   To test the production build:

   ```bash
   docker-compose up --build
   ```

   This will:

   - Build the TypeScript code
   - Start the Node.js server in production mode
   - Set up MySQL database
   - Initialize database with required tables

## API Endpoints

The API includes endpoints for:

- Users: CRUD operations
- Posts: CRUD operations
- Comments: CRUD operations

API documentation is available via Bruno collection in the `/bruno` directory.

## Database Schema

The database includes three main tables:

- users: Store user information
- posts: Store post content with user relationships
- comments: Store comments with post relationships

## Troubleshooting

Common issues:

1. Database Connection Issues:

   - Ensure MySQL container is healthy
   - Verify DB\_\* environment variables
   - Check if port 3306 is available

2. Node.js Server Issues:
   - Verify PORT environment variable
   - Check if port 8000 is available
   - Review server logs using `docker-compose logs node`

## Development

The project uses:

- TypeScript for type safety
- Express.js for the web server
- MySQL for the database
- Docker for containerization
