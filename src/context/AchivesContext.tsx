import { createContext } from "react";
import type { History } from "./HistoriesContext";

export interface Archive {
  date: number;
  archiveHistory: History[];
}

interface ArchivesContextInterface {
  archives: Archive[];
  setArchives: React.Dispatch<React.SetStateAction<Archive[]>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ArchivesContext = createContext<ArchivesContextInterface>({} as any);
