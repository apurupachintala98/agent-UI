export function generateChatTitle(messages: string[]): string {
  const firstMsg = messages.find((m) => !!m)?.slice(0, 30) ?? "New chat";
  return firstMsg.length > 30 ? `${firstMsg}...` : firstMsg;
}
