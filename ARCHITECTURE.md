# Architecture

This project follows a production-oriented, feature-first Next.js architecture.

## Structure

- `app/`: routing, layouts, server entry points, and page composition
- `src/features/<feature>/`: colocated feature code such as screens, components, hooks, server actions, feature-specific types, styles, validation, and constants
- `src/shared/`: cross-feature UI or helpers with clear reuse value
- `src/lib/`: app-level utilities, route constants, and infrastructure helpers

## Rules

- Keep feature code close together; do not split a small feature across many architecture folders without a real need.
- Use server components by default and keep client boundaries small and explicit.
- Put form validation, mapping, and feature logic in colocated feature utilities or server modules, not inside JSX bodies.
- Use `app/` as the Next.js boundary only; pages should compose features, not contain feature implementation details.
- Move code to `src/shared/` or `src/lib/` only when it is truly reused across features.
- Prefer server components by default and keep client boundaries as small as possible.
- Prefer straightforward code paths over premature abstraction.
- Add tests around feature behavior where the logic lives.
