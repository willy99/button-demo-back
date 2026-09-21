export function getClickReply(text: string): string {
  const normalizedText = text.replace(/([a-z])([A-Z])/g, "$1 $2");

  if (/\b(how (are you( doing)?|is it going)|how's it going)\b/i.test(normalizedText)) {
    return "Fine, as usual! And you?";
  }
  if (/\b(bye|goodbye|hasta la vista|see ya|see you|take care|farewell)\b/i.test(normalizedText)) {
    return "Cheers!";
  }
  if (/\b(hello|hi|hey|good morning|good afternoon|good evening|greetings)\b/i.test(normalizedText)) {
    return "Hi, there!";
  }
  return `Backend received: "${text}"`;
}
