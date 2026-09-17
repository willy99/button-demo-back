import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 4001;

function getReply(text: string) {
  const normalized = text.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();

  if (
    /\b(bye|goodbye|farewell)\b/.test(normalized) ||
    /\b(hasta la vista|see you|see ya|seeya)\b/.test(normalized)
  ) {
    return "Cheers!";
  }

  if (/\bhow\b.*\b(are|is|'s)\b.*\b(you|it)\b.*\b(doing|going)?\b/.test(normalized)) {
    return "Fine, as usual! And you?";
  }

  if (
    /\b(hello|hi|hey|greetings)\b/.test(normalized) ||
    /\bgood ?(morning|afternoon|evening)\b/.test(normalized)
  ) {
    return "Hi, there!";
  }

  return text;
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/click", (req, res) => {
  const body = req.body as { message?: unknown } | undefined;
  const text =
    typeof body?.message === "string" && body.message.trim() ? body.message.trim() : "Button clicked";
  res.json({
    reply: getReply(text),
    clickedAt: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`button-demo-back listening on http://localhost:${PORT}`);
});
