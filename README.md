# 🎫 Event Management Backend (EVE Server)

A modern, production-ready **backend application** built with **Node.js, Express, TypeScript, MongoDB** for managing events, organizers, attendees, ticket bookings, and payments.  
This is the **server-side** of the Event Management & Ticketing Platform.

🔗 **Frontend Repo:** [EVE Client](https://github.com/sarathss100/eve_client)

---

## ⭐ Features

- **Authentication & Role-based Access**
  - JWT authentication with httpOnly cookies.
  - Role-based route protection (Organizer, Attendee).
- **Organizer Capabilities**
  - Create, update, delete, and manage events.
  - Manage attendees for owned events.
- **Attendee Capabilities**
  - Browse/search events, view details.
  - Book tickets (free & paid).
  - view all booked tickets.
- **Ticketing & Payments**
  - Ticket schema with event-user relation.
  - Stripe integration for secure online payments.
- **Robust Architecture**
  - Repository + Service + Controller pattern.
  - Strict **SOLID Principles** for maintainability.
- **Validation & Error Handling**
  - Centralized response handlers.
  - Zod + Mongoose validations.

---

## 🧑‍💻 Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT + Cookies
- **Validation:** Zod, Mongoose Schema Validations
- **Payments:** Stripe
- **Architecture:** Repository Pattern + Service Layer + Controller Layer

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/sarathss100/eve_server.git
cd eve_server
2. Install Dependencies
bash
Copy code
npm install
3. Setup Environment Variables
Create a .env file in the root:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
4. Run Development Server
bash
Copy code
npm run dev
Backend runs by default at:
👉 http://localhost:5000/api

📲 Example Flows
Organizer
Register/Login as Organizer

Create events (title, description, tickets, etc.)

Manage own events (edit, delete, list)

View attendees

Attendee
Register/Login as Attendee

Browse/search events

View event details

Book tickets (Stripe for paid)

🛠️ Best Practices & Patterns
Repository + Service + Controller separation for clean architecture.

Strict TypeScript usage for type safety.

Centralized error handling & reusable response patterns.

SOLID Principles followed in architecture.

Scalable design for future extensions.

ℹ️ Author
👨‍💻 Built by Sarath, 2025

🌐 Related Repositories
Frontend (https://eve-client.vercel.app/)