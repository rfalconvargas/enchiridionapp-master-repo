---
name: landing-page-copy-and-visual-refinement
description: Workflow command scaffold for landing-page-copy-and-visual-refinement in enchiridionapp-master-repo.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /landing-page-copy-and-visual-refinement

Use this workflow when working on **landing-page-copy-and-visual-refinement** in `enchiridionapp-master-repo`.

## Goal

Refines the landing page's copy, visual style, and branding for the learn-app, often to mirror changes from the main enchiridion-app repo.

## Common Files

- `learn-app/src/app/globals.css`
- `learn-app/src/app/layout.tsx`
- `learn-app/src/app/page.tsx`
- `learn-app/src/components/landing/SkullHero.tsx`
- `learn-app/src/components/landing/ChannelBand.tsx`
- `learn-app/src/components/landing/SiteFooter.tsx`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit landing page React components (e.g., SkullHero, ChannelBand, SiteFooter)
- Update global styles (globals.css) for visual or branding changes
- Modify layout.tsx and page.tsx for new copy, meta tags, or structure
- Commit changes with a message referencing landing, brand, or marketing

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.