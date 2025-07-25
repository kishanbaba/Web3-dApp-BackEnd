Of course. Here is a professional and comprehensive `README.md` file tailored specifically for your newly structured backend. It explains the purpose, setup, API, and architecture, making it easy for anyone (including your future self) to understand and run the project.

---

# Wallet Signature Verification Backend

This is a lightweight, production-ready Express.js server designed to verify Ethereum message signatures. It serves as a secure backend for a decentralized application (dApp) frontend, providing a crucial security check to confirm that a message was legitimately signed by the holder of a specific wallet address.

The server is built with a modular, scalable architecture to separate concerns, making it easy to maintain and extend.

## Features

-   **Modular Architecture**: Follows a Service-Controller-Route pattern for clear separation of concerns.
-   **Centralized Configuration**: All settings are managed in a single, easy-to-find config file.
-   **Robust Error Handling**: A centralized error handling middleware provides consistent error responses.
-   **Security by Default**: Uses `helmet` to set secure HTTP headers and `cors` to restrict access to a specified frontend URL.
-   **Developer-Friendly Logging**: Includes `morgan` for detailed HTTP request logging during development.
-   **Health Check Endpoint**: A `/health` endpoint for monitoring and uptime checks.

## Tech Stack

-   **Framework**: [Express.js](https://expressjs.com/)
-   **Web3 Library**: [Ethers.js](https://docs.ethers.org/) (v6) for signature verification.
-   **Security**: [Helmet](https://helmetjs.github.io/), [CORS](https://expressjs.com/en/resources/middleware/cors.html)
-   **Development**: [Nodemon](https://nodemon.io/) for hot-reloading, [Morgan](https://github.com/expressjs/morgan) for logging.
-   **Language**: JavaScript (ES Modules)

---

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 18.x or later recommended)
-   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

**Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Server

-   **For Development (with hot-reloading):**
    This command uses `nodemon` to automatically restart the server whenever you save a file.

    ```bash
    npm run dev
    ```

-   **For Production:**
    This command runs the server using `node` directly. It's more performant and is intended for a production environment.

    ```bash
    npm start
    ```

The server will start on the port specified in your configuration (default: `4000`).

---

## API Endpoints

The base URL for all API routes is `/api/v1`.

### Health Check

-   **Endpoint**: `GET /health`
-   **Description**: A simple endpoint to check if the server is running.
-   **Success Response (200 OK)**:
    ```json
    {
      "status": "OK"
    }
    ```

### Verify Signature

-   **Endpoint**: `POST /api/v1/signature/verify`
-   **Description**: Verifies a given message and signature.
-   **Request Body**:
    ```json
    {
      "message": "The original string that was signed by the wallet",
      "signature": "The resulting signature hash (e.g., 0x...)"
    }
    ```
-   **Success Response (200 OK)**:
    Returns the validity of the signature and the recovered signer address.
    ```json
    {
      "isValid": true,
      "signer": "0x1234...cDef"
    }
    ```
-   **Error Responses**:
    -   **400 Bad Request** (Missing Fields):
        ```json
        {
          "error": "Missing message or signature in request body."
        }
        ```
    -   **400 Bad Request** (Invalid Signature):
        This is returned by the central error handler when `ethers.js` fails to verify the signature. In `development` mode, it includes more detail.
        ```json
        {
          "error": "An unexpected error occurred on the server.",
          "details": "Invalid signature format or data."
        }
        ```
    -   **404 Not Found**: Returned if you try to access an undefined route.
        ```json
        {
          "error": "Endpoint Not Found"
        }
        ```

---

## Project Structure

The project follows a standard service-oriented architecture to keep code organized and maintainable.

```
/src
├── api/
│   ├── routes/          # Defines the API endpoints (e.g., /verify).
│   └── controllers/     # Handles incoming requests and sends responses.
├── services/            # Contains the core business logic (e.g., signature verification).
├── middleware/          # Custom Express middleware (e.g., central error handler).
├── config/              # Application configuration.
└── index.js             # The main entry point that starts the server and Express app setup, middleware wiring, and route definitions.
```