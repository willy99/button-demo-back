import express from "express";
import cors from "cors";
import { getClickReply } from "./reply.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 4001;

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/click", (req, res) => {
  const body = req.body as { message?: unknown } | undefined;
  const text =
    typeof body?.message === "string" && body.message.trim() ? body.message.trim() : "Button clicked";
  res.json({
    reply: getClickReply(text),
    clickedAt: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`button-demo-back listening on http://localhost:${PORT}`);
});
