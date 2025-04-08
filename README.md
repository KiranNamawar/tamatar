# Tamatar Store

Tamatar Store is a web application that provides a suite of tools and services, including a URL shortener, notes management, and more. It is built using modern web technologies such as Next.js, Prisma, and daisyUI.

## Features

- **URL Shortener**: Create and manage short URLs with analytics.
- **Notes Management**: Organize and manage your notes.
- **User Authentication**: Google OAuth integration for signup and login.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Theming**: Supports light and dark themes with daisyUI.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [daisyUI](https://daisyui.com/), [Mantine](https://mantine.dev/)
- **Backend**: [Prisma](https://www.prisma.io/), [CockroachDB](https://www.cockroachlabs.com/)
- **Authentication**: Google OAuth, JWT
- **Email**: [React Email](https://react.email/)
- **Styling**: Tailwind CSS with daisyUI components

## Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- CockroachDB instance

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/kirannamawar/tamatar-store.git
    cd tamatar-store
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:

    ```
    DATABASE_URL=your_cockroachdb_connection_string
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4. Run database migrations:

    ```bash
    npx prisma migrate dev
    ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open the application in your browser:
    ```
    http://localhost:3000
    ```

## Project Structure

- `app/`: Contains Next.js pages and API routes.
- `components/`: Reusable React components.
- `prisma/`: Prisma schema and migrations.
- `utils/`: Utility functions for authentication, logging, and more.
- `styles/`: Global styles and Tailwind CSS configuration.

## Usage

### URL Shortener

1. Navigate to `/tmtr/urls`.
2. Create a new short URL using the "Create URL" button.
3. View analytics for each URL, including visits and user agent details.

### Notes Management

1. Navigate to `/notes`.
2. Create, edit, and organize your notes.

### Authentication

1. Sign up or log in using your Google account.
2. Manage your profile and settings.

## Theming

Tamatar Store uses daisyUI for theming. The default theme is light, but you can switch to dark mode using the theme controller.

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add feature-name"
    ```
4. Push to your branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, contact us at [support@tamatar.store](mailto:support@tamatar.store).
