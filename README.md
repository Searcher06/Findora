# Findora

Findora is a dedicated platform for university communities to manage lost and found items. It provides a secure and intuitive way for students, faculty, and staff to report lost belongings or found items, connect with owners through verified chat, and facilitate a trustworthy handover process. Our goal is to streamline item recovery on campus, fostering a more connected and honest environment.

## Overview

This project helps university students and staff easily recover lost items or report found ones. It's built to simplify the whole process, from posting a lost ID card to getting your backpack back, all while ensuring that interactions are secure and private. No more paper posters or endless emails – just a straightforward system that connects people directly.

## Installation

Let's get Findora up and running on your machine. You'll want to clone the repository first, then set up the client and server separately.

### 1. Clone the Repository

First, grab the code from GitHub:

```bash
git clone https://github.com/Searcher06/Findora.git
cd Findora
```

### 2. Set up the Server

Navigate into the `server` directory and install its dependencies. You'll also need to create a `.env` file for environment variables.

```bash
cd server
npm install # or yarn install
```

Create a `.env` file in the `server` directory and add the following variables. Remember to replace the placeholder values with your actual configuration.

```
PORT=8080
DATABASE_URI="mongodb://127.0.0.1:27017/Findora"
JWT_SECRET="your_jwt_secret_key"
CLIENT_URL="http://localhost:5173" # Or your client's URL in production
CLIENT_URLS="http://localhost:5173,http://your-production-client.com" # Comma-separated list for CORS

# Cloudinary for image storage
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# Email Service (e.g., SendGrid, Mailgun API URL)
EMAIL_SERVICE_URL="http://your-email-service-provider-api-url"

# Web Push Notifications (VAPID keys)
VAPID_PUBLIC_KEY="your_vapid_public_key"
VAPID_PRIVATE_KEY="your_vapid_private_key"
VAPID_EMAIL="mailto:your-email@example.com"

# WhatsApp Notifications (using wawp.net or similar)
WAWP_INSTANCE_ID="your_wawp_instance_id"
WAWP_ACCESS_TOKEN="your_wawp_access_token"
```

Then, start the server:

```bash
npm run dev # or yarn dev
```

The server should now be running on `http://localhost:8080`.

### 3. Set up the Client

Open a new terminal window, navigate into the `client` directory, install its dependencies, and start the development server.

```bash
cd ../client
npm install # or yarn install
```

The client also needs a `.env` file, primarily for the server API URL. Create a `.env` file in the `client` directory:

```
VITE_SOCKET_URL="http://localhost:8080" # Or your server's URL
```

Now, launch the client:

```bash
npm run dev # or yarn dev
```

The client application will typically open in your browser at `http://localhost:5173`.

## Usage

Once both the client and server are running, you can start using Findora.

### As a User:

1.  **Sign Up / Log In**: Register for a new account or sign in with your credentials. You'll receive an email verification link to activate your account.
2.  **Browse Items**: On the homepage, you can browse items that have been reported as lost or found by others in the campus community. Use filters for categories and dates, and search by keywords.
3.  **Report an Item**:
    *   If you've **lost** something, click "Report Item" and select "I Lost an Item." Fill out the details like item name, description, category, location, and the date it was lost. You can also upload a photo.
    *   If you've **found** something, click "Report Item" and select "I Found an Item." Provide details about the item and where and when you found it.
4.  **Claim / Mark as Found**:
    *   If you see an item listed as "Found" that belongs to you, you can initiate a "Claim This Item" request from its detail page.
    *   If you see an item listed as "Lost" that you believe you've found, you can initiate a "Mark as found" request.
5.  **Chat and Verify**: Once a request is accepted by the other party, a secure chat channel opens. Here, you can discuss details, and the item's owner/finder can ask verification questions (e.g., "What's unique about this item?") to confirm ownership.
6.  **Handover**: When you meet in person, you'll exchange unique 5-digit codes within the app to securely verify the item's return. This earns both parties trust points.
7.  **Profile & Leaderboard**: View your personal profile, update your academic info, and see your trust points and successful returns. Check out the Trust Leaderboard to see top contributors in the community.
8.  **Notifications**: Receive real-time updates on your requests and claims. You can also enable push notifications for important alerts.
9.  **Report Abuse**: If you encounter any suspicious activity or inappropriate content, you can report it to the administrators for review.

### As an Admin/Moderator:

If you have an admin or moderator role, log in and navigate to the `/admin` route. From the admin dashboard, you can:
*   View overview statistics of users, items, and requests.
*   Manage user accounts (suspend, reactivate).
*   Moderate items (hide, unhide, delete).
*   Force-close requests.
*   Review and manage submitted flags/reports.
*   View a log of all administrative actions.

---

No screenshots were found in the project's public folders.

## Features

*   **Lost & Found Item Reporting**: Easily submit details and photos for lost or found items.
*   **Intuitive Item Browsing**: Filter and search through item listings to quickly find what you're looking for.
*   **Secure Claim & Found Requests**: Initiate a formal process to claim an item or inform an owner you've found theirs.
*   **Real-time Chat**: Communicate directly and securely with the other party once a request is accepted.
*   **Two-Factor Handover Verification**: A unique 5-digit code exchange ensures items are returned to the rightful owner.
*   **Campus Trust System**: Earn trust points and badges for successful, verified item returns, appearing on a public leaderboard.
*   **User Profiles**: Manage personal information, academic details, and track your reporting history.
*   **Email & Push Notifications**: Stay updated on crucial activities related to your items and requests.
*   **WhatsApp Notifications**: Opt-in to receive important alerts via WhatsApp.
*   **Admin & Moderation Dashboard**: Tools for administrators to oversee user activity, manage item listings, handle requests, and review user-submitted flags.
*   **Robust Authentication**: Secure sign-up, login, password reset, and email verification processes.

## Technologies Used

| Category | Technology | Description |
| :------- | :--------- | :---------- |
| **Frontend** | React (Vite) | A JavaScript library for building user interfaces, bundled with Vite for a fast development experience. |
| | TypeScript | A typed superset of JavaScript that compiles to plain JavaScript. |
| | Tailwind CSS | A utility-first CSS framework for rapidly building custom designs. |
| | Radix UI | A set of unstyled, accessible UI components. |
| | Zustand | A small, fast, and scalable bear-necessities state-management solution. |
| | React Router DOM | Declarative routing for React.js. |
| | Axios | Promise-based HTTP client for the browser and Node.js. |
| | TanStack Query | Powerful asynchronous state management for React. |
| | Next-themes | Themeing library for React apps. |
| | Socket.IO Client | Real-time bidirectional event-based communication. |
| **Backend** | Node.js | JavaScript runtime for server-side execution. |
| | Express | Fast, unopinionated, minimalist web framework for Node.js. |
| | MongoDB | A NoSQL document database for storing application data. |
| | Mongoose | MongoDB object data modeling (ODM) library for Node.js. |
| | Socket.IO | Real-time bidirectional event-based communication server. |
| | bcryptjs | A library to help hash passwords. |
| | Cloudinary | Cloud-based image and video management. |
| | cookie-parser | Parse Cookie header and populate `req.cookies`. |
| | CORS | Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. |
| | dotenv | Loads environment variables from a `.env` file. |
| | express-rate-limit | Basic IP rate-limiting middleware for Express. |
| | Helmet | Helps secure Express apps by setting various HTTP headers. |
| | jsonwebtoken | JSON Web Token implementation for Node.js. |
| | Multer | Middleware for handling `multipart/form-data`, primarily used for uploading files. |
| | web-push | Node.js library for sending Web Push Notifications. |
| | axios | HTTP client for making API requests. |

