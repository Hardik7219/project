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

---

## 👨‍💻 Author

**Hardik (Hexelion)**

* Full Stack Developer
* Tech: Next.js | MongoDB | Auth | UI/UX

---

⭐ If you like this project, give it a **star** on GitHub!
