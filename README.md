# Findora: Lost & Found Item Management System 🔍

## Overview
Findora is a full-stack web application designed to help users efficiently manage and recover lost or found items within a community. It features a robust Node.js/Express.js API with MongoDB for data persistence, paired with a dynamic React frontend. The platform includes secure user authentication, item listing, a comprehensive request and verification system for item claims, and real-time chat functionality.

## Features
*   ✨ **Secure User Authentication**: Complete user lifecycle management including registration, login, logout, and profile updates, secured with JWT.
*   🤝 **Item Reporting & Management**: Users can post details of lost or found items, including descriptions, categories, locations, and images.
*   🕵️ **Intuitive Item Search**: Browse dedicated sections for lost and found items.
*   💬 **Integrated Chat System**: Facilitates direct communication between item finders and claimants once a request is accepted.
*   ✅ **Verification & Claim Process**: A structured process for claiming items, involving verification questions and answers, and unique verification codes.
*   ⚙️ **Role-Based Access**: Distinguishes between different user roles, enabling specific functionalities.
*   🚀 **Responsive User Interface**: Built with React, Tailwind CSS, and Shadcn UI for a modern and accessible experience.

## Getting Started

To get Findora up and running on your local machine, follow these steps:

### Installation

First, clone the repository to your local machine:
```bash
git clone https://github.com/Searcher06/Findora
```

Next, navigate into the project directory:
```bash
cd Findora
```

Then, install dependencies for both the client (frontend) and server (backend):

**Client (Frontend)**
```bash
cd client
npm install
```

**Server (Backend)**
```bash
cd ../server
npm install
```

### Environment Variables
The server requires the following environment variables. Create a `.env` file in the `server` directory and populate it with your configuration:

*   `PORT`: The port number for the server to run on.
    *   Example: `PORT=8080`
*   `DATABASE_URI`: MongoDB connection string.
    *   Example: `DATABASE_URI=mongodb://127.0.0.1:27017/Findora`
*   `JWT_SECRET`: A strong, secret key for signing JWT tokens.
    *   Example: `JWT_SECRET=your_super_secret_jwt_key_here`
*   `NODE_ENV`: Set to `production` for secure cookies and production error handling.
    *   Example: `NODE_ENV=development` or `NODE_ENV=production`

### Running the Application

**Start the Backend Server**
Navigate to the `server` directory and start the server:
```bash
cd server
npm run dev
```
The server will typically run on `http://localhost:8080` (or your specified `PORT`).

**Start the Frontend Client**
Navigate to the `client` directory and start the development server:
```bash
cd client
npm run dev
```
The client will typically open in your browser at `http://localhost:5173` (or the default Vite port).

## Usage
Once the application is running, users can:
1.  **Register/Login**: Create a new account or sign in to access the platform's features.
2.  **Post an Item**: Report a lost item (e.g., a wallet, phone) or a found item (e.g., a book, keys) by providing details such as name, description, category, location, and the date it was lost/found.
3.  **Browse Items**: View lists of currently lost or found items posted by other users.
4.  **Initiate a Request**:
    *   If you lost an item and see it posted as "found", you can send a **claim request**.
    *   If you found an item and see its owner posted it as "lost", you can send a **found request**.
5.  **Verification Process**:
    *   **If you are the Finder**: After a claim request, you will be prompted to set verification questions about the item for the claimant.
    *   **If you are the Claimant**: You will answer the verification questions posed by the finder.
6.  **Decision Making**: The item finder reviews the answers and decides to accept or reject the claim.
7.  **Chat & Item Handling**: If a request is accepted, a chat window opens between the finder and claimant to arrange a meetup. Both parties will then verify the item transfer using unique codes to mark the item as "returned".

## Technologies Used

Findora leverages a modern stack to deliver a robust and scalable solution:

| Category   | Technology         | Description                                        |
| :--------- | :----------------- | :------------------------------------------------- |
| **Backend**  | Node.js            | JavaScript runtime for server-side logic           |
|            | Express.js         | Web application framework for Node.js              |
|            | MongoDB            | NoSQL database for flexible data storage           |
|            | Mongoose           | ODM for MongoDB, simplifying data interactions     |
|            | JWT                | JSON Web Tokens for secure authentication          |
|            | bcryptjs           | Password hashing library                           |
|            | Cloudinary (Planned)| Cloud-based image and video management service     |
| **Frontend** | React              | JavaScript library for building user interfaces    |
|            | Vite               | Fast frontend development build tool               |
|            | Tailwind CSS       | Utility-first CSS framework                        |
|            | Shadcn UI          | Reusable UI components built with Tailwind CSS     |
|            | React Query        | Data fetching and caching library                  |
|            | Zustand            | Small, fast, and scalable bearbones state-management solution |
|            | React Router DOM   | Declarative routing for React                      |
|            | Axios              | Promise-based HTTP client                          |

