import { LocalStorage } from "@raycast/api";
import { useEffect, useState } from "react";
import type { History } from "../context";
import dayjs from "dayjs";

interface Achive {
  date: number;
  achiveHistory: History[];
}

const STORAGE_ACHIVES_KEY = "Achives";

export function useAchive() {
  const [achives, setAchives] = useState<Achive[]>([]);

  useEffect(() => {
    (async () => {
      const storageAchive = JSON.parse((await LocalStorage.getItem(STORAGE_ACHIVES_KEY)) || "[]");
      setAchives(storageAchive);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await LocalStorage.setItem(STORAGE_ACHIVES_KEY, JSON.stringify(achives));
    })()
  }, [achives])

  const handleSetAchives = async (histories: History[]) => {
    const newAchiveItem = {
      date: dayjs().valueOf(),
      achiveHistory: histories,
    };
    setAchives([newAchiveItem, ...achives]);
  };

  return { achives, handleSetAchives };
}
