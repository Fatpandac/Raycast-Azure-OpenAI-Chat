import { Action, ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import dayjs from "dayjs";
import { useContext } from "react";
import { ArchivesContext, HistoriesContext } from "../context";
import { formatContent } from "../utils";

export function ShowArchive() {
  const { histories, handleSetHistories } = useContext(HistoriesContext);
  const { archives, setArchives } = useContext(ArchivesContext);
  const { pop } = useNavigation();

  return (
    <List isShowingDetail>
      {archives?.map((archive) => (
        <List.Item
          title={archive.archiveHistory[0].prompt}
          subtitle={dayjs(archive.date).format("YY/MM/DD HH:mm:ss")}
          detail={<List.Item.Detail markdown={formatContent(archive.archiveHistory)} />}
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
                  const newArchies = archives.filter((item) => item.date !== archive.date);
                  setArchives(newArchies);
                }}
              ></Action>
            </ActionPanel>
          }
        ></List.Item>
      ))}
    </List>
  );
}