## Contributing
We welcome contributions to Findora! To contribute:

*   🍴 **Fork the repository**.
*   🌟 **Create a new branch** for your feature or bug fix.
*   💻 **Make your changes** and ensure they adhere to the project's coding standards.
*   🧪 **Write tests** for your new code.
*   🎉 **Submit a pull request** with a clear description of your changes.

Please make sure your code is clean, well-commented, and passes all existing tests.

## License
This project is licensed under the [MIT License](LICENSE).

## Author Info
**Ahmad Ibrahim**

Connect with me:
*   LinkedIn: [Your_LinkedIn_Profile]
*   Twitter: [Your_Twitter_Handle]

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)

***
***

# Findora Backend API

## Overview
The Findora Backend API is a RESTful service built with Node.js and Express.js, leveraging MongoDB for data storage via Mongoose. It provides the core functionalities for user authentication, managing lost and found items, handling item claim/found requests, and facilitating direct messaging between users.

## Features
- `Node.js`: JavaScript runtime environment.
- `Express.js`: Web framework for API development.
- `MongoDB & Mongoose`: NoSQL database and Object Data Modeling (ODM) library.
- `JWT`: JSON Web Tokens for secure, stateless authentication.
- `bcryptjs`: Library for hashing passwords.
- `cookie-parser`: Middleware to parse incoming request cookies.
- `dotenv`: Module to load environment variables from a `.env` file.
- `Cloudinary`: (Planned for future integration) Cloud-based image and video management service.

## Getting Started
### Installation
To set up the backend locally:
1.  Navigate to the `server` directory:
    ```bash
    cd Findora/server
    ```
2.  Install the necessary Node.js packages:
    ```bash
    npm install
    ```
### Environment Variables
Create a `.env` file in the `server` directory with the following variables:
- `PORT`: Port on which the server will listen.
  - Example: `PORT=8080`
- `DATABASE_URI`: MongoDB connection string.
  - Example: `DATABASE_URI=mongodb://127.0.0.1:27017/Findora`
- `JWT_SECRET`: Secret key used for signing and verifying JWTs.
  - Example: `JWT_SECRET=your_super_secret_jwt_key_here`
- `NODE_ENV`: Application environment, affects cookie security and error verbosity.
  - Example: `NODE_ENV=development` (for local development) or `NODE_ENV=production`

## API Documentation
### Base URL
The base URL for all API endpoints is `/api/v1`.

### Endpoints

#### `POST /api/v1/user/sign-up`
Registers a new user.
**Request**:
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string",
  "username": "string"
}
```
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6b7",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "displayUsername": "johndoe",
  "email": "john.doe@example.com",
  "role": "student",
  "createdAt": "2024-03-12T12:00:00.000Z",
  "__v": 0
}
```
**Errors**:
- `400 Bad Request`: "Please add all fields", "Please enter a valid email", "User already exists", "Username unavailable. Try a different one", "Username must be atleast 4 characters long", "Username cannot contain spaces", "Username can only contain letters and numbers", "Firstname and Lastname must be atleast 4 characters long", "Password must be atleast 6 characters length", "Use of special characters is not allowed for Firstname and Lastname", "Invalid user data"