## API Documentation

The Findora backend provides a comprehensive set of API endpoints for managing users, items, claims, messages, and administrative tasks. All endpoints require authentication unless specified otherwise.

### Authentication

Most endpoints require a valid JSON Web Token (JWT) provided in an `HttpOnly` cookie named `token`. This token is issued upon successful user login or sign-up.

### Environment Variables

The server relies on the following environment variables:

*   `PORT`: Port for the server to listen on (e.g., `8080`).
*   `DATABASE_URI`: MongoDB connection string (e.g., `mongodb://127.0.0.1:27017/Findora`).
*   `JWT_SECRET`: Secret key for signing and verifying JWTs.
*   `CLIENT_URL`: The base URL of the client application (e.g., `http://localhost:5173`). Used for email verification/reset links.
*   `CLIENT_URLS`: Comma-separated list of allowed client origins for CORS (e.g., `http://localhost:5173,https://your-production-client.com`).
*   `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name for image uploads.
*   `CLOUDINARY_API_KEY`: Cloudinary API key.
*   `CLOUDINARY_API_SECRET`: Cloudinary API secret.
*   `EMAIL_SERVICE_URL`: URL of the external email sending service API.
*   `VAPID_PUBLIC_KEY`: Public key for Web Push Notifications.
*   `VAPID_PRIVATE_KEY`: Private key for Web Push Notifications.
*   `VAPID_EMAIL`: Contact email for VAPID (e.g., `mailto:your-email@example.com`).
*   `WAWP_INSTANCE_ID`: Instance ID for the WhatsApp API (e.g., wawp.net).
*   `WAWP_ACCESS_TOKEN`: Access token for the WhatsApp API.

---

### User Endpoints (`/api/v1/user`)

#### `POST /api/v1/user/sign-up`
**Description**: Registers a new user account. Includes email verification.
**Authentication**: None
**Rate Limit**: 20 requests per 15 minutes
**Request**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "john.doe@example.com",
  "password": "securepassword123",
  "whatsappPhone": "+1234567890"
}
```
**Response**:
```json
{
  "_id": "6583626349568ab085513b9",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "displayUsername": "johndoe",
  "email": "john.doe@example.com",
  "isVerified": false,
  "role": "student",
  "trustPoints": 0,
  "successfulReturns": 0,
  "hasVerifiedReturnBadge": false,
  "department": "",
  "foculty": "",
  "whatsappPhone": "+1234567890",
  "createdAt": "2023-01-01T12:00:00.000Z",
  "tokenVersion": 0
}
```
**Errors**:
*   400: "Please add all fields", "Please enter a valid email", "User already exists", "Username unavailable. Try a different one", "Username must be atleast 4 characters long", "Username cannot contain spaces", "Username can only contain letters and numbers", "Firstname and Lastname must be atleast 4 characters long", "Password must be atleast 6 characters length", "Use of special characters is not allowed for Firstname and Lastname", "Phone number must be in international format (e.g. +2347012345678)"
*   500: "An error occurred"

#### `POST /api/v1/user/login`
**Description**: Authenticates a user and issues a JWT cookie.
**Authentication**: None
**Rate Limit**: 20 requests per 15 minutes
**Request**:
```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```
**Response**:
```json
{
  "_id": "6583626349568ab085513b9",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "displayUsername": "johndoe",
  "email": "john.doe@example.com",
  "isVerified": true,
  "role": "student",
  "trustPoints": 10,
  "successfulReturns": 1,
  "hasVerifiedReturnBadge": true,
  "department": "Computer Science",
  "foculty": "Engineering",
  "whatsappPhone": "+1234567890",
  "createdAt": "2023-01-01T12:00:00.000Z",
  "tokenVersion": 0
}
```
**Errors**:
*   400: "Please add all fields", "Invalid user credentials"
*   403: "Your account has been suspended"

#### `POST /api/v1/user/sign-out`
**Description**: Logs out the current user by clearing the JWT cookie.
**Authentication**: Required
**Request**: None
**Response**:
```json
{
  "message": "Logged out successfully"
}
```
**Errors**:
*   401: "Not authorized, no token"
*   500: "Failed to logout"

#### `POST /api/v1/user/verify-email`
**Description**: Verifies a user's email address using a provided token.
**Authentication**: None
**Request**:
```json
{
  "token": "verification_token_from_email"
}
```
**Response**:
```json
{
  "message": "Email verified successfully"
}
```
**Errors**:
*   400: "Invalid or expired token"

#### `POST /api/v1/user/resend-email`
**Description**: Resends an email verification link.
**Authentication**: None
**Request**:
```json
{
  "email": "john.doe@example.com"
}
```
**Response**:
```json
{
  "message": "Verification email sent"
}
```
**Errors**:
*   400: "Please provide an email", "Email is already verified"
*   404: "User not found"

#### `POST /api/v1/user/forgot-password`
**Description**: Sends a password reset link to the user's email.
**Authentication**: None
**Rate Limit**: 20 requests per 15 minutes
**Request**:
```json
{
  "email": "john.doe@example.com"
}
```
**Response**:
```json
{
  "message": "If that email exists, a password reset link has been sent"
}
```
**Errors**:
*   400: "Please provide an email"

#### `POST /api/v1/user/reset-password`
**Description**: Resets the user's password using a valid reset token.
**Authentication**: None
**Rate Limit**: 20 requests per 15 minutes
**Request**:
```json
{
  "token": "password_reset_token_from_email",
  "password": "new_secure_password"
}
```
**Response**:
```json
{
  "message": "Password reset successful. Please login with your new password"
}
```
**Errors**:
*   400: "Token and password are required", "Password must be atleast 6 characters long", "Invalid or expired reset token"

#### `POST /api/v1/user/change-password`
**Description**: Allows an authenticated user to change their password.
**Authentication**: Required
**Request**:
```json
{
  "currentPassword": "old_password",
  "newPassword": "brand_new_password"
}
```
**Response**:
```json
{
  "message": "Password changed successfully"
}
```
**Errors**:
*   400: "Current password and new password are required", "New password must be atleast 6 characters long", "Current password is incorrect", "New password must be different from current password"
*   401: "Not authorized, no token"
*   404: "User not found"

