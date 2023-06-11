import { useEffect, useState } from "react";
import type { AzureOpenAIConfig } from "../utils";
import { AzureOpenAI } from "../utils";
import { useHistories } from "./useHistories";

interface Options {
  deployment: string;
}

interface UseAzureOpenAIConfig extends AzureOpenAIConfig, Options {}

export default function useAzureOpenAI(config: UseAzureOpenAIConfig, prompt: string) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { histories } = useHistories();

  const messages = [
    ...histories
      .slice(0, 4)
      .map((history) => [
        {
          role: "user",
          content: history.prompt,
        },
        {
          role: "assistant",
          content: history.content,
        },
      ])
      .flat(),
    { role: "user", content: prompt },
  ];

  const client = AzureOpenAI(config);

  useEffect(() => {
    (async () => {
      if (!prompt) return;
      setIsLoading(true);
      setContent("");

      const events = await client.listChatCompletions(config.deployment, messages);

      for await (const event of events) {
        for (const choice of event.choices) {
          setContent((x) => x + (choice.delta?.content || ""));
        }
      }
      setIsLoading(false);
    })();
  }, [prompt]);

  return { content, isLoading };
}
