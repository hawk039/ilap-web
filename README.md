# ILAP Web – Indian Legal AI Platform Frontend

ILAP Web is the **production-oriented frontend application** for the Indian Legal AI Platform. It is built as a **feature-first Next.js application** that prioritizes clear product flows, stable backend integration, and deployment-safe architecture over demo-style UI assembly.

This project is intentionally built as a **platform client**, not a disconnected mock frontend. It treats authentication, legal category discovery, conversation state, and backend connectivity as first-class product concerns.

---

## Why ILAP Web

Most frontend demos stop at visual polish. ILAP Web is designed to support a real legal product lifecycle:

* Stable backend integration over ad hoc client calls
* Clear separation between public and authenticated product areas
* Feature-first structure that scales with product growth
* Deployment-safe API proxying for browser clients
* UI flows designed around legal-product trust and clarity

This frontend exists to make the ILAP backend usable in production, not just presentable in screenshots.

---

## Core Features

* **Production-Oriented Auth Flows**
  Sign up, sign in, and forgot-password screens are implemented as real feature modules with backend-integrated request handling.

* **Authenticated Product Shell**
  Logged-in areas share a consistent application shell using the Next.js App Router layout system.

* **Backend-Driven Legal Categories**
  The dashboard loads legal categories from the platform backend instead of relying on hardcoded-only UI state.

* **Conversation-Based Legal Chat**
  Category selection creates or opens legal conversations and routes users into the chat flow backed by the platform conversation APIs.

* **Grounded Chat Experience**
  The chat UI is structured around legal-answer readability, quick follow-up interaction, and a more product-grade conversation surface.

* **Render-Safe API Proxying**
  The app proxies `/api/v1/*` through Next.js rewrites so the browser can talk to the platform backend without direct CORS fragility.

* **Feature-First Frontend Architecture**
  UI, styles, hooks, local validation, and feature-specific logic are colocated by feature rather than split into artificial layers.

* **Deployment Readiness**
  Includes health check support, Render configuration, environment guidance, and production build validation.

---

## High-Level Architecture

```text
Browser
   ↓
Next.js App Router
   ↓
Feature Modules
   ↓
/api/v1 Proxy (Next.js rewrites)
   ↓
ILAP Platform Backend
   ↓
ILAP Legal AI Service
```

Key architectural decisions:

* The browser talks to the frontend application, not directly to every backend service
* Next.js handles route composition, public vs authenticated shells, and backend proxying
* Product logic is grouped by feature to keep changes local and scalable
* The legal AI service remains a separate backend concern; the frontend integrates through the platform backend contract

---

## Tech Stack

* **Framework**: Next.js 16 (App Router)
* **UI Runtime**: React 19
* **Language**: TypeScript
* **Styling**: CSS Modules + global app styles
* **Architecture Style**: Feature-first frontend architecture
* **Deployment Target**: Render
* **Backend Integration**: Platform backend over `/api/v1`

---

## Project Structure

```text
Ilap_web/
├── app/                        # Next.js routes, layouts, API health route
│   ├── (authenticated)/        # Logged-in route group and shared shell
│   └── api/health/             # Render health check endpoint
├── src/
│   ├── features/               # Feature-first product modules
│   │   ├── dashboard/          # Authenticated home / categories experience
│   │   ├── chat/               # Legal conversation interface
│   │   ├── signup/             # Registration feature
│   │   ├── signin/             # Login feature
│   │   └── forgot-password/    # Password recovery feature
│   ├── shared/                 # Shared layouts, auth helpers, icons
│   └── lib/                    # API client, routes, shared utilities
├── render.yaml                 # Render deployment configuration
├── next.config.js              # Rewrites and frontend runtime config
├── .env.example                # Environment configuration template
└── README.md
```

---

## Current Capabilities

* Supports public entry flows for:
  * sign up
  * sign in
  * forgot password

* Supports authenticated product flows for:
  * dashboard/home
  * legal category selection
  * conversation-based legal chat
  * profile and legal resources placeholders

* Fetches legal categories from the platform backend

* Creates and resumes legal conversations through backend APIs

* Sends grounded legal questions through the platform conversation interface

* Uses a structured legal-chat UI designed for answer readability instead of plain message bubbles

* Supports authenticated and unauthenticated route separation using App Router layouts

* Includes deployment-safe backend proxying for `/api/v1/*`

* Includes a health endpoint for hosted environments

