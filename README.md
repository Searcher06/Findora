# Findora: Connecting Lost & Found on Campus

## Overview

Findora is designed to help campus communities easily recover items that have been lost and quickly return items that have been found. It creates a secure and straightforward way for people to report items, connect with each other, and verify ownership, so valuable belongings don't just disappear. Think of it as your campus's smart lost and found, making sure everything finds its way home.

## Description

Findora is a comprehensive platform built to streamline the process of managing lost and found items within a community, particularly a university campus. It provides a user-friendly interface for reporting lost or found items, facilitates secure communication between the item's owner and finder, and ensures verified handovers. The platform promotes trust and transparency through a unique verification system and offers robust administrative tools for moderation. Whether you've misplaced your laptop or found someone's ID, Findora makes the reunification process simple, efficient, and secure.

## Installation

To get Findora up and running on your local machine, follow these steps:

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/Searcher06/Findora
    cd Findora
    ```

2.  **Set Up the Server**

    Navigate to the `server` directory, install dependencies, and configure your environment variables.

    ```bash
    cd server
    npm install
    ```

    Create a `.env` file in the `server` directory with the following variables:

    ```env
    PORT=8080
    DATABASE_URI=mongodb://127.0.0.1:27017/Findora # Or your MongoDB Atlas URI
    JWT_SECRET=YOUR_RANDOM_JWT_SECRET
    CLIENT_URL=http://localhost:5173 # Or your client's URL

    # Cloudinary for image uploads
    CLOUDINARY_CLOUD_NAME=YOUR_CLOUD_NAME
    CLOUDINARY_API_KEY=YOUR_API_KEY
    CLOUDINARY_API_SECRET=YOUR_API_SECRET

    # Web Push Notifications (Optional)
    VAPID_EMAIL=your_email@example.com
    VAPID_PUBLIC_KEY=YOUR_VAPID_PUBLIC_KEY
    VAPID_PRIVATE_KEY=YOUR_VAPID_PRIVATE_KEY

    # WhatsApp Notifications (Optional, uses wawp.net V2 API)
    WAWP_INSTANCE_ID=YOUR_WAWP_INSTANCE_ID
    WAWP_ACCESS_TOKEN=YOUR_WAWP_ACCESS_TOKEN

    # Email Service (Optional, uses an external service)
    EMAIL_SERVICE_URL=YOUR_EMAIL_SERVICE_ENDPOINT
    ```

3.  **Set Up the Client**

    Navigate to the `client` directory, install dependencies, and configure your environment variables.

    ```bash
    cd ../client
    npm install
    ```

    Create a `.env` file in the `client` directory with the following variables:

    ```env
    VITE_SOCKET_URL=http://localhost:8080 # Or your server's URL
    VITE_API_URL=http://localhost:8080/api/v1 # Or your server's API base URL
    ```

## Usage

Once the client and server are set up, you can start the application and begin using Findora.

1.  **Start the Server**

    From the `server` directory:

    ```bash
    npm run dev
    ```

2.  **Start the Client**

    From the `client` directory:

    ```bash
    npm run dev
    ```

    Your application should now be accessible in your browser, typically at `http://localhost:5173`.

### Key User Flows

*   **Reporting an Item**: If you've lost an item or found something, simply navigate to the "Report Item" page. You'll fill out details like the item's name, description, category, location, and the date it was lost or found. You can also upload a photo to help identify it.
*   **Browsing Items**: Explore the "Browse Items" page to see all lost and found reports. You can filter by category, date, and search for specific items to quickly find what you're looking for.
*   **Claiming/Responding to an Item**: If you see an item that might be yours, you can submit a claim request. If you've reported a lost item and someone else has found it, they can send you a "found" request. This kicks off a secure communication process.
*   **Real-time Chat**: Once a claim or found request is accepted, a chat window opens up between the owner and the finder. Here, you can discuss details, arrange a meeting, and verify specifics about the item.
*   **Secure Handover**: To ensure items are returned to the rightful owner, Findora implements a two-way code exchange. Both parties receive a unique 5-digit code. At the point of physical handover, you'll exchange these codes within the app to confirm the item's return. This process updates both profiles with "trust points" for successful returns.
*   **Notifications**: Stay updated on all your activities. You'll receive in-app notifications, and if configured, push notifications and WhatsApp messages for important updates like new messages or accepted claims.
*   **Profile Management**: View your own profile, including your "Trust Points" earned from successful returns. You can also edit your academic information, profile picture, and change your password.
*   **Admin and Moderation**: For authorized users, an admin dashboard provides tools to manage users, moderate item listings, review flags, and oversee requests to keep the platform safe and efficient.

*(No screenshots were found in the provided file list.)*

## Features

*   **User Authentication**: Secure sign-up, login, logout, password reset, and email verification.
*   **Personalized Profiles**: Users can manage their profiles, including academic details, contact information (WhatsApp), and profile pictures.
*   **Trust & Reputation System**: Earn "trust points" and "verified return" badges for successful and verified item handovers.
*   **Lost & Found Item Management**:
    *   Create, view, update, and delete reports for lost or found items.
    *   Categorize items for easier searching (Electronics, Books, IDs, etc.).
    *   Upload images for visual identification.
    *   Resolve items when they are no longer active or have been returned.
