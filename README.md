# Enchiridion — dev umbrella

This repo is a thin **git-submodule umbrella** that links the two products together for local development. Each product lives in its own GitHub repo and deploys independently.

| Folder (submodule) | Product | Repo | Stack | Deploys to |
| --- | --- | --- | --- | --- |
| `website/` | Front-facing site / app shell | `rfalconvargas/enchiridionapp` | Next.js 15 (App Router) | `enchiridionapp.com` |
| `app/` | 3D "Deep-Time Version Control" viewer | `rfalconvargas/enchiridion-v2` | Vite + React + react-three-fiber | `learn.enchiridionapp.com` |

The two apps are linked the way `openai.com` links to ChatGPT: a **Launch App** button in the website navigates to the app's domain. They share no build.

## First-time clone

Because the apps are submodules, clone with `--recurse-submodules` (or init after cloning):

```bash
git clone --recurse-submodules https://github.com/rfalconvargas/enchiridionapp-master-repo.git
# or, if already cloned:
git submodule update --init --recursive
```

## Install & run

```bash
npm install            # installs the umbrella's tooling (concurrently)
npm run install:all    # installs deps inside website/ and app/
npm run dev            # runs website (:3000) + 3D app (:5173) together
```

Run individually:

```bash
npm run dev:web   # website -> http://localhost:3000
npm run dev:app   # 3D app  -> http://localhost:5173
```

## The Launch App bridge

- Button: `website/components/shell/LaunchAppButton.tsx`, mounted in `website/components/shell/TopBar.tsx`.
- Destination is env-driven (`website/lib/appUrl.ts`), defaulting to `https://learn.enchiridionapp.com`.
- For local dev, point it at the Vite server in `website/.env.local`:

```bash
NEXT_PUBLIC_LEARN_APP_URL=http://localhost:5173
```

The app's Vite dev port is pinned to `5173` (`app/vite.config.ts`) so the link target is stable.

## Working with submodules

```bash
npm run sync                       # pull latest of both submodules (update --remote --merge)
git submodule update --remote app  # update just one
```

Each submodule is a normal git repo: `cd website` (or `app`), commit and push as usual, then commit the updated submodule pointer here in the umbrella.

## Deployment

- `enchiridionapp.com` → Vercel project on `enchiridionapp.git` (root = repo root).
- `learn.enchiridionapp.com` → Vercel project on `enchiridion-v2.git` (Vite static build, `dist/`).
- Set `NEXT_PUBLIC_LEARN_APP_URL=https://learn.enchiridionapp.com` in the website's production env.

## Known follow-ups

- **`app/`**: the canonical 3D viewer is feature-rich WIP and currently has TypeScript build errors (a missing `LocalModelViewer` component and several invalid inline-style props in `src/App.tsx`). It runs in `vite` dev but won't `npm run build` until fixed.
- **`website/`**: pre-existing tracked Google OAuth `client_secret_*.json` files should be removed from history and the credentials rotated.
- Large `.glb` models in `app/public/` (one is 63 MB) should move to Git LFS or a CDN.
