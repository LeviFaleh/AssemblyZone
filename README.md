#  AssemblyZone

A full-stack web application built with **Next.js**, **TypeScript**, and **Prisma ORM**, featuring user authentication via **Better Auth**.  
This project combines both frontend and backend in a single Next.js monorepo.

---

## Features

- ⚡ Full-stack app (frontend + backend)
- 🔐 Authentication using [Better Auth](https://better-auth.com/)
- 🗄️ Database powered by [Prisma ORM](https://www.prisma.io/)
- 🧠 Built with **TypeScript** for type safety
- 🪶 Modern UI using **React Server Components**
- 🌐 Fully environment-configurable setup

---

## 🏗️ Project Setup

### 1. Clone the repository

git clone https://github.com/LeviFaleh/AssemblyZone.git
cd AssemblyZone
### 2. Install dependencies

npm install
# or
yarn install
# or
pnpm install

### 3. Set up environment variables
Create a .env file in the root of the project with the following variables:


# Database connection (example for PostgreSQL)
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/assemblyzone"

# Better Auth credentials
BETTER_AUTH_SECRET="your_better_auth_secret"
BETTER_AUTH_PUBLIC_KEY="your_better_auth_public_key"

# (optional) NextAuth or JWT keys if applicable
NEXTAUTH_SECRET="your_nextauth_secret"
⚠️ Replace placeholders with your actual database credentials and authentication keys.

### 4. Generate Prisma client and apply migrations

npx prisma generate
npx prisma migrate dev --name init
You can also open the Prisma Studio to inspect your database visually:


npx prisma studio
### 5. Run the development server

npm run dev
# or
yarn dev
# or
pnpm dev

Then open your browser at:
👉 http://localhost:3000

## Project Structure

AssemblyZone/
│
├── prisma/              # Prisma schema and migrations
├── src/
│   ├── app/             # Next.js 14+ app directory (routes, layouts, pages)
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utilities, constants, and helper functions
│   └── db/              # Prisma Conection
│
├── package.json
├── prisma/schema.prisma
├── tsconfig.json
├── .env.example
└── README.md

## Useful Commands

Command	Description
npm run dev	Starts the Next.js development server
npm run build	Builds the production bundle
npm start	Runs the app in production mode
npx prisma studio	Opens Prisma Studio
npx prisma migrate dev	Applies database migrations

# Testing

npm run dev
