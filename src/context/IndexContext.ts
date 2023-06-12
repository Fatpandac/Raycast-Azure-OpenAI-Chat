import { createContext } from "react";
import { Archive, History } from "../hooks";

interface IndexContextInterface {
  histories: History[];
  archives: Archive[];
  handleSetHistories: (histories: History[]) => void;
  clearHistories: () => void;
  setArchives: React.Dispatch<React.SetStateAction<Archive[]>>;
  handleSetArchives: (histories: History[]) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IndexContext = createContext<IndexContextInterface>({} as any);