#### `GET /api/v1/user`
**Description**: Retrieves the profile of the currently authenticated user.
**Authentication**: Required
**Request**: None
**Response**:
```json
{
  "_id": "6583626349568ab085513b9",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "displayUsername": "johndoe",
  "email": "john.doe@example.com",
  "isVerified": true,
  "role": "student",
  "trustPoints": 10,
  "successfulReturns": 1,
  "hasVerifiedReturnBadge": true,
  "department": "Computer Science",
  "foculty": "Engineering",
  "whatsappPhone": "+1234567890",
  "createdAt": "2023-01-01T12:00:00.000Z",
  "tokenVersion": 0
}
```
**Errors**:
*   401: "Not authorized, no token"

#### `GET /api/v1/user/leaderboard`
**Description**: Retrieves the trust leaderboard, ranking users by successful handovers.
**Authentication**: Required
**Query Parameters**:
*   `limit` (optional): Number of users to return (default: 20, max: 100).
**Request**: None
**Response**:
```json
[
  {
    "rank": 1,
    "_id": "6583626349568ab085513b9",
    "firstName": "Alice",
    "lastName": "Smith",
    "username": "alicesmith",
    "displayUsername": "alicesmith",
    "profilePic": "https://example.com/profile1.jpg",
    "role": "student",
    "trustPoints": 50,
    "successfulReturns": 5,
    "hasVerifiedReturnBadge": true,
    "createdAt": "2023-01-01T12:00:00.000Z"
  }
]
```
**Errors**:
*   401: "Not authorized, no token"

#### `GET /api/v1/user/:username`
**Description**: Retrieves the public profile of a user by their username.
**Authentication**: Required
**Request**: None
**Response**:
```json
{
  "_id": "6583626349568ab085513b9",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "displayUsername": "johndoe",
  "profilePic": "https://example.com/johndoe.jpg",
  "role": "student",
  "trustPoints": 10,
  "successfulReturns": 1,
  "hasVerifiedReturnBadge": true,
  "department": "Computer Science",
  "foculty": "Engineering",
  "createdAt": "2023-01-01T12:00:00.000Z"
}
```
**Errors**:
*   401: "Not authorized, no token"
*   404: "User not found"

#### `POST /api/v1/user/profile`
**Description**: Updates the profile of the current user, including academic info and profile picture.
**Authentication**: Required
**Content-Type**: `multipart/form-data`
**Request**:
```form-data
firstName: "Updated John"
lastName: "Updated Doe"
department: "New Department"
foculty: "New Faculty"
whatsappPhone: "+19876543210"
image: [file] # Optional: profile picture file
```
**Response**:
```json
{
  "_id": "6583626349568ab085513b9",
  "firstName": "Updated John",
  "lastName": "Updated Doe",
  "username": "johndoe",
  "displayUsername": "johndoe",
  "email": "john.doe@example.com",
  "isVerified": true,
  "role": "student",
  "trustPoints": 10,
  "successfulReturns": 1,
  "hasVerifiedReturnBadge": true,
  "department": "New Department",
  "foculty": "New Faculty",
  "whatsappPhone": "+19876543210",
  "profilePic": "https://res.cloudinary.com/your_cloud/image/upload/v12345/profile_pics/new_profile.jpg",
  "createdAt": "2023-01-01T12:00:00.000Z",
  "tokenVersion": 1
}
```
**Errors**:
*   400: "Firstname can not contain special characters", "Firstname must be atleast 4 characters length", "Firstname is 20 characters max", "lastname can not contain special characters", "lastname must be atleast 4 characters length", "lastname is 20 characters max", "Please enter a valid email", "User already exist!", "Fill in the new password!", "Old password is incorrect", "New password must be atleast 6 characters long", "Phone number must be in international format (e.g. +2347012345678)", "Uploaded file is not an image", "File size must be less than 5MB", "File data is corrupted"
*   401: "Not authorized, no user found"

---

### Item Endpoints (`/api/v1/items`)

#### `POST /api/v1/items`
**Description**: Creates a new lost or found item report.
**Authentication**: Required
**Content-Type**: `multipart/form-data`
**Request**:
```form-data
itemName: "Blue Water Bottle"
itemDescription: "Hydro Flask, blue, with a sticker of a mountain."
category: "Others"
location: "University Library, 2nd Floor"
status: "lost"
dateLostOrFound: "2024-03-15T10:00:00Z"
image: [file] # Optional image file
```
**Response**:
```json
{
  "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
  "name": "Blue Water Bottle",
  "description": "Hydro Flask, blue, with a sticker of a mountain.",
  "category": "Others",
  "location": "University Library, 2nd Floor",
  "image": "https://res.cloudinary.com/your_cloud/image/upload/item_image.jpg",
  "imagePublicId": "item_image_public_id",
  "status": "lost",
  "reportedBy": "6583626349568ab085513b9",
  "isHidden": false,
  "expiryWarningSent": false,
  "resolvedByOwner": false,
  "dateLostOrFound": "2024-03-15T10:00:00.000Z",
  "dateReported": "2024-03-15T12:30:00.000Z",
  "createdAt": "2024-03-15T12:30:00.000Z",
  "updatedAt": "2024-03-15T12:30:00.000Z"
}
```
**Errors**:
*   400: "Please add fields!", "Item name must be atlease 3 characters long, 25 characters max", "Description must be between 10 to 200 characters", "Item name can not contain special characters", "Location must be between 10 to 150 characters", "Location can not contain special characters", "Date cannot be in the future! Please select today or a past date", "Uploaded file is not an image", "File size must be less than 5MB", "File data is corrupted", "Invalid data"
*   401: "Not authorized, no token"
*   404: "User not found!"

#### `GET /api/v1/items`
**Description**: Retrieves a paginated list of all public (not hidden) items, with optional filters.
**Authentication**: Required
**Query Parameters**:
*   `category` (optional): Filter by item category (e.g., `Electronics`).
*   `date` (optional): Filter by report date (`latest`, `oldest`, `last7`, `last30`).
*   `search` (optional): Search by item name, location, description, or category.
*   `status` (optional): Filter by item status (`lost`, `found`, `claimed`, `returned`).
*   `page` (optional): Current page number (default: 1).
*   `limit` (optional): Number of items per page (default: 12, max: 50).
**Request**: None
**Response**:
```json
{
  "items": [
    {
      "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
      "name": "Blue Water Bottle",
      "description": "Hydro Flask, blue, with a sticker of a mountain.",
      "category": "Others",
      "location": "University Library, 2nd Floor",
      "image": "https://res.cloudinary.com/your_cloud/image/upload/item_image.jpg",
      "status": "lost",
      "reportedBy": "6583626349568ab085513b9",
      "dateLostOrFound": "2024-03-15T10:00:00.000Z",
      "dateReported": "2024-03-15T12:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  }
}
```
**Errors**:
*   401: "Not authorized, no token"
*   500: "failed to load items"

