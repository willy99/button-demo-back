export function getClickReply(text: string): string {
  if (text.includes("Hello")) return "Hello there";
  if (text.includes("Bye")) return "Cheers!";
  return `Backend received: "${text}"`;
}
