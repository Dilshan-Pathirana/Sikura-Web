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

Running tests
1. Start the dev server: `npm run dev` (or deploy to an environment where `ENABLE_TEST_API=1`).
2. Enable test API endpoints locally by setting `ENABLE_TEST_API=1` in your environment (or `.env.local`).
3. Run the simple API tests:

```bash
ENABLE_TEST_API=1 TEST_BASE_URL=http://localhost:3000 npm test
```

Notes: the test runner uses the test-only endpoints guarded by `ENABLE_TEST_API`. For CI, ensure `ENABLE_TEST_API=1` and a test MongoDB string is provided.
