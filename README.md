# 🎯 MyTestApp – Django + React Online Aptitude Test Platform

This is a full-stack web application built with:

✅ Django REST Framework (Backend API)
✅ React.js (Frontend UI)
✅ JWT Authentication (Login / Register)
✅ Online Aptitude Test with Timer, Result, and Score

---

## 📌 Features:

* ✅ User Registration with Profile Image Upload
* ✅ JWT Login & Logout
* ✅ Protected Test Section (only for logged-in users)
* ✅ 15-minute timer for the test
* ✅ Multiple Aptitude Questions (Profit & Loss, Percentage, Ratio, etc.)
* ✅ Instant Result with Correct/Incorrect answers
* ✅ User Profile View & Change Profile Image
* ✅ Responsive frontend using React and CSS

---

## 📂 Project Structure:

```
MyTestApp/
├── testproject/       # Django Backend
├── frontend/          # React Frontend
├── env/               # Python Virtual Environment (Do not push to GitHub)
└── README.md
```

---

## ⚙️ Backend Setup (Django):

1. **Navigate to backend folder:**

```bash
cd testproject
```

2. **Create virtual environment:**

```bash
python -m venv env
env\Scripts\activate  # (Windows)
```

3. **Install Django & Django REST packages:**

```bash
pip install django djangorestframework djangorestframework-simplejwt pillow corsheaders
```

4. **Apply Migrations:**

```bash
python manage.py makemigrations
python manage.py migrate
```

5. **Run Django server:**

```bash
python manage.py runserver
```

---

## ⚙️ Frontend Setup (React):

1. **Navigate to frontend folder:**

```bash
cd ../frontend
```

2. **Install Node modules:**

```bash
npm install
```

3. **Run React frontend:**

```bash
npm run dev
```

Frontend will run on:
➡️ `http://localhost:5173` (if using Vite)

Backend Django API will run on:
➡️ `http://localhost:8000`

---

## 🪝 Important URLs:

| Endpoint       | URL                            |
| -------------- | ------------------------------ |
| Django Backend | `http://localhost:8000/`       |
| React Frontend | `http://localhost:5173/`       |
| Django Admin   | `http://localhost:8000/admin/` |

---

## 🚀 Deployment Guide:

| If you want to deploy     | Do this                                                |
| ------------------------- | ------------------------------------------------------ |
| React frontend only       | Deploy build folder to GitHub Pages / Netlify / Vercel |
| Django + React full stack | Use Render.com / Railway.app / DigitalOcean            |

---

## 📸 Screenshots:

|               |                              |
| ------------- | ---------------------------- |
| ✅ Login       | ✅ Register                   |
| ✅ Start Test  | ✅ Timer + Aptitude Questions |
| ✅ Result Page | ✅ User Profile + Change Pic  |

---

## ✅ Author:

\[Yashraj Sawant]
(Django REST + React Fullstack Developer)



