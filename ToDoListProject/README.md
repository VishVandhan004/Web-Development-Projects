# To-Do List Web App with PostgreSQL

## Project Overview
This is a simple To-Do List web application built using Node.js, Express.js, and PostgreSQL. The app allows users to create, read, update, and delete (CRUD) tasks in a PostgreSQL database.

## Features
- Display a list of tasks
- Add new tasks
- Update existing tasks
- Delete tasks
- Uses PostgreSQL as the database

## Technologies Used
- **Node.js** - JavaScript runtime for server-side execution
- **Express.js** - Web framework for handling routes and middleware
- **PostgreSQL** - Database to store to-do items
- **body-parser** - Middleware for parsing request bodies
- **EJS** - Template engine for rendering dynamic HTML

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Steps to Run the Project
1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/todo-list.git
   cd todo-list
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Setup PostgreSQL Database:
   - Start PostgreSQL server.
   - Create a database named `todolist`.
   - Create a table `items` using the following SQL command:
     ```sql
     CREATE TABLE items (
       id SERIAL PRIMARY KEY,
       title TEXT NOT NULL
     );
     ```
   - Update the database credentials in the `db` connection object inside `server.js`.
4. Start the server:
   ```sh
   node server.js
   ```
5. Open your browser and navigate to:
   ```sh
   http://localhost:3000
   ```

## API Endpoints

| Method | Endpoint  | Description  |
|--------|----------|--------------|
| GET    | `/`      | Fetch all to-do items |
| POST   | `/add`   | Add a new item |
| POST   | `/edit`  | Update an existing item |
| POST   | `/delete` | Delete an item |

## Project Structure
```
/todo-list
│── /public          # Static assets (CSS, JS, images)
│── /views           # EJS templates
│── server.js        # Express server and API routes
│── package.json     # Project dependencies
│── README.md        # Project documentation
```

## Author
- Vishnu Vandhan
