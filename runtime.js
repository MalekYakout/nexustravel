/**
 * NexusTravel — Open Agentic Web Browser Runtime (v3.1.0)
 * Conforms to Open Agentic Web MVP Spec (Cognizant AI Lab, MIT NANDA, Mozilla Otari, WebMCP)
 * Isolated Blob Web Workers • MessageChannel JSON-RPC 2.0 • Active LLM Counter-Bidding • NANDA Offer Tokens
 */

export const BUILTIN_ECO_AGENT_MANIFEST = {
  protocol: "open-agentic-web/1.0",
  nanda_compliance: {
    portable: true,
    inspectable: true,
    execution_environment: "isolated-web-worker-sandbox"
  },
  agent: {
    id: "did:web:ecoshield.openweb:agents:carbonprotect",
    name: "EcoShield Carbon & Disruption Agent",
    role: "custom",
    version: "1.2.0",
    front_man: "sustainability_underwriter",
    provider: "EcoShield Open Climate Mesh",
    description: "Computes route/cluster CO2 footprint and negotiates verified carbon offsets + parametric SLA protection.",
    peer_policy: "open",
    allowed_peers: ["*"],
    trust_boundary: {
      requires_user_approval_for_handoff: true,
      private_context_filtered: ["payment_credentials", "passport_number", "api_keys"],
      max_negotiation_rounds: 3
    }
  },
  pricing_model: {
    kind: "custom_protection",
    base_protection_usd: 18,
    per_1000km_carbon_usd: 4.5,
    per_day_compute_carbon_usd: 6.5,
    max_autonomous_discount_pct: 22
  },
  handoff: {
    provider_name: "Gold Standard Climate Marketplace",
    url_template: "https://marketplace.goldstandard.org/collections/projects?q={CITY}"
  }
};

export const VERTICAL_MANIFESTS = {
  travel: {
    "nexustravel.agent.json": {
      protocol: "open-agentic-web/1.0",
      vertical: "travel",
      agent: {
        id: "did:web:nexustravel.openweb:orchestrator",
        name: "NexusTravel Autonomous Trip Orchestrator",
        role: "coordinator",
        peer_policy: "open"
      }
    },
    "flights-agent.json": {
      protocol: "open-agentic-web/1.0",
      vertical: "travel",
      agent: {
        id: "did:web:nexustravel.openweb:agents:skyconnect",
        name: "SkyConnect Flight Negotiator",
        role: "flights",
        front_man: "fare_negotiation_coordinator",
        peer_policy: "open",
        trust_boundary: {
          private_context_filtered: ["payment_credentials", "passport_number"],
          max_negotiation_rounds: 3
        }
      },
      pricing_model: {
        kind: "travel_flights",
        base_fare_usd: 240,
        per_km_rate_usd: 0.085,
        tier_multipliers: { saver: 0.85, balanced: 1.15, luxury: 2.35 },
        max_autonomous_discount_pct: 16
      },
      handoff: { url_template: "https://www.skyscanner.net/transport/flights/{ORIGIN}/{DEST}/" }
    },
    "hotels-agent.json": {
      protocol: "open-agentic-web/1.0",
      vertical: "travel",
      agent: {
        id: "did:web:nexustravel.openweb:agents:staysmart",
        name: "StaySmart Hospitality Agent",
        role: "hotels",
        front_man: "inventory_yield_negotiator",
        peer_policy: "open",
        trust_boundary: {
          private_context_filtered: ["payment_credentials", "passport_number"],
          max_negotiation_rounds: 3
        }
      },
      pricing_model: {
        kind: "travel_hotels",
        nightly_base_usd: { saver: 85, balanced: 165, luxury: 360 },
        length_of_stay_discount_per_night_pct: 1.2,
        max_autonomous_discount_pct: 18
      },
      handoff: { url_template: "https://www.expedia.com/Hotel-Search?destination={CITY}" }
    },
    "activities-agent.json": {
      protocol: "open-agentic-web/1.0",
      vertical: "travel",
      agent: {
        id: "did:web:nexustravel.openweb:agents:cityvibes",
        name: "CityVibes Local Experience Agent",
        role: "activities",
        front_man: "experience_curator_agent",
        peer_policy: "open",
        trust_boundary: {
          private_context_filtered: ["payment_credentials", "passport_number"],
          max_negotiation_rounds: 3
        }
      },
      pricing_model: {
        kind: "travel_activities",
        daily_rate_usd: { none: 0, highlights: 48, vip: 135 },
        max_autonomous_discount_pct: 15
      },
      handoff: { url_template: "https://www.getyourguide.com/s/?q={CITY}" }
    }
  },
  compute: {
    "nexustravel.agent.json": {
      protocol: "open-agentic-web/1.0",
      vertical: "compute",
      agent: {
        id: "did:web:nexustravel.openweb:orchestrator:compute",
        name: "NexusMesh AI Compute Orchestrator",
        role: "coordinator",
        peer_policy: "open"
      }
    },
    "gpuspot-agent.json": {
      protocol: "open-agentic-web/1.0",
      vertical: "compute",
      agent: {
        id: "did:web:nexusmesh.openweb:agents:gpuspot",
        name: "GpuSpot H100 Cluster Negotiator",
        role: "flights",
        front_man: "tensor_spot_allocator",
        peer_policy: "open",
        trust_boundary: {
          private_context_filtered: ["payment_credentials", "ssh_private_keys"],
          max_negotiation_rounds: 3
        }
      },
      pricing_model: {
        kind: "compute_gpu",
        base_setup_usd: 120,
        hourly_h100_rate_usd: 2.85,
        tier_gpu_counts: { saver: 2, balanced: 4, luxury: 8 },
        max_autonomous_discount_pct: 19
      },
      handoff: { url_template: "https://lambdalabs.com/service/gpu-cloud?region={DEST}&cluster={ORIGIN}" }
    },
    "storagevault-agent.json": {
      protocol: "open-agentic-web/1.0",
      vertical: "compute",
      agent: {
        id: "did:web:nexusmesh.openweb:agents:storagevault",
        name: "StorageVault NVMe & Egress Agent",
        role: "hotels",
        front_man: "nvme_throughput_broker",
        peer_policy: "open",
        trust_boundary: {
          private_context_filtered: ["payment_credentials", "ssh_private_keys"],
          max_negotiation_rounds: 3
        }
      },
      pricing_model: {
        kind: "compute_storage",
        daily_tb_rate_usd: { saver: 42, balanced: 95, luxury: 210 },
        max_autonomous_discount_pct: 17
      },
      handoff: { url_template: "https://www.backblaze.com/cloud-storage?region={CITY}" }
    },
    "carbonoffset-agent.json": {
      protocol: "open-agentic-web/1.0",
      vertical: "compute",
      agent: {
        id: "did:web:nexusmesh.openweb:agents:carbonoffset",
        name: "CarbonOffset Grid Telemetry Agent",
        role: "activities",
        front_man: "renewable_rec_underwriter",
        peer_policy: "open",
        trust_boundary: {
          private_context_filtered: ["payment_credentials", "ssh_private_keys"],
          max_negotiation_rounds: 3
        }
      },
      pricing_model: {
        kind: "compute_carbon",
        daily_rec_usd: { none: 0, highlights: 36, vip: 98 },
        max_autonomous_discount_pct: 20
      },
      handoff: { url_template: "https://marketplace.goldstandard.org/collections/projects?q={CITY}" }
    }
  }
};

export const CITY_PRESETS = {
  Dubai: { lat: 25.2048, lon: 55.2708, costIndex: 1.15, country: "UAE", iata: "dxb" },
  Tokyo: { lat: 35.6762, lon: 139.6503, costIndex: 1.25, country: "Japan", iata: "tyo" },
  Paris: { lat: 48.8566, lon: 2.3522, costIndex: 1.30, country: "France", iata: "par" },
  Cairo: { lat: 30.0444, lon: 31.2357, costIndex: 0.72, country: "Egypt", iata: "cai" },
  "New York": { lat: 40.7128, lon: -74.0060, costIndex: 1.42, country: "USA", iata: "nyc" },
  London: { lat: 51.5072, lon: -0.1276, costIndex: 1.35, country: "UK", iata: "lon" }
};

const CURRENCY_RATES = {
  USD: { symbol: "$", rate: 1.0 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.79 },
  AED: { symbol: "AED ", rate: 3.67 },
  EGP: { symbol: "EGP ", rate: 49.5 },
  SAR: { symbol: "SAR ", rate: 3.75 },
  JPY: { symbol: "¥", rate: 154.0 },
  INR: { symbol: "₹", rate: 84.0 },
  CNY: { symbol: "¥", rate: 7.24 },
  KRW: { symbol: "₩", rate: 1390.0 },
  TRY: { symbol: "₺", rate: 34.5 },
  BRL: { symbol: "R$", rate: 5.75 }
};

export const WORLD_LANGUAGES = [
  { code: "en", label: "EN • English", bcp47: "en-US", rtl: false },
  { code: "ar", label: "AR • العربية (Arabic)", bcp47: "ar-EG", rtl: true },
  { code: "es", label: "ES • Español (Spanish)", bcp47: "es-ES", rtl: false },
  { code: "fr", label: "FR • Français (French)", bcp47: "fr-FR", rtl: false },
  { code: "de", label: "DE • Deutsch (German)", bcp47: "de-DE", rtl: false },
  { code: "zh-CN", label: "ZH • 中文 (Chinese)", bcp47: "zh-CN", rtl: false },
  { code: "hi", label: "HI • हिन्दी (Hindi)", bcp47: "hi-IN", rtl: false },
  { code: "pt", label: "PT • Português (Portuguese)", bcp47: "pt-BR", rtl: false },
  { code: "ru", label: "RU • Русский (Russian)", bcp47: "ru-RU", rtl: false },
  { code: "ja", label: "JA • 日本語 (Japanese)", bcp47: "ja-JP", rtl: false },
  { code: "ko", label: "KO • 한국어 (Korean)", bcp47: "ko-KR", rtl: false },
  { code: "tr", label: "TR • Türkçe (Turkish)", bcp47: "tr-TR", rtl: false },
  { code: "it", label: "IT • Italiano (Italian)", bcp47: "it-IT", rtl: false },
  { code: "ur", label: "UR • اردو (Urdu)", bcp47: "ur-PK", rtl: true },
  { code: "fa", label: "FA • فارسی (Persian)", bcp47: "fa-IR", rtl: true },
  { code: "he", label: "HE • עברית (Hebrew)", bcp47: "he-IL", rtl: true },
  { code: "id", label: "ID • Bahasa Indonesia", bcp47: "id-ID", rtl: false },
  { code: "ms", label: "MS • Bahasa Melayu", bcp47: "ms-MY", rtl: false },
  { code: "bn", label: "BN • বাংলা (Bengali)", bcp47: "bn-BD", rtl: false },
  { code: "nl", label: "NL • Nederlands (Dutch)", bcp47: "nl-NL", rtl: false },
  { code: "pl", label: "PL • Polski (Polish)", bcp47: "pl-PL", rtl: false },
  { code: "uk", label: "UK • Українська (Ukrainian)", bcp47: "uk-UA", rtl: false },
  { code: "vi", label: "VI • Tiếng Việt (Vietnamese)", bcp47: "vi-VN", rtl: false },
  { code: "th", label: "TH • ไทย (Thai)", bcp47: "th-TH", rtl: false },
  { code: "sw", label: "SW • Kiswahili (Swahili)", bcp47: "sw-KE", rtl: false },
  { code: "sv", label: "SV • Svenska (Swedish)", bcp47: "sv-SE", rtl: false },
  { code: "no", label: "NO • Norsk (Norwegian)", bcp47: "nb-NO", rtl: false },
  { code: "da", label: "DA • Dansk (Danish)", bcp47: "da-DK", rtl: false },
  { code: "fi", label: "FI • Suomi (Finnish)", bcp47: "fi-FI", rtl: false },
  { code: "el", label: "EL • Ελληνικά (Greek)", bcp47: "el-GR", rtl: false },
  { code: "cs", label: "CS • Čeština (Czech)", bcp47: "cs-CZ", rtl: false },
  { code: "ro", label: "RO • Română (Romanian)", bcp47: "ro-RO", rtl: false },
  { code: "hu", label: "HU • Magyar (Hungarian)", bcp47: "hu-HU", rtl: false },
  { code: "tl", label: "TL • Filipino (Tagalog)", bcp47: "fil-PH", rtl: false },
  { code: "ta", label: "TA • தமிழ் (Tamil)", bcp47: "ta-IN", rtl: false },
  { code: "te", label: "TE • తెలుగు (Telugu)", bcp47: "te-IN", rtl: false },
  { code: "mr", label: "MR • मराठी (Marathi)", bcp47: "mr-IN", rtl: false },
  { code: "gu", label: "GU • ગુજરાતી (Gujarati)", bcp47: "gu-IN", rtl: false },
  { code: "pa", label: "PA • ਪੰਜਾਬੀ (Punjabi)", bcp47: "pa-IN", rtl: false },
  { code: "am", label: "AM • አማርኛ (Amharic)", bcp47: "am-ET", rtl: false },
  { code: "ha", label: "HA • Hausa", bcp47: "ha-NG", rtl: false },
  { code: "yo", label: "YO • Yorùbá", bcp47: "yo-NG", rtl: false },
  { code: "zu", label: "ZU • isiZulu", bcp47: "zu-ZA", rtl: false },
  { code: "af", label: "AF • Afrikaans", bcp47: "af-ZA", rtl: false },
  { code: "sq", label: "SQ • Shqip (Albanian)", bcp47: "sq-AL", rtl: false },
  { code: "hy", label: "HY • Հայերեն (Armenian)", bcp47: "hy-AM", rtl: false },
  { code: "az", label: "AZ • Azərbaycan (Azerbaijani)", bcp47: "az-AZ", rtl: false },
  { code: "eu", label: "EU • Euskara (Basque)", bcp47: "eu-ES", rtl: false },
  { code: "be", label: "BE • Беларуская (Belarusian)", bcp47: "be-BY", rtl: false },
  { code: "bg", label: "BG • Български (Bulgarian)", bcp47: "bg-BG", rtl: false },
  { code: "ca", label: "CA • Català (Catalan)", bcp47: "ca-ES", rtl: false },
  { code: "hr", label: "HR • Hrvatski (Croatian)", bcp47: "hr-HR", rtl: false },
  { code: "et", label: "ET • Eesti (Estonian)", bcp47: "et-EE", rtl: false },
  { code: "gl", label: "GL • Galego (Galician)", bcp47: "gl-ES", rtl: false },
  { code: "ka", label: "KA • ქართული (Georgian)", bcp47: "ka-GE", rtl: false },
  { code: "is", label: "IS • Íslenska (Icelandic)", bcp47: "is-IS", rtl: false },
  { code: "ga", label: "GA • Gaeilge (Irish)", bcp47: "ga-IE", rtl: false },
  { code: "kk", label: "KK • Қазақша (Kazakh)", bcp47: "kk-KZ", rtl: false },
  { code: "km", label: "KM • ខ្មែរ (Khmer)", bcp47: "km-KH", rtl: false },
  { code: "lo", label: "LO • ລາວ (Lao)", bcp47: "lo-LA", rtl: false },
  { code: "lv", label: "LV • Latviešu (Latvian)", bcp47: "lv-LV", rtl: false },
  { code: "lt", label: "LT • Lietuvių (Lithuanian)", bcp47: "lt-LT", rtl: false },
  { code: "mk", label: "MK • Македонски (Macedonian)", bcp47: "mk-MK", rtl: false },
  { code: "mn", label: "MN • Монгол (Mongolian)", bcp47: "mn-MN", rtl: false },
  { code: "my", label: "MY • မြန်မာ (Burmese)", bcp47: "my-MM", rtl: false },
  { code: "ne", label: "NE • नेपाली (Nepali)", bcp47: "ne-NP", rtl: false },
  { code: "ps", label: "PS • پښتو (Pashto)", bcp47: "ps-AF", rtl: true },
  { code: "si", label: "SI • සිංහල (Sinhala)", bcp47: "si-LK", rtl: false },
  { code: "sk", label: "SK • Slovenčina (Slovak)", bcp47: "sk-SK", rtl: false },
  { code: "sl", label: "SL • Slovenščina (Slovenian)", bcp47: "sl-SI", rtl: false },
  { code: "so", label: "SO • Soomaali (Somali)", bcp47: "so-SO", rtl: false },
  { code: "sr", label: "SR • Српски (Serbian)", bcp47: "sr-RS", rtl: false },
  { code: "uz", label: "UZ • Oʻzbek (Uzbek)", bcp47: "uz-UZ", rtl: false },
  { code: "cy", label: "CY • Cymraeg (Welsh)", bcp47: "cy-GB", rtl: false }
];

