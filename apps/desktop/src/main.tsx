import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  DEFAULT_PROVIDERS,
  MVP_FEATURES,
  buildChatCompletionRequest,
  chatCompletionsUrl,
  modelsUrl,
  type ProviderConfig
} from "@kyleai/core";
import { buildCitedChatMessages, retrievalPipeline } from "@kyleai/rag";
import "./styles.css";

const sampleSources = [
  {
    marker: 1,
    title: "Welcome note",
    text: "KyleAI is a local-first research notebook with cited chat and safe agent edits."
  },
  {
    marker: 2,
    title: "Provider plan",
    text: "oMLX is the default local provider. OpenRouter can be used through the OpenAI-compatible endpoint adapter."
  }
];

function ProviderCard({ provider, active }: { provider: ProviderConfig; active: boolean }) {
  return (
    <article className={active ? "provider active" : "provider"}>
      <div>
        <h3>{provider.name}</h3>
        <p>{provider.kind === "omlx" ? "Default local runtime" : "OpenAI-compatible endpoint"}</p>
      </div>
      <dl>
        <dt>Base URL</dt>
        <dd>{provider.baseUrl}</dd>
        <dt>Models endpoint</dt>
        <dd>{modelsUrl(provider)}</dd>
        <dt>Chat endpoint</dt>
        <dd>{chatCompletionsUrl(provider)}</dd>
        <dt>Model</dt>
        <dd>{provider.model}</dd>
        {provider.apiKeyEnv ? (
          <>
            <dt>API key env</dt>
            <dd>{provider.apiKeyEnv}</dd>
          </>
        ) : null}
      </dl>
    </article>
  );
}

function App() {
  const [selectedProviderId, setSelectedProviderId] = useState(DEFAULT_PROVIDERS[0].id);
  const selectedProvider = DEFAULT_PROVIDERS.find((provider) => provider.id === selectedProviderId) ?? DEFAULT_PROVIDERS[0];

  const citedMessages = useMemo(
    () =>
      buildCitedChatMessages({
        prompt: "Explain what this private notebook does and cite the relevant source.",
        sources: sampleSources
      }),
    []
  );

  const chatBody = useMemo(
    () => buildChatCompletionRequest(selectedProvider, citedMessages),
    [selectedProvider, citedMessages]
  );

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <p className="eyebrow">KyleAI</p>
        <h1>Private local AI notebook</h1>
        <p>
          Canto-style clean-room app for notes, files, cited chat, and safe agent edits — with oMLX as the default local model provider.
        </p>
        <nav>
          <a href="#notebook">Notebook</a>
          <a href="#providers">Providers</a>
          <a href="#rag">RAG</a>
        </nav>
      </aside>

      <section id="notebook" className="panel hero-panel">
        <div>
          <p className="eyebrow">Initial version</p>
          <h2>Notebook MVP</h2>
          <p>
            This is the first working app shell: local notebook concepts, provider selection, and cited-chat request construction.
          </p>
        </div>
        <ul className="feature-grid">
          {MVP_FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section id="providers" className="panel provider-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Model routing</p>
            <h2>Provider settings</h2>
          </div>
          <label>
            Active provider
            <select value={selectedProviderId} onChange={(event) => setSelectedProviderId(event.target.value)}>
              {DEFAULT_PROVIDERS.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="provider-list">
          {DEFAULT_PROVIDERS.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} active={provider.id === selectedProvider.id} />
          ))}
        </div>
      </section>

      <section id="rag" className="panel split-panel">
        <div>
          <p className="eyebrow">Cited chat</p>
          <h2>Request preview</h2>
          <p>
            The app will send OpenAI-compatible chat requests to oMLX by default, or to OpenRouter when selected.
          </p>
          <pre>{JSON.stringify(chatBody, null, 2)}</pre>
        </div>
        <div>
          <p className="eyebrow">Retrieval</p>
          <h2>Pipeline</h2>
          <ol className="timeline">
            {retrievalPipeline.map((step) => (
              <li key={step.id}>
                <strong>{step.label}</strong>
                <span>{step.description}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