*   **Advanced Item Browsing**: Filter items by category, date, status (lost/found), and comprehensive search functionality.
*   **Request & Messaging System**:
    *   Users can send claim requests for found items or "found" requests for lost items.
    *   Real-time chat functionality for communication between item owner and finder.
    *   Unread message indicators to keep track of active conversations.
*   **Secure Handover Verification**: A unique 5-digit code exchange system ensures both parties verify the item's return, adding a layer of trust and security.
*   **Notifications**: In-app notifications for all activities, with optional push notifications and WhatsApp alerts for critical updates.
*   **Progressive Web App (PWA)**: The client-side is designed as a PWA, offering an enhanced mobile experience.
*   **Admin Dashboard**: Dedicated interface for administrators and moderators to oversee user accounts, item listings, requests, manage flags, and review audit logs.
*   **Robust Error Handling**: Comprehensive server-side error handling and client-side toast notifications for a smooth user experience.
*   **Image Cloud Storage**: Utilizes Cloudinary for efficient and scalable image storage.

## Technologies Used

| Category         | Technology                 | Description                                    |
| :--------------- | :------------------------- | :--------------------------------------------- |
| **Frontend**     | [React](https://react.dev/) | JavaScript library for building user interfaces. |
|                  | [Vite](https://vitejs.dev/) | Next-generation frontend tooling.              |
|                  | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework.                 |
|                  | [Shadcn UI](https://ui.shadcn.com/) | Reusable UI components built with Radix UI. |
|                  | [Zustand](https://zustand-demo.pmnd.rs/) | Small, fast, and scalable bear-bones state-management solution. |
|                  | [React Router DOM](https://reactrouter.com/en/main) | Declarative routing for React.           |
|                  | [Axios](https://axios-http.com/) | Promise-based HTTP client.                   |
|                  | [Socket.IO Client](https://socket.io/docs/v4/client-api/) | Real-time bidirectional event-based communication. |
|                  | [next-themes](https://github.com/pacocoursey/next-themes) | Theme management for React applications. |
|                  | [date-fns](https://date-fns.org/) | Modern JavaScript date utility library.      |
|                  | [Sonner](https://sonner.emilkowalski.pl/) | An opinionated toast component.              |
| **Backend**      | [Node.js](https://nodejs.org/en) | JavaScript runtime environment.              |
|                  | [Express](https://expressjs.com/) | Web application framework for Node.js.     |
|                  | [MongoDB](https://www.mongodb.com/) | NoSQL database.                             |
|                  | [Mongoose](https://mongoosejs.com/) | MongoDB object modeling for Node.js.         |
|                  | [Socket.IO](https://socket.io/) | Real-time bidirectional event-based communication. |
|                  | [JWT](https://jwt.io/) | JSON Web Tokens for secure authentication.     |
|                  | [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing library.                  |
|                  | [Cloudinary](https://cloudinary.com/) | Cloud-based image and video management.        |
|                  | [Multer](https://github.com/expressjs/multer) | Middleware for handling `multipart/form-data`. |
|                  | [Cookie-parser](https://github.com/expressjs/cookie-parser) | Parse Cookie header and populate `req.cookies`. |
|                  | [CORS](https://github.com/expressjs/cors) | Middleware for enabling Cross-Origin Resource Sharing. |
|                  | [Dotenv](https://github.com/motdotla/dotenv) | Loads environment variables from a `.env` file. |
|                  | [Express-rate-limit](https://www.npmjs.com/package/express-rate-limit) | Basic rate-limiting middleware.          |
|                  | [Helmet](https://helmetjs.github.io/) | Helps secure Express apps by setting various HTTP headers. |
|                  | [Web-push](https://github.com/web-push-libs/web-push) | Library for sending push notifications.      |
|                  | [Axios](https://axios-http.com/) | Promise-based HTTP client (server-side).     |

## Contributing

We welcome contributions to Findora! If you're interested in helping improve the project, please follow these guidelines:

1.  **Fork the repository**.
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `bugfix/issue-description`.
3.  **Make your changes**, ensuring they adhere to the project's coding standards.
4.  **Write clear, concise commit messages**.
5.  **Submit a pull request** to the `main` branch, describing your changes and the problem they solve.

Please ensure your code passes all existing tests and consider adding new tests for new features.

## License

This project does not currently have an explicit license file.

## Author Info

Ahmad Ibrahim

*   LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)
*   X (Twitter): [@yourhandle](https://x.com/yourhandle)

## Badges

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindCSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404D59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/mongoose-%238B0000.svg?style=for-the-badge&logo=mongoose&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-%23000000.svg?style=for-the-badge&logo=zustand&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-%235A0FC8.svg?style=for-the-badge&logo=pwa&logoColor=white)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)