export const I18N = {
  en: {
    badge: "Open Agentic Web Protocol • Isolated Web Worker A2A Mesh",
    voiceControl: "Voice Control",
    inspectManifests: "Inspect Manifests",
    llmDet: "LLM: Deterministic",
    activeWord: "Active",
    themeLight: "☀️ Light",
    themeDark: "🌙 Dark",
    listening: "Listening",
    voiceUnsupported: "⚠ Speech Recognition is not supported in this browser (try Chrome or Edge).",
    voiceError: "Voice error",
    translatingProgress: "Translating interface to",
    llmPopoverTitle: "Active LLM Negotiation Engine",
    llmPopoverDesc: "Supports Mozilla Otari or OpenAI keys client-side. Drives Round 2 counter-bidding & trade-offs across isolated Web Workers.",
    llmSaveBtn: "Activate LLM Negotiator",
    tokenPill: "NANDA Cryptographic Offer Token Inspector",
    tokenTitle: "Verifiable Handoff Token Audit",
    tokenDesc: "Decoded ?a2a_offer_token= parameter embedded in the provider checkout URL, binding the peer DID, locked USD amount, discount %, and SHA-256 quote receipt:",
    tokenVerifiedBadge: "✓ BASE64URL PAYLOAD & SHA-256 SIGNATURE VERIFIED",
    wirePill: "Cross-Agent postMessage & WebMCP",
    wireTitle: "Live A2A Wire Inspector",
    wireDesc: "Edit or dispatch a real NEXUSTRAVEL_A2A_REQUEST payload from an external personal assistant and inspect the live JSON-RPC worker receipt:",
    wireOutboundLabel: "1. Outbound External Agent Request Payload:",
    wireDispatchBtn: "⚡ Dispatch A2A Request & Execute Live",
    wireInboundLabel: "2. Live NEXUSTRAVEL_A2A_RESPONSE Receipt:",
    manifestDrawerTitle: "Public Agent Manifests",
    manifestDrawerDesc: "Each peer manifest below is instantiated inside an isolated Blob Web Worker sandbox over MessageChannel JSON-RPC 2.0.",
    discoveryTitle: "🔌 Dynamic Open-Web Agent Discovery",
    discoveryDesc: "Plug any external HTTPS *.agent.json URL into the live worker mesh—or load a 4th open-web Carbon & SLA agent:",
    fetchUrlBtn: "Fetch URL",
    plugEcoBtn: "+ Plug In 4th Open Agent (EcoShield Carbon & Protection)",
    ecoAgentSuccess: "✓ EcoShield Agent verified (HTTPS-only) & added to isolated Web Worker mesh!",
    customUrlSuccess: "✓ External HTTPS agent manifest verified & added to Web Worker mesh!",
    heroPill: "Open Agentic Web Runtime • WebMCP + NANDA + Web Workers",
    heroTitle: "Autonomous Multi-Agent Negotiation Mesh on the Open Web",
    heroSub: "Zero platform lock-in. Your browser discovers public *.agent.json manifests, spawns isolated Web Worker sandboxes, and negotiates via asynchronous JSON-RPC 2.0 over MessageChannel.",
    switchVerticalLabel: "🌐 Switch Agent Mesh Vertical (Same NANDA / WebMCP / Worker Runtime):",
    vertTravelTitle: "✈️ Autonomous Travel Mesh",
    vertTravelBadge: "Flagship Showcase",
    vertTravelDesc: "SkyConnect + StaySmart + CityVibes • Live Open-Meteo weather trade-offs",
    vertComputeTitle: "🖥️ Decentralized AI Compute & GPU Mesh",
    vertComputeBadge: "Cross-Domain Proof",
    vertComputeDesc: "GpuSpot (H100s) + StorageVault (NVMe) + CarbonOffset (RECs)",
    computeDefaultIntent: "6 days in Tokyo from us-east-1, luxury, vip, budget $4800",
    chipGpu8x: "⚡ 8x H100 LLM Training Cluster",
    chipGpu4x: "🧠 4x H100 Fine-Tuning Mesh",
    chipGpu2x: "🟢 2x H100 Spot Inference Node",
    cardGpuDesc: "Real-time H100 SXM5 spot cluster allocation & multi-day tensor yield rebates.",
    cardStorageDesc: "High-IOPS distributed dataset caching & zero-egress volume negotiation.",
    cardCarbonDesc: "24/7 hourly renewable energy certificates (RECs) & grid telemetry.",
    toastComputeSwitched: "🖥️ Switched to Decentralized AI Compute & GPU Mesh",
    toastTravelSwitched: "✈️ Switched to Autonomous Travel Mesh",
    toastLinkCopied: "✓ Shareable A2A Deep-Link copied!",
    intentTitle: "⚡ Direct Agentic Intent Invocation (Text or Voice 🎙️)",
    intentHint: "Speak or type your request in any language",
    intentPlaceholder: "e.g., 6 days in Tokyo from Cairo, luxury, budget $2500",
    executeIntent: "Execute Intent ⚡",
    chipTokyo: "🇯🇵 Tokyo Luxury VIP",
    chipDubai: "🇦🇪 Dubai Smart Deal",
    chipParis: "🇫🇷 Paris Weekend Saver",
    cardSkyDesc: "Great-circle route discovery & dynamic fare-class counter-offers.",
    cardStayDesc: "Multi-night yield negotiation & local cost-of-living indexing.",
    cardVibesDesc: "Live Open-Meteo weather-aware itinerary & transit pass bundling.",
    getStarted: "Configure Step-by-Step →",
    testA2ABtn: "🤖 Test External Agent-to-Agent Call",
    step1Title: "Where are you flying from & to?",
    step1ComputeTitle: "Select source workload zone & target GPU datacenter region",
    step1Sub: "Select a preset hub, type, or click the mic 🎙️ to speak any city worldwide.",
    originLabel: "Origin City",
    destLabel: "Destination City",
    originZoneLabel: "Source Workload Zone",
    destRegionLabel: "Target GPU Datacenter Region",
    departureHub: "Departure Hub",
    arrivalHub: "Arrival Hub",
    telemetryReady: "Open-Meteo Live Telemetry Ready",
    popularHubs: "Popular Open Web Hubs (Click to select destination):",
    cityDubai: "Dubai",
    cityTokyo: "Tokyo",
    cityParis: "Paris",
    cityCairo: "Cairo",
    cityNyc: "New York",
    cityLondon: "London",
    hubDubaiDesc: "Modern desert metropolis & global transit hub",
    hubTokyoDesc: "High-speed rail, culinary craft & neon districts",
    hubParisDesc: "Art museums, architecture & cafe boulevards",
    hubCairoDesc: "Ancient wonders, Nile heritage & high-value stays",
    hubNycDesc: "Iconic skyline, Broadway & museum mile",
    hubLondonDesc: "Historic landmarks, West End & Thames culture",
    syncingBtn: "Syncing...",
    step2Title: "How many days is your journey?",
    step2Sub: "Duration dynamically scales hotel nights and multi-day pass volume discounts.",
    daysWord: "Days",
    nightsWord: "Hotel Nights",
    passWindowWord: "City Pass Window",
    clusterHoursWord: "Cluster Hours",
    slaWindowWord: "Day SLA Window",
    weekendSprint: "2 Days (Weekend Sprint)",
    oneWeek: "7 Days (1 Week)",
    extendedExp: "14 Days (Extended Expedition)",
    step3Title: "Select your travel comfort tier",
    step3ComputeTitle: "Select GPU compute cluster capacity tier",
    step3Sub: "Guides cabin class and accommodation star rating during A2A negotiation.",
    tierSaverTag: "3★ Hotels • Economy",
    tierSaverTitle: "Saver",
    tierSaverDesc: "Smart unbundled economy fares + clean central 3-star boutique stays.",
    tierBalTag: "4★ Hotels • Standard+",
    tierBalTitle: "Balanced",
    tierBalDesc: "Checked baggage included + top-rated 4-star hotels with breakfast.",
    tierLuxTag: "5★ Suites • Business",
    tierLuxTitle: "Luxury",
    tierLuxDesc: "Priority lie-flat/business cabin + 5-star flagship hospitality.",
    tierComputeSaverTag: "2x H100 • Spot Queue",
    tierComputeSaverTitle: "Saver (2x H100)",
    tierComputeSaverDesc: "Preemptible 2x NVIDIA H100 PCIe nodes for batch inference & evaluation.",
    tierComputeBalTag: "4x H100 • NVLink",
    tierComputeBalTitle: "Balanced (4x H100)",
    tierComputeBalDesc: "Dedicated 4x NVIDIA H100 NVLink pod + high-speed NVMe scratch.",
    tierComputeLuxTag: "8x H100 • SXM5",
    tierComputeLuxTitle: "Luxury (8x H100)",
    tierComputeLuxDesc: "Full 8x H100 SXM5 InfiniBand supernode with guaranteed SLA.",
    step4Title: "Choose experience & transfer add-ons",
    step4ComputeTitle: "Choose renewable energy & SLA telemetry add-ons",
    step4Sub: "CityVibes Agent adapts excursions to live destination weather conditions.",
    addonNoneTag: "Independent Explorer",
    addonNoneTitle: "Flights + Hotel Only",
    addonNoneDesc: "Zero bundled excursions; full freedom to explore at your own pace.",
    addonHighTag: "Most Popular",
    addonHighTitle: "City Highlights Pass + Transfers",
    addonHighDesc: "Airport express transfers + skip-the-line museum & transit pass.",
    addonVipTag: "Concierge Curated",
    addonVipTitle: "All-Inclusive VIP",
    addonVipDesc: "Private chauffeur transfers, guided excursions & tasting reservations.",
    addonComputeNoneTitle: "Compute + Storage Only",
    addonComputeNoneDesc: "Raw GPU + NVMe capacity without bundled carbon certificates.",
    addonComputeHighTitle: "Standard Carbon REC Offset",
    addonComputeHighDesc: "100% matched regional renewable energy credits for cluster runtime.",
    addonComputeVipTitle: "24/7 Hourly Carbon-Free + SLA",
    addonComputeVipDesc: "Granular hourly grid carbon matching + instant failover checkpointing.",
    step5Title: "Set your autonomous budget ceiling",
    step5Sub: "Dynamic slider bounds calibrated to real-time route distance and market baseline.",
    targetBudgetCap: "Target Budget Cap",
    minBaseline: "Min (82% Baseline):",
    marketBaseline: "Market Baseline:",
    maxBaseline: "Max (175% Baseline):",
    routeDistance: "Route & Distance",
    durationTier: "Duration & Tier",
    liveWeather: "Live Destination Weather",
    gpuRegionWord: "GPU Region",
    datacenterCoolingNote: "Datacenter Ambient Cooling Telemetry",
    indoorModeLabel: "🌧️ Indoor Mode",
    outdoorModeLabel: "☀️ Outdoor Mode",
    next: "Continue →",
    back: "← Back",
    launchAgents: "Launch Worker A2A Negotiation ⚡",
    step6Title: "Live Isolated Web Worker A2A Negotiation",
    isolatedWorkerLabel: "Isolated Blob Worker",
    workerLockedLabel: "Worker RPC LOCKED ✓",
    autoHealTitle: "⚠️ Budget Ceiling Exceeded — Autonomous Recovery Ready",
    autoHealBtn: "⚡ Auto-Heal & Re-Negotiate",
    lockedDealBadge: "A2A AGREEMENT LOCKED • 3 ROUNDS",
    copyAgentLink: "🔗 Copy Shareable Agent Link",
    readAloud: "🔊 Read Deal Aloud",
    lockedTotalLabel: "Locked Negotiated Total",
    savedWord: "Saved",
    telemetryCardTitle: "📡 Protocol & Multi-Round Concessions Telemetry",
    detEngineBadge: "Game-Theoretic Deterministic Fallback",
    execSandboxLabel: "Execution Sandbox:",
    tblPeerAgent: "Peer Worker Agent",
    tblRound1: "Round 1 (Initial)",
    tblRound2: "Round 2 (Counter)",
    tblRound3: "Round 3 (Locked)",
    tblConcession: "Concession",
    counterBidBadge: "COUNTER-BID",
    strategyHeading: "Active Negotiation Strategy & Trade-Offs",
    legendFlights: "🟣 Primary Peer",
    legendHotels: "🔵 Secondary Peer",
    legendExp: "🟢 Add-on Peer",
    itineraryHeading: "Autonomous Execution Plan & Telemetry Adaptation:",
    trustAuditBtn: "🛡️ Trust Boundary Audit",
    webMcpBtn: "🔌 Agent API / WebMCP",
    upgradesHeading: "✨ Upgrade & Get More (Autonomous Counter-Offers)",
    upgradesSub: "One-click parameter adjustments that trigger an instant A2A re-negotiation cycle:",
    applyUpgradeBtn: "Apply Upgrade & Re-Negotiate",
    adjustBudgetBtn: "← Adjust Budget",
    proceedBookingBtn: "Proceed to Handover Hub →",
    step7Pill: "Human-in-the-Loop Authorization • NANDA Offer Tokens + HTTPS Deep-Links",
    step7Title: "Verified Provider Handover & NANDA Offer Tokens",
    step7Sub: "Your browser runtime never stores payment credentials. Hand off directly to each provider with signed NANDA Offer Tokens appended to verified HTTPS links.",
    checkoutFlightsTitle: "✈️ SkyConnect Flights",
    checkoutHotelsTitle: "🏨 StaySmart Hotels",
    checkoutActivitiesTitle: "🧭 CityVibes Experiences",
    verifyTokenBtn: "Verify Offer Token",
    openAll3: "Open All Providers 🚀",
    downloadJson: "Download Agreement Bundle (.json)",
    backResultsBtn: "← Back to Results",
    startNewTripBtn: "Start New Session ↻",
    dayWord: "Day",
    itineraryArrival: "Arrival in {dest}, SkyConnect priority transfer & evening neighborhood orientation.",
    itineraryDeparture: "Leisurely hotel breakfast, artisan market stop & departure transfer.",
    itineraryRainy: "Weather-adapted indoor cultural pass — National Art & Heritage Galleries in {dest}.",
    itineraryOutdoor: "Guided architectural walking tour & panoramic skyline viewpoint in {dest}.",
    itineraryVip: "Private chauffeur excursion & chef-curated culinary tasting in {dest}.",
    itineraryLocal: "Local culinary district pass & historic quarter exploration in {dest}.",
    itineraryComputeStart: "Provision {gpus} NVLink cluster in {dest} ({origin}) & mount StorageVault NVMe volume.",
    itineraryComputeEnd: "Checkpoint final model weights to encrypted object store & settle CarbonOffset RECs.",
    itineraryComputeRun: "Autonomous spot-yield rebalancing & continuous distributed training run ({temp}°C ambient cooling telemetry).",
    upgExtraDaysBadge: "+2 EXTRA DAYS",
    upgExtendStayTitle: "Extend stay to {days} Days ({nights} Nights)",
    upgExtendClusterTitle: "Extend Cluster Lease to {days} Days",
    upgExtendDesc: "Unlock deeper multi-day volume rebates across isolated peer workers.",
    upgTierBadge: "CAPACITY / TIER UPGRADE",
    upgTierTitle: "Upgrade to {label}",
    upgTierDesc: "Direct A2A yield swap negotiated across peer worker sandboxes.",
    upgAddonBadge: "ADD-ON BUNDLE",
    upgAddonTitle: "Unlock {label}",
    upgAddonDesc: "Bundle value-added telemetry & protection via peer agent.",
    autoHealLuxuryReason: "Deal exceeded ceiling by {overrun}. Orchestrator can auto-adjust tier from Luxury to Balanced to fit inside your cap.",
    autoHealVipReason: "Deal exceeded ceiling by {overrun}. Orchestrator can switch VIP bundle to Standard Highlights to fit inside your cap.",
    autoHealDaysReason: "Deal exceeded ceiling by {overrun}. Orchestrator can trim duration to {days} days to fit inside your cap.",
    autoHealSaverReason: "Deal exceeded ceiling by {overrun}. Orchestrator can optimize to Saver tier to fit inside your cap."
  },
  ar: {
    badge: "بروتوكول الويب الوكيل المفتوح • شبكة عمال معزولة A2A",
    voiceControl: "تحكم صوتي",
    inspectManifests: "ملفات الوكلاء",
    llmDet: "الذكاء: حتمي سريع",
    activeWord: "نشط",
    themeLight: "☀️ فاتح",
    themeDark: "🌙 داكن",
    listening: "جارٍ الاستماع",
    voiceUnsupported: "⚠ التعرف الصوتي غير مدعوم في هذا المتصفح (جرّب Chrome أو Edge).",
    voiceError: "خطأ صوتي",
    translatingProgress: "جارٍ ترجمة الواجهة إلى",
    llmPopoverTitle: "محرك التفاوض بالذكاء الاصطناعي النشط",
    llmPopoverDesc: "يدعم مفاتيح Mozilla Otari أو OpenAI محلياً في المتصفح لقيادة جولات العروض المضادة والمقايضات بين الوكلاء.",
    llmSaveBtn: "تفعيل المفاوض الذكي",
    tokenPill: "فاحص رموز عروض NANDA المشفرة",
    tokenTitle: "تدقيق رمز التحويل الموثق",
    tokenDesc: "تم فك تشفير معامل ?a2a_offer_token= المدمج في رابط الحجز، والذي يربط هوية الوكيل والمبلغ المقفل ونسبة الخصم وتوقيع SHA-256:",
    tokenVerifiedBadge: "✓ تم التحقق من حمولة BASE64URL وتوقيع SHA-256",
    wirePill: "اتصال الوكلاء عبر postMessage و WebMCP",
    wireTitle: "فاحص رسائل A2A المباشر",
    wireDesc: "عدّل أو أرسل حمولة NEXUSTRAVEL_A2A_REQUEST حقيقية من مساعد شخصي خارجي وافحص إيصال JSON-RPC المباشر:",
    wireOutboundLabel: "1. حمولة طلب الوكيل الخارجي الصادرة:",
    wireDispatchBtn: "⚡ إرسال طلب A2A وتنفيذه مباشرة",
    wireInboundLabel: "2. إيصال الاستجابة المباشر NEXUSTRAVEL_A2A_RESPONSE:",
    manifestDrawerTitle: "ملفات تعريف الوكلاء العامة",
    manifestDrawerDesc: "يتم تشغيل كل ملف تعريف أدناه داخل بيئة Web Worker معزولة عبر بروتوكول MessageChannel JSON-RPC 2.0.",
    discoveryTitle: "🔌 الاكتشاف الديناميكي لوكلاء الويب المفتوح",
    discoveryDesc: "أضف أي رابط HTTPS خارجي لملف *.agent.json إلى الشبكة الحية—أو أضف الوكيل الرابع لحماية الكربون:",
    fetchUrlBtn: "جلب الرابط",
    plugEcoBtn: "+ إضافة الوكيل الرابع (EcoShield لحماية الكربون والرحلات)",
    ecoAgentSuccess: "✓ تم التحقق من وكيل EcoShield وإضافته إلى شبكة Web Workers المعزولة!",
    customUrlSuccess: "✓ تم التحقق من رابط الوكيل الخارجي وإضافته إلى الشبكة بنجاح!",
    heroPill: "وقت تشغيل الويب الوكيل • WebMCP + NANDA + Web Workers",
    heroTitle: "شبكة التفاوض الذاتي متعدد الوكلاء على الويب المفتوح",
    heroSub: "بدون احتكار المنصات. يكتشف متصفحك ملفات *.agent.json العامة، ويشغّل بيئات Web Worker معزولة، ويتفاوض عبر JSON-RPC 2.0.",
    switchVerticalLabel: "🌐 تبديل مجال شبكة الوكلاء (نفس محرك NANDA / WebMCP / Workers):",
    vertTravelTitle: "✈️ شبكة السفر والسياحة الذاتية",
    vertTravelBadge: "العرض الرئيسي",
    vertTravelDesc: "SkyConnect + StaySmart + CityVibes • تكييف مباشر مع الطقس عبر Open-Meteo",
    vertComputeTitle: "🖥️ شبكة الحوسبة السحابية ومعالجات GPU",
    vertComputeBadge: "إثبات تعدد المجالات",
    vertComputeDesc: "GpuSpot (H100s) + StorageVault (NVMe) + CarbonOffset (RECs)",
    computeDefaultIntent: "6 أيام في طوكيو من us-east-1 فاخر شامل بميزانية 4800 دولار",
    chipGpu8x: "⚡ عنقود تدريب 8x H100 LLM",
    chipGpu4x: "🧠 شبكة ضبط 4x H100",
    chipGpu2x: "🟢 عقدة استدلال 2x H100",
    cardGpuDesc: "تخصيص فوري لمعالجات H100 SXM5 وخصومات العوائد متعددة الأيام.",
    cardStorageDesc: "تخزين مؤقت عالي السرعة NVMe وتفاوض على سعة نقل البيانات.",
    cardCarbonDesc: "شهادات الطاقة المتجددة على مدار الساعة وقياس انبعاثات الشبكة.",
    toastComputeSwitched: "🖥️ تم التبديل إلى شبكة الحوسبة السحابية ومعالجات GPU",
    toastTravelSwitched: "✈️ تم التبديل إلى شبكة السفر والسياحة الذاتية",
    toastLinkCopied: "✓ تم نسخ رابط التفاوض المباشر بنجاح!",
    intentTitle: "⚡ استدعاء الوكيل المباشر (كتابة أو صوت 🎙️)",
    intentHint: "انطق أو اكتب طلبك بأي لغة في العالم",
    intentPlaceholder: "مثال: 6 أيام في طوكيو من القاهرة فاخر بميزانية 2500 دولار",
    executeIntent: "تنفيذ الطلب ⚡",
    chipTokyo: "🇯🇵 طوكيو الفاخرة VIP",
    chipDubai: "🇦🇪 صفقة دبي الذكية",
    chipParis: "🇫🇷 باريس الاقتصادية",
    cardSkyDesc: "اكتشاف المسارات الجوية وتقديم عروض أسعار تنافسية فورية.",
    cardStayDesc: "تفاوض على الليالي المتعددة ومؤشر تكلفة المعيشة المحلي.",
    cardVibesDesc: "تخطيط الأنشطة وتذاكر المترو حسب حالة الطقس المباشرة.",
    getStarted: "ابدأ الإعداد خطوة بخطوة ←",
    testA2ABtn: "🤖 اختبار اتصال وكيل خارجي (A2A)",
    step1Title: "من أين وإلى أين تسافر؟",
    step1ComputeTitle: "اختر منطقة مصدر البيانات ومركز معالجات GPU المستهدف",
    step1Sub: "اختر مدينة مقترحة أو اكتب أو اضغط الميكروفون 🎙️ لنطق أي مدينة في العالم.",
    originLabel: "مدينة المغادرة",
    destLabel: "مدينة الوجهة",
    originZoneLabel: "منطقة مصدر البيانات",
    destRegionLabel: "منطقة مركز بيانات GPU",
    departureHub: "مطار المغادرة",
    arrivalHub: "مطار الوصول",
    telemetryReady: "بيانات الطقس والموقع جاهزة",
    popularHubs: "وجهات عالمية مقترحة (اضغط للاختيار):",
    cityDubai: "دبي",
    cityTokyo: "طوكيو",
    cityParis: "باريس",
    cityCairo: "القاهرة",
    cityNyc: "نيويورك",
    cityLondon: "لندن",
    hubDubaiDesc: "مدينة المستقبل ومركز الطيران العالمي",
    hubTokyoDesc: "القطارات السريعة والمطاعم والأحياء العصرية",
    hubParisDesc: "المتاحف الفنية والعمارة والمقاهي الباريسية",
    hubCairoDesc: "عجائب الحضارة القديمة وإطلالات النيل الساحرة",
    hubNycDesc: "ناطحات السحاب وبرودواي والمتاحف العالمية",
    hubLondonDesc: "المعالم التاريخية والمسارح وثقافة التايمز",
    syncingBtn: "جارٍ المزامنة...",
    step2Title: "كم عدد أيام رحلتك؟",
    step2Sub: "تحدد المدة ليالي الفندق وخصومات الباقات متعددة الأيام تلقائياً.",
    daysWord: "أيام",
    nightsWord: "ليالي فندقية",
    passWindowWord: "نافذة بطاقة المدينة",
    clusterHoursWord: "ساعات تشغيل العنقود",
    slaWindowWord: "يوم نافذة اتفاقية SLA",
    weekendSprint: "يومان (عطلة سريعة)",
    oneWeek: "7 أيام (أسبوع كامل)",
    extendedExp: "14 يوماً (رحلة ممتدة)",
    step3Title: "اختر مستوى الراحة في السفر",
    step3ComputeTitle: "اختر سعة ومستوى عنقود معالجات GPU",
    step3Sub: "يحدد درجة الطيران وتصنيف الفندق أثناء التفاوض الذاتي.",
    tierSaverTag: "فنادق 3★ • اقتصادي",
    tierSaverTitle: "اقتصادي (Saver)",
    tierSaverDesc: "تذاكر طيران اقتصادية ذكية + فنادق بوتيك 3 نجوم في وسط المدينة.",
    tierBalTag: "فنادق 4★ • متوازن",
    tierBalTitle: "متوازن (Balanced)",
    tierBalDesc: "يشمل الأمتعة المسجلة + فنادق 4 نجوم متميزة مع الإفطار.",
    tierLuxTag: "أجنحة 5★ • درجة رجال الأعمال",
    tierLuxTitle: "فاخر (Luxury)",
    tierLuxDesc: "مقصورة رجال الأعمال ذات الأولوية + ضيافة فنادق 5 نجوم.",
    tierComputeSaverTag: "2x H100 • طابور فوري",
    tierComputeSaverTitle: "اقتصادي (2x H100)",
    tierComputeSaverDesc: "عقدتان NVIDIA H100 PCIe للاستدلال والتقييم الدفعي.",
    tierComputeBalTag: "4x H100 • NVLink",
    tierComputeBalTitle: "متوازن (4x H100)",
    tierComputeBalDesc: "4 معالجات NVIDIA H100 NVLink مخصصة مع تخزين NVMe فائق السرعة.",
    tierComputeLuxTag: "8x H100 • SXM5",
    tierComputeLuxTitle: "فائق (8x H100)",
    tierComputeLuxDesc: "عنقود 8x H100 SXM5 InfiniBand كامل مع ضمان SLA.",
    step4Title: "اختر إضافات التجارب والتنقلات",
    step4ComputeTitle: "اختر إضافات الطاقة المتجددة وضمان SLA",
    step4Sub: "يقوم وكيل CityVibes بمواءمة الأنشطة مع حالة الطقس المباشرة.",
    addonNoneTag: "مستكشف حر",
    addonNoneTitle: "طيران + فندق فقط",
    addonNoneDesc: "بدون جولات مدمجة؛ حرية كاملة للاستكشاف على طريقتك.",
    addonHighTag: "الأكثر طلباً",
    addonHighTitle: "بطاقة معالم المدينة + التوصيل",
    addonHighDesc: "نقل المطار السريع + تذاكر المتاحف والمواصلات بدون انتظار.",
    addonVipTag: "خدمة كونسيرج خاصة",
    addonVipTitle: "باقة VIP شاملة كلياً",
    addonVipDesc: "سائق خاص، جولات سياحية خاصة وحجوزات مطاعم فاخرة.",
    addonComputeNoneTitle: "حوسبة + تخزين فقط",
    addonComputeNoneDesc: "سعة GPU و NVMe خام بدون شهادات تعويض الكربون.",
    addonComputeHighTitle: "تعويض كربون قياسي REC",
    addonComputeHighDesc: "تغطية 100% بشهادات الطاقة المتجددة الإقليمية طوال فترة التشغيل.",
    addonComputeVipTitle: "طاقة نظيفة 24/7 + ضمان SLA",
    addonComputeVipDesc: "مطابقة كربونية كل ساعة مع نسخ احتياطي فوري.",
    step5Title: "حدد الحد الأقصى لميزانيتك",
    step5Sub: "تم ضبط حدود شريط التمرير ديناميكياً بناءً على مسافة الرحلة وأسعار السوق.",
    targetBudgetCap: "سقف الميزانية المستهدف",
    minBaseline: "الحد الأدنى (82%):",
    marketBaseline: "سعر السوق الأساسي:",
    maxBaseline: "الحد الأقصى (175%):",
    routeDistance: "المسار والمسافة",
    durationTier: "المدة والمستوى",
    liveWeather: "الطقس المباشر في الوجهة",
    gpuRegionWord: "منطقة GPU",
    datacenterCoolingNote: "قياس تبريد مركز البيانات المحيط",
    indoorModeLabel: "🌧️ وضع الأنشطة الداخلية",
    outdoorModeLabel: "☀️ وضع الأنشطة الخارجية",
    next: "التالي ←",
    back: "→ رجوع",
    launchAgents: "بدء التفاوض عبر Web Workers ⚡",
    step6Title: "التفاوض المباشر بين الوكلاء المعزولين (A2A)",
    isolatedWorkerLabel: "عامل Web Worker معزول",
    workerLockedLabel: "تم قفل السعر في العامل ✓",
    autoHealTitle: "⚠️ تم تجاوز سقف الميزانية — التعافي الذاتي جاهز",
    autoHealBtn: "⚡ تعديل تلقائي وإعادة التفاوض",
    lockedDealBadge: "تم قفل الاتفاق الذاتي • 3 جولات",
    copyAgentLink: "🔗 نسخ رابط الوكيل المباشر",
    readAloud: "🔊 قراءة الصفقة صوتياً",
    lockedTotalLabel: "الإجمالي النهائي بعد التفاوض",
    savedWord: "وفّرت",
    telemetryCardTitle: "📡 قياس البروتوكول وجدول التنازلات متعدد الجولات",
    detEngineBadge: "محرك التفاوض الحتمي بنظرية الألعاب",
    execSandboxLabel: "بيئة التنفيذ المعزولة:",
    tblPeerAgent: "الوكيل النظير",
    tblRound1: "الجولة 1 (الأولي)",
    tblRound2: "الجولة 2 (المضاد)",
    tblRound3: "الجولة 3 (النهائي)",
    tblConcession: "نسبة الخصم",
    counterBidBadge: "عرض مضاد",
    strategyHeading: "استراتيجية التفاوض النشطة والمقايضات",
    legendFlights: "🟣 الوكيل الأساسي",
    legendHotels: "🔵 الوكيل الثانوي",
    legendExp: "🟢 وكيل الإضافات",
    itineraryHeading: "خطة التنفيذ الذاتية المُكيَّفة:",
    trustAuditBtn: "🛡️ تدقيق حدود الخصوصية",
    webMcpBtn: "🔌 واجهة برمجة الوكلاء WebMCP",
    upgradesHeading: "✨ ترقيات ذكية وعروض مضادة فورية",
    upgradesSub: "تعديلات بضغطة واحدة تُطلق دورة إعادة تفاوض فورية بين الوكلاء:",
    applyUpgradeBtn: "تطبيق الترقية وإعادة التفاوض",
    adjustBudgetBtn: "→ تعديل الميزانية",
    proceedBookingBtn: "المتابعة إلى مركز التحويل ←",
    step7Pill: "موافقة المستخدم المباشرة • رموز عروض NANDA + روابط HTTPS موثقة",
    step7Title: "مركز التحويل الموثق ورموز عروض NANDA",
    step7Sub: "لا يقوم المتصفح بتخزين بيانات الدفع مطلقاً. انتقل مباشرة إلى كل مزود مع رموز عروض مشفرة.",
    checkoutFlightsTitle: "✈️ رحلات SkyConnect",
    checkoutHotelsTitle: "🏨 فنادق StaySmart",
    checkoutActivitiesTitle: "🧭 تجارب CityVibes",
    verifyTokenBtn: "فحص رمز العرض",
    openAll3: "فتح جميع المزودين معاً 🚀",
    downloadJson: "تحميل حزمة الاتفاق (.json)",
    backResultsBtn: "→ العودة للنتائج",
    startNewTripBtn: "بدء جلسة جديدة ↻",
    dayWord: "اليوم",
    itineraryArrival: "الوصول إلى {dest}، استقبال ونقل أولوية من SkyConnect وجولة تعريفية مسائية.",
    itineraryDeparture: "إفطار فندقي مريح، جولة تسوق محلية والنقل إلى المطار للمغادرة.",
    itineraryRainy: "باقة ثقافية داخلية مُكيَّفة مع الطقس — زيارة المتاحف والمعارض الفنية الوطنية في {dest}.",
    itineraryOutdoor: "جولة معمارية سيراً على الأقدام وإطلالة بانورامية على أفق {dest}.",
    itineraryVip: "جولة خاصة بسيارة مع سائق وتجربة تذوق طعام فاخرة في {dest}.",
    itineraryLocal: "بطاقة استكشاف الأحياء التاريخية والمأكولات المحلية في {dest}.",
    itineraryComputeStart: "تجهيز عنقود {gpus} NVLink في {dest} ({origin}) وربط وحدة تخزين StorageVault NVMe.",
    itineraryComputeEnd: "حفظ أوزان النموذج النهائية في التخزين المشفر وتسوية شهادات CarbonOffset RECs.",
    itineraryComputeRun: "إعادة موازنة العوائد الفورية واستمرار التدريب الموزع (حرارة التبريد المحيطة {temp}°C).",
    upgExtraDaysBadge: "+2 يوم إضافي",
    upgExtendStayTitle: "تمديد الإقامة إلى {days} أيام ({nights} ليالٍ)",
    upgExtendClusterTitle: "تمديد استئجار العنقود إلى {days} أيام",
    upgExtendDesc: "احصل على خصومات أكبر للباقات متعددة الأيام عبر الوكلاء المعزولين.",
    upgTierBadge: "ترقية المستوى / السعة",
    upgTierTitle: "الترقية إلى {label}",
    upgTierDesc: "مقايضة عوائد مباشرة بين الوكلاء للحصول على فئة أعلى.",
    upgAddonBadge: "ترقية الإضافات",
    upgAddonTitle: "تفعيل {label}",
    upgAddonDesc: "دمج مزايا وحماية إضافية عبر الوكيل المختص.",
    autoHealLuxuryReason: "تجاوز العرض الميزانية بمقدار {overrun}. يمكن للمنسق التعديل تلقائياً من فاخر إلى متوازن ليناسب ميزانيتك.",
    autoHealVipReason: "تجاوز العرض الميزانية بمقدار {overrun}. يمكن للمنسق تحويل باقة VIP إلى باقة المعالم القياسية لتناسب ميزانيتك.",
    autoHealDaysReason: "تجاوز العرض الميزانية بمقدار {overrun}. يمكن للمنسق تقليص المدة إلى {days} أيام لتناسب ميزانيتك.",
    autoHealSaverReason: "تجاوز العرض الميزانية بمقدار {overrun}. يمكن للمنسق التحسين إلى الفئة الاقتصادية لتناسب ميزانيتك."
  }
};

