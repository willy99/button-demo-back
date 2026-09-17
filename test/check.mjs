// Self-check: starts the real TS server via tsx and confirms the REST contract.
import { spawn } from "node:child_process";

const PORT = process.env.CHECK_PORT || "4098";

function waitForHealth(url, timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {
        // not up yet
      }
      if (Date.now() > deadline) return reject(new Error("server did not become healthy"));
      setTimeout(attempt, 200);
    };
    attempt();
  });
}

const child = spawn("npx", ["tsx", "src/server.ts"], {
  env: { ...process.env, PORT },
  stdio: ["ignore", "pipe", "pipe"],
});

let exitCode = 1;
try {
  await waitForHealth(`http://localhost:${PORT}/api/health`);

  const cases = [
    ["goodMorning there", "Hi, there!"],
    ["HowAreYouDoing today?", "Fine, as usual! And you?"],
    ["hastaLaVista later", "Cheers!"],
    ["test click", 'Backend received: "test click"'],
  ];

  for (const [message, expectedReply] of cases) {
    const res = await fetch(`http://localhost:${PORT}/api/click`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error(`click endpoint responded with HTTP ${res.status}`);
    const data = await res.json();
    if (data.reply !== expectedReply) {
      throw new Error(`unexpected reply for ${message}: ${JSON.stringify(data)}`);
    }
  }

  console.log("ok button-demo-back self-check passed");
  exitCode = 0;
} catch (err) {
  console.error("FAILED:", err.message);
} finally {
  child.kill();
}

process.exit(exitCode);
