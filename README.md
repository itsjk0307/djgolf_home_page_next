# DJ Golf Next

A Next.js multilingual website for DJ Golf, featuring content pages, community/news sections, board posting flows, authentication, and static brochure/gallery assets.

## Features

- Multi-language support with `next-intl`
- Dynamic pages for company, business, community, robot, recruitment, and distribution sections
- Notice/news board detail and list views
- Authentication and member registration flows
- Prisma-based data access
- Tailwind CSS styling

## Tech Stack

- Next.js 15
- React 18
- TypeScript
- Prisma
- NextAuth
- Tailwind CSS

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment file and update values:
   ```bash
   cp .env.example .env.local
   ```
3. Run Prisma generate (if needed):
   ```bash
   npm run db:generate
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production server
- `npm run lint` — run lint checks
- `npm run db:generate` — generate Prisma client
- `npm run db:push` — push schema changes to the database
- `npm run db:migrate` — run Prisma migrations
- `npm run db:studio` — open Prisma Studio
- `npm run db:seed` — seed the database

## Project Structure

- `src/app` — app router pages and layouts
- `src/components` — reusable UI components
- `src/lib` — database, auth, and utility helpers
- `prisma` — Prisma schema and seed data
- `messages` — locale JSON files
- `public` — static assets

## Notes

- Make sure your database connection is configured correctly in `.env.local`.
- Some pages depend on board data and authentication settings.

## License

This project is for internal/company use unless otherwise specified.
