# Findora

## Overview

Okay, so imagine a campus where lost items actually get returned. That's what Findora does. It's a full-stack platform that lets users quickly report lost or found items, chat securely with the other party, and then complete a verified handover, making the whole lost-and-found process smooth and trustworthy.

## Description

Findora is a comprehensive lost and found management system, meticulously designed to streamline item recovery within an academic or organizational environment. It addresses the common frustrations of misplacing belongings and the challenges of safely returning them. The platform features a robust user authentication system, intuitive item reporting with image uploads, and advanced search capabilities. At its core, Findora facilitates secure communication between finders and owners through real-time chat and implements a unique two-step code-exchange verification process for handovers, fostering a community of trust. For administrative oversight, it includes a powerful dashboard for moderating content, managing users, and tracking system activities.

## Usage

This project is a monorepo containing both a client-side React application and a Node.js Express server.

### Getting Started

To get Findora up and running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/findora.git
    cd findora
    ```

2.  **Install dependencies:**

    Navigate into both the `client` and `server` directories and install their respective dependencies.

    ```bash
    # Install client dependencies
    cd client
    npm install # or yarn install
    cd ..

    # Install server dependencies
    cd server
    npm install # or yarn install
    cd ..
    ```

3.  **Environment Variables (Server):**

    In the `server` directory, create a `.env` file with the following variables. Replace placeholder values with your actual configurations:

    ```env
    PORT=8080
    DATABASE_URI="mongodb://127.0.0.1:27017/Findora" # Your MongoDB connection string
    JWT_SECRET="supersecretjwtkey" # A strong, random secret key for JWT
    CLIENT_URL="http://localhost:5173" # URL of your client-side application
    EMAIL_SERVICE_URL="https://your-email-service.com/send" # Endpoint for an email sending service
    CLOUDINARY_CLOUD_NAME="your_cloud_name" # Cloudinary cloud name
    CLOUDINARY_API_KEY="your_api_key" # Cloudinary API Key
    CLOUDINARY_API_SECRET="your_api_secret" # Cloudinary API Secret
    ```

4.  **Run the applications:**

    Open two separate terminal windows.

    *   **Start the server:**
        ```bash
        cd server
        npm run dev # or yarn dev
        ```

    *   **Start the client:**
        ```bash
        cd client
        npm run dev # or yarn dev
        ```

    The client application will typically open in your browser at `http://localhost:5173`.

### Core Workflows

Once set up, you can engage with Findora's main features:

*   **User Authentication**: Sign up for a new account, log in, or use the "Forgot Password" flow if needed. Email verification is part of the sign-up process to ensure secure accounts.
*   **Report an Item**: Navigate to the "Report Item" section. You can choose to report an item you've lost or one you've found. Fill in details like name, description, category, location, and the date it was lost or found. You can also upload an image to help identify the item.
*   **Browse Items**: The main dashboard displays a feed of lost and found items. Use the search bar to find specific items by name, location, description, or category. You can also filter items by their status (lost/found) and the date they were reported.
*   **Initiate a Request**: If you find an item that matches one you've lost, or if you've found an item and see a potential owner, you can initiate a "Claim" or "Found" request. This action automatically opens a secure chat channel with the other party.
*   **Real-time Chat**: Within the chat, you can exchange messages and images to coordinate the item's return. The chat interface includes unread message indicators to keep track of new communications.
*   **Handover Verification**: Once both parties agree to a meetup, the system generates unique 5-digit codes for the finder and the claimer. At the meetup, they exchange these codes and input them into their respective app interfaces to verify the handover. This securely marks the item as "returned" and awards trust points.
*   **Profile Management**: Access your profile to view your personal details, academic information, successful return count, and overall trust points. You can edit your profile details, update your profile picture, and change your password.
*   **Admin Dashboard**: If you have an `admin` or `moderator` role, you can access a dedicated dashboard. Here, you can manage users (suspend/reactivate accounts), moderate reported items (hide/unhide/delete items), force-close item requests, review flags submitted by users, and inspect audit logs of administrative actions.

## Features

*   **User Authentication & Authorization**: Secure sign-up, login, logout, email verification, password reset, and role-based access control (student, moderator, admin).
*   **Item Management**: Comprehensive CRUD operations for lost and found items, including detailed descriptions, categorization, location tracking, and image uploads.
*   **Dynamic Item Discovery**: Powerful search and filtering options (by category, date, keyword, and status) to help users quickly find relevant items.
*   **Guided Request Workflow**: Structured process for initiating "claim" or "found" requests, moving users towards a resolution.
*   **Real-time Secure Chat**: An integrated messaging system with Socket.IO allows direct and private communication between finders and owners, supporting text and image sharing.
*   **Two-Step Handover Verification**: A robust code-exchange mechanism ensures that items are returned to their legitimate owners, enhancing security and trust.
*   **Campus Trust & Gamification System**: Users earn trust points and badges for successfully completing verified item returns, encouraging ethical behavior and participation.
*   **Admin & Moderation Dashboard**: A centralized control panel for managing users, moderating items, reviewing flags, overseeing requests, and accessing detailed audit logs and analytics.
*   **User Profile Management**: Personalize profiles with academic information, track activity, and monitor trust statistics.
*   **Responsive User Interface**: A modern, adaptive design that provides a consistent experience across desktop, tablet, and mobile devices.
*   **Theme Toggle**: Supports light and dark modes for user comfort.

## Technologies Used

| Category   | Technology   | Description                                 |
| :--------- | :----------- | :------------------------------------------ |
| **Frontend** | React        | JavaScript library for building user interfaces. |
|            | Zustand      | A small, fast, and scalable bear-necessities state-management solution. |
|            | React Router | Declarative routing for React applications. |
|            | Tailwind CSS | A utility-first CSS framework for rapid UI development. |
|            | Vite         | Fast build tool and development server.     |
|            | Axios        | Promise-based HTTP client for the browser and Node.js. |
|            | Socket.IO Client | Real-time bidirectional event-based communication. |
|            | `date-fns`   | Modern JavaScript date utility library.     |
|            | `next-themes`| Theme management for React apps.            |
|            | `react-toastify`| Easy and customizable notifications.        |
| **Backend**  | Node.js      | JavaScript runtime for server-side execution. |
|            | Express.js   | Fast, unopinionated, minimalist web framework for Node.js. |
|            | MongoDB      | NoSQL document database.                    |
|            | Mongoose     | MongoDB object modeling for Node.js.        |
|            | JWT          | JSON Web Tokens for secure authentication.  |
|            | Bcrypt.js    | Library for hashing passwords.              |
|            | Multer       | Middleware for handling `multipart/form-data`. |
|            | Cloudinary   | Cloud-based image and video management.     |
|            | Socket.IO    | Real-time communication library.            |

## License

This project is open-sourced under the MIT License.

## Author Info

Ahmad Ibrahim
*   LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)
*   X (Twitter): [@yourhandle](https://x.com/yourhandle)

---

### Made with

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-262626?style=for-the-badge&logo=zustand&logoColor=white)

---
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)