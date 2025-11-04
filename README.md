# BookIt - Experiences & Slots

A full-stack booking application built with modern web technologies (frontend + backend).  
This repository contains both the frontend and backend of the project.

---

## 🧐 About

BookIt is a booking application that allows users to browse available slots/resources, make bookings, manage their bookings, and for admins to oversee bookings, resources and users.  
The repository is structured into two main parts: **frontend** (client-side application) and **backend** (server/API).  
Built with a focus on clean architecture, responsiveness, and maintainability.

---

## ⚙️ Features

- User registration and authentication (login / signup)  
- Browse available resources / slots  
- Book a resource for a given time / date  
- View and manage your bookings  
- Admin panel: manage resources, view all bookings, assign or cancel bookings  
- Responsive and interactive UI  
- RESTful API endpoints with proper error handling and validation  
- Secure password storage and JWT-based authentication  
- Role-based access control (User / Admin)  

---

## 🧰 Tech Stack

**Backend**  
- Node.js & Express  
- TypeScript  
- MongoDB (or PostgreSQL)  
- JWT for authentication  
- Mongoose (if using MongoDB)  
- Dotenv for environment configuration  

**Frontend**  
- React (with Hooks & Context API)  
- TypeScript  
- React Router for navigation  
- Axios (or Fetch API) for server communication  
- Styled Components / SCSS / CSS Modules  
- Fully responsive design (mobile, tablet, desktop)  

---

## 🗂 Project Structure

bookit/
├── backend/ # API & server logic
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ └── app.ts
│ ├── package.json
│ └── tsconfig.json
└── frontend/ # Client-side application
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── services/
│ └── App.tsx
├── package.json
└── tsconfig.json