/**
 * Isolated Web Worker Sandbox Script
 */
const WORKER_AGENT_SOURCE = `
  let manifest = null;
  let initialQuoteUsd = 0;
  let currentBidUsd = 0;
  let maxDiscountPct = 15;

  function computeInitialQuote(params) {
    const pm = (manifest && manifest.pricing_model) || {};
    const kind = pm.kind || "travel_flights";
    const days = Number(params.days || 5);
    const nights = Math.max(1, days - 1);
    const tier = params.tier || "balanced";
    const addon = params.addon || "highlights";
    const distKm = Number(params.distKm || 4000);
    const costIndex = Number(params.costIndex || 1.0);

    if (kind === "travel_flights") {
      const mult = (pm.tier_multipliers && pm.tier_multipliers[tier]) || 1.15;
      return Math.round(((pm.base_fare_usd || 240) + distKm * (pm.per_km_rate_usd || 0.085)) * mult);
    }
    if (kind === "travel_hotels") {
      const nightly = (pm.nightly_base_usd && pm.nightly_base_usd[tier]) || 165;
      return Math.round(nights * nightly * costIndex);
    }
    if (kind === "travel_activities") {
      const daily = (pm.daily_rate_usd && pm.daily_rate_usd[addon]) ?? 48;
      return Math.round(days * daily);
    }
    if (kind === "compute_gpu") {
      const gpus = (pm.tier_gpu_counts && pm.tier_gpu_counts[tier]) || 4;
      const hours = days * 24;
      return Math.round((pm.base_setup_usd || 120) + hours * gpus * (pm.hourly_h100_rate_usd || 2.85));
    }
    if (kind === "compute_storage") {
      const daily = (pm.daily_tb_rate_usd && pm.daily_tb_rate_usd[tier]) || 95;
      return Math.round(days * daily * costIndex);
    }
    if (kind === "compute_carbon") {
      const daily = (pm.daily_rec_usd && pm.daily_rec_usd[addon]) ?? 36;
      return Math.round(days * daily);
    }
    const base = pm.base_protection_usd || 18;
    const perUnit = params.vertical === "compute"
      ? days * (pm.per_day_compute_carbon_usd || 6.5)
      : (distKm / 1000) * (pm.per_1000km_carbon_usd || 4.5);
    return Math.round(base + perUnit);
  }

  self.onmessage = (event) => {
    if (event.data && event.data.type === "INIT_AGENT" && event.ports && event.ports[0]) {
      manifest = event.data.manifest;
      maxDiscountPct = Number((manifest.pricing_model && manifest.pricing_model.max_autonomous_discount_pct) || 15);
      const port = event.ports[0];

      port.onmessage = (rpcEvent) => {
        const req = rpcEvent.data;
        if (!req || req.jsonrpc !== "2.0") return;

        const forbiddenKeys = (manifest.agent && manifest.agent.trust_boundary && manifest.agent.trust_boundary.private_context_filtered) || [];
        const leakedKeys = forbiddenKeys.filter((k) => req.params && Object.prototype.hasOwnProperty.call(req.params, k));
        if (leakedKeys.length > 0) {
          port.postMessage({
            jsonrpc: "2.0",
            id: req.id,
            error: { code: -32001, message: "TrustBoundaryViolation: Sensitive keys rejected: " + leakedKeys.join(",") }
          });
          return;
        }

        if (req.method === "a2a.request_quote") {
          initialQuoteUsd = computeInitialQuote(req.params || {});
          currentBidUsd = initialQuoteUsd;
          port.postMessage({
            jsonrpc: "2.0",
            id: req.id,
            result: {
              agent_id: manifest.agent.id,
              agent_name: manifest.agent.name,
              role: manifest.agent.role,
              initial_quote_usd: initialQuoteUsd,
              max_autonomous_discount_pct: maxDiscountPct,
              sandbox: "isolated-web-worker"
            }
          });
          return;
        }

        if (req.method === "a2a.counter_offer") {
          const requestedDiscountPct = Number((req.params && req.params.requested_discount_pct) || 10);
          const acceptedDiscountPct = Math.min(maxDiscountPct, Math.max(0, requestedDiscountPct));
          const isCounterBid = requestedDiscountPct > maxDiscountPct;
          currentBidUsd = initialQuoteUsd === 0 ? 0 : Math.round(initialQuoteUsd * (1 - acceptedDiscountPct / 100));

          port.postMessage({
            jsonrpc: "2.0",
            id: req.id,
            result: {
              agent_id: manifest.agent.id,
              requested_discount_pct: requestedDiscountPct,
              granted_discount_pct: acceptedDiscountPct,
              counter_bid: isCounterBid,
              counter_quote_usd: currentBidUsd,
              reason: isCounterBid
                ? "Demanded " + requestedDiscountPct + "% exceeds manifest cap (" + maxDiscountPct + "%); counter-offered at floor."
                : "Accepted " + acceptedDiscountPct + "% autonomous volume rebate."
            }
          });
          return;
        }

        if (req.method === "a2a.commit_agreement") {
          const finalDiscountPct = initialQuoteUsd > 0
            ? Number((((initialQuoteUsd - currentBidUsd) / initialQuoteUsd) * 100).toFixed(1))
            : 0;
          port.postMessage({
            jsonrpc: "2.0",
            id: req.id,
            result: {
              status: "LOCKED",
              agent_id: manifest.agent.id,
              agent_name: manifest.agent.name,
              initial_usd: initialQuoteUsd,
              locked_usd: currentBidUsd,
              discount_pct: finalDiscountPct
            }
          });
        }
      };
    }
  };
`;

