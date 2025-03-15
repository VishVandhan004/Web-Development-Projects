# BlogSphere - Blog Post Management System


## Overview
BlogSphere is a robust and scalable blog post management system designed for seamless content creation, editing, and deletion. Built with Express.js and PostgreSQL, it ensures efficient data handling and a structured backend for managing blog posts. The system leverages EJS templates to deliver a dynamic and user-friendly interface. Ideal for content-driven applications, BlogSphere simplifies blog management while maintaining flexibility and performance. It consists of two main components:

1. **Backend API (`solution.js`)** - Handles API requests related to blog posts.
2. **Frontend Server (`server.js`)** - Serves the user interface and communicates with the backend API.

## Features
- Display a list of blog posts.
- Create new blog posts.
- Edit existing blog posts.
- Delete blog posts.
- View individual blog posts.

## Technologies Used
- Node.js
- Express.js
- Axios
- Body-parser
- EJS (Embedded JavaScript Templates)

## Setup Instructions
### Prerequisites
Ensure you have Node.js installed on your system. You can check this by running:
```sh
node -v
```
If not installed, download and install it from [Node.js official website](https://nodejs.org/).

### Installation
1. Clone the repository:
```sh
git clone <repository-url>
cd <project-folder>
```
2. Install dependencies:
```sh
npm install
```

### Running the Application
Since the project consists of two servers, you need to run them simultaneously in separate terminals.

#### Step 1: Start the Backend API
In the first terminal, run:
```sh
nodemon solution.js
```
This will start the API on `http://localhost:4000`.

#### Step 2: Start the Frontend Server
In the second terminal, run:
```sh
nodemon server.js
```
This will start the frontend on `http://localhost:3000`.

### Usage
1. Open `http://localhost:3000` in your web browser.
2. View existing blog posts.
3. Click "New Post" to create a new post.
4. Click "Edit" to update a post.
5. Click "Delete" to remove a post.

### API Endpoints
#### GET `/posts`
Retrieves all blog posts.

#### GET `/posts/:id`
Retrieves a specific post by ID.

#### POST `/posts`
Creates a new blog post.

#### PATCH `/posts/:id`
Updates an existing blog post.

#### DELETE `/posts/:id`
Deletes a blog post.


## Author
Developed by Vishnu Vandhan

