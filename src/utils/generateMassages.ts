import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { History } from "../hooks";

interface GenerateMessagesOptions {
  contextMessageCount: number;
}

export function generateMessages(histories: History[], prompt: string, options?: GenerateMessagesOptions) {
  return [
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
