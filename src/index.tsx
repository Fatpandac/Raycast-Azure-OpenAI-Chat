import { useState } from "react";
import { ArchivesView, MainView } from "./components";
import { useArchive, useHistories } from "./hooks";
import { IndexContext } from "./context";

export default function Command() {
  const { histories, handleSetHistories, clearHistories } = useHistories();
  const { archives, setArchives, handleSetArchives } = useArchive();
  const [showMainView, setShowMainView] = useState(true);

  const toggleMainView = () => {
    setShowMainView(!showMainView);
  };

  return (
    <IndexContext.Provider
      value={{ histories, handleSetArchives, handleSetHistories, clearHistories, archives, setArchives }}
    >
      {showMainView ? <MainView toggleMainView={toggleMainView} /> : <ArchivesView toggleMainView={toggleMainView} />}
    </IndexContext.Provider>
  );
}
