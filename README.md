# 🐾 PetHeaven

A full-stack, responsive PetHeaven built using the MERN stack. This platform allows users to browse available pets (dogs, cats, birds, rabbits, etc.), view detailed profiles, and submit adoption requests. It also provides an interactive dashboard for pet owners/shelters to manage their listings, track adoption requests, and handle approvals.

## 🔗 Links
- **Live Website:** https://pet-heaven-a9.netlify.app/
- **Client-side Repository:** https://github.com/mdrifat107590/paw-heaven-front-end-a9.git
- **Server-side Repository:** https://github.com/mdrifat107590/pet-heaven-server-a9.git

---

## 🚀 Features

* **Comprehensive CRUD Operations:** Pet owners can seamlessly add, update, view, and delete pet listings through a dedicated dashboard layout.
* **Advanced Search, Filtering & Sorting:** Users can quickly find pets using a search bar (by name) and filter options (by species) powered by MongoDB `$regex` and `$in` operators.
* **Secure Authentication & JWT:** Robust authentication system supporting Email/Password (with strict validation) and Google Login. Routes and APIs are secured using JSON Web Tokens (JWT) stored in secure `HTTPOnly` cookies.
* **Smart Adoption Control:** Automated business logic that prevents pet owners from adopting their own pets. Once an adoption request is approved, the pet's status automatically switches to "Adopted," closing it to further requests.
* **Dynamic & Interactive UI:** Built with fully responsive design (Mobile, Tablet, Desktop) featuring UI-based toast notifications (no default alerts), custom loading spinners, and an interactive 404 error page.
* **Rich Content Sections:** Includes engaging homepage features such as Banner/Hero section, Featured Pets (minimum 6), Why Adopt Pets, Success Stories, and Pet Care Tips.

---

## 🛠️ NPM Packages Used

### Client-Side (Frontend)
- `react` / `react-dom` - Core UI library
- `react-router-dom` - Navigation and routing (with private route persistence)
- `sweetalert2`  - UI-based toast notifications
- `react-icons` - Icon library for modern UI design

### Server-Side (Backend)
- `express` - Fast, unopinionated web framework for Node.js
- `mongodb` - Official MongoDB driver for database interaction
- `jsonwebtoken` (JWT) - Token generation and verification for secure APIs
- `cookie-parser` - Middleware to parse and handle secure `HTTPOnly` cookies
- `dotenv` - Environment variable management for securing MongoDB credentials
- `cors` - Cross-Origin Resource Sharing middleware

---

## 📋 Prerequisites & Local Setup

To run this project locally, ensure you have Node.js and MongoDB installed.

### 1. Server Configuration
1. Navigate to the server directory: `cd server`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root of the server folder and add the following:
   ```env
   PORT=5000
   DB_USER=your_mongodb_username
   DB_PASS=your_mongodb_password
   JWT_SECRET=your_jwt_secret_key