#### `POST /api/v1/user/login`
Authenticates a user and sets a JWT cookie.
**Request**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6b7",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "displayUsername": "johndoe",
  "email": "john.doe@example.com",
  "role": "student",
  "createdAt": "2024-03-12T12:00:00.000Z",
  "__v": 0
}
```
**Errors**:
- `400 Bad Request`: "Please add all fields", "Invalid user credentials"

#### `POST /api/v1/user/sign-out`
Logs out the current user by clearing the JWT cookie.
**Request**:
(No payload)
**Response**:
```json
{
  "message": "Logged out successfully"
}
```
**Errors**:
- `500 Internal Server Error`: (General server error)

#### `GET /api/v1/user`
Retrieves the profile of the authenticated user.
**Request**:
(Authenticated request, no payload)
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6b7",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "displayUsername": "johndoe",
  "email": "john.doe@example.com",
  "role": "student",
  "createdAt": "2024-03-12T12:00:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"

#### `GET /api/v1/user/:username`
Retrieves the profile of a user by their username.
**Request**:
(Authenticated request, no payload)
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6b7",
  "firstName": "Jane",
  "lastName": "Smith",
  "username": "janesmith",
  "displayUsername": "janesmith",
  "email": "jane.smith@example.com",
  "role": "student",
  "createdAt": "2024-03-12T12:00:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `404 Not Found`: "User not found"

#### `POST /api/v1/user/profile`
Updates the profile of the authenticated user.
**Request**:
```json
{
  "firstName"?: "string",
  "lastName"?: "string",
  "email"?: "string",
  "oldPassword"?: "string",
  "newPassword"?: "string",
  "department"?: "string",
  "foculty"?: "string"
}
```
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6b7",
  "firstName": "UpdatedJohn",
  "lastName": "Doe",
  "username": "johndoe",
  "displayUsername": "johndoe",
  "email": "updated.john.doe@example.com",
  "role": "student",
  "createdAt": "2024-03-12T12:00:00.000Z",
  "department": "Computer Science",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no user found", "Firstname can not contain special characters", "Firstname must be atlease 4 characters length", "Firstname is 20 characters max", "lastname can not contain special characters", "lastname must be atlease 4 characters length", "lastname is 20 characters max"
- `400 Bad Request`: "Please enter a valid email", "User already exist!", "Fill in the new password!", "Old password is incorrect", "New password must be atleast 6 characters long"

#### `GET /api/v1/items/lost`
Retrieves all items currently marked as "lost".
**Request**:
(Authenticated request, no payload)
**Response**:
```json
[
  {
    "_id": "65f0e9b3d0a1c2b3e4f5a6b8",
    "name": "Lost Wallet",
    "description": "Black leather wallet with multiple card slots.",
    "category": "Personal Items",
    "location": "Library, 2nd floor",
    "status": "lost",
    "reportedBy": "65f0e9b3d0a1c2b3e4f5a6b7",
    "dateLostOrFound": "2024-03-10T00:00:00.000Z",
    "dateReported": "2024-03-12T12:05:00.000Z",
    "createdAt": "2024-03-12T12:05:00.000Z",
    "updatedAt": "2024-03-12T12:05:00.000Z",
    "__v": 0
  }
]
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"

#### `GET /api/v1/items/found`
Retrieves all items currently marked as "found".
**Request**:
(Authenticated request, no payload)
**Response**:
```json
[
  {
    "_id": "65f0e9b3d0a1c2b3e4f5a6b9",
    "name": "Found Laptop",
    "description": "Silver MacBook Pro, 13-inch, found near cafeteria.",
    "category": "Electronics",
    "location": "Cafeteria entrance",
    "status": "found",
    "reportedBy": "65f0e9b3d0a1c2b3e4f5a6c0",
    "dateLostOrFound": "2024-03-11T00:00:00.000Z",
    "dateReported": "2024-03-12T12:10:00.000Z",
    "createdAt": "2024-03-12T12:10:00.000Z",
    "updatedAt": "2024-03-12T12:10:00.000Z",
    "__v": 0
  }
]
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"

#### `GET /api/v1/items/user/:username`
Retrieves all items reported by a specific user.
**Request**:
(Authenticated request, no payload)
**Response**:
```json
[
  {
    "_id": "65f0e9b3d0a1c2b3e4f5a6b8",
    "name": "Lost Wallet",
    "description": "Black leather wallet with multiple card slots.",
    "category": "Personal Items",
    "location": "Library, 2nd floor",
    "status": "lost",
    "reportedBy": "65f0e9b3d0a1c2b3e4f5a6b7",
    "dateLostOrFound": "2024-03-10T00:00:00.000Z",
    "dateReported": "2024-03-12T12:05:00.000Z",
    "createdAt": "2024-03-12T12:05:00.000Z",
    "updatedAt": "2024-03-12T12:05:00.000Z",
    "__v": 0
  }
]
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `404 Not Found`: "User not found"

