import { useContext } from "react";
import { HistoriesContext } from "../context";
import { Detail, clearSearchBar } from "@raycast/api";
import { formatContent } from "../utils";
import { useOpenAI } from "../hooks";
import dayjs from "dayjs";

export function ShowDtail(props: { prompt: string; date?: number }) {
  const { histories, handleSetHistories } = useContext(HistoriesContext);

  const searchPromptIdx = histories.findIndex(
    (history) => history.prompt === props.prompt && history.date === props.date
  );
  if (searchPromptIdx !== -1) {
    return <Detail markdown={formatContent(histories.slice(searchPromptIdx, histories.length))} />;
  }

  const { content, isLoading } = useOpenAI(props.prompt);

  if (!isLoading) {
    const completeHistory = {
      date: dayjs().valueOf(),
      prompt: props.prompt,
      content,
    };
    handleSetHistories([completeHistory, ...(histories ?? []).filter((histories) => histories.content)]);
    clearSearchBar();
  }

  return <Detail isLoading={isLoading} markdown={content} />;
}
