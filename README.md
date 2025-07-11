# Modern Full-Stack Scaffold

A clean, modern scaffold for full-stack web applications built with Next.js 15, React 19, TypeScript, Prisma, and Tailwind CSS.

## Features

- **Next.js 15** with App Router and Turbopack
- **React 19** with latest features
- **TypeScript** with strict configuration
- **Prisma** with PostgreSQL for database management
- **Tailwind CSS v4** for styling
- **ESLint** with Next.js and TypeScript rules
- **Prettier** for code formatting

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up your database:**
   ```bash
   # Add your DATABASE_URL to .env
   echo "DATABASE_URL=\"postgresql://user:password@localhost:5432/dbname\"" > .env
   
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and apply migrations
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # Reusable components
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## Database

The scaffold includes a basic User model in Prisma. You can extend it by:

1. Editing `prisma/schema.prisma`
2. Running `npm run db:push` to apply changes
3. Or `npm run db:migrate` for versioned migrations

## Styling

Uses Tailwind CSS v4 with:
- Geist fonts (sans and mono)
- Dark mode support
- Responsive design utilities

## Type Safety

- Strict TypeScript configuration
- Path aliases configured (`@/` points to `src/`)
- ESLint rules for TypeScript best practices

## Development Workflow

1. Write code with full TypeScript support
2. ESLint catches issues automatically
3. Prettier formats code consistently
4. Prisma provides type-safe database access

This scaffold is designed to be minimal but complete, giving you a solid foundation to build upon without unnecessary complexity.
