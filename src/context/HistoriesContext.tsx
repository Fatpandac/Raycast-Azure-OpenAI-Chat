import { createContext } from "react";

export interface History {
  date: number;
  prompt: string;
  content: string;
}

interface HistoriesContextInterface {
  histories: History[];
  handleSetHistories: (histories: History[]) => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HistoriesContext = createContext<HistoriesContextInterface>({} as any);
