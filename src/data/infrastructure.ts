import type { ArchitectureBlueprint, FlowStep } from "@/types";

export const blueprints: ArchitectureBlueprint[] = [
  {
    id: "small-office",
    name: "Small Office",
    audience: "5 – 40 users, single site",
    summary:
      "One security boundary, one managed switch stack, and enough segmentation to keep CCTV and guest traffic away from business systems.",
    root: {
      id: "internet",
      label: "Internet",
      detail: "ISP handover",
      children: [
        {
          id: "firewall",
          label: "Firewall",
          detail: "Policy, NAT, guest isolation",
          children: [
            {
              id: "router",
              label: "Router",
              detail: "Inter-VLAN routing",
              children: [
                {
                  id: "switch",
                  label: "Managed switch",
                  detail: "VLANs, PoE",
                  children: [
                    { id: "computers", label: "Computers", detail: "Staff workstations" },
                    { id: "printers", label: "Printers", detail: "Print & scan VLAN" },
                    { id: "wifi", label: "Wi-Fi", detail: "Staff + guest SSIDs" },
                    { id: "cctv", label: "CCTV", detail: "Isolated camera VLAN" },
                    { id: "server", label: "Local server", detail: "Files, backup" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    notes: [
      "Guest wireless is isolated from every internal VLAN.",
      "CCTV sits on its own VLAN with no outbound internet access.",
      "Backups are written locally and copied off-site on a schedule.",
    ],
  },
  {
    id: "school",
    name: "School / Campus",
    audience: "Labs, classrooms and administration",
    summary:
      "A core network with clearly separated administrative, teaching and surveillance domains, plus a local server for content and identity.",
    root: {
      id: "internet",
      label: "Internet",
      detail: "ISP + content filtering",
      children: [
        {
          id: "firewall",
          label: "Firewall",
          detail: "Filtering, policy, logging",
          children: [
            {
              id: "core",
              label: "Core network",
              detail: "Layer 3 core switching",
              children: [
                { id: "admin", label: "Administration", detail: "Finance, records" },
                { id: "lab", label: "Computer lab", detail: "Managed workstations" },
                { id: "class", label: "Classrooms", detail: "Teaching devices" },
                { id: "cctv", label: "CCTV", detail: "Perimeter and corridors" },
                { id: "wifi", label: "Wi-Fi", detail: "Staff, student, guest" },
                { id: "server", label: "Local server", detail: "Identity, files, cache" },
              ],
            },
          ],
        },
      ],
    },
    notes: [
      "Student and administrative traffic never share a broadcast domain.",
      "Lab workstations are deployed from a standard image for fast recovery.",
      "Local caching reduces pressure on the internet link.",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "Multi-department, business-critical systems",
    summary:
      "Redundant core switching in front of a virtualization cluster, with storage, backup and monitoring treated as first-class components.",
    root: {
      id: "internet",
      label: "Internet",
      detail: "Redundant links",
      children: [
        {
          id: "gateway",
          label: "Security gateway",
          detail: "NGFW, IPS, VPN",
          children: [
            {
              id: "core",
              label: "Core switching",
              detail: "Redundant layer 3 core",
              children: [
                {
                  id: "cluster",
                  label: "Virtualization cluster",
                  detail: "High-availability hosts",
                  children: [
                    { id: "apps", label: "Applications", detail: "Line-of-business" },
                    { id: "db", label: "Database", detail: "Transactional systems" },
                    { id: "storage", label: "Storage", detail: "Shared, snapshotted" },
                    { id: "backup", label: "Backup", detail: "Restore-tested" },
                    { id: "monitoring", label: "Monitoring", detail: "Availability + security" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    notes: [
      "No single switch, host or link is a total outage point.",
      "Backups are verified by scheduled restore tests, not by job status alone.",
      "Monitoring alerts are tied to named owners and thresholds.",
    ],
  },
];

export const cloudFlow: FlowStep[] = [
  { id: "users", label: "Users", description: "Staff, branches and remote workers." },
  { id: "firewall", label: "Firewall", description: "Policy enforcement and inspection at the edge." },
  { id: "balancer", label: "Load balancer", description: "Distributes sessions and removes single points of failure." },
  { id: "app-a", label: "App server A", description: "Application workload, horizontally scalable." },
  { id: "app-b", label: "App server B", description: "Second instance for capacity and failover." },
  { id: "database", label: "Database", description: "Transactional store with replication." },
  { id: "storage", label: "Storage", description: "Shared volumes and object storage." },
  { id: "backup", label: "Backup", description: "Scheduled, off-site and restore-tested." },
];

export const cloudTopics = [
  {
    title: "Private cloud",
    body: "Compute, storage and networking owned and operated by the organisation — appropriate where data residency, latency or cost make external hosting unsuitable.",
  },
  {
    title: "Hybrid cloud",
    body: "Local infrastructure for the systems that must stay on site, combined with external services where elasticity or reach matters.",
  },
  {
    title: "Virtualization",
    body: "Multiple isolated systems on shared hardware, with snapshots and live migration that make maintenance routine instead of disruptive.",
  },
  {
    title: "Containers",
    body: "Application packaging that makes deployment repeatable and rollbacks fast, running on the same cluster as traditional workloads.",
  },
  {
    title: "Backup & disaster recovery",
    body: "Defined recovery point and recovery time objectives, off-site copies, and restores tested on a schedule rather than assumed.",
  },
  {
    title: "Infrastructure monitoring",
    body: "Continuous visibility into availability, capacity, temperature and security events, with alerts routed to a named owner.",
  },
] as const;

export const aiFlow: FlowStep[] = [
  { id: "data", label: "Data", description: "Documents, sensor feeds, camera streams and operational records." },
  { id: "gpu", label: "GPU infrastructure", description: "Compute sized for the workload — workstation, server or small cluster." },
  { id: "model", label: "AI model", description: "Local or hosted models selected for the task and the data policy." },
  { id: "application", label: "Application", description: "The interface where the output is actually used." },
  { id: "automation", label: "Automation", description: "Routine work handled without manual intervention." },
  { id: "engineer", label: "Engineer", description: "A person reviews, decides and remains accountable." },
];

export const aiTopics = [
  {
    title: "GPU workstations",
    body: "Single-machine compute for development, computer vision work and small-model inference, sized against VRAM and throughput requirements.",
  },
  {
    title: "AI servers",
    body: "Rack-mounted GPU compute with the power, cooling and networking to run inference workloads continuously.",
  },
  {
    title: "Local AI",
    body: "Models running inside the organisation's own network for data that cannot leave the premises.",
  },
  {
    title: "Computer vision",
    body: "Camera-to-detection pipelines for counting, presence, condition and safety monitoring.",
  },
  {
    title: "Intelligent monitoring",
    body: "Telemetry analysed for patterns that precede failure, surfaced as an alert with context.",
  },
  {
    title: "AI diagnostics",
    body: "Assistive triage for support teams: symptom to probable cause, with the engineer making the final call.",
  },
  {
    title: "AI automation",
    body: "Routine classification, extraction and reporting tasks handled by a model inside an existing workflow.",
  },
  {
    title: "AI training",
    body: "Skills transfer so the organisation can operate, evaluate and question its own AI systems.",
  },
] as const;

export const ohxAssistantFlow: FlowStep[] = [
  { id: "device", label: "Device", description: "A workstation, server, camera or network device reports a symptom." },
  { id: "sensors", label: "Sensors / camera", description: "Telemetry, logs and images are collected." },
  { id: "ohx", label: "OHX AI", description: "Signals are correlated against known fault patterns." },
  { id: "diagnosis", label: "Diagnosis", description: "A ranked set of probable causes with supporting evidence." },
  { id: "engineer", label: "Engineer", description: "A qualified technician reviews and confirms." },
  { id: "repair", label: "Repair recommendation", description: "A concrete action, parts list and verification step." },
];
