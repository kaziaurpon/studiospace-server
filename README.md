# StudioSpace API

Express and MongoDB REST API for StudioSpace, a marketplace for creative studios.

## Features

- User registration and login with bcrypt and HTTPOnly JWT cookies
- Google sign-in with verified Google ID tokens and HTTPOnly application sessions
- Studio listing CRUD with host ownership checks
- Booking requests with host confirmation and confirmed-slot overlap checks
- Studio reviews with one-review-per-creator enforcement and live average ratings
- Wishlist and booking cancellation endpoints
- Newsletter subscriptions with duplicate-email protection
- MongoDB indexes for users, studios, and bookings

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI`, a strong `JWT_SECRET`, and `GOOGLE_CLIENT_ID` in `.env`. Use the matching web OAuth client ID for `VITE_GOOGLE_CLIENT_ID` in the client `.env`; authorize your development and production web origins in Google Cloud.
3. Run `npm install`.
4. Run `npm run dev`.
5. To add six sample listings without replacing existing data, run `npm run seed:studios`.
6. Review routes: `GET /api/studios/:id/reviews` and authenticated `POST /api/studios/:id/reviews`.
7. Host booking requests: authenticated `GET /api/host/bookings`; hosts confirm with `PATCH /api/bookings/:id`.
8. Newsletter signup: `POST /api/newsletter` with an `{ "email": "name@example.com" }` JSON body.
9. Google sign-in: `POST /api/auth/google` with a Google Identity Services `credential`.
10. The API runs at `http://localhost:5001` by default.

## Render deployment

The included `render.yaml` configures the health check and production runtime. Connect the `studiospace-server` GitHub repository to Render and use the Blueprint from that repository. Set `MONGODB_URI`, `CLIENT_URL`, and `GOOGLE_CLIENT_ID` when prompted; Render generates `JWT_SECRET`. Render supplies `PORT`.

Never commit `.env`; it contains private credentials. The app binds to `0.0.0.0` for hosted deployment. In production, the JWT cookie uses `SameSite=None; Secure` so the separate client/API origins can send authenticated requests over HTTPS.