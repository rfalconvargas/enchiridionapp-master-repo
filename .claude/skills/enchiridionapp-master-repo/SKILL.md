```markdown
# enchiridionapp-master-repo Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns, coding conventions, and collaborative workflows used in the `enchiridionapp-master-repo`. The repository is primarily written in TypeScript and does not use a specific framework. It features modular code organization, consistent naming conventions, and clear commit practices. You will learn how to contribute effectively, maintain code style, and execute common repository workflows using suggested commands.

## Coding Conventions

### File Naming
- **Style:** camelCase
- **Example:**  
  ```
  userProfile.ts
  landingPage.test.ts
  ```

### Import Style
- **Style:** Alias-based imports
- **Example:**
  ```typescript
  import { SkullHero } from '@/components/landing/SkullHero';
  import { fetchData } from '@/utils/api';
  ```

### Export Style
- **Style:** Named exports
- **Example:**
  ```typescript
  // In SkullHero.tsx
  export function SkullHero() {
    // ...
  }
  ```

### Commit Message Patterns
- **Prefixes:** `feat`, `chore`, `marketing`
- **Average Length:** ~62 characters
- **Example:**
  ```
  feat: add new branding to landing page hero section
  chore: bump website submodule for feature sync
  marketing: update landing copy for Q2 campaign
  ```

## Workflows

### Landing Page Copy and Visual Refinement
**Trigger:** When updating the landing page's messaging, branding, or visual polish for consistency or marketing purposes.  
**Command:** `/refine-landing`

1. Edit landing page React components, such as:
    - `learn-app/src/components/landing/SkullHero.tsx`
    - `learn-app/src/components/landing/ChannelBand.tsx`
    - `learn-app/src/components/landing/SiteFooter.tsx`
2. Update global styles in `learn-app/src/app/globals.css` for visual or branding changes.
3. Modify layout or page structure in:
    - `learn-app/src/app/layout.tsx`
    - `learn-app/src/app/page.tsx`
    - Update copy, meta tags, or structure as needed.
4. Commit your changes with a message referencing `landing`, `brand`, or `marketing`.
    ```bash
    git add .
    git commit -m "marketing: update landing copy for Q2 campaign"
    git push
    ```
5. (Optional) Use the `/refine-landing` command to document or automate the workflow.

### Submodule Bump for Website Feature Sync
**Trigger:** When synchronizing the umbrella repository with updates from the website submodule (e.g., pulling in new features or removing deprecated ones).  
**Command:** `/bump-website-submodule`

1. Update the website submodule to the desired commit hash:
    ```bash
    cd website
    git fetch
    git checkout <new-commit-hash>
    cd ..
    git add website
    ```
2. Commit the submodule pointer change with a message referencing the feature or removal:
    ```bash
    git commit -m "chore: bump website submodule for feature XYZ"
    git push
    ```
3. (Optional) Use the `/bump-website-submodule` command to document or automate the workflow.

## Testing Patterns

- **Framework:** Unknown (not detected)
- **File Pattern:** Test files are named using the `*.test.*` convention.
- **Example:**
  ```
  userProfile.test.ts
  landingPage.test.tsx
  ```
- **Typical Test Structure:**
  ```typescript
  // userProfile.test.ts
  import { getUserProfile } from '@/utils/user';

  describe('getUserProfile', () => {
    it('returns user data for valid ID', () => {
      // test implementation
    });
  });
  ```

## Commands

| Command                  | Purpose                                                        |
|--------------------------|----------------------------------------------------------------|
| /refine-landing          | Initiate landing page copy, branding, or visual refinement     |
| /bump-website-submodule  | Synchronize website submodule with latest features or removals |
```
