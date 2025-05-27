# 📝 My Notes

A simple **note-taking app** built with Next and Express.js.

---

## 🌐 Live Demo

Check it out here: [https://my-notes-sigma.vercel.app](https://my-notes-sigma.vercel.app)

## 🚀 Features

- 📝 Create, edit, and delete notes
- 👤 User registration and login
- 🔐 Secure authentication with JWT tokens
- 🔁 Refresh token mechanism
- ✉️ Email verification on registration
- 🔑 Password reset via email
- ⚙️ Efficient data fetching with TanStack Query
- 🧪 Input validation with Zod and React Hook Form

## 🛠️ Tech Stack

### Frontend

- Next.js
- Tailwind
- Axios
- TanStack Query
- Framer Motion
- Toastify
- Zod
- Zustand
- React Hook Form

### Backend

- Express
- Nodemailer
- JWT
- Bcrypt
- Mongoose

---

## 🏗️ Getting Started

### ⚙️ Environment Variables

To run this project, you need to set up environment variables for both the backend and the frontend.

##### Backend (`server/.env.example`)

```env
# Server
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017

# JWT Secrets
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
PASSWORD_RESET_TOKEN_SECRET=your_password_reset_secret
EMAIL_VERIFICATION_TOKEN_SECRET=your_email_verification_secret

# Token & Cookies Expirations
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
PASSWORD_RESET_TOKEN_EXPIRES_IN=1h
EMAIL_VERIFICATION_TOKEN_EXPIRES_IN=24h
COOKIES_EXPIRES_IN=604800000 # 7 days

# Frontend
FRONTEND_URL=http://localhost:3001

# Mailer
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=your_mail_user
MAIL_PASS=your_mail_pass
```

#### Frontend (`web/.env.example`)

```env
API_BASE_URL=your_api_base_url
```

### Installation

```bash
# Clone the repo
git clone https://github.com/NoNamedCobble/my-notes.git
cd my-notes

# Backend setup
cd server
npm install
npm run start

# Frontend setup (in new terminal)
cd web
npm install
npm start
```
