---
name: submodule-bump-for-website-feature-sync
description: Workflow command scaffold for submodule-bump-for-website-feature-sync in enchiridionapp-master-repo.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /submodule-bump-for-website-feature-sync

Use this workflow when working on **submodule-bump-for-website-feature-sync** in `enchiridionapp-master-repo`.

## Goal

Synchronizes the umbrella repository with updates from the website submodule, including feature additions or removals.

## Common Files

- `website`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Update the website submodule to a new commit hash
- Commit the submodule pointer change with a message referencing the feature or removal

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.