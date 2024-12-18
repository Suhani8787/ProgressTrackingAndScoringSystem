# Ionots EdTech Platform - MVP (MERN Stack)

## Description

A web-based project management system built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). The platform allows admins to assign and track candidate projects, while candidates can view their assigned tasks, update progress, and track project status.

---

## Project Structure

### Folder Structure

Create the following structure for your application:

```
Ionots-EdTech-Platform/
│
├── backend/          # Node.js & Express.js API
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── controllers/  # Business logic
│   ├── config/       # Database config
│   ├── package.json  # Backend dependencies
│   └── server.js     # Main server file
│
├── frontend/         # React.js frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page-level components
│   │   ├── services/     # API integration
│   │   ├── App.js        # Main React component
│   │   └── index.js      # Entry point
│   ├── public/
│   └── package.json      # Frontend dependencies
│
├── .gitignore
└── README.md
```

---

## Setup Instructions

### 1. Initialize the Application

#### Backend (Node.js + Express)

1. **Create the backend folder and initialize Node.js:**

    ```bash
    mkdir backend
    cd backend
    npm init -y
    ```

2. **Install required dependencies:**

    ```bash
    npm install express mongoose dotenv cors
    npm install nodemon --save-dev
    ```

3. **Set up `.env`:**

    ```plaintext
    MONGO_URI=mongodb://localhost:27017/ionots-edtech
    ```

4. **Run the server:** Add the following script to `package.json`:

    ```json
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js"
    }
    ```

    Run the server with:

    ```bash
    npm run dev
    ```

#### Frontend (React.js)

1. **Create the frontend app:**

    ```bash
    npx create-react-app frontend
    cd frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install axios react-router-dom
    ```

3. **Run the React app:**

    ```bash
    npm start
    ```

---

## Accessing the Application

- To access the **Admin Panel**, navigate to `http://localhost/admin`.
- To access the **Candidate Panel**, navigate to either `http://localhost/register` or `http://localhost/login`.

---

## License

This project is open-source and available under the MIT License.
