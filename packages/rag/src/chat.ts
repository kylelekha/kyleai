import {
  buildChatCompletionRequest,
  chatCompletionsUrl,
  providerAuthHeaders,
  type ChatMessage,
  type ProviderConfig
} from "@kyleai/core";

export type CitedChatDraft = {
  prompt: string;
  sources: Array<{
    marker: number;
    title: string;
    text: string;
  }>;
};

export function buildCitedChatMessages(draft: CitedChatDraft): ChatMessage[] {
  const sourceBlock = draft.sources
    .map((source) => `[${source.marker}] ${source.title}\n${source.text}`)
    .join("\n\n");

  return [
    {
      role: "system",
      content:
        "You are a private research notebook assistant. Answer only from supplied sources when citations are requested. Use citation markers like [1]. If evidence is missing, say so."
    },
    {
      role: "user",
      content: `${draft.prompt}\n\nSources:\n${sourceBlock}`
    }
  ];
}

export async function requestChatCompletion(
  provider: ProviderConfig,
  messages: ChatMessage[],
  fetcher: typeof fetch = fetch
): Promise<Response> {
  return fetcher(chatCompletionsUrl(provider), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...providerAuthHeaders(provider)
    },
    body: JSON.stringify(buildChatCompletionRequest(provider, messages))
  });
}
