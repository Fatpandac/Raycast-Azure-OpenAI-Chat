import { Action, ActionPanel, Icon, List, Toast, showToast, useNavigation } from "@raycast/api";
import dayjs from "dayjs";
import { Archive, History } from "../hooks";
import { formatContent } from "../utils";

interface ShowArchiveProps {
  histories: History[];
  archives: Archive[];
  handleSetHistories: (histories: History[]) => void;
  setArchives: React.Dispatch<React.SetStateAction<Archive[]>>;
}

export function ShowArchive(props: ShowArchiveProps) {
  const { histories, archives, handleSetHistories, setArchives } = props;
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
                icon={Icon.RotateAntiClockwise}
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

                  showToast({ style: Toast.Style.Success, title: "Load Sucess" });
                  pop();
                }}
              ></Action>
              <Action
                title="Delete Archive"
                icon={Icon.Trash}
                onAction={() => {
                  const newArchies = archives.filter((item) => item.date !== archive.date);
                  setArchives(newArchies);

                  showToast({ style: Toast.Style.Success, title: "Delete Sucess" });
                  pop();
                }}
              ></Action>
            </ActionPanel>
          }
        ></List.Item>
      ))}
    </List>
  );
}