function toBase64Url(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeOfferToken(tokenStr) {
  try {
    const [payloadB64, sigB64] = String(tokenStr || "").split(".");
    if (!payloadB64 || !sigB64) return null;
    const normalized = payloadB64.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const payload = JSON.parse(new TextDecoder().decode(bytes));
    return { validStructure: true, payload, signature: sigB64 };
  } catch (_) {
    return null;
  }
}

export class OpenAgenticWebRuntime {
  constructor() {
    this.manifests = {};
    this.dynamicDictionaries = JSON.parse(localStorage.getItem("nexustravel-i18n-cache-v2") || "{}");
    this.state = {
      step: 0,
      vertical: "travel",
      lang: "en",
      currency: "USD",
      llmProvider: "otari",
      llmKey: "",
      origin: "London",
      destination: "Tokyo",
      days: 5,
      tier: "balanced",
      addon: "highlights",
      budgetUsd: 2400,
      baselineUsd: 2400,
      minBudgetUsd: 1968,
      maxBudgetUsd: 4200,
      geoOrigin: { lat: 51.5072, lon: -0.1276, name: "London", iata: "lon" },
      geoDest: { lat: 35.6762, lon: 139.6503, name: "Tokyo", costIndex: 1.25, iata: "tyo" },
      weather: null,
      customAgent: null,
      negotiationResult: null,
      transcript: []
    };
  }

  validateHttpsUrl(urlStr, { allowTemplatePlaceholders = false } = {}) {
    if (typeof urlStr !== "string" || !urlStr.trim()) {
      throw new Error("Security Violation: Empty or non-string URL.");
    }
    const trimmed = urlStr.trim();
    const testSample = allowTemplatePlaceholders
      ? trimmed.replace(/\{(ORIGIN|DEST|CITY)\}/g, "placeholder")
      : trimmed;

    let parsed;
    try {
      parsed = new URL(testSample);
    } catch (_) {
      throw new Error(`Security Violation: Malformed URL "${trimmed}".`);
    }

    if (parsed.protocol !== "https:") {
      throw new Error(
        `Security Violation: Untrusted protocol "${parsed.protocol}" in "${trimmed}". Only "https://" is permitted.`
      );
    }
    return trimmed;
  }

  t(key, vars = null) {
    const lang = this.state.lang || "en";
    let str =
      (I18N[lang] && I18N[lang][key]) ||
      (this.dynamicDictionaries[lang] && this.dynamicDictionaries[lang][key]) ||
      I18N.en[key] ||
      key;

    if (vars && typeof str === "string") {
      Object.entries(vars).forEach(([k, v]) => {
        str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      });
    }
    return str;
  }

  /**
   * Rate-limit-safe Universal Translation Engine with Fallback
   */
  async ensureLanguageDictionary(langCode, onProgress) {
    if (langCode === "en" || I18N[langCode]) return;
    const allKeys = Object.keys(I18N.en);
    const existing = this.dynamicDictionaries[langCode] || {};
    const missingKeys = allKeys.filter((k) => !existing[k]);

    if (missingKeys.length === 0) return;

    if (onProgress) onProgress(true);
    const translatedDict = { ...existing };

    const chunkSize = 24;
    const chunks = [];
    for (let i = 0; i < missingKeys.length; i += chunkSize) {
      chunks.push(missingKeys.slice(i, i + chunkSize));
    }

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));

    for (let cIdx = 0; cIdx < chunks.length; cIdx++) {
      const chunkKeys = chunks[cIdx];
      const joinedPayload = chunkKeys.map((k) => I18N.en[k]).join("\n|||\n");

      try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(
          langCode
        )}&dt=t&q=${encodeURIComponent(joinedPayload)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        let fullTranslated = "";
        if (Array.isArray(data) && Array.isArray(data[0])) {
          fullTranslated = data[0].map((seg) => seg[0]).join("");
        }

        const segments = fullTranslated.split(/\s*\|\|\|\s*/);
        if (segments.length === chunkKeys.length) {
          chunkKeys.forEach((key, idx) => {
            const val = (segments[idx] || "").trim();
            translatedDict[key] = val || I18N.en[key];
          });
        } else {
          chunkKeys.forEach((key) => {
            translatedDict[key] = I18N.en[key];
          });
        }
      } catch (_) {
        chunkKeys.forEach((key) => {
          translatedDict[key] = I18N.en[key];
        });
      }

      if (cIdx < chunks.length - 1) {
        await wait(220);
      }
    }

    this.dynamicDictionaries[langCode] = translatedDict;
    try {
      localStorage.setItem("nexustravel-i18n-cache-v2", JSON.stringify(this.dynamicDictionaries));
    } catch (_) {}
    if (onProgress) onProgress(false);
  }

  async init() {
    await this.discoverManifests();
    await this.syncGeographyAndWeather();
    this.recalculateBaseline();
  }

  async setVertical(verticalKey) {
    this.state.vertical = verticalKey === "compute" ? "compute" : "travel";
    this.manifests = {};
    await this.discoverManifests();
    if (this.state.customAgent) {
      const keyName = `${this.state.customAgent.agent.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.agent.json`;
      this.manifests[keyName] = this.state.customAgent;
    }
    if (this.state.vertical === "compute") {
      this.state.origin = "us-east-1";
      this.state.destination = "Tokyo";
      this.state.days = 5;
      this.state.tier = "balanced";
      this.state.addon = "highlights";
    } else {
      this.state.origin = "London";
      this.state.destination = "Tokyo";
      this.state.days = 5;
      this.state.tier = "balanced";
      this.state.addon = "highlights";
    }
    await this.syncGeographyAndWeather();
    this.recalculateBaseline();
    this.state.budgetUsd = Math.round(this.state.baselineUsd * 0.92);
  }

  async discoverManifests() {
    const fallbackSet = VERTICAL_MANIFESTS[this.state.vertical] || VERTICAL_MANIFESTS.travel;
    const files = Object.keys(fallbackSet);
    for (const file of files) {
      try {
        if (this.state.vertical === "travel") {
          const res = await fetch(`./${file}`, { cache: "no-store" });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          if (data?.handoff?.url_template) {
            this.validateHttpsUrl(data.handoff.url_template, { allowTemplatePlaceholders: true });
          }
          this.manifests[file] = data;
        } else {
          this.manifests[file] = fallbackSet[file];
        }
      } catch (_) {
        this.manifests[file] = fallbackSet[file];
      }
    }
    return this.manifests;
  }

  async registerCustomAgent(urlOrObject) {
    let manifest;
    if (typeof urlOrObject === "string") {
      const safeManifestUrl = this.validateHttpsUrl(urlOrObject);
      const res = await fetch(safeManifestUrl, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      manifest = await res.json();
    } else {
      manifest = urlOrObject;
    }

    if (!manifest?.agent?.name) {
      throw new Error("Invalid agent manifest: missing agent.name");
    }

    if (manifest.handoff?.url_template) {
      this.validateHttpsUrl(manifest.handoff.url_template, { allowTemplatePlaceholders: true });
    }

    const keyName = `${manifest.agent.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.agent.json`;
    this.manifests[keyName] = manifest;
    this.state.customAgent = manifest;
    this.recalculateBaseline();
    return manifest;
  }

  parseIntentDeterministic(text) {
    const lower = (text || "").toLowerCase();
    const daysMatch = lower.match(/(\d+)\s*(?:day|days|يوم|أيام|ايام|días|jours|tage|天)/);
    const budgetMatch =
      lower.match(/\$\s*(\d+(?:,\d+)?)/) ||
      lower.match(/(?:budget|ميزانية|بميزانية|presupuesto)\s*(\d+(?:,\d+)?)/);

    let tier = "balanced";
    if (
      lower.includes("luxury") ||
      lower.includes("5 star") ||
      lower.includes("business") ||
      lower.includes("8x h100") ||
      lower.includes("فاخر") ||
      lower.includes("فخم")
    ) {
      tier = "luxury";
    }
    if (
      lower.includes("saver") ||
      lower.includes("cheap") ||
      lower.includes("economy") ||
      lower.includes("2x h100") ||
      lower.includes("اقتصادي") ||
      lower.includes("رخيص")
    ) {
      tier = "saver";
    }

    let addon = "highlights";
    if (
      lower.includes("vip") ||
      lower.includes("all-inclusive") ||
      lower.includes("private") ||
      lower.includes("24/7") ||
      lower.includes("شامل")
    ) {
      addon = "vip";
    }
    if (
      lower.includes("only") ||
      lower.includes("no tour") ||
      lower.includes("none") ||
      lower.includes("فقط")
    ) {
      addon = "none";
    }

    const arCityMap = {
      "القاهرة": "Cairo",
      "القاهره": "Cairo",
      "دبي": "Dubai",
      "طوكيو": "Tokyo",
      "باريس": "Paris",
      "لندن": "London",
      "نيويورك": "New York"
    };

    let normalized = text || "";
    Object.entries(arCityMap).forEach(([ar, en]) => {
      normalized = normalized.replace(new RegExp(ar, "g"), en);
    });

    const knownCities = Object.keys(CITY_PRESETS);
    let origin = this.state.origin;
    let destination = this.state.destination;

    const fromMatch = normalized.match(
      /(?:from|من|desde|de)\s+([A-Za-z0-9-\s]+?)(?:,|\s+to|\s+إلى|\s+الى|\s+for|\s+under|\s+budget|$)/i
    );
    const toMatch = normalized.match(
      /(?:to|in|إلى|الى|في|en|à)\s+([A-Za-z0-9-\s]+?)(?:,|\s+from|\s+من|\s+for|\s+under|\s+budget|$)/i
    );

    if (fromMatch && fromMatch[1].trim()) origin = fromMatch[1].trim();
    if (toMatch && toMatch[1].trim()) destination = toMatch[1].trim();
    else {
      const found = knownCities.find((c) => normalized.toLowerCase().includes(c.toLowerCase()));
      if (found) destination = found;
    }

    return {
      origin,
      destination,
      days: daysMatch ? Number(daysMatch[1]) : 5,
      tier,
      addon,
      budgetUsd: budgetMatch ? Number(budgetMatch[1].replace(/,/g, "")) : undefined
    };
  }

  async parseNaturalIntent(text) {
    const deterministic = this.parseIntentDeterministic(text);
    const key = (this.state.llmKey || "").trim();
    if (!key) return deterministic;

    const isOtari = this.state.llmProvider === "otari" || key.startsWith("otari");
    const endpoint = isOtari
      ? "https://api.otari.ai/v1/chat/completions"
      : "https://api.openai.com/v1/chat/completions";
    const model = isOtari ? "auto" : "gpt-4o-mini";

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7000);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                'Extract intent parameters from user text (any language or dialect) into strict JSON ONLY with keys: {"origin": string|null, "destination": string|null, "days": number|null, "tier": "saver"|"balanced"|"luxury"|null, "addon": "none"|"highlights"|"vip"|null, "budgetUsd": number|null}. Return raw JSON without markdown.'
            },
            { role: "user", content: text }
          ],
          temperature: 0.1,
          max_tokens: 180
        }),
        signal: controller.signal
      });
      clearTimeout(timer);

      if (!response.ok) return deterministic;
      const data = await response.json();
      const rawContent = data.choices?.[0]?.message?.content?.trim() || "";
      const cleanedJson = rawContent.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
      const parsed = JSON.parse(cleanedJson);

      return {
        origin: typeof parsed.origin === "string" && parsed.origin.trim() ? parsed.origin.trim() : deterministic.origin,
        destination:
          typeof parsed.destination === "string" && parsed.destination.trim()
            ? parsed.destination.trim()
            : deterministic.destination,
        days: Number.isFinite(Number(parsed.days)) && Number(parsed.days) >= 2 ? Number(parsed.days) : deterministic.days,
        tier: ["saver", "balanced", "luxury"].includes(parsed.tier) ? parsed.tier : deterministic.tier,
        addon: ["none", "highlights", "vip"].includes(parsed.addon) ? parsed.addon : deterministic.addon,
        budgetUsd:
          Number.isFinite(Number(parsed.budgetUsd)) && Number(parsed.budgetUsd) > 0
            ? Number(parsed.budgetUsd)
            : deterministic.budgetUsd
      };
    } catch (_) {
      return deterministic;
    }
  }

  formatMoney(usdAmount) {
    const cfg = CURRENCY_RATES[this.state.currency] || CURRENCY_RATES.USD;
    const converted = Math.round(usdAmount * cfg.rate);
    return `${cfg.symbol}${converted.toLocaleString()}`;
  }

  haversineKm(lat1, lon1, lat2, lon2) {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return Math.max(450, Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))));
  }

  async geocodeCity(cityName) {
    const clean = (cityName || "").trim();
    if (CITY_PRESETS[clean]) {
      return { name: clean, ...CITY_PRESETS[clean] };
    }
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(clean)}&count=1&language=en&format=json`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const hit = data.results[0];
        const isHighCost = ["US", "GB", "CH", "JP", "FR", "DE", "AU", "SG", "AE", "NL"].includes(hit.country_code);
        const isLowCost = ["EG", "IN", "TH", "VN", "MX", "MA", "ID", "TR"].includes(hit.country_code);
        return {
          name: hit.name,
          lat: hit.latitude,
          lon: hit.longitude,
          country: hit.country || "",
          iata: hit.name.slice(0, 3).toLowerCase(),
          costIndex: isHighCost ? 1.24 : isLowCost ? 0.78 : 1.0
        };
      }
    } catch (_) {}
    const fallbackName = clean || "Tokyo";
    return {
      name: fallbackName,
      lat: 35.6762,
      lon: 139.6503,
      country: "Global",
      iata: fallbackName.slice(0, 3).toLowerCase(),
      costIndex: 1.05
    };
  }

  async syncGeographyAndWeather() {
    const [orig, dest] = await Promise.all([
      this.geocodeCity(this.state.origin),
      this.geocodeCity(this.state.destination)
    ]);
    this.state.geoOrigin = orig;
    this.state.geoDest = dest;

    try {
      const wUrl = `https://api.open-meteo.com/v1/forecast?latitude=${dest.lat}&longitude=${dest.lon}&current_weather=true`;
      const wRes = await fetch(wUrl);
      const wData = await wRes.json();
      if (wData.current_weather) {
        this.state.weather = {
          tempC: wData.current_weather.temperature,
          windKmh: wData.current_weather.windspeed,
          weatherCode: wData.current_weather.weathercode,
          isRainy: [51, 53, 55, 61, 63, 65, 80, 81, 82, 95].includes(wData.current_weather.weathercode)
        };
      }
    } catch (_) {
      this.state.weather = { tempC: 22.5, windKmh: 12.0, weatherCode: 1, isRainy: false };
    }
    this.recalculateBaseline();
  }

  getPeerManifestsByRole() {
    const entries = Object.values(this.manifests);
    const findByRole = (r) => entries.find((m) => m.agent?.role === r);
    const fallbackSet = VERTICAL_MANIFESTS[this.state.vertical] || VERTICAL_MANIFESTS.travel;
    const fallbackPeers = Object.values(fallbackSet).filter((m) => m.agent?.role !== "coordinator");

    return {
      flights: findByRole("flights") || fallbackPeers[0],
      hotels: findByRole("hotels") || fallbackPeers[1],
      activities: findByRole("activities") || fallbackPeers[2],
      custom: this.state.customAgent || null
    };
  }

  calculateMarketCost({ days, tier, addon } = this.state) {
    const peers = this.getPeerManifestsByRole();
    const fModel = peers.flights.pricing_model;
    const hModel = peers.hotels.pricing_model;
    const aModel = peers.activities.pricing_model;

    const distKm = this.haversineKm(
      this.state.geoOrigin.lat,
      this.state.geoOrigin.lon,
      this.state.geoDest.lat,
      this.state.geoDest.lon
    );
    const nights = Math.max(1, days - 1);

    let flightMarket = 0;
    let hotelMarket = 0;
    let activitiesMarket = 0;

    if (this.state.vertical === "compute") {
      const gpus = fModel.tier_gpu_counts[tier] || 4;
      flightMarket = Math.round(fModel.base_setup_usd + days * 24 * gpus * fModel.hourly_h100_rate_usd);
      hotelMarket = Math.round(days * hModel.daily_tb_rate_usd[tier] * (this.state.geoDest.costIndex || 1.0));
      activitiesMarket = Math.round(days * aModel.daily_rec_usd[addon]);
    } else {
      flightMarket = Math.round(
        (fModel.base_fare_usd + distKm * fModel.per_km_rate_usd) * fModel.tier_multipliers[tier]
      );
      hotelMarket = Math.round(
        nights * hModel.nightly_base_usd[tier] * (this.state.geoDest.costIndex || 1.0)
      );
      activitiesMarket = Math.round(days * aModel.daily_rate_usd[addon]);
    }

    let customMarket = 0;
    if (this.state.customAgent) {
      const pm = this.state.customAgent.pricing_model || {};
      const base = pm.base_protection_usd || 18;
      const perUnit =
        this.state.vertical === "compute"
          ? days * (pm.per_day_compute_carbon_usd || 6.5)
          : (distKm / 1000) * (pm.per_1000km_carbon_usd || 4.5);
      customMarket = Math.round(base + perUnit);
    }

    const totalMarket = flightMarket + hotelMarket + activitiesMarket + customMarket;
    return { distKm, nights, flightMarket, hotelMarket, activitiesMarket, customMarket, totalMarket };
  }

  recalculateBaseline() {
    const est = this.calculateMarketCost(this.state);
    this.state.baselineUsd = est.totalMarket;
    this.state.minBudgetUsd = Math.round(est.totalMarket * 0.82);
    this.state.maxBudgetUsd = Math.round(est.totalMarket * 1.75);
    if (this.state.budgetUsd < this.state.minBudgetUsd || this.state.budgetUsd > this.state.maxBudgetUsd) {
      this.state.budgetUsd = Math.round(est.totalMarket * 0.94);
    }
    return est;
  }

  spawnIsolatedWorkerPeer(manifest) {
    const blob = new Blob([WORKER_AGENT_SOURCE], { type: "application/javascript" });
    const blobUrl = URL.createObjectURL(blob);
    const worker = new Worker(blobUrl);
    const channel = new MessageChannel();
    let rpcSeq = 1;
    const pending = new Map();

    channel.port1.onmessage = (event) => {
      const msg = event.data;
      if (msg && msg.id && pending.has(msg.id)) {
        const { resolve, reject } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message || "RPC Error"));
        else resolve(msg.result);
      }
    };

    worker.postMessage({ type: "INIT_AGENT", manifest }, [channel.port2]);

    const callRpc = (method, params) =>
      new Promise((resolve, reject) => {
        const id = rpcSeq++;
        pending.set(id, { resolve, reject });
        channel.port1.postMessage({ jsonrpc: "2.0", id, method, params });
      });

    const terminate = () => {
      channel.port1.close();
      worker.terminate();
      URL.revokeObjectURL(blobUrl);
    };

    return { manifest, callRpc, terminate };
  }

  async mintNandaOfferToken({ agentDid, lockedPriceUsd, discountPct, routeOrSku, quoteSignature }) {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    const payload = {
      protocol: "nanda-offer-token/1.0",
      agent_did: agentDid,
      locked_price_usd: lockedPriceUsd,
      discount_pct: discountPct,
      route_or_sku: routeOrSku,
      expires_at: expiresAt,
      quote_sha256: quoteSignature
    };
    const tokenSignature = await this.computeAuditHash({ payload, quoteSignature });
    const encodedPayload = toBase64Url(JSON.stringify(payload));
    const encodedSig = toBase64Url(tokenSignature.slice(0, 32));
    return `${encodedPayload}.${encodedSig}`;
  }

  resolveHandoffUrls(origCode, destCode, cabinClass, starFilter, activityQuery, offerTokens = {}, negotiated = {}) {
    const peers = this.getPeerManifestsByRole();

    const appendTokenAndValidate = (candidateUrl, token, lockedUsd, fallbackUrl) => {
      try {
        const validated = this.validateHttpsUrl(candidateUrl);
        const urlObj = new URL(validated);
        if (token) urlObj.searchParams.set("a2a_offer_token", token);
        if (Number.isFinite(lockedUsd)) urlObj.searchParams.set("negotiated_usd", String(lockedUsd));
        return urlObj.toString();
      } catch (_) {
        return fallbackUrl;
      }
    };

    const flightTpl =
      peers.flights?.handoff?.url_template ||
      "https://www.skyscanner.net/transport/flights/{ORIGIN}/{DEST}/";
    const hotelTpl =
      peers.hotels?.handoff?.url_template ||
      "https://www.expedia.com/Hotel-Search?destination={CITY}";
    const activityTpl =
      peers.activities?.handoff?.url_template ||
      "https://www.getyourguide.com/s/?q={CITY}";

    const flightsBase = flightTpl.replace("{ORIGIN}", origCode).replace("{DEST}", destCode);
    const hotelsBase = hotelTpl.replace("{CITY}", encodeURIComponent(this.state.geoDest.name));
    const activitiesBase = activityTpl.replace("{CITY}", encodeURIComponent(activityQuery));

    const flightsRaw =
      this.state.vertical === "compute"
        ? flightsBase
        : `${flightsBase}${flightsBase.includes("?") ? "&" : "?"}adultsv2=1&cabinclass=${encodeURIComponent(cabinClass)}`;
    const hotelsRaw =
      this.state.vertical === "compute"
        ? hotelsBase
        : `${hotelsBase}${hotelsBase.includes("?") ? "&" : "?"}rooms=1&adults=1&star=${encodeURIComponent(starFilter)}`;

    let customUrl = null;
    if (this.state.customAgent) {
      const cTpl =
        this.state.customAgent.handoff?.url_template ||
        "https://marketplace.goldstandard.org/collections/projects?q={CITY}";
      const customRaw = cTpl.replace("{CITY}", encodeURIComponent(this.state.geoDest.name));
      customUrl = appendTokenAndValidate(
        customRaw,
        offerTokens.custom,
        negotiated.custom,
        "https://marketplace.goldstandard.org/"
      );
    }

    return {
      flights: appendTokenAndValidate(flightsRaw, offerTokens.flights, negotiated.flights, "https://www.skyscanner.net/"),
      hotels: appendTokenAndValidate(hotelsRaw, offerTokens.hotels, negotiated.hotels, "https://www.expedia.com/"),
      activities: appendTokenAndValidate(
        activitiesBase,
        offerTokens.activities,
        negotiated.activities,
        "https://www.getyourguide.com/"
      ),
      custom: customUrl
    };
  }

  async computeRound2CounterStrategy({ initialQuotes, peers, totalInitialUsd }) {
    const key = (this.state.llmKey || "").trim();
    const gapPct =
      totalInitialUsd > this.state.budgetUsd
        ? Math.min(22, Math.ceil(((totalInitialUsd - this.state.budgetUsd) / totalInitialUsd) * 100) + 3)
        : 10;

    const isAr = this.state.lang === "ar";

    const deterministicStrategy = {
      engine: this.t("detEngineBadge"),
      discounts: {
        flights: Math.min(peers.flights.pricing_model.max_autonomous_discount_pct || 16, Math.max(9, gapPct)),
        hotels: Math.min(peers.hotels.pricing_model.max_autonomous_discount_pct || 18, Math.max(11, gapPct + 2)),
        activities: Math.min(peers.activities.pricing_model.max_autonomous_discount_pct || 15, Math.max(8, gapPct - 1)),
        custom: peers.custom ? Math.min(peers.custom.pricing_model.max_autonomous_discount_pct || 22, 18) : 0
      },
      tradeoff_note:
        this.state.vertical === "compute"
          ? isAr
            ? "تم تفعيل مرونة الحجز الفوري لمعالجات H100 وتحويل هامش الخصم إلى التزام التخزين NVMe متعدد الأيام."
            : "Spot H100 pre-emption tolerance enabled; shifted yield demand onto multi-day NVMe storage commitment."
          : this.state.weather?.isRainy
          ? isAr
            ? `تم رصد طقس ممطر (${this.state.weather.tempC}°C) ← تم تحويل هامش الجولات الخارجية إلى خصم إضافي على الإقامة الفندقية.`
            : `Rainy telemetry (${this.state.weather.tempC}°C) detected -> shifted outdoor excursion margin into StaySmart indoor suite rebate.`
          : isAr
          ? `طقس معتدل (${this.state.weather?.tempC ?? 22}°C) ← تم موازنة خصم تذاكر الطيران مع خصم الليالي الفندقية المتعددة.`
          : `Clear weather (${this.state.weather?.tempC ?? 22}°C) -> balanced unbundled fare rebate + multi-night hotel yield discount.`,
      rationale: isAr
        ? `تم استهداف خصم مركب بنسبة ${gapPct}% عبر ${Object.keys(initialQuotes).length} وكلاء معزولين للتوافق مع سقف ميزانيتك (${this.formatMoney(this.state.budgetUsd)}).`
        : `Targeted ${gapPct}% composite concession across ${Object.keys(initialQuotes).length} isolated workers to align with ${this.formatMoney(this.state.budgetUsd)} ceiling.`
    };

    if (!key) return deterministicStrategy;

    const isOtari = this.state.llmProvider === "otari" || key.startsWith("otari");
    const endpoint = isOtari
      ? "https://api.otari.ai/v1/chat/completions"
      : "https://api.openai.com/v1/chat/completions";
    const model = isOtari ? "auto" : "gpt-4o-mini";

    const contextPayload = {
      vertical: this.state.vertical,
      budget_ceiling_usd: this.state.budgetUsd,
      total_initial_quotes_usd: totalInitialUsd,
      weather: this.state.weather,
      agents: {
        flights: {
          name: peers.flights.agent.name,
          initial_usd: initialQuotes.flights,
          max_discount_pct: peers.flights.pricing_model.max_autonomous_discount_pct
        },
        hotels: {
          name: peers.hotels.agent.name,
          initial_usd: initialQuotes.hotels,
          max_discount_pct: peers.hotels.pricing_model.max_autonomous_discount_pct
        },
        activities: {
          name: peers.activities.agent.name,
          initial_usd: initialQuotes.activities,
          max_discount_pct: peers.activities.pricing_model.max_autonomous_discount_pct
        },
        ...(peers.custom
          ? {
              custom: {
                name: peers.custom.agent.name,
                initial_usd: initialQuotes.custom,
                max_discount_pct: peers.custom.pricing_model.max_autonomous_discount_pct
              }
            }
          : {})
      }
    };

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                'You are an autonomous A2A Negotiation Engine in Round 2. Analyze initial peer quotes, max_discount_pct caps, weather telemetry, and budget_ceiling_usd. Output STRICT JSON ONLY with keys: {"discounts": {"flights": number, "hotels": number, "activities": number, "custom": number}, "tradeoff_note": string, "rationale": string}. Write tradeoff_note and rationale in language code "' +
                this.state.lang +
                '".'
            },
            { role: "user", content: JSON.stringify(contextPayload) }
          ],
          temperature: 0.25,
          max_tokens: 260
        }),
        signal: controller.signal
      });
      clearTimeout(timer);

      if (!response.ok) return deterministicStrategy;
      const data = await response.json();
      const raw = data.choices?.[0]?.message?.content?.trim() || "";
      const cleaned = raw.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
      const parsed = JSON.parse(cleaned);

      return {
        engine: `${isOtari ? "Mozilla Otari" : "OpenAI"} Active Negotiation Engine`,
        discounts: {
          flights: Number.isFinite(Number(parsed.discounts?.flights))
            ? Number(parsed.discounts.flights)
            : deterministicStrategy.discounts.flights,
          hotels: Number.isFinite(Number(parsed.discounts?.hotels))
            ? Number(parsed.discounts.hotels)
            : deterministicStrategy.discounts.hotels,
          activities: Number.isFinite(Number(parsed.discounts?.activities))
            ? Number(parsed.discounts.activities)
            : deterministicStrategy.discounts.activities,
          custom: Number.isFinite(Number(parsed.discounts?.custom))
            ? Number(parsed.discounts.custom)
            : deterministicStrategy.discounts.custom
        },
        tradeoff_note: parsed.tradeoff_note || deterministicStrategy.tradeoff_note,
        rationale: parsed.rationale || deterministicStrategy.rationale
      };
    } catch (_) {
      return deterministicStrategy;
    }
  }

  async runA2ANegotiation({ onLog, onAgentState, onFlow }) {
    this.state.transcript = [];
    const log = (actor, msg) => {
      const entry = {
        ts: new Date().toISOString().split("T")[1].slice(0, 8),
        actor,
        msg
      };
      this.state.transcript.push(entry);
      if (onLog) onLog(entry);
    };

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const peers = this.getPeerManifestsByRole();
    const distKm = this.haversineKm(
      this.state.geoOrigin.lat,
      this.state.geoOrigin.lon,
      this.state.geoDest.lat,
      this.state.geoDest.lon
    );
    const nights = Math.max(1, this.state.days - 1);
    const co2Kg =
      this.state.vertical === "compute"
        ? Math.round(this.state.days * 24 * 0.42)
        : Math.round(distKm * 0.115);

    const workerPool = {
      flights: this.spawnIsolatedWorkerPeer(peers.flights),
      hotels: this.spawnIsolatedWorkerPeer(peers.hotels),
      activities: this.spawnIsolatedWorkerPeer(peers.activities),
      ...(peers.custom ? { custom: this.spawnIsolatedWorkerPeer(peers.custom) } : {})
    };

    const peerKeys = Object.keys(workerPool);

    try {
      onFlow("SPAWNING ISOLATED WEB WORKERS • MessageChannel JSON-RPC 2.0");
      log(
        "ORCHESTRATOR",
        `Spawned ${peerKeys.length} isolated Blob Web Worker sandboxes over asynchronous MessageChannel ports.`
      );
      peerKeys.forEach((k) => onAgentState(k, "SCANNING", 0));
      await wait(260);

      log(
        "TELEMETRY",
        `Open-Meteo lock for ${this.state.geoDest.name} (${this.state.geoDest.lat.toFixed(2)}, ${this.state.geoDest.lon.toFixed(2)}): ${this.state.weather.tempC}°C, wind ${this.state.weather.windKmh} km/h.`
      );

      onFlow("ROUND 1/3 • JSON-RPC a2a.request_quote -> Isolated Workers");
      log("ROUND 1/3", `{"jsonrpc":"2.0","method":"a2a.request_quote","workers":${peerKeys.length}}`);

      const quoteParams = {
        vertical: this.state.vertical,
        days: this.state.days,
        tier: this.state.tier,
        addon: this.state.addon,
        distKm,
        costIndex: this.state.geoDest.costIndex || 1.0
      };

      const round1Responses = {};
      await Promise.all(
        peerKeys.map(async (k) => {
          const res = await workerPool[k].callRpc("a2a.request_quote", quoteParams);
          round1Responses[k] = res;
          onAgentState(k, "SCANNING", res.initial_quote_usd);
          log(
            res.agent_name.split(" ")[0].toUpperCase(),
            `[Worker PID:${k}] Initial quote: ${this.formatMoney(res.initial_quote_usd)} (manifest max discount cap: ${res.max_autonomous_discount_pct}%).`
          );
        })
      );
      await wait(300);

      const initialQuotes = {
        flights: round1Responses.flights.initial_quote_usd,
        hotels: round1Responses.hotels.initial_quote_usd,
        activities: round1Responses.activities.initial_quote_usd,
        custom: round1Responses.custom ? round1Responses.custom.initial_quote_usd : 0
      };
      const totalInitialUsd =
        initialQuotes.flights + initialQuotes.hotels + initialQuotes.activities + initialQuotes.custom;

      onFlow("ROUND 2/3 • Active Bidding Strategy -> JSON-RPC a2a.counter_offer");
      const strategy = await this.computeRound2CounterStrategy({
        initialQuotes,
        peers,
        totalInitialUsd
      });

      log("ROUND 2/3", `{"jsonrpc":"2.0","method":"a2a.counter_offer","engine":"${strategy.engine}"}`);
      log("NEGOTIATOR", `${strategy.rationale}`);
      log("TRADE-OFF", `${strategy.tradeoff_note}`);

      const round2Responses = {};
      await Promise.all(
        peerKeys.map(async (k) => {
          const demandedPct = strategy.discounts[k] ?? 10;
          const res = await workerPool[k].callRpc("a2a.counter_offer", {
            requested_discount_pct: demandedPct
          });
          round2Responses[k] = res;
          onAgentState(k, "NEGOTIATING", res.counter_quote_usd);
          log(
            peers[k].agent.name.split(" ")[0].toUpperCase(),
            `[Worker ${res.counter_bid ? "COUNTER-BID" : "ACCEPTED"}] Demanded -${res.requested_discount_pct}% -> Granted -${res.granted_discount_pct}% (${this.formatMoney(res.counter_quote_usd)}). ${res.reason}`
          );
        })
      );
      await wait(320);

      onFlow("ROUND 3/3 • JSON-RPC a2a.commit_agreement -> LOCKED");
      log("ROUND 3/3", `{"jsonrpc":"2.0","method":"a2a.commit_agreement","mint_nanda_tokens":true}`);

      const round3Responses = {};
      await Promise.all(
        peerKeys.map(async (k) => {
          const res = await workerPool[k].callRpc("a2a.commit_agreement", {});
          round3Responses[k] = res;
          onAgentState(k, "LOCKED", res.locked_usd);
        })
      );

      const flightFinal = round3Responses.flights.locked_usd;
      const hotelFinal = round3Responses.hotels.locked_usd;
      const activitiesFinal = round3Responses.activities.locked_usd;
      const customFinal = round3Responses.custom ? round3Responses.custom.locked_usd : 0;

      const totalFinal = flightFinal + hotelFinal + activitiesFinal + customFinal;
      const totalSavings = Math.max(0, totalInitialUsd - totalFinal);

      const concessionMatrix = peerKeys.map((k) => ({
        key: k,
        name: peers[k].agent.name,
        did: peers[k].agent.id,
        round1Usd: round1Responses[k].initial_quote_usd,
        round2Usd: round2Responses[k].counter_quote_usd,
        round3Usd: round3Responses[k].locked_usd,
        discountPct: round3Responses[k].discount_pct,
        counterBidTriggered: round2Responses[k].counter_bid
      }));

      const lockedTimestamp = new Date().toISOString();
      const routeDescriptor =
        this.state.vertical === "compute"
          ? `${this.state.origin.toUpperCase()}-H100-${this.state.days}D`
          : `${this.state.geoOrigin.iata.toUpperCase()}-${this.state.geoDest.iata.toUpperCase()}`;

      const [flightsSig, hotelsSig, activitiesSig, customSig] = await Promise.all([
        this.computeAuditHash({
          agent_id: peers.flights.agent.id,
          locked_usd: flightFinal,
          route: routeDescriptor,
          days: this.state.days,
          timestamp: lockedTimestamp
        }),
        this.computeAuditHash({
          agent_id: peers.hotels.agent.id,
          locked_usd: hotelFinal,
          route: routeDescriptor,
          days: this.state.days,
          timestamp: lockedTimestamp
        }),
        this.computeAuditHash({
          agent_id: peers.activities.agent.id,
          locked_usd: activitiesFinal,
          route: routeDescriptor,
          days: this.state.days,
          timestamp: lockedTimestamp
        }),
        peers.custom
          ? this.computeAuditHash({
              agent_id: peers.custom.agent.id,
              locked_usd: customFinal,
              route: routeDescriptor,
              days: this.state.days,
              timestamp: lockedTimestamp
            })
          : Promise.resolve(null)
      ]);

      const quoteSignatures = {
        timestamp: lockedTimestamp,
        flights: flightsSig,
        hotels: hotelsSig,
        activities: activitiesSig,
        ...(customSig ? { custom: customSig } : {})
      };

      const [flightsToken, hotelsToken, activitiesToken, customToken] = await Promise.all([
        this.mintNandaOfferToken({
          agentDid: peers.flights.agent.id,
          lockedPriceUsd: flightFinal,
          discountPct: round3Responses.flights.discount_pct,
          routeOrSku: routeDescriptor,
          quoteSignature: flightsSig
        }),
        this.mintNandaOfferToken({
          agentDid: peers.hotels.agent.id,
          lockedPriceUsd: hotelFinal,
          discountPct: round3Responses.hotels.discount_pct,
          routeOrSku: routeDescriptor,
          quoteSignature: hotelsSig
        }),
        this.mintNandaOfferToken({
          agentDid: peers.activities.agent.id,
          lockedPriceUsd: activitiesFinal,
          discountPct: round3Responses.activities.discount_pct,
          routeOrSku: routeDescriptor,
          quoteSignature: activitiesSig
        }),
        peers.custom
          ? this.mintNandaOfferToken({
              agentDid: peers.custom.agent.id,
              lockedPriceUsd: customFinal,
              discountPct: round3Responses.custom.discount_pct,
              routeOrSku: routeDescriptor,
              quoteSignature: customSig
            })
          : Promise.resolve(null)
      ]);

      const offerTokens = {
        flights: flightsToken,
        hotels: hotelsToken,
        activities: activitiesToken,
        ...(customToken ? { custom: customToken } : {})
      };

      const withinBudget = totalFinal <= this.state.budgetUsd;
      const autoHealPlan = withinBudget ? null : this.computeAutoHealPlan(totalFinal);
      const upgrades = this.computeSmartUpgrades(totalFinal);
      const itinerary = this.buildDayByDayItinerary();

      const origCode =
        this.state.vertical === "compute"
          ? encodeURIComponent(this.state.origin)
          : encodeURIComponent(this.state.geoOrigin.iata || this.state.geoOrigin.name.slice(0, 3).toLowerCase());
      const destCode = encodeURIComponent(
        this.state.geoDest.iata || this.state.geoDest.name.slice(0, 3).toLowerCase()
      );
      const cabinClass =
        this.state.tier === "luxury" ? "business" : this.state.tier === "saver" ? "economy" : "premiumeconomy";
      const starFilter = this.state.tier === "luxury" ? "50" : this.state.tier === "saver" ? "30" : "40";
      const activityQuery =
        this.state.vertical === "compute"
          ? `${this.state.geoDest.name} renewable energy`
          : this.state.weather.isRainy
          ? `${this.state.geoDest.name} museums indoor`
          : `${this.state.geoDest.name} city pass`;

      const bookingLinks = this.resolveHandoffUrls(
        origCode,
        destCode,
        cabinClass,
        starFilter,
        activityQuery,
        offerTokens,
        {
          flights: flightFinal,
          hotels: hotelFinal,
          activities: activitiesFinal,
          custom: customFinal
        }
      );

      log(
        "ORCHESTRATOR",
        `LOCKED across ${peerKeys.length} isolated workers: ${this.formatMoney(totalFinal)} (Saved ${this.formatMoney(totalSavings)}). Minted signed NANDA Offer Tokens.`
      );
      onFlow(
        withinBudget
          ? "LOCKED • WORKERS TERMINATED • NANDA TOKENS READY"
          : "LOCKED • AUTO-HEAL RECOVERY AVAILABLE"
      );

      const llmSummary = `${strategy.rationale}\n${strategy.tradeoff_note}`;

      const result = {
        vertical: this.state.vertical,
        executionMode: "Isolated Web Workers + MessageChannel JSON-RPC 2.0",
        reasoningEngine: strategy.engine,
        withinBudget,
        distKm,
        nights,
        co2Kg,
        concessionMatrix,
        market: {
          flights: initialQuotes.flights,
          hotels: initialQuotes.hotels,
          activities: initialQuotes.activities,
          custom: initialQuotes.custom,
          total: totalInitialUsd
        },
        negotiated: {
          flights: flightFinal,
          hotels: hotelFinal,
          activities: activitiesFinal,
          custom: customFinal,
          total: totalFinal
        },
        savingsUsd: totalSavings,
        itinerary,
        upgrades,
        autoHealPlan,
        llmSummary,
        quote_signatures: quoteSignatures,
        offer_tokens: offerTokens,
        bookingLinks
      };

      result.auditHash = await this.computeAuditHash(result);
      this.state.negotiationResult = result;
      return result;
    } finally {
      peerKeys.forEach((k) => workerPool[k].terminate());
    }
  }

  async computeAuditHash(payload) {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(JSON.stringify(payload));
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch (_) {
      return "nanda-sha256-" + Math.random().toString(16).slice(2, 14);
    }
  }

  computeAutoHealPlan(currentTotal) {
    const overrunUsd = currentTotal - this.state.budgetUsd;
    const formattedOverrun = this.formatMoney(overrunUsd);
    if (this.state.tier === "luxury") {
      return {
        reason: this.t("autoHealLuxuryReason", { overrun: formattedOverrun }),
        patch: { tier: "balanced" }
      };
    }
    if (this.state.addon === "vip") {
      return {
        reason: this.t("autoHealVipReason", { overrun: formattedOverrun }),
        patch: { addon: "highlights" }
      };
    }
    if (this.state.days > 3) {
      const reducedDays = Math.max(2, this.state.days - 1);
      return {
        reason: this.t("autoHealDaysReason", { overrun: formattedOverrun, days: reducedDays }),
        patch: { days: reducedDays }
      };
    }
    return {
      reason: this.t("autoHealSaverReason", { overrun: formattedOverrun }),
      patch: { tier: "saver", addon: "none" }
    };
  }

  computeSmartUpgrades(currentNegotiatedTotal) {
    const upgrades = [];

    if (this.state.days < 13) {
      const newDays = this.state.days + 2;
      const estNew = Math.round(this.calculateMarketCost({ ...this.state, days: newDays }).totalMarket * 0.87);
      const delta = Math.max(45, estNew - currentNegotiatedTotal);
      upgrades.push({
        id: "extend-stay",
        badge: this.t("upgExtraDaysBadge"),
        title:
          this.state.vertical === "compute"
            ? this.t("upgExtendClusterTitle", { days: newDays })
            : this.t("upgExtendStayTitle", { days: newDays, nights: newDays - 1 }),
        description: this.t("upgExtendDesc"),
        deltaUsd: delta,
        newBudgetUsd: currentNegotiatedTotal + delta + 40,
        patch: { days: newDays }
      });
    }

    if (this.state.tier !== "luxury") {
      const nextTier = this.state.tier === "saver" ? "balanced" : "luxury";
      const label =
        this.state.vertical === "compute"
          ? nextTier === "luxury"
            ? "8x H100 SXM5"
            : "4x H100 NVLink"
          : nextTier === "luxury"
          ? this.t("tierLuxTitle")
          : this.t("tierBalTitle");
      const estNew = Math.round(this.calculateMarketCost({ ...this.state, tier: nextTier }).totalMarket * 0.88);
      const delta = Math.max(60, estNew - currentNegotiatedTotal);
      upgrades.push({
        id: "tier-up",
        badge: this.t("upgTierBadge"),
        title: this.t("upgTierTitle", { label }),
        description: this.t("upgTierDesc"),
        deltaUsd: delta,
        newBudgetUsd: currentNegotiatedTotal + delta + 50,
        patch: { tier: nextTier }
      });
    }

    if (this.state.addon !== "vip") {
      const nextAddon = this.state.addon === "none" ? "highlights" : "vip";
      const label =
        this.state.vertical === "compute"
          ? nextAddon === "vip"
            ? "24/7 Hourly Carbon-Free + SLA"
            : "Standard Carbon REC Offset"
          : nextAddon === "vip"
          ? this.t("addonVipTitle")
          : this.t("addonHighTitle");
      const estNew = Math.round(this.calculateMarketCost({ ...this.state, addon: nextAddon }).totalMarket * 0.89);
      const delta = Math.max(35, estNew - currentNegotiatedTotal);
      upgrades.push({
        id: "addon-up",
        badge: this.t("upgAddonBadge"),
        title: this.t("upgAddonTitle", { label }),
        description: this.t("upgAddonDesc"),
        deltaUsd: delta,
        newBudgetUsd: currentNegotiatedTotal + delta + 30,
        patch: { addon: nextAddon }
      });
    }

    return upgrades.slice(0, 3);
  }

  buildDayByDayItinerary() {
    const dest = this.state.geoDest.name;
    const isRainy = this.state.weather?.isRainy;
    const temp = this.state.weather?.tempC ?? 22;
    const plan = [];

    if (this.state.vertical === "compute") {
      const gpus = this.state.tier === "luxury" ? "8x H100 SXM5" : this.state.tier === "saver" ? "2x H100 PCIe" : "4x H100 NVLink";
      for (let d = 1; d <= this.state.days; d++) {
        if (d === 1) {
          plan.push(`${this.t("dayWord")} 1: ${this.t("itineraryComputeStart", { gpus, dest, origin: this.state.origin })}`);
        } else if (d === this.state.days) {
          plan.push(`${this.t("dayWord")} ${d}: ${this.t("itineraryComputeEnd")}`);
        } else {
          plan.push(`${this.t("dayWord")} ${d}: ${this.t("itineraryComputeRun", { temp })}`);
        }
      }
      return plan;
    }

    for (let d = 1; d <= this.state.days; d++) {
      if (d === 1) {
        plan.push(`${this.t("dayWord")} 1: ${this.t("itineraryArrival", { dest })}`);
      } else if (d === this.state.days) {
        plan.push(`${this.t("dayWord")} ${d}: ${this.t("itineraryDeparture")}`);
      } else if (d % 2 === 0) {
        plan.push(
          isRainy
            ? `${this.t("dayWord")} ${d}: ${this.t("itineraryRainy", { dest })}`
            : `${this.t("dayWord")} ${d}: ${this.t("itineraryOutdoor", { dest })}`
        );
      } else {
        plan.push(
          this.state.addon === "vip"
            ? `${this.t("dayWord")} ${d}: ${this.t("itineraryVip", { dest })}`
            : `${this.t("dayWord")} ${d}: ${this.t("itineraryLocal", { dest })}`
        );
      }
    }
    return plan;
  }

  buildShareableDeepLink() {
    const base = window.location.href.split("?")[0];
    const params = new URLSearchParams({
      autoRun: "true",
      vertical: this.state.vertical,
      origin: this.state.vertical === "compute" ? this.state.origin : this.state.geoOrigin.name,
      destination: this.state.geoDest.name,
      days: String(this.state.days),
      tier: this.state.tier,
      addon: this.state.addon,
      budgetUsd: String(this.state.budgetUsd),
      currency: this.state.currency,
      lang: this.state.lang
    });
    return `${base}?${params.toString()}`;
  }

  exportTripPackage() {
    return {
      protocol: "open-agentic-web/1.0",
      vertical: this.state.vertical,
      generated_at: new Date().toISOString(),
      coordinator_did:
        this.state.vertical === "compute"
          ? "did:web:nexustravel.openweb:orchestrator:compute"
          : "did:web:nexustravel.openweb:orchestrator",
      nanda_audit_sha256: this.state.negotiationResult?.auditHash || null,
      quote_signatures: this.state.negotiationResult?.quote_signatures || null,
      offer_tokens: this.state.negotiationResult?.offer_tokens || null,
      concession_matrix: this.state.negotiationResult?.concessionMatrix || null,
      trust_boundary_enforced: {
        requires_user_approval_for_handoff: true,
        private_context_filtered: ["payment_credentials", "passport_number", "ssh_private_keys", "llm_api_keys"]
      },
      trip_parameters: {
        origin: this.state.vertical === "compute" ? this.state.origin : this.state.geoOrigin,
        destination: this.state.geoDest,
        days: this.state.days,
        tier: this.state.tier,
        addon: this.state.addon,
        budget_ceiling_usd: this.state.budgetUsd,
        currency: this.state.currency
      },
      telemetry: this.state.weather,
      negotiation_outcome: this.state.negotiationResult,
      a2a_message_transcript: this.state.transcript
    };
  }
}