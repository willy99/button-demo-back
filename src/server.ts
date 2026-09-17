import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 4001;

type MessageClassification = "farewell" | "status-check" | "greeting" | "echo";

function classifyMessage(text: string): MessageClassification {
  const normalized = text.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();

  if (/\b(bye|goodbye|farewell|hasta\s*la\s*vista|see\s*(you|ya)|later)\b/.test(normalized)) {
    return "farewell";
  }

  if (
    /\b(how\s*(are|r)\s*(you|u)|how'?s?\s*it\s*going|what'?s?\s*up)\b/.test(
      normalized,
    )
  ) {
    return "status-check";
  }

  if (/\b(hello|hi|hey|good\s*(morning|afternoon|evening)|greetings)\b/.test(normalized)) {
    return "greeting";
  }

  return "echo";
}

function buildReply(text: string, classification: MessageClassification): string {
  if (classification === "farewell") {
    return "Cheers!";
  }

  if (classification === "status-check") {
    return "Fine, as usual! And you?";
  }

  if (classification === "greeting") {
    return "Hi, there!";
  }

  return `Backend received: "${text}"`;
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/click", (req, res) => {
  const body = req.body as { message?: unknown } | undefined;
  const text =
    typeof body?.message === "string" && body.message.trim() ? body.message.trim() : "Button clicked";
  const classification = classifyMessage(text);
  res.json({
    reply: buildReply(text, classification),
    clickedAt: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`button-demo-back listening on http://localhost:${PORT}`);
});
