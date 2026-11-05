# StudioSpace API

Express and MongoDB backend for [StudioSpace](https://studiospace-client-seven.vercel.app), a peer-to-peer marketplace for creative studios and production spaces.

**Client application:** [studiospace-client-seven.vercel.app](https://studiospace-client-seven.vercel.app)
**API repository:** [github.com/kaziaurpon/studiospace-server](https://github.com/kaziaurpon/studiospace-server)
**Client repository:** [github.com/kaziaurpon/studiospace-client](https://github.com/kaziaurpon/studiospace-client)

## Capabilities

- Email/password authentication with bcrypt password hashing and Google ID-token verification.
- JWT sessions stored in HTTPOnly cookies; protected endpoints reject unauthenticated requests.
- Studio create, read, update, and delete operations, with ownership checks for host mutations.
- Booking requests with capacity and time validation, plus confirmed-booking overlap protection.
- Host actions to confirm or complete reservations; creators can cancel pending requests.
- Per-studio/date booking locks to serialize conflict checks and host confirmations.
- Studio reviews with one-review-per-creator enforcement and calculated rating summaries.
- MongoDB-backed wishlists and newsletter subscriptions.
- Origin validation for state-changing requests and production validation for the JWT secret.

## Stack

- Node.js with Express.js
- MongoDB Node.js driver
- JWT (`jsonwebtoken`), `bcryptjs`, and `cookie-parser`
- Google Auth Library for Google sign-in verification
- Render Blueprint configuration in `render.yaml`

## Requirements

- Node.js and npm
- MongoDB locally or a MongoDB Atlas database
- A Google Web OAuth client ID only if Google sign-in is required

## Local development

Create a local `.env` file in the server repository:

```bash
touch .env
```

Add the settings below, replacing the database connection string and JWT secret with your own values:

```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=studiospace
JWT_SECRET=replace-with-a-random-secret-of-at-least-32-characters
CLIENT_URL=http://localhost:5173
NODE_ENV=development
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
```

Install dependencies and run the API in watch mode:

```bash
npm install
npm run dev
```

The API listens on `http://localhost:5001` by default. The health endpoint is `GET /api/health`. Keep `.env` private; it is excluded from Git.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `MONGODB_DB` | Database name; defaults to `studiospace` |
| `JWT_SECRET` | Session signing secret; use a random value at least 32 characters long |
| `CLIENT_URL` | Exact client origin allowed by CORS and origin validation |
| `GOOGLE_CLIENT_ID` | Google Web OAuth client ID; optional unless Google sign-in is enabled |
| `PORT` | HTTP port; defaults to `5001` |
| `NODE_ENV` | Set to `production` on the deployed API |

## API reference

All routes use the `/api` prefix.

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/health` | Public | API health check |
| `POST` | `/auth/register` | Public | Create an account |
| `POST` | `/auth/login` | Public | Sign in and set the session cookie |
| `POST` | `/auth/google` | Public | Verify Google credentials and sign in |
| `POST` | `/auth/logout` | Public | Clear the session cookie |
| `GET` | `/auth/me` | Authenticated | Return the current user |
| `PATCH` | `/auth/profile` | Authenticated | Update profile details |
| `GET` | `/studios` | Public | List studios; supports `category`, `q`, and `limit` query parameters |
| `GET` | `/studios/:id` | Public | Get studio details |
| `POST` | `/studios` | Authenticated | Create a listing for the current host |
| `PUT` | `/studios/:id` | Listing owner | Update a listing |
| `DELETE` | `/studios/:id` | Listing owner | Delete a listing |
| `GET` | `/studios/:id/reviews` | Public | Get reviews and rating summary |
| `POST` | `/studios/:id/reviews` | Authenticated | Add a review |
| `POST` | `/bookings` | Authenticated | Create a pending booking request |
| `GET` | `/bookings` | Authenticated | List the current creator’s bookings |
| `GET` | `/host/bookings` | Authenticated host | List requests for the current host |
| `PATCH` | `/bookings/:id` | Booking owner or host | Cancel, confirm, or complete a booking subject to authorization and status rules |
| `GET`, `POST` | `/wishlist` | Authenticated | List or toggle saved studios |
| `POST` | `/newsletter` | Public | Subscribe an email address |

## Sample listings

Insert the sample studios without replacing existing records:

```bash
npm run seed:studios
```

## Deployment

The repository includes `render.yaml` for a Render Blueprint deployment. Configure `MONGODB_URI`, `CLIENT_URL`, and `GOOGLE_CLIENT_ID` in Render; use a strong `JWT_SECRET` of at least 32 characters. Render supplies `PORT`. Set the client’s `VITE_API_URL` to the deployed API origin ending in `/api`.

In production, session cookies use `HttpOnly`, `Secure`, and `SameSite=None` to support the separately hosted client and API. State-changing requests are accepted only from the configured client origin.

## Related links

- [StudioSpace client repository](https://github.com/kaziaurpon/studiospace-client)
- [Live StudioSpace website](https://studiospace-client-seven.vercel.app)
