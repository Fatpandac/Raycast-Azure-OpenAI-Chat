import { useContext, useState } from "react";
import { IndexContext } from "../context";
import { Action, ActionPanel, Icon, List } from "@raycast/api";
import dayjs from "dayjs";
import { ShowDtail } from "./ShowDetail";

export function MainView(props: { toggleMainView: () => void }) {
  const [input, setInput] = useState("");
  const { histories, handleSetArchives, handleSetHistories, clearHistories } = useContext(IndexContext);

  return (
    <List onSearchTextChange={(text) => setInput(text)} searchBarPlaceholder="Input prompt">
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
              <Action
                title="Create New Chat"
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
