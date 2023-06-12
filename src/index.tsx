import { Action, ActionPanel, Icon, List } from "@raycast/api";
import dayjs from "dayjs";
import { useState } from "react";
import { ShowArchive, ShowDtail } from "./components";
import { ArchivesContext, HistoriesContext } from "./context";
import { useArchive, useHistories } from "./hooks";

export default function Command() {
  const [input, setInput] = useState("");
  const { histories, handleSetHistories, clearHistories } = useHistories();
  const { archives, setArchives, handleSetArchives } = useArchive();

  return (
    <List onSearchTextChange={(text) => setInput(text)} searchBarPlaceholder="Input ask">
      {histories.map((history) => (
        <List.Item
          title={history.prompt || "Ask somthing..."}
          subtitle={dayjs(history.date).format("YY/MM/DD HH:mm:ss")}
          actions={
            <ActionPanel>
              <Action.Push
                title="Ask AI"
                icon={Icon.Stars}
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
                title="Archive History"
                icon={Icon.Tray}
                onAction={() => {
                  if (!histories[0].prompt) return;

                  handleSetArchives(histories);
                  clearHistories();
                }}
              ></Action>
              <Action.CopyToClipboard
                shortcut={{modifiers: ["ctrl"], key: "c"}}
                content={history.content}
              ></Action.CopyToClipboard>
              <Action.Push
                title="Show Archives"
                icon={Icon.List}
                shortcut={{ modifiers: ["cmd"], key: "l" }}
                target={
                  <HistoriesContext.Provider value={{ histories, handleSetHistories }}>
                    <ArchivesContext.Provider value={{ archives, setArchives }}>
                      <ShowArchive />
                    </ArchivesContext.Provider>
                  </HistoriesContext.Provider>
                }
              ></Action.Push>
            </ActionPanel>
          }
        ></List.Item>
      ))}
    </List>
  );
}
