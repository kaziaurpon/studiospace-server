# StudioSpace API

Express and MongoDB API for [StudioSpace](https://studiospace-client-seven.vercel.app), a marketplace for creative studios and production spaces.

## Features

- Email/password registration and login with bcrypt-hashed passwords.
- Google Identity Services sign-in with verified ID tokens.
- JWT sessions in HTTPOnly cookies; private routes return `401` without a valid session.
- Studio listing CRUD with server-side host ownership checks.
- Booking requests, host confirmation/completion, cancellation, and overlap checks for confirmed reservations.
- Per-studio/date booking locks to serialize reservation checks and host confirmations.
- Studio reviews with one-review-per-creator enforcement and calculated average ratings.
- MongoDB-backed saved-studio wishlists and newsletter subscriptions.
- Origin validation for state-changing requests and production validation for `JWT_SECRET`.

## Technology

- Node.js and Express.js
- MongoDB Node.js driver
- JWT, bcryptjs, and cookie-parser
- Google Auth Library for Google ID-token verification

## Requirements

- Node.js and npm
- A MongoDB instance, local or MongoDB Atlas
- A Google Web OAuth client ID only if Google sign-in is needed

## Run locally

From the server directory:

```bash
cp .env.example .env
npm install
npm run dev
```

Configure `.env` before starting the API:

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DB` | Database name; defaults to `studiospace` |
| `JWT_SECRET` | Session signing secret; use a random value of at least 32 characters |
| `CLIENT_URL` | Exact allowed client origin, e.g. `http://localhost:5173` |
| `GOOGLE_CLIENT_ID` | Google Web OAuth client ID; required for Google sign-in |
| `PORT` | API port; defaults to `5001` |
| `NODE_ENV` | Set to `production` when deployed |

The API is available at `http://localhost:5001` by default. Keep `.env` private and never commit credentials.

## Main API routes

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/health` | Public | Health check |
| `POST` | `/api/auth/register` | Public | Create an account |
| `POST` | `/api/auth/login` | Public | Sign in and set the HTTPOnly session cookie |
| `POST` | `/api/auth/google` | Public | Verify Google sign-in and set a session cookie |
| `POST` | `/api/auth/logout` | Public | Clear the session cookie |
| `GET` | `/api/auth/me` | Signed in | Return the current user |
| `GET` | `/api/studios` | Public | List/search studios; supports `category`, `q`, and `limit` |
| `GET` | `/api/studios/:id` | Public | Get studio details |
| `POST` | `/api/studios` | Signed in | Create a studio owned by the current user |
| `PUT` | `/api/studios/:id` | Owner | Update a studio listing |
| `DELETE` | `/api/studios/:id` | Owner | Delete a studio listing |
| `POST` | `/api/bookings` | Signed in | Create a pending booking request |
| `GET` | `/api/bookings` | Signed in | List the current user's bookings |
| `GET` | `/api/host/bookings` | Signed in | List requests for the current host |
| `PATCH` | `/api/bookings/:id` | Owner/host | Cancel, confirm, or complete a booking, subject to ownership and status rules |
| `GET` | `/api/studios/:id/reviews` | Public | List reviews and rating summary |
| `POST` | `/api/studios/:id/reviews` | Signed in | Submit a review |
| `GET` / `POST` | `/api/wishlist` | Signed in | Read or toggle saved studios |
| `POST` | `/api/newsletter` | Public | Subscribe an email address |

State-changing browser requests must come from the configured `CLIENT_URL`. Production cookies use `HttpOnly`, `Secure`, and `SameSite=None` for the separately hosted client and API.

## Sample studio data

Add six sample listings without replacing existing listings:

```bash
npm run seed:studios
```

## Deploy on Render

The repository includes `render.yaml` for a Render Blueprint deployment. Set `MONGODB_URI`, `CLIENT_URL`, and `GOOGLE_CLIENT_ID` in the Render service settings; configure a strong `JWT_SECRET` of at least 32 characters. Render provides `PORT`. The client should point `VITE_API_URL` at the deployed API origin ending in `/api`.

## Related project

- Client repository: [studiospace-client](https://github.com/kaziaurpon/studiospace-client)
- Live client: [studiospace-client-seven.vercel.app](https://studiospace-client-seven.vercel.app)
