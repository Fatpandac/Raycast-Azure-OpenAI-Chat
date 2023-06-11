import { Action, ActionPanel, Icon, List } from "@raycast/api";
import { ShowDtail } from "./components";
import { HistoriesContext } from "./context";
import { useState } from "react";
import { useAchive, useHistories } from "./hooks";
import dayjs from "dayjs"

export default function Command() {
  const [input, setInput] = useState("");
  const { histories, handleSetHistories, clearHistories } = useHistories();
  const { achives, handleSetAchives } = useAchive();

  return (
    <List onSearchTextChange={(text) => setInput(text)}>
      {histories.map((history) => (
        <List.Item
          title={history.prompt || "说点什么"}
          subtitle={dayjs(history.date).format("YY/MM/DD HH:mm:ss")}
          actions={
            <ActionPanel>
              <Action.Push
                title="Ask AI"
                onPush={() => {
                  // clear input
                  setInput("");
                }}
                target={
                  <HistoriesContext.Provider value={{ histories, handleSetHistories }}>
                    <ShowDtail prompt={input || history.prompt} date={history.date} />
                  </HistoriesContext.Provider>
                }
              ></Action.Push>
              <Action
                title="Achive History"
                icon={Icon.Tray}
                onAction={() => {
                  handleSetAchives(histories);
                  clearHistories();
                }}
              ></Action>
              <Action
                title="Console Achives"
                icon={Icon.AddPerson}
                onAction={() => {
                  console.log(achives);
                }}
              ></Action>
            </ActionPanel>
          }
        ></List.Item>
      ))}
    </List>
  );
}
