# 🎓 Academic Management System

A full-stack, cross-platform college project for managing students, courses, attendance, grades and notices.

| Platform | Technology | Who uses it |
|---|---|---|
| Web admin dashboard | React + Vite | Admin / Faculty |
| REST API | Kotlin + Spring Boot | All clients |
| Database | H2 (file mode, persistent) | Backend |
| Mobile app | Flutter (Android APK / Web) | Students |

---

## ✨ Features

- **Role-based login** (ADMIN, FACULTY, STUDENT) with BCrypt password hashing
- **Admin dashboard** with live statistics (students, courses, average attendance)
- **CRUD pages** for Students, Courses, Notices, Attendance and Grades
- **Flutter student app** to view attendance (with percentage), grades (with overall %) and notices
- **Cross-platform sync**: a notice or grade added in React shows up instantly in the mobile app
- **Persistent storage**: data survives server restarts

---

## 🏗️ Architecture

```
 React Admin (5173) ──┐
                      ├──► Spring Boot REST API (8080) ──► H2 Database (file)
 Flutter App ─────────┘
```

## 📁 Project Structure

```
.
├── frontend/                 # React + Vite admin dashboard
│   └── src/
│       ├── components/Sidebar.jsx
│       └── pages/            # Dashboard, Students, Courses, Notices,
│                             # Attendance, Grades, Login
├── backend/                  # Kotlin + Spring Boot (com.college.academic)
│   └── src/main/kotlin/com/college/academic/
│       ├── model/            # Student, Course, User, Attendance, Grade, Notice
│       ├── repository/
│       ├── controller/       # Student, Course, Auth, Attendance, Grade,
│       │                     # Notice, Stats
│       └── WebConfig.kt      # Global CORS configuration
└── mobile/
    └── academic_mobile/      # Flutter student app
        └── lib/
            ├── config.dart   # Backend IP address
            ├── screens/      # login, home, attendance, grades, notices
            └── services/api_service.dart
```

---

## 🧰 Prerequisites

| Tool | Version used |
|---|---|
| JDK | Temurin 25 |
| Node.js | LTS |
| Flutter SDK | 3.47.x |
| Android Studio + SDK | for building the APK |

---

## 🚀 Getting Started

### 1. Backend (port 8080)

```bash
cd backend
gradlew bootRun        # Windows
./gradlew bootRun      # macOS / Linux
```

- H2 console: http://localhost:8080/h2-console
  (JDBC URL: `jdbc:h2:file:./data/academicdb`, user: `SA`)
- The `data/` folder is git-ignored.

### 2. Frontend (port 5173)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

### 3. Mobile app

```bash
cd mobile/academic_mobile
flutter pub get
```

**Set the backend address** in `lib/config.dart`:

```dart
const String pcIp = '192.168.0.121';   // your PC's Wi-Fi IPv4 (run: ipconfig)
```

Run on Chrome:

```bash
flutter run -d chrome
```

Build an Android APK:

```bash
flutter build apk --release
# output: build/app/outputs/flutter-apk/app-release.apk
```

> 📱 The phone and the PC must be on the **same Wi-Fi**, the backend must be running,
> and Windows Firewall must allow port **8080**.

---

## 🔐 Test Users

| Username | Password | Role |
|---|---|---|
| admin | admin123 | ADMIN |
| faculty1 | fac123 | FACULTY |
| student1 | stu123 | STUDENT |

Create more users:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"rushi","password":"rushi123","role":"STUDENT"}'
```

### Access by role (React admin)

| Role | Pages |
|---|---|
| ADMIN | Dashboard, Students, Courses, Notices, Attendance, Grades |
| FACULTY | Dashboard, Students, Notices, Attendance, Grades |
| STUDENT | Mobile app only |

---

## 📡 API Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login, returns `{username, role}` |
| POST | `/api/auth/register` | Register a user |
| GET / POST / DELETE | `/api/students` | Manage students |
| GET / POST / DELETE | `/api/courses` | Manage courses |
| GET / POST | `/api/attendance` | All attendance / add record |
| GET | `/api/attendance/student/{username}` | One student's attendance |
| GET / POST | `/api/grades` | All grades / add grade |
| GET | `/api/grades/student/{username}` | One student's grades |
| GET / POST | `/api/notices` | Notices (newest first) / add notice |
| GET | `/api/stats` | Dashboard statistics |
| DELETE | `/api/{attendance\|grades\|notices}/{id}` | Delete a record |

---

## ⚠️ Known Limitations

- Role checks are enforced in the UI only; APIs are not yet protected by JWT.
- Mobile login is kept in memory (re-login after closing the app).
- The backend IP in `config.dart` must be updated if the PC's IP changes.
- H2 is used for simplicity; PostgreSQL/MySQL can be added later.

## 🛣️ Roadmap

- [ ] JWT authentication and protected endpoints
- [ ] Persistent mobile login
- [ ] PostgreSQL support
- [ ] Edit (update) support on all admin pages

---

## 👥 Team

Built as a college project by **Rushi harad**

## 📄 License

For educational use.
