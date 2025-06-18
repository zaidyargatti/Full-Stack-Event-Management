# 🎉 Full-Stack Event Booking Platform

A modern full-stack web application for discovering, creating, and booking events, built using **React**, **Express**, **MongoDB**, and **Docker**. This platform provides both event organizers and attendees a seamless and visually appealing experience.

---

## 🛠 Tech Stack

### 🧑‍🎨 Frontend (React + Vite)
- ⚛️ **React 19** with **React Router 7**
- 🎨 **Tailwind CSS** for beautiful UI
- 📊 **Chart.js** via `react-chartjs-2` for dashboards
- 🌐 **Axios** for API requests
- ⚡ **Vite** for lightning-fast dev and build

### 🧑‍💻 Backend (Node.js + Express)
- 🚀 **Express.js 5** framework
- 🍃 **MongoDB** with **Mongoose**
- 🔐 **JWT** for secure authentication
- ☁️ **Cloudinary** for image uploads
- 📬 **Nodemailer** for email services
- 🖼️ **Multer** for handling media uploads
- 🔳 **QR Code** generation for tickets

### 🧰 Developer Tools
- 🐳 Docker + Docker Compose for containerization
- 🔄 **Nodemon** for backend hot-reloading
- 🧹 **ESLint** for clean, error-free code
- 🧪 PostCSS & Tailwind integration

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js v18+
- Docker & Docker Compose (optional)
- MongoDB URI (local or remote like MongoDB Atlas)

---
Live Web Application site---
https://full-stack-event-management-kappa.vercel.app/

## 🖥️ Local Development Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd Full-Stack-Event-Booking-Platform

cd frontend
npm install
npm run dev

cd ../server
npm install
npm run dev

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

docker-compose up --build
(This is optional but it is not fully implemented so avoid it )

Full-Stack-Event-Booking-Platform/
├── frontend/         # ⚛️ React client (Vite)
├── server/           # 🚀 Express backend
├── docker-compose.yml
└── README.md
🔥 Features
✅ Login & Register with JWT Authentication

🗓️ Create & browse events

☁️ Upload images to Cloudinary

📊 Dashboard analytics with charts

📱 Fully responsive modern UI

🔐 Secure APIs with proper validation


