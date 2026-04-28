# Booking API

## Features
- Register & Login (JWT)
- Create Booking
- Update Booking
- Delete Booking
- Validation double booking

## Tech Stack
- Node.js
- Express
- MongoDB

## Setup
npm install
node server.js

## ENV
MONGO_URI=...
JWT_SECRET=...

## Endpoints
POST /api/register
POST /api/login
POST /api/booking
GET /api/my-booking
PUT /api/booking/:id
DELETE /api/booking/:id