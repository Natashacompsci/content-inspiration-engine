# Content Inspiration Engine

A small Next.js app to generate content ideas and inspiration.

## What this repo contains
- A Next.js app (app router) with components under `components/`.
- API route(s) under `app/api/` to generate ideas.

## Quick setup

Requirements
- Node 18+ (or compatible)
- pnpm (recommended) or npm/yarn

Install dependencies

```bash
pnpm install
# or
# npm install
# or
# yarn
```

Run the dev server

```bash
pnpm dev
# or
# npm run dev
# or
# yarn dev
```

Build for production

```bash
pnpm build
pnpm start
```

## Environment variables
Create a `.env.local` at the project root with the following variables (example):

```
OPENAI_API_KEY=sk-...
PERPLEXITY_API_KEY=your-perplexity-key
```

Note: This project uses an OpenAI-compatible SDK and also integrates Perplexity (see below).

## Perplexity API integration
This project integrates the Perplexity API to enhance idea generation. The integration is implemented in the server-side API route(s) under `app/api/generate-ideas/route.ts`.

Key points about the integration:
- The server sends a request to the Perplexity API endpoint using the `PERPLEXITY_API_KEY` from environment variables.
- Responses from Perplexity are parsed and combined with the project's idea generation logic (e.g., formatting, deduplication) before returning JSON to the client.
- Keep API keys secret — never commit `.env.local` to source control.

If you want me to, I can:
- Add an example `.env.local.example` file.
- Show or refactor the exact code in `app/api/generate-ideas/route.ts` that calls Perplexity for clearer documentation.

## Linting & type checks
Run the project's lint and type checks locally after installing dependencies:

```bash
pnpm run lint
# and
pnpm build
```

## Notes
- I removed old "v0" project references and updated package name and metadata.
- After installing dependencies, consider removing the `// @ts-nocheck` line in `app/layout.tsx` so TypeScript can use installed types.

---
If you want the README expanded (examples, API schema, request/response samples), tell me what you'd like included.