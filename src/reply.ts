export function getClickReply(text: string): string {
  const normalizedText = text.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();

  if (/\b(bye|hasta la vista|see you|see ya)\b/.test(normalizedText)) return "Cheers!";
  if (/\b(how are you|how is it going|how's it going)\b/.test(normalizedText)) {
    return "Fine, as usual! And you?";
  }
  if (/\b(hello|hi|hey|good morning|good afternoon|good evening|greetings)\b/.test(normalizedText)) {
    return "Hi, there!";
  }

  return `Backend received: "${text}"`;
}
