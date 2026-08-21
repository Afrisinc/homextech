import {
  Bot,
  CircuitBoard,
  Cloud,
  Cpu,
  GraduationCap,
  Headset,
  LifeBuoy,
  MonitorSmartphone,
  Network,
  ServerCog,
  ShieldCheck,
  Video,
  type LucideProps,
} from "lucide-react";

import type { IconName } from "@/types";

/**
 * Icon registry.
 *
 * Data files reference icons by name rather than by component, because a React
 * component is a function and functions cannot cross the server → client
 * boundary as props. The name is serialisable; the lookup happens here.
 */
const registry = {
  serverCog: ServerCog,
  network: Network,
  video: Video,
  cpu: Cpu,
  cloud: Cloud,
  bot: Bot,
  shield: ShieldCheck,
  lifeBuoy: LifeBuoy,
  graduationCap: GraduationCap,
  monitor: MonitorSmartphone,
  circuitBoard: CircuitBoard,
  headset: Headset,
} as const satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function Icon({
  name,
  ...props
}: { name: IconName } & LucideProps) {
  const Component = registry[name];
  return <Component {...props} />;
}