#### `GET /api/v1/items/lost`
**Description**: Retrieves all public items with status 'lost'.
**Authentication**: Required
**Request**: None
**Response**:
```json
[
  {
    "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
    "name": "Blue Water Bottle",
    "description": "Hydro Flask, blue, with a sticker of a mountain.",
    "category": "Others",
    "location": "University Library, 2nd Floor",
    "image": "https://res.cloudinary.com/your_cloud/image/upload/item_image.jpg",
    "status": "lost",
    "reportedBy": "6583626349568ab085513b9",
    "dateLostOrFound": "2024-03-15T10:00:00.000Z",
    "dateReported": "2024-03-15T12:30:00.000Z"
  }
]
```
**Errors**:
*   401: "Not authorized, no token"

#### `GET /api/v1/items/found`
**Description**: Retrieves all public items with status 'found'.
**Authentication**: Required
**Request**: None
**Response**:
```json
[
  {
    "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
    "name": "Red Backpack",
    "description": "Nike backpack, red, with a small tear on the side.",
    "category": "Bags & Accessories",
    "location": "Student Union Hall",
    "image": "https://res.cloudinary.com/your_cloud/image/upload/backpack_image.jpg",
    "status": "found",
    "reportedBy": "6583626349568ab085513b9",
    "dateLostOrFound": "2024-03-10T09:00:00.000Z",
    "dateReported": "2024-03-10T11:00:00.000Z"
  }
]
```
**Errors**:
*   401: "Not authorized, no token"

#### `GET /api/v1/items/user/:username`
**Description**: Retrieves all public items reported by a specific user (by username).
**Authentication**: Required
**Request**: None
**Response**:
```json
[
  {
    "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
    "name": "Blue Water Bottle",
    "description": "Hydro Flask, blue, with a sticker of a mountain.",
    "category": "Others",
    "location": "University Library, 2nd Floor",
    "image": "https://res.cloudinary.com/your_cloud/image/upload/item_image.jpg",
    "status": "lost",
    "reportedBy": "6583626349568ab085513b9",
    "dateLostOrFound": "2024-03-15T10:00:00.000Z",
    "dateReported": "2024-03-15T12:30:00.000Z"
  }
]
```
**Errors**:
*   401: "Not authorized, no token"
*   404: "User not found"

#### `GET /api/v1/items/user`
**Description**: Retrieves all items (including hidden/resolved) reported by the currently authenticated user.
**Authentication**: Required
**Request**: None
**Response**:
```json
[
  {
    "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
    "name": "Blue Water Bottle",
    "description": "Hydro Flask, blue, with a sticker of a mountain.",
    "category": "Others",
    "location": "University Library, 2nd Floor",
    "image": "https://res.cloudinary.com/your_cloud/image/upload/item_image.jpg",
    "status": "lost",
    "reportedBy": "6583626349568ab085513b9",
    "isHidden": false,
    "resolvedByOwner": false,
    "dateLostOrFound": "2024-03-15T10:00:00.000Z",
    "dateReported": "2024-03-15T12:30:00.000Z"
  }
]
```
**Errors**:
*   401: "Not authorized, no token"

#### `POST /api/v1/items/:id/resolve`
**Description**: Marks an item as resolved by its owner, hiding it from public listings.
**Authentication**: Required (owner only)
**Request**:
```json
{
  "reason": "Found it myself"
}
```
**Response**:
```json
{
  "message": "Item resolved successfully",
  "item": {
    "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
    "name": "Blue Water Bottle",
    "status": "lost",
    "isHidden": true,
    "resolvedByOwner": true,
    "resolvedReason": "Found it myself",
    "resolvedAt": "2024-03-20T14:00:00.000Z"
    // ... other item fields
  }
}
```
**Errors**:
*   400: "Invalid item ID", "Please select a valid reason", "Only active lost or found items can be resolved"
*   401: "Not authorized, no token"
*   403: "Forbidden, Not authorized!"
*   404: "Item not found!"

#### `DELETE /api/v1/items/:id`
**Description**: Deletes an item from the database.
**Authentication**: Required (owner only)
**Request**: None
**Response**:
```json
{
  "message": "Item deleted successfully"
}
```
**Errors**:
*   400: "Invalid item ID"
*   401: "Not authorized, no token"
*   403: "Forbidden, Not authorized!", "Item can't be deleted, It has already been claimed"
*   404: "Item not found!"
*   409: "Item cannot be deleted because it is linked to one or more requests"
*   500: "Item deletion failed!"

#### `PATCH /api/v1/items/:id`
**Description**: Updates an existing item's details.
**Authentication**: Required (owner only)
**Content-Type**: `multipart/form-data`
**Request**:
```form-data
itemName: "Updated Blue Water Bottle"
itemDescription: "Updated description..."
category: "Electronics"
location: "New Location"
status: "found"
dateLostOrFound: "2024-03-16T10:00:00Z"
image: [new_file] # Optional: new image file
removeImage: "true" # Optional: set to "true" to remove existing image
```
**Response**:
```json
{
  "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
  "name": "Updated Blue Water Bottle",
  "description": "Updated description...",
  "category": "Electronics",
  "location": "New Location",
  "image": "https://res.cloudinary.com/your_cloud/image/upload/updated_item_image.jpg",
  "status": "found",
  "reportedBy": "6583626349568ab085513b9",
  "dateLostOrFound": "2024-03-16T10:00:00.000Z",
  "dateReported": "2024-03-15T12:30:00.000Z",
  "updatedAt": "2024-03-17T09:00:00.000Z"
  // ... other item fields
}
```
**Errors**:
*   400: "Invalid item ID", "Item name must be atlease 3 characters long, 25 characters max", "Item name can not contain special characters", "Description must be between 20 to 200 characters", "Location must be between 10 to 150 characters", "Location can not contain special characters", "Invalid date!", "Uploaded file is not an image", "File size must be less than 5MB", "File data is corrupted"
*   401: "Not authorized, no token"
*   403: "Forbidden, Not authorized!"
*   404: "Item not found!"
*   503: "Image upload timed out. Please try again with a smaller image or better network."

#### `GET /api/v1/items/:id`
**Description**: Retrieves details for a single item by its ID.
**Authentication**: Required
**Request**: None
**Response**:
```json
{
  "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
  "name": "Blue Water Bottle",
  "description": "Hydro Flask, blue, with a sticker of a mountain.",
  "category": "Others",
  "location": "University Library, 2nd Floor",
  "image": "https://res.cloudinary.com/your_cloud/image/upload/item_image.jpg",
  "status": "lost",
  "reportedBy": {
    "_id": "6583626349568ab085513b9",
    "firstName": "John",
    "lastName": "Doe",
    "profilePic": "https://example.com/johndoe.jpg",
    "username": "johndoe"
  },
  "isHidden": false,
  "dateLostOrFound": "2024-03-15T10:00:00.000Z",
  "dateReported": "2024-03-15T12:30:00.000Z",
  "createdAt": "2024-03-15T12:30:00.000Z",
  "updatedAt": "2024-03-15T12:30:00.000Z"
}
```
**Errors**:
*   400: "Invalid item ID"
*   401: "Not authorized, no token"
*   404: "Item not found!"

