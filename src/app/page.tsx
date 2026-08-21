import { Audiences } from "@/components/sections/Audiences";
import { CtaBand } from "@/components/sections/CtaBand";
import { Hero } from "@/components/sections/Hero";
import { InfrastructureExplorer } from "@/components/sections/InfrastructureExplorer";
import { OhxAssistant } from "@/components/sections/OhxAssistant";
import { Pillars } from "@/components/sections/Pillars";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { TrainingShowcase } from "@/components/sections/TrainingShowcase";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Technology Infrastructure, AI & Practical Training",
  description:
    "OfficeHomeTechX Ltd designs, deploys and maintains networks, servers, cloud, CCTV and AI infrastructure — and trains the engineers who run them.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <ServicesOverview limit={6} />
      <InfrastructureExplorer />
      <OhxAssistant />
      <TrainingShowcase limit={3} />
      <ProjectsShowcase limit={3} />
      <Audiences />
      <CtaBand />
    </>
  );
}
