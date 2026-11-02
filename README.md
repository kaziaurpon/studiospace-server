# StudioSpace API

Express and MongoDB REST API for StudioSpace, a marketplace for creative studios.

## Features

- User registration and login with bcrypt and HTTPOnly JWT cookies
- Studio listing CRUD with host ownership checks
- Booking requests with confirmed-slot overlap checks
- Wishlist and booking cancellation endpoints
- MongoDB indexes for users, studios, and bookings

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` and a strong `JWT_SECRET` in `.env`.
3. Run `npm install`.
4. Run `npm run dev`.
5. To add six sample listings without replacing existing data, run `npm run seed:studios`.
6. The API runs at `http://localhost:5000` by default.

Never commit `.env`; it contains private credentials. In production, the JWT cookie uses `SameSite=None; Secure` so the separate client/API origins can send authenticated requests over HTTPS.