* Builds successfully for production with current repository configuration

---

## Backend Contract Expectations

ILAP Web is not designed as a standalone mock app. It expects a platform backend that provides product APIs under:

```text
/api/v1
```

The frontend currently integrates with backend flows such as:

* `POST /api/v1/auth/register`
* `POST /api/v1/auth/login`
* `POST /api/v1/auth/logout`
* `GET /api/v1/auth/session`
* `POST /api/v1/auth/refresh`
* `POST /api/v1/auth/forgot-password`
* `GET /api/v1/legal-categories`
* `POST /api/v1/conversations`
* `GET /api/v1/conversations`
* `GET /api/v1/conversations/:conversationId`
* `GET /api/v1/conversations/:conversationId/messages`
* `POST /api/v1/conversations/:conversationId/ask`

The browser is expected to call the frontend domain, and the frontend rewrites those requests to the backend origin.

---

## Public and Authenticated Product Areas

### Public Area

The public experience currently includes:

* landing/root composition
* sign up
* sign in
* forgot password
* support and informational placeholder routes

### Authenticated Area

The authenticated experience currently includes:

* dashboard/home
* legal categories
* legal chat
* profile
* legal resources

The authenticated area is organized through a shared route-group layout so product shell behavior remains consistent as features grow.

---

## Environment

This frontend is designed to proxy platform API requests through Next.js using `/api/v1/*`.

Use this variable for local development and deployed frontend environments:

```bash
BACKEND_API_BASE_URL=https://your-platform-backend.example.com
```

Avoid setting `NEXT_PUBLIC_API_BASE_URL` for the deployed frontend unless you intentionally want direct browser-to-backend requests.

Why this matters:

* `BACKEND_API_BASE_URL` keeps API requests same-origin from the browser’s perspective
* Next.js rewrites can forward requests server-side to the backend
* This avoids common browser-side CORS failures

See [.env.example](/Users/mayankdhyani/WebstormProjects/Ilap_web/.env.example) for the current template.

---

## Local Development

```bash
# install dependencies
npm install

# configure backend target
cp .env.example .env.local

# update .env.local with your backend origin
# example:
# BACKEND_API_BASE_URL=http://localhost:8000

# run development server
npm run dev
```

If your local shell still resolves the broken old Node installation, use the working runtime directly:

```bash
/opt/homebrew/bin/node node_modules/next/dist/bin/next dev
```

Production build:

```bash
npm run build
npm run start
```

---

## Render Deployment

This repository is prepared for Render deployment and includes [render.yaml](/Users/mayankdhyani/WebstormProjects/Ilap_web/render.yaml).

Recommended frontend Render configuration:

* **Environment**: Node
* **Build Command**: `npm ci && npm run build`
* **Start Command**: `npm run start`
* **Health Check Path**: `/api/health`
* **Environment Variable**:

```bash
BACKEND_API_BASE_URL=https://ilap-backend-system.onrender.com
```

Do not set this on the frontend Render service unless you intentionally want browser-direct backend calls:

```bash
NEXT_PUBLIC_API_BASE_URL
```

### Deployment Verification

After deployment, verify:

1. `/api/health` returns JSON with `status: "ok"`
2. signup and login requests hit your frontend domain at `/api/v1/...`
3. those requests return JSON, not HTML
4. category loading works on the authenticated home screen
5. conversation creation and chat requests reach the platform backend

---

## Non-Goals (By Design)

* ❌ No frontend-only fake persistence presented as production behavior
* ❌ No direct dependence on Tailwind CDN or pasted static templates in shipped code
* ❌ No architecture built around artificial abstraction layers for their own sake
* ❌ No browser-first backend calls when proxying is safer and more deployable

---

## Roadmap

* Complete remaining public form integrations such as contact/support flows
* Expand authenticated product pages beyond placeholders
* Improve recent conversation management and history UX
* Add richer error recovery and retry handling around backend failures
* Introduce stronger session and access-boundary enforcement in the authenticated route group
* Continue aligning UI polish with production-grade legal product expectations

---

## Disclaimer

ILAP Web is the frontend client for an informational legal platform. It is not, by itself, a source of legal advice. Legal answers depend on the connected backend systems and their grounded evidence pipeline.

---

## Author

Built as the production-facing frontend for ILAP with an emphasis on product architecture, backend integration discipline, and deployment readiness rather than mock-demo presentation.
