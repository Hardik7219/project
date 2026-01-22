<<<<<<< HEAD
# 🏆 Achievement Tracker – Full Stack Web Application

A **full‑stack Achievement Tracker** built with **Next.js (App Router)** that allows users to securely log in, manage personal achievements, mark them as starred, and filter them by date or importance. The project uses **NextAuth (Credentials Provider)** for authentication and **MongoDB with Mongoose** for data persistence.

---

## 🚀 Live Purpose

This application helps users **track daily achievements**, maintain consistency, and visually organize progress over time.

---

## 🛠️ Tech Stack (Exact)

### Frontend

* **Next.js 13+ (App Router)**
* **React**
* **TypeScript**
* **Tailwind CSS**
* FontAwesome Icons

### Backend

* **Next.js API Routes**
* **Node.js**
* **NextAuth.js (Credentials Provider)**

### Database

* **MongoDB**
* **Mongoose (ODM)**

### Security & Auth

* Encrypted passwords using **bcryptjs**
* JWT‑based sessions
* Protected API routes using `getServerSession`

---

## ✨ Core Features

### 🔐 Authentication

* Login using **email & password** (Credentials Provider)
* JWT‑based session handling
* Protected routes & APIs

### 🏆 Achievements Management

* Add achievements with:

  * Title
  * Description
  * Custom date
* Edit existing achievements
* Delete achievements
* Mark / unmark achievements as ⭐ **Starred**

### 🔍 Filtering & Sorting

* Filter achievements by:

  * Date
  * Starred status
  * Date + Star combined

### 👤 Profile

* Update username
* Update avatar
* View personal achievements only

---

## 📂 Real Project Structure

```
app/
 ├── api/
 │   ├── achiv/route.ts        # POST, PUT, DELETE, PATCH (Achievements)
 │   └── auth/[...nextauth]/route.ts
 ├── pages/
 │   ├── login/
 │   ├── profileEdit/
 │   └── dashboard/

components/
 ├── achievement/ACHIV.tsx     # Achievement card UI
 ├── Actions/
 ├── popup/Modal.tsx
 └── LoadingScreen/

lib/
 ├── db.ts                     # MongoDB connection
 ├── user.model.ts             # User schema
 └── achiv.model.ts            # Achievement schema

styles/
public/
```

---

## 🧩 Database Schema (Mongoose)

### Achievement Model (`lib/achiv.model.ts`)

```ts
export interface IAchiv {
  user: mongoose.Types.ObjectId[];
  title: string;
  detail: string;
  isStar: boolean;
  createDate: Date;
}
```

* `isStar` defaults to `false`
* `timestamps: true` enabled
* Linked to User via ObjectId reference

---

## 🔌 API Routes (Exact Behavior)

### `POST /api/achiv`

* Create a new achievement
* Requires active session

### `PUT /api/achiv`

* Update title, detail, or date
* Partial updates supported

### `PATCH /api/achiv`

* Toggle ⭐ star status

### `DELETE /api/achiv`

* Delete achievement (only owner allowed)

All routes are protected using:

```ts
getServerSession(authOptions)
```

---

## 🔐 Authentication Flow (NextAuth)

* Credentials Provider (Email + Password)
* Passwords verified using **bcryptjs**
* JWT strategy
* Custom session object includes:

  * `id`
  * `userName`
  * `avatar`

---

## 🖥️ UI Component Example

### Achievement Card (`ACHIV.tsx`)

* Displays:

  * Title
  * Description
  * Date
* Actions:

  * Edit
  * Delete (with confirmation modal)
  * ⭐ Star toggle
* Uses Tailwind CSS animations & loading states

---

## ⚙️ Environment Variables

Create `.env.local`:

```env
MONGODB_URI=your_mongodb_connection
NEXTAUTH_SECRET=your_secret_key
```

---

## ▶️ Run Locally

```bash
git clone https://github.com/Hardik7219/project.git
cd project
npm install
npm run dev
```

Open: `http://localhost:3000`

---

## 📊 Project Evaluation

**Complexity:** ⭐⭐⭐⭐☆ (4/5)

**Overall Rating:** ⭐⭐⭐⭐⭐⭐⭐⭐☆ **8.7 / 10**

### Strengths

* Real authentication (not demo‑level)
* Clean API separation
* Secure MongoDB relations
* Practical, real‑world use case

### Improvements Possible

* Pagination for achievements
* Email verification
* OAuth providers (Google/GitHub)
* Analytics dashboard
=======
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
>>>>>>> b823828a711e18f17d06756ece69df6cf2584a97

---

## 👨‍💻 Author

<<<<<<< HEAD
**Hardik (Hexelion)**

* Full Stack Developer
* Tech: Next.js | MongoDB | Auth | UI/UX

---

⭐ If you like this project, give it a **star** on GitHub!
=======
**Hexelion**
Full Stack Web Developer

* GitHub: [https://github.com/Hardik7219](https://github.com/Hardik7219)

---

⭐ If you find this project useful, please consider giving it a star ⭐
>>>>>>> b823828a711e18f17d06756ece69df6cf2584a97
