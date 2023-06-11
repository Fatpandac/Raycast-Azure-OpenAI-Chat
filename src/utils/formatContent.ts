import type { History } from "../context";

export const formatContent = (histories: History[]) => {
  const content = histories.map((item) => `${item.content}\n` + `> ${item.prompt}\n\n`).join("");

  return content;
};
