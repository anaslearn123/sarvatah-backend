# Sarvatah API Server

Standalone Node.js + Express + PostgreSQL (Drizzle ORM) backend for the
Sarvatah website — contact form, newsletter signup, course enrollment,
page-visit analytics, and a basic-auth admin API.

## Local setup

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL, ADMIN_PASSWORD
npm run db:push        # creates the tables in your Postgres database
npm run build
npm run start
```

Server listens on `PORT` (from `.env`) and exposes routes under `/api`,
e.g. `GET /api/healthz`.

## Deploy on Render.com (recommended, has a free tier)

1. Push this folder to a GitHub repo (e.g. `sarvatah-backend`).
2. On Render: **New → Blueprint**, point it at the repo — it will read
   `render.yaml` and auto-create the web service *and* a free Postgres
   database.
3. Render will ask you to set `ADMIN_PASSWORD` (used for `/api/admin/*`
   routes, basic auth with username `admin`).
4. After deploy, run `npm run db:push` once against the Render database
   (copy its `DATABASE_URL` into your local `.env` temporarily) to
   create the tables.
5. Note the resulting URL, e.g. `https://sarvatah-api.onrender.com` —
   you'll need it in the frontend's `config.js` (`API_BASE`).

### Alternative hosts
Railway, Fly.io, or a VPS all work the same way — just make sure
`DATABASE_URL` points at a reachable Postgres instance and `PORT` is
set by the platform.

## Environment variables

| Variable        | Required | Notes                                   |
|------------------|----------|------------------------------------------|
| `PORT`           | yes      | Set automatically by most hosts          |
| `DATABASE_URL`   | yes      | Postgres connection string               |
| `ADMIN_PASSWORD` | yes      | Basic-auth password for `/api/admin/*`   |
| `NODE_ENV`       | no       | `production` disables pretty-printed logs |
| `LOG_LEVEL`      | no       | Defaults to `info`                       |

## Notes

- This is a standalone rebuild of the original monorepo's
  `backend/api-server` + `backend/lib/db` packages. The
  `@workspace/api-zod` request/response schemas (previously generated
  from `openapi.yaml`) are now inlined in `src/api-zod.ts`.
- CORS is open by default (`cors()`); restrict it to your domain in
  `src/app.ts` once the frontend is live if you want to lock it down.
