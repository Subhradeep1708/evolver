# Goals

[ ] Upgrade react+vite
[ ]

# Project Structure

```
frontend/
├── public/
│   ├── favicon.ico
│   └── images/
│       ├── logo.png
│       ├── banner.png
│       └── ...
├── src/
│   ├── components/
│   │   ├── ui/                      # Reusable shadcn UI components (like Button, Input)
│   │   ├── forms/                   # Form-specific components (ExamForm, SubjectForm)
│   │   ├── layout/                  # Layout wrappers (MainLayout, AuthLayout)
│   │   └── shared/                  # Common components (Navbar, Sidebar, Footer)
│   │
│   ├── features/                    # Domain-specific logic
│   │   ├── auth/                    # Auth-related pages, hooks, logic
│   │   │   ├── LoginPage.jsx
│   │   │   ├── auth.api.js
│   │   │   └── useAuth.js
│   │   ├── exams/                   # Exam-related logic and views
│   │   │   ├── CreateExam.jsx
│   │   │   ├── ExamCard.jsx
│   │   │   └── exams.api.js
│   │   ├── students/                # Student dashboard, results, profile
│   │   ├── teachers/                # Teacher dashboard, actions
│   │   └── dashboard/               # Shared dashboard layout/views
│
│   ├── pages/                       # Route-level pages (optional if using features/)
│   │   ├── Landing.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│
│   ├── routes/                      # Centralized route configuration
│   │   └── AppRoutes.jsx
│
│   ├── lib/                         # API utilities, axios configs
│   │   ├── axios.js
│   │   └── helpers.js
│
│   ├── store/                       # Global state (Redux/Zustand slices)
│   │   ├── authSlice.js
│   │   └── index.js
│
│   ├── hooks/                       # Custom reusable hooks
│   │   ├── useFetch.js
│   │   └── useDebounce.js
│
│   ├── constants/                   # Static values like role enums, config values
│   │   ├── roles.js
│   │   └── appConfig.js
│
│   ├── contexts/                    # React Context APIs
│   │   └── UserContext.jsx
│
│   ├── styles/                      # Global styles
│   │   ├── globals.css
│   │   └── theme.js                 # Optional: shadcn/chakra theme
│
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env                             # Environment variables
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── eslint.config.js
```
