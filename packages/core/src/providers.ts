export type ProviderKind = "omlx" | "openai-compatible";

export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ProviderConfig = {
  id: string;
  kind: ProviderKind;
  name: string;
  baseUrl: string;
  model: string;
  apiKeyEnv?: string;
  apiKey?: string;
};

export type ProviderHealth = {
  ok: boolean;
  status?: number;
  models: string[];
  error?: string;
};

export type ChatCompletionRequest = {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  stream?: boolean;
};

export const DEFAULT_OMLX_PROVIDER: ProviderConfig = {
  id: "local-omlx",
  kind: "omlx",
  name: "Local oMLX",
  baseUrl: "http://localhost:8000/v1",
  model: "default"
};

export const OPENROUTER_PROVIDER_PRESET: ProviderConfig = {
  id: "openrouter",
  kind: "openai-compatible",
  name: "OpenRouter",
  baseUrl: "https://openrouter.ai/api/v1",
  model: "openai/gpt-4.1-mini",
  apiKeyEnv: "OPENROUTER_API_KEY"
};

export const DEFAULT_PROVIDERS: ProviderConfig[] = [
  DEFAULT_OMLX_PROVIDER,
  OPENROUTER_PROVIDER_PRESET
];

export function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "");
}

export function modelsUrl(provider: ProviderConfig): string {
  return `${normalizeBaseUrl(provider.baseUrl)}/models`;
}

export function chatCompletionsUrl(provider: ProviderConfig): string {
  return `${normalizeBaseUrl(provider.baseUrl)}/chat/completions`;
}

export function buildChatCompletionRequest(
  provider: ProviderConfig,
  messages: ChatMessage[],
  options: Pick<ChatCompletionRequest, "temperature" | "stream"> = {}
): ChatCompletionRequest {
  return {
    model: provider.model,
    messages,
    temperature: options.temperature ?? 0.2,
    stream: options.stream ?? false
  };
}

export function providerAuthHeaders(provider: ProviderConfig): Record<string, string> {
  if (!provider.apiKey) return {};
  return { Authorization: `Bearer ${provider.apiKey}` };
}
