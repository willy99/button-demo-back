import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 4001;

type MessageClassification = "farewell" | "status-check" | "greeting" | "echo";

const farewellPhrases = ["bye", "goodbye", "farewell", "hasta la vista", "see you", "see ya", "later"];
const statusCheckPhrases = [
  "how are you",
  "how are u",
  "how r you",
  "how r u",
  "how's it going",
  "hows it going",
  "what's up",
  "whats up",
];
const greetingPhrases = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings"];

function normalizeMessage(text: string): string {
  return text.replace(/([A-Z])/g, " $1").toLowerCase();
}

function containsPhrase(text: string, phrases: string[]): boolean {
  return phrases.some((phrase) => text.includes(phrase));
}

function classifyMessage(text: string): MessageClassification {
  const normalized = normalizeMessage(text);

  if (containsPhrase(normalized, farewellPhrases)) {
    return "farewell";
  }

  if (containsPhrase(normalized, statusCheckPhrases)) {
    return "status-check";
  }

  if (containsPhrase(normalized, greetingPhrases)) {
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
