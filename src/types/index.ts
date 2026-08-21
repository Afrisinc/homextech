export type IconName =
  | "serverCog"
  | "network"
  | "video"
  | "cpu"
  | "cloud"
  | "bot"
  | "shield"
  | "lifeBuoy"
  | "graduationCap"
  | "monitor"
  | "circuitBoard"
  | "headset";

export type ServiceCategory =
  | "infrastructure"
  | "networking"
  | "security"
  | "cloud"
  | "ai"
  | "engineering"
  | "support"
  | "training";

export interface Service {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  capabilities: string[];
  icon: IconName;
  accent: "brand" | "signal";
}

export interface TrainingProgram {
  slug: string;
  title: string;
  level: "Foundation" | "Intermediate" | "Advanced";
  summary: string;
  outcomes: string[];
  practical: string[];
  durationLabel: string;
  icon: IconName;
}

export interface Project {
  slug: string;
  title: string;
  category:
    | "Networking"
    | "CCTV"
    | "Cloud"
    | "AI"
    | "Computer Infrastructure"
    | "Training"
    | "Infrastructure Deployment";
  status: "Reference architecture" | "Capability" | "Case study";
  summary: string;
  scope: string[];
  stack: string[];
  image?: string;
}

export interface FlowStep {
  id: string;
  label: string;
  description: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  detail?: string;
  children?: ArchitectureNode[];
}

export interface ArchitectureBlueprint {
  id: string;
  name: string;
  audience: string;
  summary: string;
  root: ArchitectureNode;
  notes: string[];
}

export type NodeKind =
  | "core"
  | "server"
  | "network"
  | "cloud"
  | "cctv"
  | "laptop"
  | "gpu"
  | "database"
  | "firewall"
  | "wifi"
  | "storage"
  | "motherboard";

export interface SceneNodeSpec {
  id: NodeKind;
  label: string;
  short: string;
  position: [number, number, number];
  accent: "brand" | "signal";
  headline: string;
  points: string[];
  href?: string;
}

export interface InquiryPayload {
  fullName: string;
  organization?: string;
  email: string;
  phone?: string;
  country?: string;
  service: string;
  projectType?: string;
  message: string;
}

export interface ConsultationPayload {
  organization: string;
  contactName: string;
  email: string;
  phone?: string;
  infrastructureType: string;
  challenges: string;
  userCount: string;
  hasServers: string;
  hasNetworking: string;
  cloudRequirement: string;
  trainingRequirement: string;
}

export type SubmissionResult =
  | { ok: true; id: string; persisted: "supabase" | "local" }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
