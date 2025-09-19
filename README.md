# Student Exams Frontend (React)

A React-based frontend for the **Student Exams** platform.  
This app enables students to authenticate, browse available exams, start an exam, and review detailed results and trends on a dashboard.

---

## ✨ Features

- **Authentication**: Login flow with token handling and route guards.
- **Exam Catalogue**: List of available exams with filters and search.
- **Start Exam**: Guided flow to start/continue an exam with timer and progress.
- **Results & Dashboard**: Score breakdown, attempt history, topic-wise insights, charts.
- **API Integration**: Typed client for the Django backend; robust error handling & retries.
- **Responsive UI**: Mobile-first, accessible components and keyboard-friendly navigation.


### 1) Clone
```bash
git clone https://github.com/mehul1992/studentexam
cd studentexam
```

### 2) Install deps
```bash
npm install
# or
yarn install
```

### 3) Environment
Create `.env` from `.env.example`:

```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_PREFIX=/api
VITE_ENABLE_MOCKS=false
```

### 4) Run
```bash
npm run dev     # start dev server
npm run build   # production build
npm run preview # preview prod build
```

---

## 🔌 API Contracts (expects Django backend)

| Action            | Method | Endpoint               | Notes                        |
|------------------ |------- |----------------------- |----------------------------- |
| Login             | POST   | /api/login/            | returns token/session        |
| List Exams        | GET    | /api/exams/            | pagination supported         |
| Start Exam        | POST   | /api/exams/start/      | requires auth                |
| Get Results       | GET    | /api/results/          | list of attempts & summary   |
| Dashboard         | GET    | /api/dashboard/        | aggregates and charts data   |


## 🧪 Testing

```bash
npm run test       # unit tests
npm run test:watch
```
- **Unit**: Components, hooks, utils
- **Integration**: Pages with mocked API via **MSW**
- **Coverage**: Add `--coverage` if needed

---

## 🧰 Code Quality

- **SOLID**: Components with single responsibility; decouple UI from data-fetching.
- **DRY**: Shared hooks/utilities for requests, formatting, and state.
- **KISS**: Keep components small; prefer composition over complex props.

---

## 🗺️ UI Flows (high level)

1. **Login**
   - Submit credentials → receive token → store → redirect to `/exams`.
2. **List Exams**
   - Fetch `/exams/` → filter/search → select exam.
3. **Start Exam**
   - POST `/exams/start/` → render questions → handle timer & submit.
4. **Results & Dashboard**
   - GET `/results/`, `/dashboard/` → render charts (topic accuracy, attempts trend).

