import { Detail } from "@raycast/api";
import { formatContent } from "../utils";
import { History, useAI } from "../hooks";
import dayjs from "dayjs";

interface ShowDtailProps {
  histories: History[];
  handleSetHistories: (histories: History[]) => void;
  prompt: string;
  date: number;
}

export function ShowDtail(props: ShowDtailProps) {
  const { histories, handleSetHistories, prompt, date } = props;

  const searchPromptIdx = histories.findIndex((history) => history.prompt === prompt && history.date === date);
  if (searchPromptIdx !== -1) {
    return <Detail markdown={formatContent(histories.slice(searchPromptIdx, histories.length))} />;
  }

  const { content, isLoading } = useAI(prompt);

  if (!isLoading) {
    const completeHistory = {
      date: dayjs().valueOf(),
      prompt: prompt,
      content,
    };
    handleSetHistories([completeHistory, ...(histories ?? []).filter((histories) => histories.content)]);
  }

  return <Detail isLoading={isLoading} markdown={content} />;
}
