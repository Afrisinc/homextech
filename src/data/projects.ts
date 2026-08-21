import type { Project } from "@/types";

/**
 * Delivery capability entries.
 *
 * These describe what OfficeHomeTechX designs and deploys. They are reference
 * architectures and capability statements — not claims about named customers.
 * Replace `status` with "Case study" and add `image` once real project data and
 * client permission are available.
 */
export const projects: Project[] = [
  {
    slug: "multi-vlan-office-network",
    image: "/images/network-flow.jpg",
    title: "Multi-VLAN office network",
    category: "Networking",
    status: "Reference architecture",
    summary:
      "A segmented office network separating staff, guest, voice, CCTV and management traffic, with documented addressing and firewall policy.",
    scope: [
      "Site survey and cable route planning",
      "Core switch and VLAN design",
      "Wireless coverage design",
      "Firewall policy and guest isolation",
      "As-built diagrams and IP plan",
    ],
    stack: ["Managed switching", "Routing", "Wi-Fi", "Firewall", "Structured cabling"],
  },
  {
    slug: "campus-ip-surveillance",
    title: "Campus IP surveillance",
    category: "CCTV",
    status: "Reference architecture",
    summary:
      "IP camera deployment sized from retention requirements first: bandwidth, storage and PoE budgets calculated before hardware selection.",
    scope: [
      "Camera placement and field-of-view planning",
      "Bandwidth and retention calculation",
      "NVR and storage sizing",
      "Dedicated surveillance VLAN",
      "Secure remote viewing",
    ],
    stack: ["IP cameras", "NVR", "PoE switching", "VLAN isolation", "Remote access"],
  },
  {
    slug: "private-cloud-cluster",
    image: "/images/hero-background.jpg",
    title: "Private cloud cluster",
    category: "Cloud",
    status: "Reference architecture",
    summary:
      "An on-premise virtualization cluster hosting line-of-business applications, databases and file services with tested restore procedures.",
    scope: [
      "Hypervisor cluster build",
      "Shared storage and snapshots",
      "Application and database hosting",
      "Backup design and restore testing",
      "Capacity and growth model",
    ],
    stack: ["Virtualization", "Containers", "Storage", "Backup", "Monitoring"],
  },
  {
    slug: "local-ai-inference-node",
    image: "/images/ai-core.jpg",
    title: "Local AI inference node",
    category: "AI",
    status: "Capability",
    summary:
      "A GPU workstation or server configured to run models on-premise, for organisations that cannot send data to external services.",
    scope: [
      "GPU, memory and storage sizing",
      "Power and thermal planning",
      "Model deployment and benchmarking",
      "Integration with existing applications",
      "Operator training",
    ],
    stack: ["GPU compute", "Linux", "Containers", "Local models", "Monitoring"],
  },
  {
    slug: "computer-lab-build",
    image: "/images/training-lab.jpg",
    title: "School computer lab build",
    category: "Computer Infrastructure",
    status: "Reference architecture",
    summary:
      "A managed lab: standardised workstation images, local file server, filtered internet access, power protection and a maintenance routine.",
    scope: [
      "Workstation specification and imaging",
      "Local server and shared storage",
      "Network and content filtering",
      "Power protection and cable management",
      "Maintenance schedule and staff training",
    ],
    stack: ["Workstations", "Imaging", "Local server", "Filtering", "UPS"],
  },
  {
    slug: "technician-training-programme",
    title: "Technician training programme",
    category: "Training",
    status: "Capability",
    summary:
      "A structured bench-based programme taking trainees from component identification to independent diagnosis and repair.",
    scope: [
      "Curriculum and lab setup",
      "Fault-injection exercises",
      "Assessment against practical tasks",
      "Portfolio of completed builds",
      "Progression into networking or cloud tracks",
    ],
    stack: ["Bench hardware", "Test equipment", "Lab network", "Assessment"],
  },
  {
    slug: "branch-connectivity-rollout",
    title: "Branch connectivity rollout",
    category: "Infrastructure Deployment",
    status: "Reference architecture",
    summary:
      "A repeatable branch template — router, switch, wireless, CCTV and local server — deployed identically across sites for supportability.",
    scope: [
      "Standard branch design",
      "Pre-staged configuration",
      "Site deployment runbook",
      "Central monitoring",
      "Handover documentation per site",
    ],
    stack: ["WAN", "Routing", "Switching", "Wi-Fi", "Monitoring"],
  },
];

export const projectCategories = [
  "All",
  "Networking",
  "CCTV",
  "Cloud",
  "AI",
  "Computer Infrastructure",
  "Training",
  "Infrastructure Deployment",
] as const;
