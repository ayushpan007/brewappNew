# Books API

This repository serves as the backend for a CRUD (Create, Read, Update, Delete) application focused on managing books.

## Table of Contents

- **controllers**: This directory contains the logic for the APIs. It is further divided into `books` and `ping`. The `ping` controller is used to perform a simple check to see if the API is running smoothly on the server; it does not require any authentication token. The `books` controller contains the logic for performing CRUD operations on books.

- **models**: This directory holds the schemas for the database collections.

- **routes**: Here, you'll find the defined routes for the APIs.

- **utils**: Contains utility functions that support the APIs.

## Prerequisites

Before running this application, ensure you have the following installed on your system:

- Node.js
- npm
- MongoDB
- Express

## Setup

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-username/books-api.git
    ```

2. **Install Node Modules**:

    ```bash
    npm install
    ```

## Configuration

Create a `.env` file in the root directory of the project and add the following variables:

```plaintext
DEV_ENV=LOCAL
PORT=3000
DB_CONNECTION_STRING="mongodb://localhost:27017/brewapps"
```

## Running the Application

To start the server, use the following command:

```bash
npm start
```

This will launch the backend, enabling you to perform CRUD operations on the books.

For any further inquiries or specific assistance, please feel free to reach out.