export const company = {
  name: "OfficeHomeTechX",
  legalName: "OfficeHomeTechX Ltd",
  tagline: "Home & Office Tech Support",
  positioning:
    "Technology infrastructure engineering, AI infrastructure and practical technical training.",
  descriptionShort:
    "OfficeHomeTechX Ltd designs, deploys and maintains technology infrastructure — networks, servers, cloud, CCTV and AI systems — and trains the people who run them.",
  email: "hometekx@gmail.com",
  phone: "+250 787 522 185",
  phoneAlt: "+250 788 233 298",
  location: "Kigali, Rwanda",
  serviceArea: "Rwanda and the wider East African region",
  hours: "Monday – Saturday, 08:00 – 18:00 CAT",
  siteUrl: "https://officehometechx.com",
  social: {
    linkedin: "#",
    x: "#",
    youtube: "#",
    whatsapp: "#",
  },
} as const;

export const pillars = [
  {
    id: "build",
    title: "We build technology infrastructure",
    body: "Networks, servers, virtualization, private and hybrid cloud, storage, backup, CCTV and monitoring — designed, deployed and documented as one system rather than a collection of devices.",
    points: [
      "Assessment and architecture before procurement",
      "Structured cabling, switching, routing and wireless",
      "Servers, virtualization, storage and backup",
      "Firewalls, segmentation and security monitoring",
    ],
  },
  {
    id: "train",
    title: "We train the people who run it",
    body: "Practical, hands-on programmes in computer maintenance, motherboard repair, networking, CCTV, IT support, cloud and AI infrastructure — taught on working equipment, not slides.",
    points: [
      "Bench work on real machines and real faults",
      "Networking labs with switches, routers and wireless",
      "Server, Linux, virtualization and container practice",
      "AI and GPU infrastructure fundamentals",
    ],
  },
] as const;

export const engineeringFlow = [
  {
    id: "assess",
    label: "Assess",
    description:
      "Site survey, inventory, traffic and workload analysis, risk and gap assessment.",
  },
  {
    id: "design",
    label: "Design",
    description:
      "Architecture, addressing plan, capacity model, security zones and bill of materials.",
  },
  {
    id: "build",
    label: "Build",
    description:
      "Cabling, racking, configuration, virtualization and system integration.",
  },
  {
    id: "secure",
    label: "Secure",
    description:
      "Segmentation, firewall policy, endpoint hardening, access control and backup design.",
  },
  {
    id: "deploy",
    label: "Deploy",
    description:
      "Cutover planning, migration, user onboarding and documented handover.",
  },
  {
    id: "monitor",
    label: "Monitor",
    description:
      "Availability, capacity and security telemetry with defined alert thresholds.",
  },
  {
    id: "maintain",
    label: "Maintain",
    description:
      "Preventive maintenance, patching, spares management and scheduled reviews.",
  },
  {
    id: "train",
    label: "Train",
    description:
      "Skills transfer so the organisation can operate what has been built.",
  },
] as const;

export const capabilityStats = [
  { label: "Disciplines covered", value: "8", detail: "Network to AI infrastructure" },
  { label: "Training programmes", value: "7", detail: "Practical, bench-based" },
  { label: "Support model", value: "Onsite + remote", detail: "Preventive and reactive" },
  { label: "Documentation", value: "Always", detail: "Diagrams, IP plans, handover" },
] as const;

export const audiences = [
  "Government institutions",
  "Universities & schools",
  "Companies & SMEs",
  "NGOs",
  "Financial institutions",
  "Technology partners",
] as const;
