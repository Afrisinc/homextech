export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", description: "Who we are and how we work" },
  { label: "Services", href: "/services", description: "Engineering disciplines" },
  {
    label: "Infrastructure",
    href: "/infrastructure",
    description: "Reference architectures",
  },
  { label: "Cloud", href: "/cloud", description: "Private and hybrid cloud" },
  { label: "AI", href: "/ai", description: "GPU and AI infrastructure" },
  { label: "Training", href: "/training", description: "OHX Academy programmes" },
  { label: "Projects", href: "/projects", description: "Delivery capability" },
  { label: "Contact", href: "/contact", description: "Talk to an engineer" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/contact" },
      { label: "Request a consultation", href: "/contact/consultation" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { label: "Infrastructure", href: "/infrastructure" },
      { label: "Networking", href: "/services#networking" },
      { label: "Cloud", href: "/cloud" },
      { label: "AI infrastructure", href: "/ai" },
      { label: "CCTV & security", href: "/services#cctv-physical-security" },
    ],
  },
  {
    title: "Training",
    items: [
      { label: "Computer maintenance", href: "/training#computer-maintenance" },
      { label: "Networking", href: "/training#networking" },
      { label: "Cloud infrastructure", href: "/training#cloud-infrastructure" },
      { label: "AI technology", href: "/training#ai-technology" },
      { label: "All programmes", href: "/training" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
