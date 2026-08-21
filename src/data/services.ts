import type { Service } from "@/types";

export const services: Service[] = [
  {
    slug: "it-infrastructure",
    title: "IT Infrastructure",
    category: "infrastructure",
    summary:
      "Office and campus IT built as a system: servers, workstations, storage, backup and monitoring specified against real workloads.",
    capabilities: [
      "Office IT infrastructure design",
      "Servers and workstations",
      "Storage and file services",
      "Backup and recovery",
      "Monitoring and reporting",
      "Asset and lifecycle planning",
    ],
    icon: "serverCog",
    accent: "brand",
  },
  {
    slug: "networking",
    title: "Networking",
    category: "networking",
    summary:
      "LAN, WAN and wireless engineered for capacity and fault isolation — with addressing plans and documentation that survive staff changes.",
    capabilities: [
      "LAN and WAN design",
      "Wi-Fi surveys and deployment",
      "Routing and switching",
      "VLANs and segmentation",
      "Structured cabling",
      "Firewall integration",
    ],
    icon: "network",
    accent: "signal",
  },
  {
    slug: "cctv-physical-security",
    title: "CCTV & Physical Security",
    category: "security",
    summary:
      "IP surveillance treated as a network workload: bandwidth, storage retention and access control planned before a single camera is mounted.",
    capabilities: [
      "IP camera selection and placement",
      "NVR and retention planning",
      "Dedicated surveillance networks",
      "Remote and mobile monitoring",
      "Power and PoE budgeting",
      "Preventive camera maintenance",
    ],
    icon: "video",
    accent: "brand",
  },
  {
    slug: "computer-engineering",
    title: "Computer Engineering",
    category: "engineering",
    summary:
      "Hardware-level diagnosis and repair for desktops and laptops, from BIOS and firmware to component-level board work.",
    capabilities: [
      "Desktop and laptop repair",
      "Motherboard troubleshooting",
      "BIOS and firmware recovery",
      "Operating system deployment",
      "Data recovery handling",
      "Preventive maintenance programmes",
    ],
    icon: "cpu",
    accent: "signal",
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    category: "cloud",
    summary:
      "Private and hybrid cloud built on virtualization, containers and storage you control — with backup and recovery designed in.",
    capabilities: [
      "Private cloud platforms",
      "Hybrid cloud integration",
      "Virtualization clusters",
      "Application and database hosting",
      "Container infrastructure",
      "Backup and disaster recovery",
    ],
    icon: "cloud",
    accent: "signal",
  },
  {
    slug: "ai-infrastructure",
    title: "AI Infrastructure",
    category: "ai",
    summary:
      "The compute, storage and networking organisations need before AI workloads can run reliably on their own premises.",
    capabilities: [
      "GPU workstations and servers",
      "Local inference infrastructure",
      "Computer vision pipelines",
      "Data storage for AI workloads",
      "Intelligent monitoring and diagnostics",
      "Automation integration",
    ],
    icon: "bot",
    accent: "brand",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    category: "security",
    summary:
      "Practical security engineering: segmentation, endpoint protection, tested backups and monitoring that someone actually reads.",
    capabilities: [
      "Network security architecture",
      "Firewall policy design",
      "Endpoint protection",
      "Security monitoring and logging",
      "Backup and recovery strategy",
      "Staff security awareness",
    ],
    icon: "shield",
    accent: "signal",
  },
  {
    slug: "technical-support",
    title: "Technical Support",
    category: "support",
    summary:
      "Scheduled preventive maintenance plus responsive onsite and remote support, with a written record of every intervention.",
    capabilities: [
      "Preventive maintenance visits",
      "Fault diagnosis and repair",
      "Infrastructure monitoring",
      "Onsite support",
      "Remote support",
      "Service reporting",
    ],
    icon: "lifeBuoy",
    accent: "brand",
  },
  {
    slug: "technology-training",
    title: "Technology Training",
    category: "training",
    summary:
      "Hands-on programmes that build operating capability inside the organisation — the difference between owning equipment and running it.",
    capabilities: [
      "Computer maintenance",
      "Networking and CCTV",
      "IT support and Windows administration",
      "Linux and servers",
      "Cloud infrastructure",
      "AI technology fundamentals",
    ],
    icon: "graduationCap",
    accent: "brand",
  },
];

export const serviceOptions = [
  "Networking",
  "Cloud Infrastructure",
  "CCTV",
  "Computer Maintenance",
  "AI Infrastructure",
  "IT Support",
  "Training",
  "Partnership",
  "Other",
] as const;

export const projectTypeOptions = [
  "New deployment",
  "Upgrade or expansion",
  "Troubleshooting",
  "Maintenance contract",
  "Assessment and design",
  "Training programme",
] as const;
