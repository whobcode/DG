import { Hono } from "hono";

type Bindings = { AI: Ai; ASSETS: Fetcher };
const app = new Hono<{ Bindings: Bindings }>();

const STYLES = {
  reference: "Generate API reference documentation: for each function/class/method list its purpose, parameters (name, type, description), return value, and thrown errors.",
  readme: "Generate a README-style overview: what the code does, key components, a usage example, and notes.",
  inline: "Rewrite the code adding high-quality docstrings/JSDoc comments inline. Return the fully commented code in a single code block.",
  tutorial: "Write a short tutorial that walks a newcomer through what this code does step by step, with examples.",
} as const;
type Style = keyof typeof STYLES;

// POST /api/generate { code, language?, style? } -> markdown documentation
app.post("/api/generate", async (c) => {
  const body = (await c.req.json().catch(() => null)) as { code?: string; language?: string; style?: Style } | null;
  if (!body?.code || typeof body.code !== "string") return c.json({ error: "code (string) required" }, 400);
  if (body.code.length > 20000) return c.json({ error: "code too long (max 20k chars)" }, 413);
  const style: Style = body.style && body.style in STYLES ? body.style : "reference";
  const language = body.language || "auto-detect the language";

  const out = (await c.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    messages: [
      { role: "system", content: "You are a senior engineer who writes precise, well-structured technical documentation in Markdown. Never invent behavior not present in the code." },
      { role: "user", content: `Language: ${language}.\n${STYLES[style]}\n\nCode:\n\`\`\`\n${body.code}\n\`\`\`` },
    ],
    max_tokens: 2048,
  })) as { response?: string };
  return c.json({ style, documentation: out.response ?? "" });
});

app.get("/api/styles", (c) => c.json({ styles: Object.keys(STYLES) }));

export default app;
