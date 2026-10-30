// Central content store. All technical figures below are placeholder copy
// and must be validated by Ellison's engineering team before launch.

export const company = {
  name: "Ellison Oil Field Services Pvt. Ltd.",
  short: "Ellison",
  tagline: "Gas Processing & Energy Solutions",
  email: "eofspl10@gmail.com",
  address: [
    "28, Fourth Floor, Four D Square Mall",
    "Visat-Gandhinagar Highway, Motera",
    "Ahmedabad, Gujarat, India",
  ],
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=Four+D+Square+Mall+Motera+Ahmedabad",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Technology", href: "#technology" },
  { label: "Operations", href: "#operations" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export type Metric = {
  value: number | string;
  decimals?: number;
  suffix?: string;
  label: string;
  note: string;
};

export const metrics: Metric[] = [
  { value: 99.8, decimals: 1, suffix: "%", label: "Recovery Efficiency", note: "Hydrocarbon capture across the train" },
  { value: 250, suffix: " bar", label: "High-Volume Compression", note: "Multi-stage discharge capability" },
  { value: "Zero", label: "Leakage Standards", note: "Sealed, monitored, audited systems" },
  { value: 24, suffix: "/7", label: "Field Telemetry", note: "Remote pressure & flow monitoring" },
];

export type Service = {
  id: string;
  key: "compression" | "extraction" | "dewpoint";
  kicker: string;
  title: string;
  summary: string;
  specs: { label: string; value: string }[];
  points: string[];
};

export const services: Service[] = [
  {
    id: "01",
    key: "compression",
    kicker: "Gas Compression",
    title: "Low-to-High Pressure Gas Compression",
    summary:
      "We capture low-pressure raw gas at the extraction point and route it through multi-stage industrial compression trains, converting stranded volumes into high-pressure, pipeline-ready marketable gas.",
    specs: [
      { label: "Suction", value: "0.5 – 5 bar(g)" },
      { label: "Discharge", value: "Up to 250 bar(g)" },
      { label: "Staging", value: "2 – 4 stage recip." },
      { label: "Throughput", value: "Up to 1.5 MMSCMD" },
    ],
    points: [
      "Wellhead & casing-head gas capture",
      "Inter-stage cooling and scrubbing",
      "Skid-mounted, rapid-deploy packages",
    ],
  },
  {
    id: "02",
    key: "extraction",
    kicker: "By-Product Recovery",
    title: "Mineral & Hydrocarbon By-Product Extraction",
    summary:
      "Separating, extracting and commercialising valuable natural minerals, heavy liquids and secondary chemical by-products released during gas purification, turning process waste into revenue.",
    specs: [
      { label: "Separation", value: "3-phase G/O/W" },
      { label: "Streams", value: "Condensate, heavies, brine" },
      { label: "Solids", value: "Filtration & recovery" },
      { label: "Offtake", value: "Graded for resale" },
    ],
    points: [
      "Heavy liquid & condensate segregation",
      "Mineral-rich brine & solids handling",
      "Chain-of-custody and quality grading",
    ],
  },
  {
    id: "03",
    key: "dewpoint",
    kicker: "Dew Point Control",
    title: "Hydrocarbon Dew Point Conditioning & Liquid Recovery",
    summary:
      "Precision temperature and dew point control to drop out high-value natural gas liquids, ensuring safe pipeline compliance while opening a secondary NGL and condensate distribution stream.",
    specs: [
      { label: "HCDP target", value: "≤ 0 °C @ op. pressure" },
      { label: "Method", value: "JT / mech. refrigeration" },
      { label: "Recovery", value: "C3+ NGL & condensate" },
      { label: "Compliance", value: "Pipeline gas spec" },
    ],
    points: [
      "Gas-gas exchange & chilling",
      "Low-temperature separation (LTS)",
      "Stabilised liquids for distribution",
    ],
  },
];

export const processSteps = [
  {
    id: "01",
    title: "Intake",
    sub: "Low Pressure",
    pressure: "2 bar",
    temp: "38 °C",
    body: "Raw associated gas is gathered from wellheads and flare points, metered, and passed through inlet scrubbers to remove free liquids and solids.",
  },
  {
    id: "02",
    title: "Processing & Compression",
    sub: "Multi-Stage",
    pressure: "85 → 210 bar",
    temp: "45 °C",
    body: "Staged reciprocating compression with inter-cooling raises pressure in controlled ratios while knock-out drums capture condensing liquids at every stage.",
  },
  {
    id: "03",
    title: "Dew Point Optimization",
    sub: "Conditioning",
    pressure: "205 bar",
    temp: "-5 °C",
    body: "Gas is chilled through exchangers and low-temperature separation, dropping out NGLs and conditioning the stream to pipeline hydrocarbon dew point spec.",
  },
  {
    id: "04",
    title: "Output & Distribution",
    sub: "Marketable Gas",
    pressure: "210 bar",
    temp: "30 °C",
    body: "Spec-compliant high-pressure gas is metered into pipelines or cascades for industrial sale, while recovered liquids and minerals move to offtake.",
  },
];

export type Equipment = {
  icon: "skid" | "screw" | "separator" | "exchanger" | "glycol" | "analyzer";
  tag: string;
  title: string;
  body: string;
  specs: [string, string][];
};

export const equipment: Equipment[] = [
  {
    icon: "skid",
    tag: "Compression",
    title: "Reciprocating Compression Skid",
    body: "Gas-engine or electric driven multi-stage packages for high-ratio boosting.",
    specs: [["Power", "250 – 1,500 kW"], ["Discharge", "250 bar(g)"]],
  },
  {
    icon: "screw",
    tag: "Compression",
    title: "Rotary Screw Booster",
    body: "Flooded screw units for very low suction, vapour recovery and wellhead boost.",
    specs: [["Suction", "Near-vacuum"], ["Turndown", "10 – 100%"]],
  },
  {
    icon: "separator",
    tag: "Separation",
    title: "Three-Phase Separator",
    body: "Horizontal vessels splitting gas, hydrocarbon liquids and produced water.",
    specs: [["Design", "Pressure vessel code"], ["Phases", "Gas / Oil / Water"]],
  },
  {
    icon: "exchanger",
    tag: "Conditioning",
    title: "Dew Point Control Unit",
    body: "JT valve or refrigeration package with gas-gas exchanger and LTS vessel.",
    specs: [["HCDP", "≤ 0 °C"], ["Recovery", "C3+ NGL"]],
  },
  {
    icon: "glycol",
    tag: "Treatment",
    title: "Glycol Dehydration Module",
    body: "TEG contactor and regeneration skid for water dew point compliance.",
    specs: [["Water content", "Pipeline spec"], ["Regen", "Closed loop"]],
  },
  {
    icon: "analyzer",
    tag: "Compliance",
    title: "Metering & Analyzer Module",
    body: "Custody-transfer metering, gas chromatography and SCADA telemetry.",
    specs: [["Data", "Real-time SCADA"], ["Analysis", "Online GC"]],
  },
];

// Reference codes shown on the equipment grid. Confirm which ones Ellison
// actually designs or certifies to before publishing.
export const standards = ["API 618", "API 11P", "ASME Sec. VIII", "PESO", "OISD", "ISO 9001", "ISO 14001", "ISO 45001"];

export const pillars = [
  {
    title: "Reliability",
    body: "Redundant compression trains, predictive maintenance and round-the-clock telemetry keep uptime high and volumes flowing.",
  },
  {
    title: "Environmental Standards",
    body: "Every molecule we capture is one less flared. Sealed systems and leak detection keep emissions to a minimum.",
  },
  {
    title: "Technical Expertise",
    body: "Process engineers and field crews with deep oil field experience, from wellhead hookup to custody transfer.",
  },
];

export const marquee = [
  "Gas Compression",
  "By-Product Recovery",
  "Dew Point Control",
  "NGL Recovery",
  "Three-Phase Separation",
  "Flare Gas Capture",
  "Field Telemetry",
];

export type GalleryItem = {
  /** Photo in /public/gallery. Until it exists, an illustrated placeholder is shown. */
  src: string;
  title: string;
  location: string;
  category: "Field Sites" | "Equipment" | "Operations";
  icon: Equipment["icon"];
  /** Bento tile size on large screens. */
  span?: "wide" | "tall";
};

export const gallery: GalleryItem[] = [
  { src: "/gallery/01.jpg", title: "Multi-stage compression skid", location: "Mehsana, Gujarat", category: "Equipment", icon: "skid", span: "wide" },
  { src: "/gallery/02.jpg", title: "Wellhead gas gathering", location: "Kalol field", category: "Field Sites", icon: "separator", span: "tall" },
  { src: "/gallery/03.jpg", title: "Screw compressor overhaul", location: "Ahmedabad workshop", category: "Operations", icon: "screw" },
  { src: "/gallery/04.jpg", title: "Glycol dehydration unit", location: "Cambay basin", category: "Equipment", icon: "glycol" },
  { src: "/gallery/05.jpg", title: "Heat exchanger train", location: "Ankleshwar", category: "Equipment", icon: "exchanger" },
  { src: "/gallery/06.jpg", title: "Online gas analyser commissioning", location: "Mehsana, Gujarat", category: "Operations", icon: "analyzer", span: "wide" },
  { src: "/gallery/07.jpg", title: "Three-phase separator hookup", location: "Kalol field", category: "Field Sites", icon: "separator" },
];
