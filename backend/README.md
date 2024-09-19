# Project Documentation

## Overview
This project is a Flask-based web application that includes user authentication, event management, and ticket purchasing functionalities. The application uses SQLite as the database and JWT for user authentication.

## Table of Contents
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
  - [Authentication](#authentication)
  - [Events](#events)
  - [Tickets](#tickets)

## Setup
To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Create a virtual environment**
```sh
python -m venv .venv
source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
```
3. **Install dependencies**
```sh
pip install -r requirements.txt
```
4. **setup the database**
```sh
flask db init
flask db migrate -m "Initial migration."
flask db upgrade
```
5. **Run the application**
```sh
flask run
```
## Environment Variables
The application uses environment variables for configuration. Create a .env file in the root directory with the following content:

```
JWT_SECRET_KEY=your_jwt_secret_key
DATABASE_URL=sqlite:///local_database.db
```

## Endpoints
### Authentication

**Register a User**
- URL: `/register`
- Method: `POST`
- Description: Registers a new user.
- Request Body:

    ```JSON
    {
    "username": "string",
    "email": "string",
    "password": "string"
    }
    ```
- Response:
    - Success: `201 Created`

    ```JSON
    {
    "message": "User registered successfully"
    }
    ```
    - Error: `400 Bad request`

    ```JSON
    {
      "error": "Username, email, and password are required"
    }
    ```
**Login a User**