#### `POST /api/v1/items`
Creates a new lost or found item entry.
**Request**:
```json
{
  "itemName": "string",
  "itemDescription": "string",
  "category": "Electronics" | "Books & Stationary" | "Bags & Accessories" | "Clothing & Wearables" | "ID & Cards" | "Keys & Locks" | "Documents" | "Personal Items" | "Sports & Equipment" | "Others",
  "location": "string",
  "image"?: "string",
  "status": "lost" | "found",
  "dateLostOrFound": "YYYY-MM-DDTHH:MM:SS.sssZ"
}
```
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6b8",
  "name": "Lost Keys",
  "description": "Set of car keys with a red keychain, lost near the main gate.",
  "category": "Keys & Locks",
  "location": "Main gate",
  "status": "lost",
  "reportedBy": "65f0e9b3d0a1c2b3e4f5a6b7",
  "dateLostOrFound": "2024-03-10T00:00:00.000Z",
  "dateReported": "2024-03-12T12:05:00.000Z",
  "createdAt": "2024-03-12T12:05:00.000Z",
  "updatedAt": "2024-03-12T12:05:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `404 Not Found`: "User not found!"
- `400 Bad Request`: "Please add fields!", "Item name must be atlease 3 characters long, 25 characters max", "Description must be between 20 to 200 characters", "Item name can not contain special characters", "Location must be between 10 to 150 characters", "Location can not contain special characters", "Invalid date!", "Invalid data"

