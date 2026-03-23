# ILAP Web

Production-oriented Next.js application for ILAP authentication and supporting legal platform flows.

## Stack

- Next.js App Router
- React 19
- TypeScript
- CSS Modules
- Feature-first frontend architecture

## Project Structure

- `app/`: route entries and Next.js boundaries
- `src/features/`: feature-local screens, components, hooks, server actions, validation, types, and styles
- `src/shared/`: shared UI that is reused across features
- `src/lib/`: app-wide constants and utilities

## Available Routes

- `/`
- `/sign-in`
- `/forgot-password`
- `/about`
- `/contact`
- `/support`
- `/help-center`
- `/legal-resources`
- `/privacy`
- `/terms`
- `/security`
- `/request-early-access`

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Notes

- The project is structured feature-first to keep related UI, hooks, server actions, and validation colocated.
- Current auth flows use server actions with placeholder success behavior and are ready to be connected to real backend services.
