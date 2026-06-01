# Findora

Findora is a campus lost and found platform designed to help students and staff quickly recover their lost items or report found belongings. It streamlines the process by offering secure reporting, a straightforward claiming system, real-time communication, and a verified handover protocol, all aimed at making item recovery simple and trustworthy for the campus community.

## Installation

To get Findora up and running locally, follow these steps:

1.  **Clone the Repository**:
    First, grab the code from the GitHub repository:
    ```bash
    git clone https://github.com/Searcher06/Findora.git
    cd Findora/client
    ```

2.  **Install Dependencies**:
    Once you're in the project directory, install all the necessary packages. We're using `npm` here:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    You'll need a `.env` file in the `client` directory. This project interacts with a backend API, so you'll need to define the API and Socket.IO URLs.
    ```
    VITE_API_URL=http://localhost:8080/api/v1
    VITE_SOCKET_URL=http://localhost:8080
    ```
    (Note: These are examples; replace with your actual backend URLs.)

4.  **Run the Development Server**:
    Start the development server. This will launch the application in your browser, usually at `http://localhost:5173`.
    ```bash
    npm run dev
    ```

    Make sure you have the corresponding backend service running as well for full functionality.

## Usage

Once the application is running, Findora offers an intuitive interface for managing lost and found items.

### Browsing Items

On the homepage, you can browse through items that have been reported as lost or found. Use the search bar to look for specific items by name, location, or description. Filters are available to narrow down results by category and date reported.

### Reporting an Item

If you've lost an item or found something, simply click the "Report Item" button. You'll be guided through a form to provide details like the item's name, category, description, and where/when it was lost or found. You can also upload a photo to help with identification.

### Claiming or Marking as Found

*   **Claiming a Found Item**: If you see your lost item listed, you can submit a claim request. This opens a secure chat channel with the finder, who might ask you verification questions to confirm ownership.
*   **Marking a Lost Item as Found**: If you reported a lost item and someone finds it, they can initiate a "found" request through the platform, which will lead to a similar verification process.

### Real-time Communication

Once a claim or found request is accepted, a real-time chat interface opens up. Here, you can coordinate the physical handover of the item.

### Secure Handover

To ensure a safe and verified exchange, Findora uses a 5-digit code exchange system. Both parties share their unique codes during the in-person meeting. Entering these codes into the app confirms the successful handover, updates the item's status, and contributes to user trust ratings.

### Managing Your Items & Profile

Your "My Items" page lets you track all the items you've reported. You can view their status, update details, or mark them as resolved. Your profile page allows you to update personal details, academic information, and manage notification preferences.

## Features

*   **User Authentication**: Secure sign-up, login, password management, and email verification.
*   **Item Reporting**: Easily report items you've lost or found with detailed descriptions and photos.
*   **Dynamic Browsing**: Search and filter lost and found items by category, date, and keywords.
*   **Real-time Chat**: Connect directly with item owners or finders to coordinate handovers.
*   **Secure Handover Verification**: A unique 5-digit code exchange system for confirmed item returns.
*   **Push Notifications**: Receive instant alerts for new claims, messages, and status updates.
*   **Personalized Profiles**: Manage your account, academic information, and track your activity.
*   **Trust Leaderboard**: See top contributors based on successful verified handovers.
*   **Admin & Moderation Dashboard**: Tools for platform administrators to manage users, items, and flags (abuse reports).
*   **Reporting System**: Users can flag inappropriate or fraudulent item reports for review.
*   **Responsive Design**: A user-friendly interface that works seamlessly across various devices.
*   **Dark/Light Theme**: Toggle between preferred display modes for a personalized experience.

## Technologies Used

This project is built using a modern frontend stack to deliver a smooth and efficient user experience.

| Technology          | Description                                                                    |
| :------------------ | :----------------------------------------------------------------------------- |
| **React**           | A JavaScript library for building user interfaces.                             |
| **Vite**            | A fast build tool for modern web projects.                                     |
| **Tailwind CSS**    | A utility-first CSS framework for rapid UI development.                        |
| **shadcn/ui**       | A collection of re-usable components built with Radix UI and Tailwind CSS.     |
| **Zustand**         | A small, fast, and scalable bearbones state-management solution for React.    |
| **React Router DOM**| Declarative routing for React web applications.                                |
| **Axios**           | Promise-based HTTP client for making API requests.                             |
| **Socket.IO Client**| Enables real-time, bidirectional communication between web clients and servers.|
| **date-fns**        | A modern JavaScript date utility library.                                      |
| **Sonner**          | An opinionated toast component for React.                                      |
| **next-themes**     | Theme provider for Next.js and React applications.                             |

## Contributing

We'd love for you to contribute to Findora! Whether it's reporting a bug, suggesting a new feature, or submitting a pull request, all contributions are welcome.

1.  **Fork the Repository**: Start by forking the project to your own GitHub account.
2.  **Create a New Branch**: Create a branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/issue-description`.
3.  **Make Your Changes**: Implement your changes, following the existing code style.
4.  **Test Your Changes**: Ensure your changes don't introduce new bugs and work as expected.
5.  **Commit Your Changes**: Write clear and concise commit messages.
    ```bash
    git commit -m "feat: Add new feature for item categories"
    ```
6.  **Push to Your Fork**: Push your branch to your forked repository.
    ```bash
    git push origin feature/your-feature-name
    ```
7.  **Open a Pull Request**: Submit a pull request to the `main` branch of the original repository, describing your changes in detail.

## License

This project is open-source. For specific licensing details, please refer to the repository.

## Author Info

*   **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourusername)
*   **X (Twitter)**: [@yourhandle](https://x.com/yourhandle)

---

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)