# SRSTHS Canteen Ordering System

## Overview

The Canteen Ordering System is a web application built with React and
TypeScript that allows SRSTHS students to order food from a canteen. The system
provides a user-friendly interface for browsing the menu, placing orders, and
managing the order history.

This project is part of the requirements for the completion of the subject 
of Research IV (Grade 10) under the Junior High School Faculty of Santa Rosa
Science and Technology High School.

## Features

- Browse menu items
- Add items to the cart
- Place orders
- View orders (as admin)
- User authentication

## Technologies Used

- **TypeScript**
- **JavaScript**
- **React**
- **Next.js**
- **Bootstrap**
- **PayloadCMS**
- **PostgreSQL**

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/bg117/ordering-system.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ordering-system
    ```
3. Install dependencies:
    ```bash
    pnpm install
    ```

## Usage

1. Create an `.env.local` file in the project root directory.

2. Add the following environment variables to the `.env.local` file:
    ```env
    PAYLOAD_SECRET=your_secret_key
    DATABASE_URI=your_database_uri
    NEXT_PUBLIC_API_URL=your_api_url
    ```

3. Start the development server:
    ```bash
    pnpm dev
    ```
4. Open your browser and navigate to `http://localhost:3000`.

## Scripts

- `pnpm dev`: Start the development server.
- `pnpm build`: Build the project for production.
- `pnpm ci`: Migrate database schema and build the project.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feat/branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feat/branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more
details.

## Contact

For any inquiries, please
contact [kiangabrielarambulo@gmail.com](mailto:kiangabrielarambulo@gmail.com).