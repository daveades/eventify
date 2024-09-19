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
- URL: `/login`
- Method: `POST`
- Description: Logs in a user and returns a JWT token.
- Request Body:
    ```JSON
    {
    "username": "string",
    "password": "string"
    }
    ```
- Response:
    - Success: `200 OK`
    ```JSON
    {
        "access token": "jwt_token"
    }
    ```
    - Error: `401 Unauthorized`
    ```JSON
    {
      "error": "Invalid username or password"
    }
    ```
### Events
**Retrieve All Events**
- URL: `/events`
- Method: `GET`
- Description: Retrieves all events.
- Response:
    - Success: `200 OK`
    ```JSON
    [
      {
        "id": "integer",
        "name": "string",
        "date": "string",
        "user_id": "integer"
      },
      ...
    ]
    ```

**Create a New Event**
- URL: /events
- Method: POST
- Description: Creates a new event.
- Headers:
    ```
        Authorization: Bearer <jwt_token>
    ```
- Request Body:
    ```JSON
    {
      "name": "string",
      "date": "string"
    }
    ```
- Response:
    - Success: `201 Created`
    ```JSON    
    {
      "id": "integer",
      "name": "string",
      "date": "string",
      "user_id": "integer"
    }
    ```
    - Error: `400 Bad Request`
    ```JSON
    {
      "error": "Event name and date are required"
    }
    ```

**Retrieve Events Created by the Current User**
- URL: /my_events
- Method: GET
- Description: Retrieves events created by the current user.
- Headers:
    ```
        Authorization: Bearer <jwt_token>
    ```
- Response:
    - Success: 200 OK
    ```JSON
    [
      {
        "id": "integer",
        "name": "string",
        "date": "string",
        "user_id": "integer"
      },
      ...
    ]
    ```

**Update a Specific Event by ID**
- URL: /events/<int:id>
- Method: PUT
- Description: Updates a specific event by ID.
- Headers:
    ```
        Authorization: Bearer <jwt_token>
    ```
- Request Body:
    ```JSON
    {
      "name": "string",
      "date": "string"
    }
    ```
- Response:
    - Success: `200 OK`
    ```JSON
    {
        "id": "integer",
        "name": "string",
        "date": "string",
        "user_id": "integer"
    }
    ```
    - Error: `404 Not Found`
    ```JSON
    {
      "error": "Event not found"
    }
    ```
### Tickets
**Retrieve All Tickets Purchased by the Authenticated User**
- URL: /tickets
- Method: GET
- Description: Retrieves all tickets purchased by the authenticated user.
- Headers:
    ```
        Authorization: Bearer <jwt_token>
    ```
- Response:
    - Success: `200 OK`
    ```JSON
    [
      {
        "id": "integer",
        "event_id": "integer",
        "email": "string"
      },
      ...
    ]
    ```
**Retrieve a Specific Ticket by ID**
- URL: /tickets/<int:id>
- Method: GET
- Description: Retrieves a specific ticket by ID.
- Headers:
    ```
        Authorization: Bearer <jwt_token>
    ```
- Response: 
    - Success: `200 OK`
    ```JSON
    {
      "id": "integer",
      "event_id": "integer",
      "email": "string"
    }
    ```
    - Error: `404 Not Found`
    ```JSON
    {
      "error": "Ticket not found or unauthorized"
    }
    ```

**Update a Specific Ticket by ID**
- URL: /tickets/<int:id>
- Method: PUT
- Description: Updates a specific ticket by ID.
- Headers:
    ```
    Authorization: Bearer <jwt_token>
    ```
- Request Body:
    ```JSON
    {
      "email": "string"
    }
    ```
- Response:
    - Success: `200 OK`
    ```JSON    
    {
      "id": "integer",
      "event_id": "integer",
      "email": "string"
    }
    ```
    - Error:
    ```JSON
    {
      "error": "Ticket not found or unauthorized"
    }
    ```
**Delete a Specific Ticket by ID**
- URL: /tickets/<int:id>
- Method: DELETE
- Description: Deletes a specific ticket by ID.
- Headers:
    ```
    Authorization: Bearer <jwt_token>
    ```
- Response:
    - Success: `204 No content`
    - Error: `404 Not Found`
    ```JSON
    {
      "error": "Ticket not found or unauthorized"
    }
    ```
**Purchase Tickets for an Event**
- URL: /purchase_ticket
- Method: POST
- Description: Purchases tickets for an event.
- Headers:
    ```
    Authorization: Bearer <jwt_token>
    ```
- Request Body:
    ```JSON
    {
      "event_id": "integer",
      "num_tickets": "integer"
    }
    ```
- Response:
    - Success `201 Created`
    ```JSON
        [
      {
        "id": "integer",
        "event_id": "integer",
        "email": "string"
      },
      ...
    ]
    ```
    - Error: `404 Not Found`
    ```JSON
    {
      "error": "Event not found"
    }
    ```