---

### Request Endpoints (`/api/v1/request`)

#### `GET /api/v1/request`
**Description**: Retrieves all item requests (claims or found reports) associated with the authenticated user, excluding conversation details.
**Authentication**: Required
**Request**: None
**Response**:
```json
[
  {
    "_id": "65f7d1d2e3f4a5b6c7d8e9f0",
    "itemId": {
      "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
      "name": "Blue Water Bottle",
      "image": "https://res.cloudinary.com/your_cloud/image/upload/item_image.jpg"
    },
    "requestType": "claim",
    "finderId": {
      "_id": "6583626349568ab085513b9",
      "firstName": "Jane",
      "lastName": "Smith",
      "username": "janesmith",
      "profilePic": "https://example.com/jane.jpg"
    },
    "claimerId": {
      "_id": "6583626349568ab085513ba",
      "firstName": "John",
      "lastName": "Doe",
      "username": "johndoe",
      "profilePic": "https://example.com/john.jpg"
    },
    "status": "pending",
    "lastSeen": {
      "finder": "2024-03-18T10:00:00.000Z",
      "claimer": "2024-03-18T09:55:00.000Z"
    },
    "lastMessage": {
      "text": "I believe this item belongs to me...",
      "senderId": "6583626349568ab085513ba"
    },
    "lastMessageAt": "2024-03-18T10:00:00.000Z",
    "createdAt": "2024-03-18T09:50:00.000Z",
    "updatedAt": "2024-03-18T10:00:00.000Z"
  }
]
```
**Errors**:
*   401: "Not authorized, no token"

#### `GET /api/v1/request/:requestId`
**Description**: Retrieves a single request by its ID.
**Authentication**: Required
**Request**: None
**Response**:
```json
{
  "_id": "65f7d1d2e3f4a5b6c7d8e9f0",
  "itemId": {
    "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
    "name": "Blue Water Bottle",
    "image": "https://res.cloudinary.com/your_cloud/image/upload/item_image.jpg",
    "status": "lost",
    "reportedBy": "6583626349568ab085513ba"
  },
  "requestType": "claim",
  "finderId": {
    "_id": "6583626349568ab085513ba",
    "firstName": "Jane",
    "lastName": "Smith",
    "username": "janesmith",
    "profilePic": "https://example.com/jane.jpg"
  },
  "claimerId": {
    "_id": "6583626349568ab085513b9",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "profilePic": "https://example.com/john.jpg"
  },
  "participants": ["6583626349568ab085513ba", "6583626349568ab085513b9"],
  "status": "pending",
  "finderVerified": false,
  "claimerVerified": false,
  "conversation": [
    {
      "senderId": "6583626349568ab085513b9",
      "receiverId": "6583626349568ab085513ba",
      "text": "[SYSTEM]: New Claim Request for \"Blue Water Bottle\". I believe this item belongs to me and would like to verify.",
      "createdAt": "2024-03-18T09:50:00.000Z"
    }
  ],
  "lastSeen": {
    "finder": "2024-03-18T10:00:00.000Z",
    "claimer": "2024-03-18T09:55:00.000Z"
  },
  "lastMessage": {
    "text": "I believe this item belongs to me...",
    "senderId": "6583626349568ab085513b9"
  },
  "lastMessageAt": "2024-03-18T10:00:00.000Z",
  "createdAt": "2024-03-18T09:50:00.000Z",
  "updatedAt": "2024-03-18T10:00:00.000Z"
}
```
**Errors**:
*   400: "Invalid request ID"
*   401: "Not authorized, no token"
*   404: "Request not found!"