#### `GET /api/v1/items`
Retrieves all items reported by the authenticated user.
**Request**:
(Authenticated request, no payload)
**Response**:
```json
[
  {
    "_id": "65f0e9b3d0a1c2b3e4f5a6b8",
    "name": "Lost Wallet",
    "description": "Black leather wallet with multiple card slots.",
    "category": "Personal Items",
    "location": "Library, 2nd floor",
    "status": "lost",
    "reportedBy": "65f0e9b3d0a1c2b3e4f5a6b7",
    "dateLostOrFound": "2024-03-10T00:00:00.000Z",
    "dateReported": "2024-03-12T12:05:00.000Z",
    "createdAt": "2024-03-12T12:05:00.000Z",
    "updatedAt": "2024-03-12T12:05:00.000Z",
    "__v": 0
  }
]
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"

#### `DELETE /api/v1/items/:id`
Deletes an item by its ID. Requires ownership.
**Request**:
(Authenticated request, no payload)
**Response**:
```json
{
  "message": "Item deleted successfully"
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `400 Bad Request`: "Invalid item ID"
- `404 Not Found`: "Item not found!"
- `403 Forbidden`: "Forbidden, Not authorized!"
- `500 Internal Server Error`: "Item deletion failed!"

#### `PATCH /api/v1/items/:id`
Updates an item by its ID. Requires ownership.
**Request**:
```json
{
  "itemName"?: "string",
  "itemDescription"?: "string",
  "category"?: "Electronics" | "Books & Stationary" | "Bags & Accessories" | "Clothing & Wearables" | "ID & Cards" | "Keys & Locks" | "Documents" | "Personal Items" | "Sports & Equipment" | "Others",
  "location"?: "string",
  "image"?: "string",
  "status"?: "lost" | "found" | "returned" | "claimed",
  "dateLostOrFound"?: "YYYY-MM-DDTHH:MM:SS.sssZ"
}
```
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6b8",
  "name": "Updated Lost Keys",
  "description": "Set of car keys with a red keychain, lost near the main gate. Updated description.",
  "category": "Keys & Locks",
  "location": "Main gate",
  "status": "lost",
  "reportedBy": "65f0e9b3d0a1c2b3e4f5a6b7",
  "dateLostOrFound": "2024-03-10T00:00:00.000Z",
  "dateReported": "2024-03-12T12:05:00.000Z",
  "createdAt": "2024-03-12T12:05:00.000Z",
  "updatedAt": "2024-03-12T12:15:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `400 Bad Request`: "Invalid item ID", "Item name must be atlease 3 characters long, 25 characters max", "Item name can not contain special characters", "Description must be between 20 to 200 characters", "Location must be between 10 to 150 characters", "Location can not contain special characters", "Invalid date!"
- `404 Not Found`: "Item not found!"
- `403 Forbidden`: "Forbidden, Not authorized!"

#### `GET /api/v1/items/:id`
Retrieves a single item by its ID.
**Request**:
(Authenticated request, no payload)
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6b8",
  "name": "Lost Wallet",
  "description": "Black leather wallet with multiple card slots.",
  "category": "Personal Items",
  "location": "Library, 2nd floor",
  "status": "lost",
  "reportedBy": "65f0e9b3d0a1c2b3e4f5a6b7",
  "dateLostOrFound": "2024-03-10T00:00:00.000Z",
  "dateReported": "2024-03-12T12:05:00.000Z",
  "createdAt": "2024-03-12T12:05:00.000Z",
  "updatedAt": "2024-03-12T12:05:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `400 Bad Request`: "Invalid item ID"
- `404 Not Found`: "Item not found!"

#### `GET /api/v1/request`
Retrieves all requests (claim or found) associated with the authenticated user.
**Request**:
(Authenticated request, no payload)
**Response**:
```json
[
  {
    "_id": "65f0e9b3d0a1c2b3e4f5a6d0",
    "itemId": "65f0e9b3d0a1c2b3e4f5a6b8",
    "requestType": "claim",
    "finderId": "65f0e9b3d0a1c2b3e4f5a6b7",
    "claimerId": "65f0e9b3d0a1c2b3e4f5a6e1",
    "status": "pending",
    "questions": [],
    "finderVerified": false,
    "claimerVerified": false,
    "createdAt": "2024-03-12T12:20:00.000Z",
    "updatedAt": "2024-03-12T12:20:00.000Z",
    "__v": 0
  }
]
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"

#### `POST /api/v1/request/claim/:id`
Sends a claim request for an item. The item must be `found` or `lost`.
**Request**:
(Authenticated request, no payload)
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6d0",
  "itemId": "65f0e9b3d0a1c2b3e4f5a6b8",
  "requestType": "claim",
  "finderId": "65f0e9b3d0a1c2b3e4f5a6b7",
  "claimerId": "65f0e9b3d0a1c2b3e4f5a6e1",
  "status": "pending",
  "questions": [],
  "finderVerified": false,
  "claimerVerified": false,
  "createdAt": "2024-03-12T12:20:00.000Z",
  "updatedAt": "2024-03-12T12:20:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `400 Bad Request`: "Invalid item ID", "You already sent a claim request for this item!"
- `404 Not Found`: "Item not found!"
- `403 Forbidden`: "You can't claim an item you posted"

#### `POST /api/v1/request/found/:id`
Sends a found request for a lost item.
**Request**:
(Authenticated request, no payload)
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6d5",
  "itemId": "65f0e9b3d0a1c2b3e4f5a6b8",
  "requestType": "found",
  "finderId": "65f0e9b3d0a1c2b3e4f5a6e1",
  "claimerId": "65f0e9b3d0a1c2b3e4f5a6b7",
  "status": "pending",
  "questions": [],
  "finderVerified": false,
  "claimerVerified": false,
  "createdAt": "2024-03-12T12:25:00.000Z",
  "updatedAt": "2024-03-12T12:25:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `400 Bad Request`: "Invalid item ID", "You already sent a found request for this item!", "Can only send a found request to a lost item"
- `404 Not Found`: "Item not found!"

#### `PUT /api/v1/request/verify/setquestion/:requestId`
Allows the item finder to set verification questions for a pending request.
**Request**:
```json
{
  "questions": [
    {
      "question": "string"
    },
    {
      "question": "string"
    }
  ]
}
```
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6d0",
  "itemId": "65f0e9b3d0a1c2b3e4f5a6b8",
  "requestType": "claim",
  "finderId": "65f0e9b3d0a1c2b3e4f5a6b7",
  "claimerId": "65f0e9b3d0a1c2b3e4f5a6e1",
  "status": "pending",
  "questions": [
    {
      "_id": "65f0e9b3d0a1c2b3e4f5a6d1",
      "question": "What color is the wallet?"
    },
    {
      "_id": "65f0e9b3d0a1c2b3e4f5a6d2",
      "question": "Are there any specific markings inside?"
    }
  ],
  "finderVerified": false,
  "claimerVerified": false,
  "createdAt": "2024-03-12T12:20:00.000Z",
  "updatedAt": "2024-03-12T12:30:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `400 Bad Request`: "Invalid request ID", "You have to ask atleast two question", "Each question must be atleast 5 characters.", "This request was already accepted", "This request was already rejected"
- `404 Not Found`: "Request not found!"
- `403 Forbidden`: "Forbidden, not authorized!", "Item request already have questions"

#### `POST /api/v1/request/verify/setanswers/:requestId`
Allows the item claimer to provide answers to verification questions.
**Request**:
```json
{
  "answers": [
    {
      "questionId": "string",
      "answer": "string"
    },
    {
      "questionId": "string",
      "answer": "string"
    }
  ]
}
```
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6d0",
  "itemId": "65f0e9b3d0a1c2b3e4f5a6b8",
  "requestType": "claim",
  "finderId": "65f0e9b3d0a1c2b3e4f5a6b7",
  "claimerId": "65f0e9b3d0a1c2b3e4f5a6e1",
  "status": "pending",
  "questions": [
    {
      "_id": "65f0e9b3d0a1c2b3e4f5a6d1",
      "question": "What color is the wallet?",
      "answer": "It is black"
    },
    {
      "_id": "65f0e9b3d0a1c2b3e4f5a6d2",
      "question": "Are there any specific markings inside?",
      "answer": "Yes, there's a small scratch on the inside flap."
    }
  ],
  "finderVerified": false,
  "claimerVerified": false,
  "createdAt": "2024-03-12T12:20:00.000Z",
  "updatedAt": "2024-03-12T12:35:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `400 Bad Request`: "Invalid request ID", "All questions needs to be answered.", "Answer should not be blank\nAll questions needs to be answered", "Invalid question ID", "This request was already accepted", "This request was already rejected", "The request is already assigned with answer\nwait for the finders decision"
- `404 Not Found`: "Request not found!", "Question not found!"
- `403 Forbidden`: "Forbidden, not authorized!"

#### `PUT /api/v1/request/verify/:requestId`
Allows the item finder to accept or reject a request based on the answers provided.
**Request**:
```json
{
  "decision": "accept" | "reject"
}
```
**Response (Accepted)**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6d0",
  "itemId": "65f0e9b3d0a1c2b3e4f5a6b8",
  "requestType": "claim",
  "finderId": "65f0e9b3d0a1c2b3e4f5a6b7",
  "claimerId": "65f0e9b3d0a1c2b3e4f5a6e1",
  "status": "accepted",
  "questions": [
    {
      "_id": "65f0e9b3d0a1c2b3e4f5a6d1",
      "question": "What color is the wallet?",
      "answer": "It is black"
    },
    {
      "_id": "65f0e9b3d0a1c2b3e4f5a6d2",
      "question": "Are there any specific markings inside?",
      "answer": "Yes, there's a small scratch on the inside flap."
    }
  ],
  "finderCode": "1234",
  "claimerCode": "5678",
  "finderVerified": false,
  "claimerVerified": false,
  "decisionAt": "2024-03-12T12:40:00.000Z",
  "createdAt": "2024-03-12T12:20:00.000Z",
  "updatedAt": "2024-03-12T12:40:00.000Z",
  "__v": 0
}
```
**Response (Rejected)**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6d0",
  "itemId": "65f0e9b3d0a1c2b3e4f5a6b8",
  "requestType": "claim",
  "finderId": "65f0e9b3d0a1c2b3e4f5a6b7",
  "claimerId": "65f0e9b3d0a1c2b3e4f5a6e1",
  "status": "rejected",
  "questions": [
    {
      "_id": "65f0e9b3d0a1c2b3e4f5a6d1",
      "question": "What color is the wallet?",
      "answer": "It is black"
    },
    {
      "_id": "65f0e9b3d0a1c2b3e4f5a6d2",
      "question": "Are there any specific markings inside?",
      "answer": "Yes, there's a small scratch on the inside flap."
    }
  ],
  "finderCode": null,
  "claimerCode": null,
  "finderVerified": false,
  "claimerVerified": false,
  "decisionAt": "2024-03-12T12:40:00.000Z",
  "createdAt": "2024-03-12T12:20:00.000Z",
  "updatedAt": "2024-03-12T12:40:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `400 Bad Request`: "Invalid request ID", "Decision can't be blank!", "Decision can either be accept or reject", "Decision can only be made when request has questions with answer", "This request was already accepted", "This request was already rejected"
- `404 Not Found`: "Request not found!"
- `403 Forbidden`: "Forbidden, not authorized!"

#### `POST /api/v1/request/handle/:requestId`
Finalizes item exchange by verifying codes from both finder and claimer.
**Request**:
```json
{
  "verification": {
    "code": "string"
  }
}
```
**Response (Partial Verification by Finder)**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6d0",
  "itemId": "65f0e9b3d0a1c2b3e4f5a6b8",
  "requestType": "claim",
  "finderId": "65f0e9b3d0a1c2b3e4f5a6b7",
  "claimerId": "65f0e9b3d0a1c2b3e4f5a6e1",
  "status": "accepted",
  "questions": [...],
  "finderCode": "1234",
  "claimerCode": "5678",
  "finderVerified": true,
  "claimerVerified": false,
  "decisionAt": "2024-03-12T12:40:00.000Z",
  "createdAt": "2024-03-12T12:20:00.000Z",
  "updatedAt": "2024-03-12T12:45:00.000Z",
  "__v": 0
}
```
**Response (Complete Verification & Item Returned)**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6d0",
  "itemId": "65f0e9b3d0a1c2b3e4f5a6b8",
  "requestType": "claim",
  "finderId": "65f0e9b3d0a1c2b3e4f5a6b7",
  "claimerId": "65f0e9b3d0a1c2b3e4f5a6e1",
  "status": "returned",
  "questions": [...],
  "finderCode": "1234",
  "claimerCode": "5678",
  "finderVerified": true,
  "claimerVerified": true,
  "decisionAt": "2024-03-12T12:40:00.000Z",
  "createdAt": "2024-03-12T12:20:00.000Z",
  "updatedAt": "2024-03-12T12:48:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `400 Bad Request`: "Invalid request ID", "Invalid code,try again.", "Claimer already verified!", "Finder already verified!"
- `404 Not Found`: "Request not found!", "Item not found!"
- `403 Forbidden`: "Forbidden, not authorized!", "Item already returned"

#### `GET /api/v1/chat/users`
Retrieves a list of users the authenticated user can chat with (i.e., those involved in accepted requests).
**Request**:
(Authenticated request, no payload)
**Response**:
```json
[
  {
    "_id": "65f0e9b3d0a1c2b3e4f5a6e1",
    "firstName": "Jane",
    "lastName": "Smith",
    "username": "janesmith",
    "displayUsername": "janesmith",
    "email": "jane.smith@example.com",
    "role": "student",
    "createdAt": "2024-03-12T12:00:00.000Z",
    "__v": 0
  }
]
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"

