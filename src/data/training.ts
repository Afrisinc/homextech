import type { FlowStep, TrainingProgram } from "@/types";

export const trainingPrograms: TrainingProgram[] = [
  {
    slug: "computer-maintenance",
    title: "Computer Maintenance",
    level: "Foundation",
    summary:
      "Understand what is inside a computer, how to diagnose it, and how to keep it running.",
    outcomes: [
      "Identify and test every major component",
      "Install and recover operating systems",
      "Manage drivers, updates and firmware",
      "Run a preventive maintenance schedule",
      "Work through a structured fault-finding process",
    ],
    practical: [
      "Strip and rebuild a working machine",
      "Diagnose no-power and no-display faults",
      "Clean OS install with drivers and updates",
      "Storage health checks and cloning",
    ],
    durationLabel: "Duration on request",
    icon: "monitor",
  },
  {
    slug: "motherboard-repair",
    title: "Motherboard Repair",
    level: "Advanced",
    summary:
      "Component-level diagnosis for laptop and desktop boards, taught on real faulty hardware.",
    outcomes: [
      "Read board layouts and power sequencing",
      "Understand BIOS/UEFI behaviour and recovery",
      "Measure and interpret power rails",
      "Isolate short circuits and failed components",
      "Decide when a board is economically repairable",
    ],
    practical: [
      "Visual and thermal board inspection",
      "Power rail measurement with a multimeter",
      "BIOS reflash and recovery workflow",
      "Rework practice on scrap boards",
    ],
    durationLabel: "Duration on request",
    icon: "circuitBoard",
  },
  {
    slug: "networking",
    title: "Networking",
    level: "Intermediate",
    summary:
      "From cable termination to routed, segmented and monitored networks.",
    outcomes: [
      "Terminate and certify structured cabling",
      "Plan IPv4 addressing and subnets",
      "Configure switches, VLANs and trunks",
      "Configure routers, NAT and basic firewall policy",
      "Deploy and tune wireless coverage",
    ],
    practical: [
      "Build a multi-VLAN lab from scratch",
      "Break and repair a routed path",
      "Wireless survey and channel planning",
      "Packet-level troubleshooting",
    ],
    durationLabel: "Duration on request",
    icon: "network",
  },
  {
    slug: "cctv-installation",
    title: "CCTV Installation",
    level: "Intermediate",
    summary:
      "Design, install and support IP surveillance systems that actually record what matters.",
    outcomes: [
      "Compare analogue, HD-over-coax and IP technologies",
      "Calculate bandwidth and storage retention",
      "Configure cameras, NVRs and PoE switches",
      "Plan camera placement and lighting",
      "Support remote viewing securely",
    ],
    practical: [
      "Mount, aim and focus cameras",
      "Configure an NVR and retention policy",
      "PoE budgeting and cable testing",
      "Fault-find a dropped camera stream",
    ],
    durationLabel: "Duration on request",
    icon: "video",
  },
  {
    slug: "it-support",
    title: "IT Support",
    level: "Foundation",
    summary:
      "The service-desk discipline: users, Windows, software, printers, networks and clear escalation.",
    outcomes: [
      "Run a structured troubleshooting method",
      "Administer Windows users, policy and shares",
      "Support printers, peripherals and software",
      "Diagnose common connectivity problems",
      "Document tickets and hand over cleanly",
    ],
    practical: [
      "Live ticket simulations",
      "Windows account and permission exercises",
      "Printer and driver troubleshooting",
      "Remote support tooling",
    ],
    durationLabel: "Duration on request",
    icon: "headset",
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    level: "Advanced",
    summary:
      "Servers, Linux, virtualization, containers and storage — the foundations under any cloud.",
    outcomes: [
      "Install and administer Linux servers",
      "Build virtual machines on a hypervisor",
      "Deploy applications in containers",
      "Design storage, snapshots and backups",
      "Expose services safely through a network",
    ],
    practical: [
      "Build a hypervisor host and VMs",
      "Containerise and deploy an application",
      "Configure backups and restore-test them",
      "Simulate and recover from a node failure",
    ],
    durationLabel: "Duration on request",
    icon: "cloud",
  },
  {
    slug: "ai-technology",
    title: "AI Technology",
    level: "Intermediate",
    summary:
      "What AI systems need to run, how to operate them locally, and how to judge them honestly.",
    outcomes: [
      "Explain models, inference and training in practical terms",
      "Run local models on GPU and CPU hardware",
      "Size GPU, memory and storage for a workload",
      "Build a simple computer-vision pipeline",
      "Apply responsible-use and data-handling practices",
    ],
    practical: [
      "Deploy a local model on a GPU workstation",
      "Benchmark inference performance",
      "Build a camera-to-detection pipeline",
      "Automate a routine task with a model",
    ],
    durationLabel: "Duration on request",
    icon: "bot",
  },
];

export const learningPipeline: FlowStep[] = [
  { id: "learn", label: "Learn", description: "Concepts explained against real hardware, not abstractions." },
  { id: "practice", label: "Practice", description: "Guided repetition on the bench until the workflow is automatic." },
  { id: "build", label: "Build", description: "Assemble a working system end to end." },
  { id: "break", label: "Break", description: "Introduce controlled faults — the fastest way to learn a system." },
  { id: "diagnose", label: "Diagnose", description: "Follow evidence rather than guesswork to the failing part." },
  { id: "repair", label: "Repair", description: "Fix it, verify it, and document what was done." },
  { id: "deploy", label: "Deploy", description: "Put the system into service under supervision." },
  { id: "job-ready", label: "Job-ready", description: "Work independently with a portfolio of completed builds." },
];
