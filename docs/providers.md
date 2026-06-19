# Model providers

KyleAI is provider-agnostic but defaults to local oMLX.

## Default: oMLX

Expected local endpoint:

```text
http://localhost:8000/v1
```

Health/model check:

```bash
curl -fsS http://localhost:8000/v1/models
```

Typical local server command:

```bash
omlx serve --model-dir ~/.omlx/models --port 8000
```

KyleAI talks to oMLX through OpenAI-compatible endpoints:

- `GET /v1/models`
- `POST /v1/chat/completions`

## OpenAI-compatible endpoints

Any OpenAI-compatible endpoint can be added by setting:

- provider name
- base URL
- model ID
- optional API key

## OpenRouter preset

Default preset:

```text
https://openrouter.ai/api/v1
```

Suggested environment variable:

```bash
OPENROUTER_API_KEY=...
```

The app should never hard-code OpenRouter keys. Keep them in local settings or environment-backed secure storage.
