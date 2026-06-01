# Findora

Imagine you've misplaced your laptop on campus. You'd want a quick, reliable way to get the word out and hopefully get it back, right? Findora is designed to do just that for university communities. It's a platform where you can easily report lost or found items, connect with others, and securely coordinate their return.

## Installation

Let's get Findora up and running on your local machine. This project is a monorepo, so we'll set up the client (frontend) and server (backend) separately.

### 1. Clone the Repository

Start by cloning the project from GitHub:

```bash
git clone https://github.com/Searcher06/Findora.git
cd Findora
```

### 2. Set up the Server

Navigate into the `server` directory and install its dependencies:

```bash
cd server
npm install # or yarn install / pnpm install
```

Create a `.env` file in the `server` directory with the following environment variables. Remember to replace the placeholder values with your actual credentials:

```ini
PORT=8080
DATABASE_URI="mongodb://127.0.0.1:27017/Findora"
CLIENT_URL="http://localhost:5173" # Or comma-separated list for multiple origins
JWT_SECRET="your_strong_jwt_secret"
EMAIL_SERVICE_URL="your_email_service_api_endpoint" # e.g., for Nodemailer or a third-party service

# Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# Web Push Notifications (Optional)
VAPID_PUBLIC_KEY="your_vapid_public_key"
VAPID_PRIVATE_KEY="your_vapid_private_key"
VAPID_EMAIL="mailto:your_email@example.com" # Your email address for VAPID contact

# WhatsApp Notifications (Optional, using wawp.net API example)
WAWP_INSTANCE_ID="your_wawp_instance_id"
WAWP_ACCESS_TOKEN="your_wawp_access_token"

# AI Matching (Optional, using Groq SDK)
GROQ_API_KEY="your_groq_api_key"
```

Start the server:

```bash
npm run dev # This uses nodemon for live reloading
```

The server should now be running, typically on `http://localhost:8080`.

### 3. Set up the Client

Open a new terminal, navigate into the `client` directory, and install its dependencies:

```bash
cd ../client
npm install # or yarn install / pnpm install
```

Create a `.env` file in the `client` directory with the following environment variable:

```ini
VITE_SERVER_URL="http://localhost:8080"
VITE_SOCKET_URL="http://localhost:8080"
```

Start the client development server:

```bash
npm run dev
```

The client application should now be accessible, typically on `http://localhost:5173`.

## Usage

Findora simplifies the process of reuniting lost items with their owners within a university setting. Here's how you and other users can interact with the platform:

### User Workflows

1.  **Reporting a Lost or Found Item**:
    *   After logging in, navigate to the "Report Item" section.
    *   Select whether you've "Lost an Item" or "Found an Item".
    *   Fill in details like item name, category (Electronics, Books & Stationary, etc.), description, location, and the date it was lost or found.
    *   Optionally, upload a clear photo of the item to help with identification.
    *   Once submitted, your report becomes visible to the community, and the system can automatically suggest matches.

2.  **Browsing and Searching Items**:
    *   On the homepage, you'll find a feed of both lost and found items.
    *   Use the search bar to look for specific items by name, location, description, or category.
    *   Apply filters for categories and dates (e.g., "Last 7 days", "Oldest") to narrow down your search.
    *   You can toggle between "Lost" and "Found" views to see only relevant items.

3.  **Claiming or Marking as Found**:
    *   If you see an item that might be yours (in the "Found" list) or you've found an item for someone else (in the "Lost" list), you can initiate a request.
    *   When you claim an item, a chat is opened with the person who reported it.
    *   The platform then guides both parties through a secure verification process, involving questions and answers to confirm ownership before coordinating the return.

4.  **Real-time Messaging and Handover Verification**:
    *   Once a claim or found request is accepted, a dedicated chat channel opens up.
    *   You can exchange messages and images in real-time to arrange a meeting.
    *   For the final handover, a unique 5-digit code exchange system ensures both parties confirm the transaction, boosting trust points for successful returns.

5.  **Profile Management and Trust Leaderboard**:
    *   Your profile allows you to view your reported items, edit personal information, and manage notification settings (including optional WhatsApp and push notifications).
    *   A "Trust Leaderboard" ranks users by the number of successful, verified item returns, encouraging community participation and honesty.

### Admin and Moderation

*   Administrators and moderators have access to a dedicated dashboard.
*   They can manage users (suspend, reactivate), moderate reported items (hide, unhide, delete), handle requests (force-close), and review user-submitted flags.
*   An audit log tracks all administrative actions, ensuring transparency and accountability.

## Features

