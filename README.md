# Sikura-Web (scaffold)

Scaffold for a Next.js 14 full-stack app using the App Router and TypeScript.

Features:
- Public video browsing pages
- Admin dashboard scaffold
- MongoDB helper
- API routes
- Auth middleware (JWT stub)
- Reusable UI components

To run:

1. Copy `.env.example` to `.env.local` and set `MONGODB_URI` and `JWT_SECRET`.
2. Install dependencies: `npm install`.
3. Run dev server: `npm run dev`.

Vercel deployment
1. In the Vercel project dashboard set the following environment variables:
	- `MONGODB_URI` — your MongoDB Atlas connection string
	- `JWT_SECRET` — a secure random secret for signing JWTs
	- `ENABLE_TEST_API` — optional `1` to enable test-only endpoints (not recommended in production)
2. Build & output: default `npm run build` / `next build` is fine for Next.js 14 App Router.
3. In Vercel, set Node.js version to a supported LTS (>=18) if required.

# Sikura-Web — Project Report

This document is a complete technical overview of the `Sikura-Web` repository (Next.js 14 App Router + TypeScript). It covers architecture, data models, API surface, data flow, frontend structure, backend details, dev & deployment instructions, and recommended next steps.

**Project summary:** a small full-stack site for browsing training/operation videos with an admin dashboard to manage `Category` and `Operation` records stored in MongoDB. Admin auth uses JWT stored in an HTTP-only cookie.

**Quick Start**
- Prereqs: Node.js (>=18), npm, MongoDB (Atlas or self-hosted).
- Install: `npm install`
- Environment: create `.env.local` with `MONGODB_URI` and `JWT_SECRET` (see Environment variables below).
- Dev: `npm run dev`
- Build: `npm run build`

**Environment variables**
- `MONGODB_URI` — MongoDB connection string (required).
- `JWT_SECRET` — secret for signing JWT tokens (required in production).
- `ENABLE_TEST_API` — optional; set to `1` to enable test-only endpoints used by the simple test runner.

**Repository layout (key files & folders)**
- `app/` — Next.js App Router pages (server & client components), public pages and admin area.
	- `app/page.tsx` — public home page.
	- `app/categories/` & `app/operations/` & `app/videos/` — public listing and detail pages.
	- `app/admin/` — admin routes under `(auth)` and `(dashboard)` groups.
	- `app/api/` — serverless API route implementations.
- `components/` — React components used across the UI, including admin components in `components/admin/` and UI primitives in `components/ui/`.
- `lib/` — server helpers and shared utilities: `auth.ts`, `mongoose.ts`, `mongodb.ts`, `rateLimit.ts`, `videoUrl.ts`.
- `models/` — Mongoose models: `Admin`, `Category`, `Operation`.
- `public/` — static assets.
- `scripts/` — helper scripts for seeding and creating an admin user.

Backend architecture
- Framework: Next.js App Router with route handlers under `app/api/*` (standard serverless functions / edge handlers style).
- DB: MongoDB accessed via a Mongoose helper (`lib/mongoose.ts`) and a `lib/mongodb.ts` client promise. Models are defined under `models/`.
- Auth: JWT tokens signed using `jose` (see `lib/auth.ts`). Tokens are set as an HTTP-only cookie (`token`) by the auth route and verified by server code that reads cookies.
- Rate limiting: simple in-memory rate-limiter helper `lib/rateLimit.ts` used by the login endpoint to limit repeated attempts.
- Revalidation: many admin API handlers call `revalidatePath` to trigger Next.js on-demand revalidation for relevant pages after writes.

Frontend architecture
- Next.js 14 App Router: UI is built with server components for pages and client components where interactive behavior is needed.
- Admin area: nested routes under `app/admin/` using an `(auth)` wrapper for login and a `(dashboard)` layout for protected UI.
- Components: `components/` and `components/ui/` provide reusable primitives and admin widgets. `Providers.tsx` sets up global React providers.

Data models (Mongoose)
- `Admin` (`models/Admin.ts`):
	- Fields: `username: string` (unique), `passwordHash: string`, `role: string` (default `admin`), timestamps.
- `Category` (`models/Category.ts`):
	- Fields: `name`, `slug` (unique), `description?`, `thumbnail?`, timestamps.
- `Operation` (`models/Operation.ts`):
	- Fields: `title`, `slug` (unique), `categoryId` (ObjectId -> `Category`), `videoUrl` (validated as Google Drive shared link), `description?`, `thumbnail?`, timestamps.
	- Indexes: text index on `title` & `description`, unique `slug`.

API surface (summary of implemented handlers)
The project implements route handlers under `app/api`. Key endpoints:
- `POST /api/auth` — login; expects `username` + `password`, rate-limited; returns `ok:true` and sets an HTTP-only cookie `token` on success.
- `POST /api/auth/logout` — clears the `token` cookie.
- `PUT /api/admin/profile` — update admin profile (username/password). Verifies JWT cookie before allowing update.