#### `POST /api/v1/chat/:username`
Sends a message to a specific user. Requires an existing accepted request relationship.
**Request**:
```json
{
  "message": {
    "value": "string"
  }
}
```
**Response**:
```json
{
  "_id": "65f0e9b3d0a1c2b3e4f5a6f0",
  "senderId": "65f0e9b3d0a1c2b3e4f5a6b7",
  "receiverId": "65f0e9b3d0a1c2b3e4f5a6e1",
  "text": "Hello, when can we meet?",
  "createdAt": "2024-03-12T12:50:00.000Z",
  "updatedAt": "2024-03-12T12:50:00.000Z",
  "__v": 0
}
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `404 Not Found`: "User not found!"
- `403 Forbidden`: "You can't chat with this user, you don't have any request case"
- `400 Bad Request`: "Message can't be blank"

#### `GET /api/v1/chat/:username`
Retrieves all messages exchanged with a specific user. Requires an existing accepted request relationship.
**Request**:
(Authenticated request, no payload)
**Response**:
```json
[
  {
    "_id": "65f0e9b3d0a1c2b3e4f5a6f0",
    "senderId": "65f0e9b3d0a1c2b3e4f5a6b7",
    "receiverId": "65f0e9b3d0a1c2b3e4f5a6e1",
    "text": "Hello, when can we meet?",
    "createdAt": "2024-03-12T12:50:00.000Z",
    "updatedAt": "2024-03-12T12:50:00.000Z",
    "__v": 0
  },
  {
    "_id": "65f0e9b3d0a1c2b3e4f5a6f1",
    "senderId": "65f0e9b3d0a1c2b3e4f5a6e1",
    "receiverId": "65f0e9b3d0a1c2b3e4f5a6b7",
    "text": "I'm free tomorrow afternoon.",
    "createdAt": "2024-03-12T12:51:00.000Z",
    "updatedAt": "2024-03-12T12:51:00.000Z",
    "__v": 0
  }
]
```
**Errors**:
- `401 Unauthorized`: "Not authorized, no token", "Not authorized, token failed"
- `404 Not Found`: "User not found!"
- `403 Forbidden`: "You can't chat with this user, you don't have any request case"

***