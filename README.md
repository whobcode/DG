# Documentation Generator (DG)

Paste source code, get AI-generated documentation in Markdown — on Cloudflare Workers
(TypeScript + Hono + Workers AI). Four output styles: API reference, README overview,
inline-commented code, or a beginner tutorial. Originally specced as a Python tool — rebuilt on Cloudflare.

## Features
- Paste any code; auto-detect or specify the language
- Choose a documentation style (reference / readme / inline / tutorial)
- Live Markdown preview (marked.js) and copy-to-clipboard

## Run
```bash
npm install
npm run dev
```

## Deploy
```bash
npm run deploy
```

## API
- `POST /api/generate` `{ code, language?, style? }` → `{ documentation }` (Markdown)
- `GET  /api/styles` → available styles

## Stack
Cloudflare Workers · Hono · Workers AI (Llama 3.1) · marked.js
