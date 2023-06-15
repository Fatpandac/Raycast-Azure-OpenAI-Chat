import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { History } from "../hooks";

interface GenerateMessagesOptions {
  contextMessageCount: number;
}

const SYSTEM_PROMPT = {
  role: "system",
  content: "You are a helpful assistant. You return the code of markdown including the tag for the code language."
}

export function generateMessages(histories: History[], prompt: string, options?: GenerateMessagesOptions) {
  return [
    SYSTEM_PROMPT,
    ...histories
      .slice(0, options?.contextMessageCount ?? 4)
      .map((history) => [
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: history.prompt,
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
          content: history.content,
        },
      ])
      .flat(),
    { role: ChatCompletionRequestMessageRoleEnum.User, content: prompt },
  ].filter((item) => item.content);
}
