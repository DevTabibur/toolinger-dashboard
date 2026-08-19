# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Toolinger admin dashboard — a Next.js 16 (App Router) + React 19 + TypeScript frontend that talks to a separate REST backend (default `http://localhost:5001/api`). It is an admin panel for a CMS/blog platform with user management, RBAC, chat/messaging, payments, and an extensive settings area. `project_plan.md` describes the original scaffold intent but the app has since grown well beyond it — trust the code, not the plan.

## Commands

```bash
npm run dev      # dev server on http://localhost:3001
npm run build    # production build (next build)
npm run start    # serve production build on port 3001
npm run lint     # eslint (flat config, next core-web-vitals + typescript)
```

There is no test suite. Both `pnpm-lock.yaml` and `package-lock.json` exist; `package-lock.json` is the freshly generated one, so npm is currently in use. Type-check via `npx tsc --noEmit` (tsconfig sets `noEmit`).

The dev server runs on port **3001**, not 3000. A separate backend must be running on the URL from `.env`.

## Environment

`.env` (git-tracked, currently pointing at local backend):
- `NEXT_PUBLIC_BACKEND_BASE_URL` — REST API base, e.g. `http://localhost:5001/api` (prod: `https://toolsbackend.toolinger.com/api`)
- `NEXT_PUBLIC_IMAGE_URL` — uploaded-asset base, e.g. `http://localhost:5001/upload`

Read these only through `helpers/config/envConfig.ts` (`getBaseURL()`, `getImageUrl()`), which supplies fallbacks. `next.config.ts` whitelists remote image hosts — add any new image origin there.

## Architecture

### Data layer — one RTK Query API, many injected slices
There is a single `createApi` instance, `baseAPI` in `redux/api/baseApi.ts` (reducerPath `'api'`). Every feature API file (`user.api.ts`, `blog.api.ts`, `auth.api.ts`, `comment.api.ts`, `chat.api.ts`, `payment.api.ts`, `blogCategory.api.ts`, `blogTag.api.ts`, `sentMessage.api.ts`, `OTPSettings.api.ts`) calls `baseAPI.injectEndpoints(...)` and exports its own hooks. **To add an endpoint, inject into `baseAPI` — do not create a second `createApi`.**

Gotcha: `redux/rootReducer.ts` and `redux/store.ts` reference `blogApi` for the reducer/middleware, but because `blogApi = baseAPI.injectEndpoints(...)`, `blogApi.reducer`/`.reducerPath`/`.middleware` are the shared `baseAPI` ones. All injected endpoints work through that single registration. When registering cache tags, add them to the `tagTypes` enum in `redux/tag-types.ts` (used by `invalidatesTags`/`providesTags`).

### Transport — axios under RTK Query
`baseAPI` uses a custom `axiosBaseQuery` (`helpers/axios/axiosBaseQuery.ts`) instead of fetch. Note its query shape uses `data` (not `body`) and a `contentType` field; multipart uploads set `Content-Type: multipart/form-data` in the endpoint's `query`.

All requests go through the shared axios `instance` (`helpers/axios/axiosInstance.ts`), which:
- attaches the access token from localStorage as the `Authorization` header (request interceptor),
- on **403**, transparently calls `/auth/refresh-token`, stores the new token, and retries the original request once,
- unwraps responses into `{ data, meta }`.

Auth token is stored in localStorage under the key from `constants/storageKey.constant.ts` (`authKey`). Token/session helpers live in `services/auth.services.ts` and `utils/jwt.ts` (`decodedToken`). The logged-in user is derived by decoding the JWT, not fetched.

### Auth & guards
`context/AuthContext.tsx` (`useAuth`) is the source of truth for `isAuthenticated`/`user`, wired to the auth mutations. Route protection is layout-level: `app/(dashboard)/dashboard/layout.tsx` wraps everything in `<AuthGuard>` (redirects to `/auth/login?returnUrl=...` when unauthenticated). Guards live in `guards/` — note `RoleBasedGuard.tsx` is currently a stub. Roles are `USER_ROLE` in `constants/role.constant.ts` (`user`, `admin`).

### UI state & theming
`redux/slices/ui.slice.ts` holds all appearance state (theme mode, RTL, accent/sidebar/topbar colors, boxed vs fluid, layout mode, language). The whole `ui` slice is **persisted to `localStorage['toolinger_ui']`** via a `store.subscribe` in `redux/store.ts` and rehydrated as `preloadedState`.

To avoid a flash before hydration, `app/layout.tsx` runs an **inline bootstrap `<script>`** that reads `toolinger_ui` and sets `dir`, `.dark` class, `--accent-color`/`--sidebar-bg` CSS vars, `.layout-boxed`, and `data-layout-mode` on `<html>` before React mounts. If you add a new persisted appearance option that affects first paint, update that inline script too.

Provider nesting (`lib/Providers.tsx`): Redux `Provider` → `AuthProvider` → `ClientLanguageProvider` → `ClientThemeProvider`. Toaster is `react-hot-toast` via `components/ClientToaster.tsx`.