#### `POST /api/v1/request/claim/:id`
**Description**: Sends a claim request for a found item.
**Authentication**: Required (user must not be the item's reporter)
**Request**: None
**Response**:
```json
{
  "_id": "65f7d1d2e3f4a5b6c7d8e9f0",
  "itemId": "65f7c3c5a7b8c9d0e1f2g3h4",
  "requestType": "claim",
  "finderId": "6583626349568ab085513ba",
  "claimerId": "6583626349568ab085513b9",
  "status": "pending",
  "lastMessage": {
    "text": "[SYSTEM]: New Claim Request for \"Blue Water Bottle\". I believe this item belongs to me and would like to verify.",
    "senderId": "6583626349568ab085513b9"
  },
  "lastMessageAt": "2024-03-18T10:00:00.000Z",
  "lastSeen": {
    "claimer": "2024-03-18T10:00:00.000Z",
    "finder": "1970-01-01T00:00:00.000Z"
  }
  // ... other request fields
}
```
**Errors**:
*   400: "Invalid item ID", "You already sent a request for this item!"
*   401: "Not authorized, no token"
*   403: "Forbidden, Not authorized!", "This item is not available for requests"

#### `POST /api/v1/request/found/:id`
**Description**: Sends a "found item" request for a lost item.
**Authentication**: Required (user must not be the item's reporter)
**Request**: None
**Response**:
```json
{
  "_id": "65f7d1d2e3f4a5b6c7d8e9f0",
  "itemId": "65f7c3c5a7b8c9d0e1f2g3h4",
  "requestType": "found",
  "finderId": "6583626349568ab085513b9",
  "claimerId": "6583626349568ab085513ba",
  "status": "pending",
  "lastMessage": {
    "text": "[SYSTEM]: I've started a conversation regarding the \"Red Backpack\" you lost. I believe I have found it!",
    "senderId": "6583626349568ab085513b9"
  },
  "lastMessageAt": "2024-03-18T10:00:00.000Z",
  "lastSeen": {
    "finder": "2024-03-18T10:00:00.000Z",
    "claimer": "1970-01-01T00:00:00.000Z"
  }
  // ... other request fields
}
```
**Errors**:
*   400: "Invalid item ID", "You already sent a request for this item!", "Can only send a found request to a lost item"
*   401: "Not authorized, no token"
*   403: "Forbidden, Not authorized!", "This item is not available for requests"

#### `POST /api/v1/request/accept/:requestId`
**Description**: Accepts a pending claim request, generates handover codes, and marks the item as 'claimed'.
**Authentication**: Required (only the finder/owner of the found item can accept)
**Request**: None
**Response**:
```json
{
  "_id": "65f7d1d2e3f4a5b6c7d8e9f0",
  "itemId": "65f7c3c5a7b8c9d0e1f2g3h4",
  "requestType": "claim",
  "finderId": "6583626349568ab085513ba",
  "claimerId": "6583626349568ab085513b9",
  "status": "accepted",
  "finderCode": "12345",
  "claimerCode": "67890",
  "finderVerified": false,
  "claimerVerified": false,
  "lastSeen": {
    "finder": "2024-03-18T11:00:00.000Z",
    "claimer": "2024-03-18T09:55:00.000Z"
  }
  // ... other request fields, populated finderId and claimerId
}
```
**Errors**:
*   400: "Invalid request ID", "Only pending requests can be accepted"
*   401: "Not authorized, no token"
*   403: "Forbidden, not authorized!"
*   404: "Request not found", "Item not found"
*   409: "Cannot accept this request because the linked item is missing"

#### `POST /api/v1/request/handle/:requestId`
**Description**: Verifies a user's handover code for a specific request. If both parties are verified, the item's status is set to 'returned' and trust points are awarded.
**Authentication**: Required (either finder or claimer)
**Request**:
```json
{
  "code": "12345"
}
```
**Response**:
```json
{
  "_id": "65f7d1d2e3f4a5b6c7d8e9f0",
  "itemId": {
    "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
    "name": "Blue Water Bottle",
    "image": "https://res.cloudinary.com/your_cloud/image/upload/item_image.jpg",
    "status": "returned"
  },
  "requestType": "claim",
  "finderId": {
    "_id": "6583626349568ab085513ba",
    "firstName": "Jane",
    "lastName": "Smith",
    "username": "janesmith",
    "profilePic": "https://example.com/jane.jpg"
  },
  "claimerId": {
    "_id": "6583626349568ab085513b9",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "profilePic": "https://example.com/john.jpg"
  },
  "status": "returned",
  "finderCode": "12345",
  "claimerCode": "67890",
  "finderVerified": true,
  "claimerVerified": true,
  "lastSeen": {
    "finder": "2024-03-18T12:00:00.000Z",
    "claimer": "2024-03-18T12:00:00.000Z"
  }
  // ... other request fields
}
```
**Errors**:
*   400: "Invalid request ID, or check your url", "Invalid code,try again.", "Claimer already verified!", "Finder already verified!"
*   401: "Not authorized, no token"
*   403: "Forbidden, not authorized!"
*   404: "Request not found!"
*   409: "Cannot complete handover because the linked item is missing"

---

### Message Endpoints (`/api/v1/chat`)

#### `GET /api/v1/chat/users`
**Description**: Retrieves a list of conversations (users and requests) the current user is part of.
**Authentication**: Required
**Request**: None
**Response**: (Returns an array of request objects, with `finderId`, `claimerId`, and `itemId` populated. These are essentially "conversations".)
```json
[
  {
    "_id": "65f7d1d2e3f4a5b6c7d8e9f0",
    "itemId": { /* ...item object */ },
    "finderId": { /* ...user object */ },
    "claimerId": { /* ...user object */ },
    "requestType": "claim",
    "status": "accepted",
    "lastMessage": { "text": "Sure, I'll meet you at 3pm", "senderId": "6583626349568ab085513ba" },
    "lastMessageAt": "2024-03-18T12:05:00.000Z",
    "lastSeen": { "finder": "2024-03-18T12:00:00.000Z", "claimer": "2024-03-18T12:05:00.000Z" }
  }
]
```
**Errors**:
*   401: "Not authorized, no token"
*   500: "failed to fetch conversations"

#### `PATCH /api/v1/chat/read/:requestId`
**Description**: Marks all messages in a specific chat request as read for the current user.
**Authentication**: Required
**Request**: None
**Response**:
```json
{
  "message": "Marked as read"
}
```
**Errors**:
*   304: "Not Authorized" (if user is not a participant)
*   401: "Not authorized, no token"
*   404: "Chat not found"

#### `POST /api/v1/chat/:requestId/:username`
**Description**: Sends a new message (text or image) within a chat request.
**Authentication**: Required
**Content-Type**: `multipart/form-data`
**Path Parameters**:
*   `requestId`: The ID of the chat request.
*   `username`: The username of the *other* participant in the chat.
**Request**:
```form-data
text: "Hey, can we meet near the library?"
image: [optional_image_file]
```
**Response**:
```json
{
  "_id": "65f7d1d2e3f4a5b6c7d8e9f0",
  "senderId": {
    "_id": "6583626349568ab085513b9",
    "firstName": "John",
    "lastName": "Doe"
    // ...other user fields
  },
  "receiverId": "6583626349568ab085513ba",
  "text": "Hey, can we meet near the library?",
  "image": null,
  "createdAt": "2024-03-18T12:10:00.000Z",
  "updatedAt": "2024-03-18T12:10:00.000Z",
  "requestId": "65f7d1d2e3f4a5b6c7d8e9f0"
}
```
**Errors**:
*   400: "Message must contain text or an image", "Invalid request ID, check your url", "Invalid chat target"
*   401: "Not authorized, no token"
*   403: "Forbidden, you are not a participant in this request", "Forbidden, target user is not part of this request", "This chat has been closed by admin"
*   404: "User not found!", "Request not found!, check your url, for incorrect id"
*   500: "failed to send message"

#### `GET /api/v1/chat/:requestId/:username`
**Description**: Retrieves all messages for a specific chat request.
**Authentication**: Required
**Path Parameters**:
*   `requestId`: The ID of the chat request.
*   `username`: The username of the *other* participant in the chat.
**Request**: None
**Response**: (Returns an array of message objects within the conversation.)
```json
[
  {
    "_id": "65f7d1d2e3f4a5b6c7d8e9f0",
    "senderId": { /* ...user object */ },
    "receiverId": { /* ...user object */ },
    "text": "[SYSTEM]: New Claim Request for \"Blue Water Bottle\"...",
    "createdAt": "2024-03-18T09:50:00.000Z",
    "updatedAt": "2024-03-18T09:50:00.000Z"
  },
  {
    "_id": "65f7d1d2e3f4a5b6c7d8e9f1",
    "senderId": { /* ...user object */ },
    "receiverId": { /* ...user object */ },
    "text": "Hey, can we meet near the library?",
    "image": null,
    "createdAt": "2024-03-18T12:10:00.000Z",
    "updatedAt": "2024-03-18T12:10:00.000Z"
  }
]
```
**Errors**:
*   400: "Invalid request ID, check your url"
*   401: "Not authorized, no token"
*   403: "Forbidden, you are not a participant in this request", "Forbidden, target user is not part of this request", "This chat has been closed by admin"
*   404: "User not found!", "Chat not found"

---

### Flag Endpoints (`/api/v1/flags`)

#### `POST /api/v1/flags`
**Description**: Creates a new moderation flag for a user, item, request, or message.
**Authentication**: Required
**Request**:
```json
{
  "targetType": "item",
  "targetId": "65f7c3c5a7b8c9d0e1f2g3h4",
  "reason": "This item description contains inappropriate language."
}
```
**Response**:
```json
{
  "_id": "65f7d1d2e3f4a5b6c7d8e9f2",
  "targetType": "item",
  "targetId": "65f7c3c5a7b8c9d0e1f2g3h4",
  "reason": "This item description contains inappropriate language.",
  "status": "open",
  "reportedBy": "6583626349568ab085513b9",
  "createdAt": "2024-03-18T13:00:00.000Z",
  "updatedAt": "2024-03-18T13:00:00.000Z"
}
```
**Errors**:
*   400: "targetType and reason are required", "Invalid targetType", "Invalid targetId"
*   401: "Not authorized, no token"

#### `GET /api/v1/flags/mine`
**Description**: Retrieves all moderation flags submitted by the current user.
**Authentication**: Required
**Request**: None
**Response**:
```json
[
  {
    "_id": "65f7d1d2e3f4a5b6c7d8e9f2",
    "targetType": "item",
    "targetId": "65f7c3c5a7b8c9d0e1f2g3h4",
    "reason": "This item description contains inappropriate language.",
    "status": "open",
    "reportedBy": "6583626349568ab085513b9",
    "createdAt": "2024-03-18T13:00:00.000Z",
    "updatedAt": "2024-03-18T13:00:00.000Z"
  }
]
```
**Errors**:
*   401: "Not authorized, no token"

---

### Admin Endpoints (`/api/v1/admin`)

**Authentication**: Required (Admin or Moderator role)

#### `GET /api/v1/admin/overview`
**Description**: Retrieves a high-level overview of system statistics for the admin dashboard.
**Authentication**: Required (Admin or Moderator)
**Request**: None
**Response**:
```json
{
  "users": {
    "total": 150,
    "active": 140,
    "suspended": 10
  },
  "items": {
    "total": 200,
    "hidden": 15
  },
  "requests": {
    "pending": 25
  },
  "handovers": {
    "returnedItems": 80
  },
  "moderation": {
    "openFlags": 5
  }
}
```
**Errors**:
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required"

#### `GET /api/v1/admin/analytics`
**Description**: Provides basic analytics on request statuses and return success rates.
**Authentication**: Required (Admin or Moderator)
**Request**: None
**Response**:
```json
{
  "requests": {
    "total": 100,
    "pending": 15,
    "resolved": 60,
    "returned": 50,
    "returnSuccessRate": 50
  }
}
```
**Errors**:
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required"

#### `GET /api/v1/admin/users`
**Description**: Retrieves a paginated list of users with optional filters.
**Authentication**: Required (Admin or Moderator)
**Query Parameters**:
*   `search` (optional): Search by first name, last name, username, or email.
*   `role` (optional): Filter by user role (`student`, `admin`, `moderator`).
*   `suspended` (optional): Filter by suspension status (`true`, `false`).
*   `page` (optional): Current page number (default: 1).
*   `limit` (optional): Number of users per page (default: 20, max: 100).
**Request**: None
**Response**:
```json
{
  "users": [
    {
      "_id": "6583626349568ab085513b9",
      "firstName": "John",
      "lastName": "Doe",
      "username": "johndoe",
      "displayUsername": "johndoe",
      "profilePic": "https://example.com/johndoe.jpg",
      "email": "john.doe@example.com",
      "isVerified": true,
      "role": "student",
      "trustPoints": 10,
      "successfulReturns": 1,
      "hasVerifiedReturnBadge": true,
      "isSuspended": false,
      "createdAt": "2023-01-01T12:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```
**Errors**:
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required"

#### `PATCH /api/v1/admin/users/:userId/suspend`
**Description**: Suspends a user account.
**Authentication**: Required (Admin only)
**Request**:
```json
{
  "reason": "Repeated policy violations."
}
```
**Response**:
```json
{
  "message": "User suspended successfully",
  "user": {
    "_id": "6583626349568ab085513b9",
    "username": "johndoe",
    "isSuspended": true,
    "suspendedAt": "2024-03-18T14:00:00.000Z",
    "suspensionReason": "Repeated policy violations."
    // ... other user fields
  }
}
```
**Errors**:
*   400: "Invalid user ID", "You cannot suspend your own account"
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required", "Only admins can perform this action"
*   404: "User not found"

#### `PATCH /api/v1/admin/users/:userId/reactivate`
**Description**: Reactivates a suspended user account.
**Authentication**: Required (Admin only)
**Request**: None
**Response**:
```json
{
  "message": "User reactivated successfully",
  "user": {
    "_id": "6583626349568ab085513b9",
    "username": "johndoe",
    "isSuspended": false,
    "suspendedAt": null,
    "suspensionReason": null
    // ... other user fields
  }
}
```
**Errors**:
*   400: "Invalid user ID"
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required", "Only admins can perform this action"
*   404: "User not found"

#### `GET /api/v1/admin/items`
**Description**: Retrieves a paginated list of all items, including hidden ones, with optional filters for moderation.
**Authentication**: Required (Admin or Moderator)
**Query Parameters**:
*   `hidden` (optional): Filter by hidden status (`true`, `false`).
*   `search` (optional): Search by item name, location, or description.
*   `status` (optional): Filter by item status (`lost`, `found`, `claimed`, `returned`).
*   `page` (optional): Current page number (default: 1).
*   `limit` (optional): Number of items per page (default: 20, max: 100).
**Request**: None
**Response**:
```json
{
  "items": [
    {
      "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
      "name": "Blue Water Bottle",
      "description": "Hydro Flask, blue, with a sticker of a mountain.",
      "category": "Others",
      "location": "University Library, 2nd Floor",
      "image": "https://res.cloudinary.com/your_cloud/image/upload/item_image.jpg",
      "status": "lost",
      "reportedBy": { /* ...user object */ },
      "isHidden": true,
      "hiddenReason": "Hidden by admin",
      "hiddenBy": { /* ...user object */ },
      "dateLostOrFound": "2024-03-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```
**Errors**:
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required"

#### `PATCH /api/v1/admin/items/:itemId/hide`
**Description**: Hides an item from public view.
**Authentication**: Required (Admin or Moderator)
**Request**:
```json
{
  "reason": "Potential scam listing under investigation."
}
```
**Response**:
```json
{
  "message": "Item hidden successfully",
  "item": {
    "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
    "name": "Blue Water Bottle",
    "isHidden": true,
    "hiddenBy": "6583626349568ab085513bc",
    "hiddenReason": "Potential scam listing under investigation."
    // ... other item fields
  }
}
```
**Errors**:
*   400: "Invalid item ID"
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required"
*   404: "Item not found"

#### `PATCH /api/v1/admin/items/:itemId/unhide`
**Description**: Makes a hidden item visible again.
**Authentication**: Required (Admin or Moderator)
**Request**: None
**Response**:
```json
{
  "message": "Item restored successfully",
  "item": {
    "_id": "65f7c3c5a7b8c9d0e1f2g3h4",
    "name": "Blue Water Bottle",
    "isHidden": false,
    "hiddenBy": null,
    "hiddenReason": null
    // ... other item fields
  }
}
```
**Errors**:
*   400: "Invalid item ID"
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required"
*   404: "Item not found"

#### `DELETE /api/v1/admin/items/:itemId`
**Description**: Permanently deletes an item from the database.
**Authentication**: Required (Admin only)
**Request**: None
**Response**:
```json
{
  "message": "Item deleted successfully"
}
```
**Errors**:
*   400: "Invalid item ID"
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required", "Only admins can perform this action"
*   404: "Item not found"
*   409: "Item cannot be deleted because it is linked to one or more requests"

#### `GET /api/v1/admin/requests`
**Description**: Retrieves a paginated list of all requests, with optional status filter.
**Authentication**: Required (Admin or Moderator)
**Query Parameters**:
*   `status` (optional): Filter by request status (`pending`, `accepted`, `returned`, `closed`).
*   `page` (optional): Current page number (default: 1).
*   `limit` (optional): Number of requests per page (default: 20, max: 100).
**Request**: None
**Response**:
```json
{
  "requests": [
    {
      "_id": "65f7d1d2e3f4a5b6c7d8e9f0",
      "itemId": { "_id": "65f7c3c5a7b8c9d0e1f2g3h4", "name": "Blue Water Bottle", "status": "lost" },
      "finderId": { "_id": "6583626349568ab085513ba", "firstName": "Jane", "lastName": "Smith", "username": "janesmith" },
      "claimerId": { "_id": "6583626349568ab085513b9", "firstName": "John", "lastName": "Doe", "username": "johndoe" },
      "requestType": "claim",
      "status": "pending",
      "updatedAt": "2024-03-18T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```
**Errors**:
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required"

#### `PATCH /api/v1/admin/requests/:requestId/force-close`
**Description**: Force-closes an active request.
**Authentication**: Required (Admin or Moderator)
**Request**:
```json
{
  "reason": "Verification failed after repeated attempts."
}
```
**Response**:
```json
{
  "message": "Request force-closed successfully",
  "request": {
    "_id": "65f7d1d2e3f4a5b6c7d8e9f0",
    "status": "closed",
    "closedAt": "2024-03-18T15:00:00.000Z",
    "closedBy": "6583626349568ab085513bc",
    "closeReason": "Verification failed after repeated attempts."
    // ... other request fields
  }
}
```
**Errors**:
*   400: "Invalid request ID", "Cannot close a returned request"
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required"
*   404: "Request not found"

#### `GET /api/v1/admin/flags`
**Description**: Retrieves a paginated list of all moderation flags, with optional status filter.
**Authentication**: Required (Admin or Moderator)
**Query Parameters**:
*   `status` (optional): Filter by flag status (`open`, `in_review`, `resolved`, `dismissed`).
*   `page` (optional): Current page number (default: 1).
*   `limit` (optional): Number of flags per page (default: 20, max: 100).
**Request**: None
**Response**:
```json
{
  "flags": [
    {
      "_id": "65f7d1d2e3f4a5b6c7d8e9f2",
      "targetType": "item",
      "targetId": "65f7c3c5a7b8c9d0e1f2g3h4",
      "reason": "This item description contains inappropriate language.",
      "status": "open",
      "reportedBy": { /* ...user object */ },
      "createdAt": "2024-03-18T13:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "totalPages": 1
  }
}
```
**Errors**:
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required"

#### `PATCH /api/v1/admin/flags/:flagId`
**Description**: Updates the status of a moderation flag.
**Authentication**: Required (Admin or Moderator)
**Request**:
```json
{
  "status": "resolved",
  "adminNote": "Marked resolved after checking account and item history."
}
```
**Response**:
```json
{
  "message": "Flag updated",
  "flag": {
    "_id": "65f7d1d2e3f4a5b6c7d8e9f2",
    "status": "resolved",
    "reviewedBy": "6583626349568ab085513bc",
    "reviewedAt": "2024-03-18T16:00:00.000Z",
    "adminNote": "Marked resolved after checking account and item history."
    // ... other flag fields
  }
}
```
**Errors**:
*   400: "Invalid flag ID", "Invalid flag status"
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required"
*   404: "Flag not found"

#### `GET /api/v1/admin/audit-logs`
**Description**: Retrieves a paginated list of all administrative audit logs.
**Authentication**: Required (Admin or Moderator)
**Query Parameters**:
*   `page` (optional): Current page number (default: 1).
*   `limit` (optional): Number of logs per page (default: 30, max: 100).
**Request**: None
**Response**:
```json
{
  "logs": [
    {
      "_id": "65f7d1d2e3f4a5b6c7d8e9f3",
      "adminId": { "_id": "6583626349568ab085513bc", "firstName": "Admin", "lastName": "User", "username": "admin", "role": "admin" },
      "action": "suspend_user",
      "targetType": "user",
      "targetId": "6583626349568ab085513b9",
      "details": { "reason": "Repeated policy violations." },
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      "createdAt": "2024-03-18T14:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 30,
    "total": 1,
    "totalPages": 1
  }
}
```
**Errors**:
*   401: "Not authorized, no token"
*   403: "Forbidden, admin access required"

---

### Push Notification Endpoints (`/api/v1/push`)

#### `GET /api/v1/push/vapid-public-key`
**Description**: Retrieves the VAPID public key needed by clients to subscribe to push notifications.
**Authentication**: None
**Request**: None
**Response**:
```json
{
  "publicKey": "your_vapid_public_key_string"
}
```

#### `POST /api/v1/push/subscribe`
**Description**: Registers a new push notification subscription for the authenticated user.
**Authentication**: Required
**Request**:
```json
{
  "endpoint": "https://fcm.googleapis.com/fcm/send/...",
  "keys": {
    "p256dh": "your_p256dh_key",
    "auth": "your_auth_key"
  }
}
```
**Response**:
```json
{
  "message": "Subscribed to push notifications"
}
```
**Errors**:
*   400: "Invalid push subscription payload"
*   401: "Not authorized, no token"

#### `POST /api/v1/push/unsubscribe`
**Description**: Removes an existing push notification subscription for the authenticated user.
**Authentication**: Required
**Request**:
```json
{
  "endpoint": "https://fcm.googleapis.com/fcm/send/..."
}
```
**Response**:
```json
{
  "message": "Unsubscribed"
}
```
**Errors**:
*   400: "Endpoint required"
*   401: "Not authorized, no token"

## Contributing

We'd love for you to contribute to Findora! Whether it's reporting bugs, suggesting new features, or submitting code changes, your help is greatly appreciated.

1.  **Fork the repository**.
2.  **Clone your fork**: `git clone https://github.com/your-username/Findora.git`
3.  **Create a new branch**: `git checkout -b feature/your-feature-name` or `bugfix/issue-description`
4.  **Make your changes**.
5.  **Commit your changes** with clear and concise messages.
6.  **Push to your branch**: `git push origin feature/your-feature-name`
7.  **Open a Pull Request** against the `main` branch of the original repository.

Please ensure your code adheres to the existing style and conventions.

## License

This project is licensed under the MIT License.

## Author Info

*   **Ahmad Ibrahim**
    *   [Your LinkedIn](https://linkedin.com/in/yourusername)
    *   [@yourhandle](https://x.com/yourhandle)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)