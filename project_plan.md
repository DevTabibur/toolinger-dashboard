

Build a complete responsive Dashboard frontend using Next.js (App Router), TypeScript, pnpm, Tailwind CSS and shadcn/ui (Radix). Use Redux Toolkit (RTK) + RTK Query for state & API. Project must be production-structured and ready to connect to a REST backend (json-server in dev). Follow these exact feature requirements and file/folder names.

Tech stack: Next.js (app router) + TypeScript, pnpm, Tailwind CSS, shadcn/ui, lucide-react icons, Redux Toolkit + RTK Query, react-hook-form + zod for forms, json-server for mock API.

General rules:
- Use app directory (app/*). Keep components in /components, redux slices in /slices, services in /services, api in /services/api.ts, and store in /store/store.ts.
- Use CSS variables for accent color presets and tailwind for layout. Keep accessible semantics and keyboard navigation for sidebar.
- Always export default React components; use Tailwind utility classes and shadcn components where possible.
- Provide sample json-server db.json with users, tools, sessions, notifications.
- Provide npm/pnpm scripts: dev (next) and mock-api (json-server), start-dev script to run both (concurrently optional).
- Provide README with run steps.

Must-implement features (exact):
1) Layout & Appearance
  - Layout variants toggle (Default, Mini, Horizontal stub, TwoColumn stub, Detached stub, WithoutHeader, RTL). At minimum fully implement Default, Mini, WithoutHeader and RTL behavior.
  - Theme Mode toggle: System / Light / Dark. Persist to localStorage and redux `ui` slice.
  - Language switcher UI (i18n stub) toggling label only (en / bn). Save to redux.
  - Fullscreen toggle (use Fullscreen API).
  - Theme color presets and customizable accent colors (primary + secondary) using CSS vars and a ThemeCustomizer panel with live preview.
  - Sidebar background image/color and Sidebar color controls.
  - Top Bar color control.
  - Layout width option: fluid (full width) and boxed (max-width container).

2) Navigation & Global UI
  - Role-aware sidebar: menu items come from a JSON menu config with `roles:[]` array. Sidebar hides/shows by auth user role.
  - Topbar with Search (debounced), Notification dropdown (RTK Query to mock notifications), Language selector, User Profile menu, Theme Settings (gear icon opens ThemeCustomizer).
  - Breadcrumb component that reads current route.

3) Auth & RBAC skeleton
  - Mock login page that sets `auth.user` in redux with `role: 'admin'|'editor'|'user'`. Persist token mock in localStorage.
  - RoleGuard component to wrap pages.
  - Impersonation stub (admin can impersonate) and Session list UI (read from /sessions in db.json).
  - MFA (TOTP) page stub for admin actions (modal enforcement).

4) Data & CRUD stubs
  - Users page: server-side pagination via RTK Query, soft-delete (move to trash flag), restore, permanent delete.
  - Tools page: list 30 placeholders, toggle free/premium, edit modal.

APIs (json-server) endpoints: /users, /tools, /sessions, /notifications.

Deliverables (files & key content):
- app/layout.tsx (global provider + redux)
- app/dashboard/layout.tsx
- app/dashboard/page.tsx (home KPIs)
- app/auth/login/page.tsx
- app/dashboard/users/page.tsx
- app/dashboard/tools/page.tsx
- components/Layout/Sidebar.tsx
- components/Layout/Topbar.tsx
- components/Layout/ThemeCustomizer.tsx
- components/ui/Table.tsx (reusable with props for columns/data)
- store/store.ts
- slices/uiSlice.ts
- slices/authSlice.ts
- services/api.ts (RTK Query createApi)
- services/usersApi.ts (endpoints)
- db.json (sample data with 50 users, 30 tools, 5 sessions, 10 notifications)
- README.md

Acceptance criteria (automated checks):
- Theme toggles persist on refresh and update DOM class (dark).
- RTL toggle flips `dir` attribute and layout mirrors.
- Sidebar role-aware: login as each role shows different menu items.
- Users page supports pagination and soft-delete/restore using json-server.
- All pages responsive at 320px, 768px, 1280px.
- No console errors, TypeScript no-emit errors.

Produce full code for each file listed above. Keep code clean and minimal comments. End output with exact run commands (pnpm install, pnpm dev, pnpm run mock-api).
