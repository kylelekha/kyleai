import { modelsUrl, providerAuthHeaders, type ProviderConfig, type ProviderHealth } from "./providers";

type OpenAIModelsResponse = {
  data?: Array<{ id?: string }>;
};

export async function checkProviderHealth(
  provider: ProviderConfig,
  fetcher: typeof fetch = fetch
): Promise<ProviderHealth> {
  try {
    const response = await fetcher(modelsUrl(provider), {
      headers: {
        Accept: "application/json",
        ...providerAuthHeaders(provider)
      }
    });

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        models: [],
        error: `Provider returned HTTP ${response.status}`
      };
    }

    const body = (await response.json()) as OpenAIModelsResponse;
    return {
      ok: true,
      status: response.status,
      models: body.data?.map((model) => model.id).filter(Boolean) as string[] ?? []
    };
  } catch (error) {
    return {
      ok: false,
      models: [],
      error: error instanceof Error ? error.message : "Unknown provider error"
    };
  }
}
