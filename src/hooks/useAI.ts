import { getPreferenceValues } from "@raycast/api";
import useAzureOpenAI from "./useAzureOpenAI";

interface AppPreference {
  openAiType: "Azure OpenAI";
  endpoint: string;
  apiKey: string;
  model: string;
}

export const useAI = (prompt: string) => {
  const appPreference = getPreferenceValues<AppPreference>();

  const serverMap = {
    "Azure OpenAI": () => {
      if (!appPreference.endpoint) throw new Error("Endpoint is empty!");
      if (!appPreference.apiKey) throw new Error("API Key is empty!");
      if (!appPreference.model) throw new Error("Model is empty!");

      return useAzureOpenAI(
        {
          endpoint: appPreference.endpoint,
          apiKey: appPreference.apiKey,
          deployment: appPreference.model,
        },
        prompt
      );
    },
  };

  return serverMap[appPreference.openAiType]();
};
