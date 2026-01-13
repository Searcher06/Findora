# Findora API 🔍

## Overview
Findora is a full-stack monorepo application designed to facilitate the recovery of lost items through a secure verification and real-time communication system. The project utilizes a Node.js Express backend with MongoDB (Mongoose) and a React frontend powered by Vite, Tailwind CSS, and Socket.io for live updates.

## Features
- **Node.js & Express**: Scalable backend architecture handling RESTful API requests and middleware integration.
- **Mongoose & MongoDB**: Schema-based data modeling for users, items, and verification requests.
- **Socket.io**: Real-time bidirectional communication for instant messaging between finders and claimers.
- **JWT & Cookie-Parser**: Secure authentication flow using JSON Web Tokens stored in HTTP-only cookies.
- **Cloudinary & Multer**: Cloud-based image management and storage for item reports and user profiles.
- **5-Digit Verification**: Proprietary handover logic requiring mutual code exchange to finalize item returns.

## Getting Started

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Searcher06/Findora
   ```

2. **Install Server Dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Run the Application**:
   - Start Server: `cd server && npm run dev`
   - Start Client: `cd client && npm run dev`

### Environment Variables
Create a `.env` file in the `server` directory with the following variables:

```env
PORT=8080
DATABASE_URI=mongodb://127.0.0.1:27017/Findora
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

## API Documentation

### Base URL
`http://localhost:8080/api/v1`

### Endpoints

#### [POST] /user/sign-up
**Request**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "username": "johndoe123",
  "password": "StrongPassword123"
}
```
**Response**:
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe123",
  "email": "john.doe@example.com",
  "role": "student"
}
```
**Errors**:
- 400: User already exists or validation failed

#### [POST] /user/login
**Request**:
```json
{
  "email": "john.doe@example.com",
  "password": "StrongPassword123"
}
```
**Response**:
```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "username": "johndoe123",
  "email": "john.doe@example.com"
}
```
**Errors**:
- 400: Invalid credentials

#### [POST] /user/profile (Auth Required)
**Request**:
```form-data
firstName: "UpdatedName"
image: [File Binary]
```
**Response**:
```json
{
  "firstName": "UpdatedName",
  "profilePic": "https://cloudinary.com/path/to/img.jpg"
}
```

#### [GET] /items
**Request**:
Query Params: `category` (optional), `date` (optional: latest, oldest, last7, last30)
**Response**:
```json
[
  {
    "_id": "item_id",
    "name": "iPhone 13",
    "status": "lost",
    "location": "Library",
    "reportedBy": "user_id"
  }
]
```

#### [POST] /items (Auth Required)
**Request**:
```form-data
itemName: "Silver Watch"
itemDescription: "Lost near the sports complex"
category: "Personal Items"
location: "Sports Complex"
status: "lost"
dateLostOrFound: "2025-01-20"
image: [File Binary]
```
**Response**:
```json
{
  "_id": "new_item_id",
  "name": "Silver Watch",
  "image": "url_string",
  "status": "lost"
}
```

#### [PATCH] /items/:id (Auth Required - Owner Only)
**Request**:
```json
{
  "status": "claimed"
}
```
**Response**:
```json
{
  "_id": "item_id",
  "status": "claimed"
}
```

#### [POST] /request/claim/:id (Auth Required)
**Request**:
URL Param: `id` (Item ID)
**Response**:
```json
{
  "_id": "request_id",
  "requestType": "claim",
  "status": "pending",
  "itemId": "item_id"
}
```
**Errors**:
- 400: Request already exists

#### [POST] /request/accept/:requestId (Auth Required - Finder Only)
**Request**:
URL Param: `requestId`
**Response**:
```json
{
  "_id": "request_id",
  "status": "accepted",
  "finderCode": "12345",
  "claimerCode": "67890"
}
```

#### [POST] /request/handle/:requestId (Auth Required)
**Request**:
```json
{
  "code": "12345"
}
```
**Response**:
```json
{
  "_id": "request_id",
  "status": "returned",
  "finderVerified": true,
  "claimerVerified": true
}
```
**Errors**:
- 400: Invalid code

#### [GET] /chat/:requestId/:username (Auth Required)
**Request**:
URL Params: `requestId`, `username`
**Response**:
```json
[
  {
    "senderId": "user_id",
    "text": "Hello, I found your item.",
    "image": null,
    "createdAt": "timestamp"
  }
]
```

#### [POST] /chat/:requestId/:username (Auth Required)
**Request**:
```form-data
text: "Here is a photo of the item"
image: [File Binary]
```
**Response**:
```json
{
  "senderId": "user_id",
  "text": "Here is a photo of the item",
  "image": "cloudinary_url"
}
```

## Technologies Used

| Technology | Purpose | Link |
| :--- | :--- | :--- |
| **Express.js** | Web Framework | [expressjs.com](https://expressjs.com/) |
| **Mongoose** | MongoDB ODM | [mongoosejs.com](https://mongoosejs.com/) |
| **React** | Frontend Library | [react.dev](https://react.dev/) |
| **Socket.io** | Real-time Communication | [socket.io](https://socket.io/) |
| **Tailwind CSS** | Utility-first CSS | [tailwindcss.com](https://tailwindcss.com/) |
| **Cloudinary** | Image Storage | [cloudinary.com](https://cloudinary.com/) |
| **Zustand** | State Management | [zustand-demo.pmnd.rs](https://zustand-demo.pmnd.rs/) |

## Contributing
- 🛠️ Fork the repository and create your feature branch.
- 🧪 Ensure all API endpoints are tested with Postman.
- 🧹 Follow the established ESLint configurations for clean code.
- 📝 Submit a detailed Pull Request describing your changes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author Info
- **Ahmad Ibrahim**
- Github: [@Searcher06](https://github.com/Searcher06)
- LinkedIn: [Placeholder]
- Twitter: [Placeholder]

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)