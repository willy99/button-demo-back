export function getClickReply(text: string): string {
  const message = text.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();

  if (/\bhow\s+(?:are\s+you(?:\s+doing)?|is\s+(?:it\s+)?going)\b/.test(message)) {
    return "Fine, as usual! And you?";
  }
  if (/\b(?:bye|goodbye|farewell|hasta\s+la\s+vista|see\s+(?:you|ya)|catch\s+you\s+later)\b/.test(message)) {
    return "Cheers!";
  }
  if (/\b(?:hello|hi|hey|good\s+morning|greetings|salutations)\b/.test(message)) {
    return "Hi, there!";
  }

  return `Backend received: "${text}"`;
}
