# ZooLogic

Front end for ZooLogic, a zoo management panel. Staff use it to manage animals and their health status, habitats, veterinarians and team assignments. Every screen reads and writes live data through the [ZooLogic API](https://github.com/AuggieAlmeida/zoologic-api).

- **Live demo:** https://zoologic-front.vercel.app. Create an account on the sign-up side of the login screen.
- **API:** https://zoologic-api.onrender.com/api/health

> The API sleeps on Render's free plan. If the first login takes about a minute, the API is waking up. Requests after that are fast.

## Features

| Area | What it does |
|---|---|
| Login and sign-up | JWT session stored in the browser. Expired tokens are detected client-side and the user is sent back to login. |
| Dashboard | Status cards and charts built from real animals, habitats and veterinarians. |
| Animals | List, register, edit and delete, plus a monitoring view that persists each animal's health status. |
| Habitats | Full CRUD. |
| Veterinarians | Full CRUD, with unique CRMV and e-mail enforced by the API. |
| Staff | Full CRUD, plus delegating each member to a sector. |
| Reports | Operational overview with filters and CSV export of the animal list. |
| Statistics | Herd health plus distribution charts by animal type, sector and habitat. |
| Settings | Light, dark or system theme, and sign-out. |

Every page under `(authenticated)` checks for a valid token before rendering and redirects to `/login?redirect=<page>` when there is none. Sign-out is in the sidebar and in Settings. Below the `md` breakpoint the sidebar becomes a drawer opened from the header.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS with custom design tokens |
| Charts | Chart.js via `react-chartjs-2` |
| Icons | `react-icons` |
| Deploy | Vercel, with a build check on GitHub Actions |

## Project layout

```
src/app/(public)/login          login and sign-up
src/app/(authenticated)/        protected pages; layout.tsx holds the auth guard
src/components/layout/          Sidebar, Header, entity navigation
src/components/dashboard/       status and chart cards
src/components/charts/          chart wrappers
src/services/api.ts             API client: token handling, response cache, one service per resource
src/services/theme.ts           theme preference
src/types/                      shared types per entity
```

## Running locally

You need Node.js 20 and Yarn. The API must be running too: see its [README](https://github.com/AuggieAlmeida/zoologic-api#running-locally).

```bash
yarn install --frozen-lockfile
cp .env.example .env.local
yarn dev
```

The app is served at http://localhost:3000. Start from `/login`.

Use Yarn. `yarn.lock` is the lockfile Vercel builds from, and switching package managers can resolve different versions.

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000/api` | Where the app proxies `/api/*`, including the `/api` prefix. |

The browser never calls the API directly. It requests `/api/...` on its own origin, and a rewrite in `next.config.js` forwards the call to `NEXT_PUBLIC_API_URL`. That removes the CORS preflight in front of each new URL and lets any deployment URL, previews included, work without being added to the API's `CORS_ALLOWED_ORIGINS`. The rewrite is fixed at build time, so changing the variable on Vercel takes a new build. When the front end runs in Docker, point it at an address the container can reach, such as the API's service name, not `localhost`.

## Performance

Measured with the API limited to 0.1 vCPU (Render's free instance) behind a proxy that adds the 125 ms round trip between São Paulo and the API's region:

| | Before | After |
|---|---|---|
| Dashboard first load, time to data | 1,245 ms | 707 ms |
| Each API call on first load | ~900 ms | 166–289 ms |
| Navigating to a screen already visited | 159–210 ms | no request |
| Requests for a full tour of the panel, twice | 32 (4 preflights) | 5 |

Lists are cached in memory for 60 seconds and shared between screens, with concurrent requests for the same URL merged into one. Opening the panel warms the four lists in the background. Any write clears the cache, since one change can move numbers on several screens.

## Scripts

| Command | Purpose |
|---|---|
| `yarn dev` | Development server with hot reload |
| `yarn build` | Production build |
| `yarn start` | Serve the production build |
| `yarn lint` | ESLint with the Next.js core-web-vitals and TypeScript rules |
| `yarn type-check` | TypeScript without emitting files |

The GitHub Actions workflow runs install, lint, type check and build with Yarn and the committed lockfile, the same way Vercel builds.
