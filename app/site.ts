/**
 * Canonical site configuration.
 *
 * Production origin: set `NEXT_PUBLIC_SITE_URL` (no trailing slash) to override.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://asifahmed.tech"
).replace(/\/$/, "");

export const site = {
  name: "Asif Ahmed",
  role: "Full-Stack Software Engineer",
  location: "Lahore, Pakistan",
  locationLocality: "Lahore",
  locationCountry: "PK",
  experience: "14+",
  careerStart: "2011",
  email: "asifahmed715@gmail.com",
  phone: "+923139188022",
  phoneDisplay: "+92 313 9188022",
  github: "https://github.com/nicepal/",
  linkedin: "https://www.linkedin.com/in/codexhive/",
  facebook: "https://web.facebook.com/soft.dev.asif",
  profileImage: "/asif-profile.jpg",
  logo: "/asif-ahmed-logo.svg",
  ogImage: "/og.png",
  favicon: "/favicon.svg",
  title: "Asif Ahmed — Full-Stack Software Engineer",
  titleTemplate: "%s | Asif Ahmed",
  description:
    "Asif Ahmed is a Full-Stack Software Engineer in Lahore, Pakistan, with 14+ years of experience building SaaS products, HRMS platforms, event management systems, and enterprise web applications with Laravel, React, Node.js, and DevOps.",
  keywords: [
    "Asif Ahmed",
    "Full-Stack Software Engineer",
    "Laravel Developer",
    "React Developer",
    "Node.js Developer",
    "SaaS Development",
    "API Development",
    "HRMS Development",
    "Event Management Platforms",
    "Enterprise Web Applications",
    "DevOps",
    "Lahore, Pakistan",
  ],
  specialties: [
    "Laravel",
    "React",
    "Node.js",
    "PHP",
    "TypeScript",
    "DevOps",
    "SaaS Development",
    "API Development",
    "HRMS Development",
    "Event Management Platforms",
    "Enterprise Web Applications",
  ],
} as const;

export const THEME_STORAGE_KEY = "asif-theme";

export const navItems = [
  { id: "about", label: "About" },
  { id: "expertise", label: "Expertise" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
] as const;