### Routing
App Router with route groups that carry no URL segment: `(authentication)`, `(dashboard)`, and nested `(content)`/`(settings)`/`(user-management)` under `/dashboard`. So `app/(dashboard)/dashboard/(content)/cms/blog/page.tsx` serves `/dashboard/cms/blog`. `app/(layout pages)/` and `app/test*/` are layout/scratch demos, not product routes.

### Conventions
- Path alias `@/*` maps to the repo root (e.g. `@/redux/store`, `@/components/...`).
- Files are named by role: `*.api.ts`, `*.slice.ts`, `*.schema.ts` (zod, in `schemas/`), `*.constant.ts`, `*.services.ts`, `*.types.ts`.
- Feature API files are typed loosely (`export const xApi: any = ...`); RTK hooks come from these exports.
- UI primitives are shadcn/Radix in `components/ui/`; feature components under `components/dashboard`, `components/forms`, `components/editor` (Tiptap rich text), `components/template`. Icons come from both `lucide-react` and `react-icons/fi`.
- Sidebar navigation is data-driven from `constants/SidebarMenu.constant.ts` (sections → items → subItems).
- Forms use a mix of `react-hook-form` + zod and Formik + yup across the codebase — match whatever the file you're editing already uses.

## Development Guidelines

Follow the patterns already in the codebase over your own preferences — consistency across this repo matters more than any single "best practice". The conventions below are what the existing code actually does; new code should look like it was written by the same hand.

### Adding a feature API
1. Create `redux/api/<feature>.api.ts`. Define a single URL constant at the top (`const XURL = "/v1/x"`).
2. `export const xApi: any = baseAPI.injectEndpoints({ endpoints: (build) => ({ ... }) })`. Never call `createApi` again.
3. Use `build.query` for reads and `build.mutation` for writes. The query object uses `data` (not `body`), plus `params`, `method`, `headers`. For protected endpoints, add `headers: { Authorization: \`Bearer ${getFromLocalStorage(authKey)}\` }` (the axios interceptor also attaches a token, but existing endpoints set it explicitly — match that).
4. Set `providesTags`/`invalidatesTags` from the `tagTypes` enum. Add a new tag to `redux/tag-types.ts` (both the enum and `tagTypesList`) if none fits — this is what makes lists refetch after a mutation.
5. Export the generated hooks in a destructured block at the bottom of the file.

### Pages & components
- Interactive pages are Client Components: start the file with `'use client';`. Server Components are the exception here, not the rule.
- Name the component (`const BlogCategoriesPage = () => { ... }`) and `export default` it at the bottom of the file — avoid inline `export default function`.
- Import UI primitives from the `@/components/ui` barrel; icons from `react-icons/fi` (and `lucide-react` where already used).
- User-facing strings go through `const { t } = useLanguage()` for i18n — don't hardcode copy that sibling pages translate.
- Data fetching is RTK Query hooks in the component body. Debounce search inputs with `useDebounce` (see `hooks/useDebounce.ts`) before passing to a query. Pagination/filter/sort state is local `useState`; pass it as query params and reset `currentPage` to 1 in a `useEffect` when filters change (existing list pages do exactly this).
- Show feedback with `toast` from `react-hot-toast`. After a mutation, existing code inspects `res?.data?.statusCode` and toasts success/failure — follow that shape.
- Render loading with the shared `Loader` / `components/ui/Loader`, not ad-hoc spinners.

### Forms & validation
- Validation schemas live in `schemas/*.schema.ts` using **zod** (`z.object({...})` with per-field messages). Reuse or extend these rather than validating inline.
- Two form stacks coexist: `react-hook-form` + `@hookform/resolvers` and `formik` + `yup`/`zod-formik-adapter`. Match whichever the file (or its neighbours) already uses; don't introduce a third pattern or migrate one to the other opportunistically.

### Redux UI state
- Appearance/UI state belongs in `redux/slices/ui.slice.ts`. Extend the `UiState` type, add a default to `defaultUiState`, and add a typed reducer (`PayloadAction<...>`). It is auto-persisted — no extra wiring needed for persistence.
- If the new field must be correct on first paint (affects `<html>` before hydration), also update the inline bootstrap script in `app/layout.tsx`.

### Conventions to match
- TypeScript is `strict`. Existing feature files disable explicit-`any` at the top (`/* eslint-disable @typescript-eslint/no-explicit-any */`) and lean on optional chaining (`res?.data?.meta?.total`) rather than precise API types. New code may follow suit, but prefer real types for anything you own end-to-end.
- Use the `@/*` path alias for all cross-directory imports.
- Keep filenames role-suffixed: `*.api.ts`, `*.slice.ts`, `*.schema.ts`, `*.constant.ts`, `*.services.ts`, `*.types.ts`.
- Run `npm run lint` before considering a change done; there are no tests to run.

## Notes

`console.log` calls are left in the transport/auth layer intentionally as debugging aids; don't treat them as accidental. The repo root contains committed `image-*.png` design references used by `README.md`/`project_plan.md`.