- Admin category endpoints:
	- `GET /api/admin/categories` — list categories.
	- `POST /api/admin/categories` — create category.
	- `PUT /api/admin/categories/:id` — update category.
	- `DELETE /api/admin/categories/:id` — delete category.

- Admin operation endpoints:
	- `GET/POST` for lists under admin (where implemented) and `PUT`/`DELETE` at `/api/admin/operations/:id` for update/delete.

- Public endpoints:
	- `GET /api/videos` — list operations/videos (limited to 50 by default).
	- `POST /api/videos` — append a video/operation (typically used by import or admin flows).

- Test-only endpoints (guarded by `ENABLE_TEST_API`):
	- `POST /api/test/auth` — create a test admin account.
	- `GET/POST /api/test/categories` — list/create categories for test setup.
	- `GET/POST /api/test/operations` — list/create operations for test setup.

Data flow & typical request lifecycle
- Public page (SSR/Server Component):
	1. Page server component calls DB via Mongoose (e.g., `Operation.find(...)`) or fetches `api` endpoints.
	2. Server renders content and returns HTML to client; client hydrates interactive components where necessary.

- Admin create/update flow (example: create category):
	1. Admin UI posts JSON to `POST /api/admin/categories`.
	2. Handler connects to DB (`lib/mongoose.ts`) and creates the document.
	3. Handler triggers `revalidatePath()` for affected public pages so static caches update.
	4. Client shows success and navigates or updates local state.

- Authentication flow:
	1. Admin submits credentials to `POST /api/auth`.
	2. Server verifies credentials with `models/Admin` and `bcryptjs`.
	3. On success, `lib/auth.ts` signs a JWT (7d expiry) and sets it in a secure HTTP-only cookie named `token`.
	4. Protected handlers read `cookies()` and call `verifyToken()` to authorize requests.

Notable implementation details
- JWT: token signing/verification uses `jose` in `lib/auth.ts` with `HS256`. Cookie name constant is `COOKIE_NAME = 'token'`.
- DB helpers: `lib/mongoose.ts` centralizes `mongoose.connect` and model reuse to avoid multiple connections in dev/hot-reload.
- Google Drive video handling: `lib/videoUrl.ts` extracts file IDs and provides `preview` and `stream` URLs. `Operation.videoUrl` is validated against Google Drive formats.
- Rate limiting: `lib/rateLimit.ts` is a lightweight in-memory limiter appropriate for small deployments; replace with Redis for distributed environments.
- Revalidation: API handlers call `revalidatePath()` on create/update/delete to keep statically cached pages up-to-date in Next.js.

Scripts & dev utilities
- `scripts/create-admin.js` — convenience script to create an admin user from the command line.
- `scripts/import-json.js` & `scripts/seed.js` — import sample data from `data/sample-data.json`.

Testing
- A very small test helper exists under `tests/run-api-tests.js` that uses the `ENABLE_TEST_API` endpoints to seed and verify basic API behavior.

Security & production notes
- Ensure `JWT_SECRET` is a long, random secret in production.
- Cookie options set `httpOnly`, `sameSite: 'lax'` and `secure` in production.
- The current rate limiter is in-memory; use Redis or a managed rate-limiting service for production-scale deployments.
- Validate user input thoroughly on both server and client; many route handlers validate bodies but adding schema checks (Zod) consistently is recommended.

Deployment
- The app is intended to deploy on Vercel or any Node-compatible host supporting Next.js App Router. Set `MONGODB_URI` and `JWT_SECRET` in the hosting environment and (optionally) `ENABLE_TEST_API` for CI.

Observability & logging
- Handlers print some errors to console. Consider adding structured logging and error reporting (Sentry, Logflare, Datadog) for production.

Recommended next steps
- Add full tests (unit + integration) for API handlers and auth flows.
- Replace in-memory rate limiter with Redis for HA.
- Add RBAC or finer-grained roles if multiple admin roles are needed.
- Harden input validation using a shared Zod schema library.

Where to look in the codebase (quick reference)
- Auth helpers: `lib/auth.ts`
- Mongo helpers: `lib/mongoose.ts`, `lib/mongodb.ts`
- Models: `models/Admin.ts`, `models/Category.ts`, `models/Operation.ts`
- Public APIs: `app/api/videos/route.ts`
- Admin APIs: `app/api/admin/*`
- Test APIs: `app/api/test/*`
- UI components: `components/` and `components/ui/`
- Scripts: `scripts/create-admin.js`, `scripts/import-json.js`, `scripts/seed.js`

Maintainers
- Repository owner: Dilshan-Pathirana (branch: `main`)

License
- No license file provided. Add a `LICENSE` if you plan to make this project public.

If you want, I can also:
- run the small API tests (via `tests/run-api-tests.js`) locally, or
- add a detailed API reference table (method, path, request, response examples).

---
Generated: automated project report.
