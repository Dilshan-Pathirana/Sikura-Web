# Deploying Sikura-Web to Vercel

This project is a Next.js (app router) application and is ready to deploy to Vercel. Follow the steps below.

Required environment variables
- `MONGODB_URI` — MongoDB connection string (use MongoDB Atlas or your cluster).
- `JWT_SECRET` — Secret used to sign JWTs (required for production).
- `ENABLE_TEST_API` (optional) — set to `1` to enable the test API routes.
- `TEST_BASE_URL` (optional) — used by tests (e.g. `http://localhost:3000`).

Quick Deploy Steps
1. Go to https://vercel.com and create or sign in to your account.
2. Import the Git repository (connect GitHub, GitLab, or Bitbucket) and select the `main` branch.
3. When prompted, Vercel should detect the project as `Next.js` (framework preset). If not, choose `Next.js`.
4. Add the environment variables in the Vercel Project Settings -> Environment Variables:
   - Name: `MONGODB_URI`, Value: your connection string
   - Name: `JWT_SECRET`, Value: a secure secret
   - (optional) `ENABLE_TEST_API` = `1`
5. Deploy. Vercel will run `npm install` and `npm run build` automatically.

Local production test
1. Build locally:
```bash
npm ci
npm run build
```
2. Run production server:
```bash
npm start
# or if you need to set env locally:
MONGODB_URI="your-uri" JWT_SECRET="secret" npm start
```

Notes & recommendations
- Do NOT commit secrets to the repo. Use Vercel's Environment Variables UI.
- If you need build-time environment variables, set them in Vercel as `Environment Variable` under the Build settings.
- If you need background jobs or persistent processes, consider Render or Fly.io instead.

Next steps I can do for you
- Create a `Dockerfile` for Render/Fly deployments.
- Generate a `vercel.json` rewrite/redirects configuration if you need custom routing.
- Extract all env var usage into a concise list or `.env.example` file.
