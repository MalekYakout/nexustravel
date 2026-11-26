# NexusTravel — Open Agentic Web Protocol Runtime (v3.1.0)

**WAICY 2026 Submission • AI Showcase Track (High School Division)**  
**Student:** Malek Mohamed Ibrahim Yakout Khalil  
**Live Demo:** [https://malekyakout.github.io/nexustravel/](https://malekyakout.github.io/nexustravel/)  
**Source Code:** [https://github.com/MalekYakout/nexustravel](https://github.com/MalekYakout/nexustravel)  

NexusTravel is a 100% client-side, zero-build **Universal Open Agentic Web Protocol Runtime** built on open web standards (including NANDA agent manifests, WebMCP, and isolated Web Workers). Instead of routing users through closed, commission-heavy intermediaries, NexusTravel runs directly inside the user's browser—discovering public `*.agent.json` manifests, spawning **isolated Web Worker sandboxes**, negotiating via **asynchronous JSON-RPC 2.0 over `MessageChannel`**, and minting **cryptographic NANDA Offer Tokens** for verified provider handoffs.

---

## Key Architectural Highlights (v3.1.0)

### 1. Isolated Web Worker Agent Sandboxes (`MessageChannel` + JSON-RPC 2.0)
- Every discovered `*.agent.json` peer (`flights-agent.json`, `hotels-agent.json`, `activities-agent.json`, or any dynamically plugged-in external manifest) is instantiated inside its own isolated **Blob Web Worker** sandbox.
- The Browser Orchestrator communicates with peer agents over dedicated `MessageChannel` ports using structured JSON-RPC 2.0 methods (`a2a.request_quote`, `a2a.counter_offer`, `a2a.commit_agreement`).
- Each worker independently enforces its own `pricing_model`, `max_autonomous_discount_pct`, and `trust_boundary` filters inside the sandbox before returning quotes or counter-bids.

### 2. Active LLM Negotiation Engine (Mozilla Otari & OpenAI)
- Supports client-side **Mozilla Otari** (`api.otari.ai`) and **OpenAI** (`api.openai.com`) API keys—with an instant **Game-Theoretic Deterministic Fallback** so judges can test with zero setup.
- During **Round 2 (`BUDGET_COUNTER_OFFER`)**, the active LLM analyzes initial quotes from all worker agents, manifest discount caps, live Open-Meteo telemetry, and the user's budget ceiling to compute per-agent target discounts and autonomous cross-agent trade-offs.
- Also powers **Hybrid Multilingual Intent Parsing** (falling back seamlessly to deterministic Regex when no API key is configured).

### 3. Verifiable NANDA Offer Tokens & Strict HTTPS Security
- **Per-Agent SHA-256 Receipts:** Every locked agreement generates individual SHA-256 quote signatures binding `agent_id`, `locked_usd`, route/SKU, and timestamp.
- **Signed Handoff Tokens (`?a2a_offer_token=`):** Appends base64url-encoded, SHA-256-signed **NANDA Offer Tokens** to verified `https://` provider handoff URLs, complete with an interactive **Offer Token Verifier** in Step 7.
- **Strict TLS & XSS Enforcement:** Rejects any non-`https://` protocol (`javascript:`, `data:`, `http:`) across both static and dynamically fetched external manifests.

### 4. Multi-Vertical Agent Swarm Proof (Travel + Decentralized AI Compute)
- Demonstrates that the NANDA / WebMCP / Web Worker runtime is domain-agnostic with a one-click vertical switcher on Step 0:
  1. **Autonomous Travel Mesh:** `SkyConnect` + `StaySmart` + `CityVibes` with live Open-Meteo weather-adapted itineraries.
  2. **Decentralized AI Compute & GPU Mesh:** `GpuSpot` (H100 clusters) + `StorageVault` (NVMe) + `CarbonOffset` (RECs) negotiating compute hours and green energy credits on the exact same runtime.

### 5. Full Open Web Discoverability & Universal Accessibility
- **Agent Interfaces:** Discoverable via `<link rel="agent-manifest">`, Schema.org `WebApplication`, WebMCP (`navigator.modelContext.registerTool`), `window.NexusTravelAgent`, `postMessage` (`NEXUSTRAVEL_A2A_REQUEST` wire inspector), and URL parameters (`?autoRun=true`).
- **75+ World Languages & Auto-RTL:** Rate-limit-safe batched translation engine with automatic right-to-left layout switching (`Arabic`, `Urdu`, `Persian`, `Hebrew`) and hands-free **Web Speech API** voice controls.

---

## Project Structure

- `index.html` — Responsive glassmorphic UI, multi-vertical switcher, live A2A wire inspector, concession telemetry matrix, and NANDA Offer Token verifier.
- `runtime.js` — Core Open Agentic Web runtime, Blob Web Worker spawner, `MessageChannel` JSON-RPC 2.0 router, LLM counter-bidding engine, SHA-256 signing, and i18n engine.
- `nexustravel.agent.json` — Root coordinator manifest declaring WebMCP tools, supported verticals, and privacy boundaries.
- `flights-agent.json` — `SkyConnect` flight negotiator manifest.
- `hotels-agent.json` — `StaySmart` hospitality yield negotiator manifest.
- `activities-agent.json` — `CityVibes` weather-aware experience curator manifest.

---

## Quick Start

1. Open the live hosted demo directly at **[https://malekyakout.github.io/nexustravel/](https://malekyakout.github.io/nexustravel/)**, or serve the project directory locally using any static HTTP server (zero build step required):
   ```bash
   npx serve .
   # or
   python -m http.server 8000