*   **User Authentication**: Secure sign-up, login, logout, email verification, password reset, and change password functionalities.
*   **Lost & Found Item Management**: Users can create, update, and delete reports for lost or found items, complete with detailed descriptions, categories, locations, and image uploads.
*   **Advanced Item Search & Filtering**: Efficiently browse items using keywords, categories, and date ranges.
*   **Real-time Communication**: Integrated chat system for direct communication between item finders and claimers, facilitating smooth coordination.
*   **Secure Handover Protocol**: A unique 5-digit code exchange system ensures verified, in-person item returns, enhancing security and trust.
*   **AI-Powered Item Matching**: Utilizes the Groq SDK (Llama 3.1 8B) for intelligent suggestions of potential item matches, notifying relevant users.
*   **Trust & Reputation System**: Users earn trust points and badges for successful item returns, displayed on a campus-wide leaderboard.
*   **Notifications**:
    *   **Push Notifications**: Instant alerts for new messages, claim requests, and potential item matches (PWA compatible).
    *   **WhatsApp Notifications**: Optional real-time alerts for critical updates, even when not actively using the app.
*   **Admin & Moderation Dashboard**: Comprehensive tools for administrators to manage users, moderate items, oversee requests, review flags, and audit platform activities.
*   **Automated Item Archiving**: Older, unresolved items are automatically archived to keep listings relevant and clean.
*   **Responsive UI**: A modern, mobile-first design built with React and TailwindCSS ensures a seamless experience across devices.
*   **Monorepo Structure**: Organized client and server projects within a single repository for streamlined development and deployment.

## Technologies Used

This project is built using a modern JavaScript/TypeScript stack.

| Category   | Technology     | Description                                               |
| :--------- | :------------- | :-------------------------------------------------------- |
| **Client** | React          | Frontend library for building user interfaces             |
|            | Vite           | Fast frontend build tool                                  |
|            | TypeScript     | Superset of JavaScript for type safety                    |
|            | TailwindCSS    | Utility-first CSS framework for rapid styling             |
|            | Zustand        | Lightweight state management for React                    |
|            | React Query    | Data fetching, caching, and state management              |
|            | Axios          | Promise-based HTTP client for API requests                |
|            | Next Themes    | Theme provider for light/dark mode                        |
|            | Radix UI       | Unstyled, accessible UI components                        |
|            | Socket.IO      | Real-time bidirectional event-based communication         |
| **Server** | Node.js        | JavaScript runtime environment                            |
|            | Express        | Fast, unopinionated, minimalist web framework             |
|            | MongoDB        | NoSQL database for flexible data storage                  |
|            | Mongoose       | MongoDB object data modeling (ODM) for Node.js           |
|            | Socket.IO      | Real-time bidirectional event-based communication         |
|            | JSON Web Tokens (JWT) | Secure authentication and authorization              |
|            | bcryptjs       | Password hashing                                          |
|            | Cloudinary     | Cloud-based image and video management                    |
|            | Multer         | Node.js middleware for handling `multipart/form-data`     |
|            | Groq SDK       | AI integration for intelligent item matching              |
|            | web-push       | Library for sending Web Push Notifications                |
|            | node-cron      | Task scheduler for automated jobs                         |
|            | dotenv         | Loads environment variables from a `.env` file            |
|            | cors           | Middleware for enabling Cross-Origin Resource Sharing     |
|            | Helmet         | Secures Express apps by setting various HTTP headers      |
|            | cookie-parser  | Parse `Cookie` header and populate `req.cookies`          |
|            | express-rate-limit | Basic IP rate-limiting middleware for Express          |

## Contributing

We'd love for you to contribute to Findora! Here are some guidelines to help you get started:

1.  **Fork the Repository**: Start by forking the project to your own GitHub account.
2.  **Create a Branch**: Create a new branch from `main` for your feature or bug fix. Use a descriptive name like `feature/add-dark-mode` or `fix/login-bug`.
3.  **Make Your Changes**: Implement your changes, ensuring they adhere to the existing code style and conventions.
4.  **Test Your Changes**: Before submitting, make sure your changes work as expected and don't introduce new issues. Write or update tests if applicable.
5.  **Commit Your Changes**: Write clear, concise commit messages.
6.  **Push to Your Fork**: Push your new branch to your forked repository.
7.  **Open a Pull Request**: Create a pull request to the `main` branch of the original repository. Provide a detailed description of your changes and why they're needed.

We appreciate your contributions!

## License

This project is licensed under the MIT License.

## Author Info

Connect with me and see more of my work:

*   LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourusername)
*   X (Twitter): [@yourhandle](https://x.com/yourhandle)

---

Made with ❤️ by Ahmad Ibrahim

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)