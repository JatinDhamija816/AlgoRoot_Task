# Task Manager (MERN Stack)

This is a simple **Task Manager** built with the **MERN stack** (MongoDB, Express.js, React, Node.js). The application allows users to create, update, delete, and manage tasks with categories like important, planned, and assigned tasks.

## Features

- **Task Management**: Add, update, delete tasks
- **Categorization**: Mark tasks as Important, Planned
- **Due Dates & Reminders**: Set due dates and reminders for tasks
- **Responsive UI**: Built using React with a sidebar layout
- **State Management**: Uses Redux Toolkit

## Tech Stack

- **Frontend**: React, Redux Toolkit, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Middleware & Security**: CORS, Cookie-parser
- **Dev Tools**: Nodemon, Prettier, Dotenv

## Installation & Setup

### Prerequisites

Make sure you have the following installed:

- Node.js (v16+ recommended)
- MongoDB
- Git

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/JatinDhamija816/AlgoRoot_Task
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add:
   ```sh
   NODE_ENV=development
   LOG_REQUEST_BODY=true
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```

The application will be running at **http://localhost:5173**.

## API Endpoints

| Method | Endpoint                   | Description        |
| ------ | -------------------------- | ------------------ |
| POST   | `/api/v1/tasks`            | Create a new task  |
| GET    | `/api/v1/tasks`            | Get all tasks      |
| GET    | `/api/v1/tasks/:id`        | Get a single task  |
| PUT    | `/api/v1/tasks/:id`        | Update a task      |
| PATCH  | `/api/v1/tasks/:id/status` | Update task status |
| DELETE | `/api/v1/tasks/:id`        | Delete a task      |

## Postman Collection

You can test the API using the following Postman collection:

### Option 1: Import via File

1. Download the Postman collection file: [Task Manager API Collection](./Task%20Manger.postman_collection.json)
2. Open Postman and go to **File → Import**.
3. Select the downloaded `Task Manger.postman_collection.json` file.
4. Click **Import** to add it to your Postman workspace.

## License

This project is open-source and available under the **MIT License**.

---

Feel free to contribute or suggest improvements!
