---
description: "The mandatory folder layout for backend (Hono and Bun) and frontend projects, with no deviations allowed without a documented reason in the README."
date: 2026-09-12
keywords: [folder structure, project structure, backend, frontend, conventions, hono]
featured: false
---

⛔ **HARD** — All projects must follow this layout. No deviations without a documented reason in README.md.

## 1. FOLDER STRUCTURE FOR BACKEND PROJECTS

```
<project-root>/
│
├── src/
│   │
│   ├── app/
│   │   ├── app.ts                    # Create and configure Hono app
│   │   ├── server.ts                 # Bun development server
│   │   │
│   │   ├── api/
│   │   │
│   │   ├── auth/
│   │   │   ├── route.ts
│   │   │   ├── controller.ts
│   │   │   ├── service.ts
│   │   │   ├── repository.ts
│   │   │   ├── middleware.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── users/
│   │   │   ├── route.ts
│   │   │   ├── controller.ts
│   │   │   ├── service.ts
│   │   │   ├── repository.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── storage/
│   │   ├── admin/
│   │   ├── websocket/
│   │   ├── chat-server/
│   │   ├── game-server/
│   │   └── voice-server/
│   │
│   ├── packages/
│   │
│   │   ├── api/
│   │   │   ├── axios.api.ts
│   │   │   └── hono.api.ts
│   │   │
│   │   ├── configs/
│   │   │   ├── app.config.ts
│   │   │   ├── database.config.ts
│   │   │   ├── auth.config.ts
│   │   │   └── constants.ts
│   │   │
│   │   ├── database/
│   │   │   ├── client.ts
│   │   │   ├── schema/
│   │   │   ├── seed/
│   │   │   └── migrations/
│   │   │
│   │   ├── env/
│   │   │   └── app.env.ts
│   │   │
│   │   ├── middlewares/
│   │   │   ├── cors.ts
│   │   │   ├── logger.ts
│   │   │   ├── request-id.ts
│   │   │   ├── secure-headers.ts
│   │   │   ├── rate-limit.ts
│   │   │   ├── validator.ts
│   │   │   └── error-handler.ts
│   │   │
│   │   ├── responses/
│   │   │   ├── success.ts
│   │   │   ├── error.ts
│   │   │   └── pagination.ts
│   │   │
│   │   ├── errors/
│   │   │   ├── app.error.ts
│   │   │   ├── validation.error.ts
│   │   │   ├── unauthorized.error.ts
│   │   │   └── not-found.error.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── app.utils.ts
│   │   │   ├── crypto.utils.ts
│   │   │   ├── jwt.utils.ts
│   │   │   ├── cookie.utils.ts
│   │   │   ├── string.utils.ts
│   │   │   └── date.utils.ts
│   │   │
│   │   ├── forms/
│   │   │
│   │   ├── schemas/
│   │   │
│   │   └── validators/
│   │
│   ├── assets/
│   │   ├── css/
│   │   ├── email/
│   │   ├── html/
│   │   └── images/
│   │
│   └── types/
│       ├── api.d.ts
│       ├── auth.d.ts
│       ├── env.d.ts
│       └── global.d.ts
│
├── public/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env
├── .env.example
├── .gitignore
├── biome.json
├── bunfig.toml
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── vercel.json
├── index.ts
├── README.md
└── AGENT.md
```

## 2. FOLDER STRUCTURE FOR FRONTEND PROJECTS

```
<project-root>/
├── src/
│   ├── app/                          # Core application shell
│   │   ├── app.tsx                   # Root <App /> component
│   │   ├── api/                      # REST / GraphQL route handlers
│   │   │   └── [resource]/
│   │   │       ├── route.ts
│   │   │       └── [resource].service.ts
│   │   ├── game-server/              # Colyseus multiplayer (optional)
│   │   ├── chat-server/              # WebSocket chat (optional)
│   │   └── voice-server/             # Voice integration (optional)
│   │
│   ├── components/
│   │   ├── features/                 # Domain-specific composite components
│   │   │   └── [feature-name]/
│   │   │       ├── index.ts
│   │   │       ├── [Feature].tsx
│   │   │       └── [Feature].test.tsx
│   │   ├── layouts/
│   │   │   └── AppClientLayout.tsx
│   │   ├── providers/
│   │   │   ├── ThemeProvider.tsx
│   │   │   └── AuthProvider.tsx
│   │   └── ui/
│   │       ├── buttons/
│   │       ├── inputs/
│   │       ├── images/
│   │       ├── svg/
│   │       ├── Shadcn/
│   │       └── index.ts
│   │
│   ├── packages/
│   │   ├── api/
│   │   │   └── axios.api.ts
│   │   ├── configs/
│   │   │   └── db.config.ts
│   │   ├── utils/
│   │   │   ├── shadcn.ts
│   │   │   └── format.ts
│   │   ├── hooks/
│   │   │   └── useBreakPoints.ts
│   │   ├── shadcn/
│   │   ├── env/
│   │   │   └── app.env.ts
│   │   ├── forms/
│   │   │   └── [FormName].form.ts
│   │   └── schemas/
│   │       └── [resource].schema.ts
│   │
│   ├── styles/
│   │   ├── globals.css               # Tailwind @import, CSS vars, base resets
│   │   ├── ui.css                    # CSS for components/ui
│   │   ├── app.css                   # CSS for rest of application
│   │   └── animation.css             # All animation keyframes & GSAP helpers
│   │
│   ├── types/
│   │   ├── api.d.ts
│   │   ├── env.d.ts
│   │   └── global.d.ts
│   │
│   ├── main.tsx
│   └── index.css
│
├── public/
├── tests/e2e/
├── .env.example
├── .env.local
├── .eslintrc.json
├── .prettierrc
├── components.ts
├── bunfig.toml
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── AGENT.md
└── README.md
```
