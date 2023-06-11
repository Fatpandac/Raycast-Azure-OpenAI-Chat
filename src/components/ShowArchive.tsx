import { Action, ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import dayjs from "dayjs";
import { useContext } from "react";
import { ArchivesContext, HistoriesContext } from "../context";

export function ShowArchive() {
  const { histories, handleSetHistories } = useContext(HistoriesContext);
  const { archives, setArchives } = useContext(ArchivesContext);
  const { pop } = useNavigation();

  return (
    <List>
      {archives?.map((archive) => (
        <List.Item
          title={archive.archiveHistory[0].prompt}
          subtitle={dayjs(archive.date).format("YY/MM/DD HH:mm:ss")}
          actions={
            <ActionPanel>
              <Action
                title="Load Archive"
                onAction={() => {
                  const newHistories = archive.archiveHistory;
                  handleSetHistories(newHistories);

                  const newArchies = archives.filter((item) => item.date !== archive.date);
                  setArchives(
                    [
                      {
                        date: dayjs().valueOf(),
                        archiveHistory: histories,
                      },
                      ...newArchies,
                    ].filter((item) => item.archiveHistory[0].prompt !== "")
                  );

                  pop();
                }}
              ></Action>
              <Action
                title="Delete Archive"
                icon={Icon.Trash}
                onAction={() => {
                  const newAchies = archives.filter((item) => item.date !== archive.date);
                  setArchives(newAchies);
                }}
              ></Action>
            </ActionPanel>
          }
        ></List.Item>
      ))}
    </List>
  );
}
