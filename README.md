# 🏆 Achievement Tracker

A **full stack Achievement Tracker web application** built with **Next.js (App Router)**, **React**, and **Node.js**, designed to help users log, manage, and highlight their achievements over time. The application supports secure authentication, profile management, achievement filtering, and a star-based importance system.

---

## ✨ Key Features

* 🔐 Secure authentication using **NextAuth.js**
* 👤 User account & profile management
* 📝 Add achievements with title, details, and date
* ✏️ Edit and delete existing achievements
* ⭐ Mark achievements as starred (important milestones)
* 📅 Add and organize achievements by date
* 🔍 Advanced filtering:

  * Filter by date
  * Filter by starred achievements
  * Combined filter (date + star)
* 🖼️ Image upload support (Cloudinary integration)
* 📱 Fully responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* Next.js 16 (App Router)
* React 19
* Tailwind CSS 4
* Font Awesome Icons
* Styled Components

### Backend

* Node.js
* Next.js API Routes
* Express (used for middleware & utilities)

### Database

* MongoDB
* Mongoose ODM

### Authentication & Security

* NextAuth.js
* MongoDB Adapter for NextAuth
* bcrypt / bcryptjs for password hashing
* JSON Web Tokens (JWT)
* Cookie-based sessions

### Media Handling

* Cloudinary
* Streamifier

---

## 📂 Project Structure

```
project-root/
│-- app/
│   |-- api/            # API routes
│   |-- auth/           # Authentication pages & config
│   |-- dashboard/      # User dashboard
│-- components/         # Reusable UI components
│-- lib/                # DB connection & helpers
│-- models/             # Mongoose schemas
│-- public/
│-- styles/
│-- .env
│-- package.json
│-- README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Hardik7219/project.git
cd project
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the root directory and add:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 4️⃣ Run the application

```bash
npm run dev
```

The application will be available at:
**[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Authentication Flow

* User signs in using NextAuth
* MongoDB Adapter stores sessions and user data
* Protected routes for dashboard, profile, and achievements
* Secure password hashing using bcrypt

---

## 🔗 API Routes (High-Level)

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| GET    | /api/achievements     | Fetch user achievements |
| POST   | /api/achievements     | Create new achievement  |
| PUT    | /api/achievements/:id | Update achievement      |
| DELETE | /api/achievements/:id | Delete achievement      |
| PUT    | /api/profile          | Update user profile     |

---

## 🚀 Deployment

Recommended deployment platform:

* **Vercel** (Best for Next.js)

Make sure to configure all environment variables in the deployment dashboard.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Hexelion**
Full Stack Web Developer

* GitHub: [https://github.com/Hardik7219](https://github.com/Hardik7219)

---

⭐ If you find this project useful, please consider giving it a star ⭐
