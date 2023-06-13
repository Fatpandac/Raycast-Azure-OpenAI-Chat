import { Action, ActionPanel, Icon, List } from "@raycast/api";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { IndexContext } from "../context";
import { ShowDtail } from "./ShowDetail";

export function MainView(props: { toggleMainView: () => void }) {
  const [input, setInput] = useState("");
  const { histories, handleSetArchives, handleSetHistories, clearHistories } = useContext(IndexContext);

  return (
    <List searchText={input} onSearchTextChange={(text) => setInput(text)} searchBarPlaceholder="Input prompt">
      {histories.map((history) => (
        <List.Item
          title={history.prompt || "Ask me anything..."}
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
                  <ShowDtail
                    histories={histories}
                    handleSetHistories={handleSetHistories}
                    prompt={input || history.prompt}
                    date={history.date}
                  />
                }
              ></Action.Push>
              <Action.Push
                title="Regenerate"
                icon={Icon.RotateClockwise}
                onPush={() => {
                  // clear input
                  setInput("");
                }}
                target={
                  <ShowDtail
                    histories={histories}
                    handleSetHistories={handleSetHistories}
                    prompt={input || history.prompt}
                    date={dayjs().valueOf()}
                  />
                }
              ></Action.Push>
              <Action
                title="Create New Chat"
                shortcut={{modifiers: ["ctrl"], key: "enter"}}
                icon={Icon.Message}
                onAction={() => {
                  if (!histories[0].prompt) return;

                  handleSetArchives(histories);
                  clearHistories();
                }}
              ></Action>
              <Action.CopyToClipboard
                shortcut={{ modifiers: ["ctrl"], key: "c" }}
                content={history.content}
              ></Action.CopyToClipboard>
              <Action
                title="Reedit Prompt"
                shortcut={{ modifiers: ["cmd"], key: "r" }}
                icon={Icon.TextCursor}
                onAction={() => {
                  setInput(history.prompt);
                }}
              ></Action>
              <Action
                title="Toggle Open Archives"
                icon={Icon.Tray}
                shortcut={{ modifiers: ["cmd"], key: "l" }}
                onAction={props.toggleMainView}
              ></Action>
            </ActionPanel>
          }
        ></List.Item>
      ))}
    </List>
  );
}
