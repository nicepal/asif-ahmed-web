export type BrandAsset = {
  name: string;
  initials: string;
  src?: string;
};

export type Project = {
  name: string;
  category: string;
  description: string;
  stack: string[];
  brand: BrandAsset;
};

export type ExperienceItem = {
  period: string;
  dates: string;
  company: string;
  role: string;
  location: string;
  summary: string;
  brand: BrandAsset;
};

export type EducationItem = {
  mark: string;
  institution: string;
  qualification: string;
  detail: string;
  status: string;
};

export type ExpertiseArea = {
  name: string;
  description: string;
  skills: string[];
};

export const brandAssets = {
  pfa: {
    name: "Punjab Food Authority",
    initials: "PFA",
    src: "https://www.google.com/s2/favicons?domain=pfa.gop.pk&sz=128",
  },
  chimp: {
    name: "ChimpStudio",
    initials: "CS",
  },
  brickstory: {
    name: "BrickStory",
    initials: "BS",
    src: "https://brickstory.com/assets/images/logo.png",
  },
  bizhr: {
    name: "BizHR",
    initials: "BH",
    src: "https://www.bizhr.in/assets/logobizhr_1764443990057-Bu3VrRY_.png",
  },
  wayhopper: {
    name: "WayHopper",
    initials: "WH",
    src: "https://portal.wayhopper.com/images/logo.png",
  },
  starter: {
    name: "Laravel React Admin Starter Kit",
    initials: "AS",
  },
  codexpos: {
    name: "CodexPOS",
    initials: "CP",
  },
  freelance: {
    name: "Freelance Product Development",
    initials: "FD",
  },
  jotix: {
    name: "Jotix Technologies",
    initials: "JT",
  },
  techcity: {
    name: "Techcity.pk",
    initials: "TC",
  },
} as const satisfies Record<string, BrandAsset>;

export const showcaseBrands: BrandAsset[] = [
  brandAssets.pfa,
  brandAssets.chimp,
  brandAssets.wayhopper,
  brandAssets.bizhr,
  brandAssets.brickstory,
];

export const projects: Project[] = [
  {
    name: "WayHopper",
    category: "Event management · SaaS",
    description:
      "A location-based event platform connecting organizers, venues, and participants through GPS check-ins, ticketing, live leaderboards, and automated organizer payouts.",
    stack: ["Laravel", "Stripe Connect", "GPS + QR", "Firebase"],
    brand: brandAssets.wayhopper,
  },
  {
    name: "BizHR",
    category: "HRMS · Enterprise",
    description:
      "A multi-tenant HR platform that brings attendance, payroll, leave, biometric devices, expenses, employee workflows, and a mobile experience into one connected system.",
    stack: ["React", "Node.js", "PostgreSQL", "Drizzle ORM"],
    brand: brandAssets.bizhr,
  },
  {
    name: "BrickStory",
    category: "Property stories · Digital platform",
    description:
      "A property storytelling platform that brings together historic American homes, photos, architectural information, location discovery, and the stories behind every address.",
    stack: ["Property discovery", "Maps", "Media", "Storytelling"],
    brand: brandAssets.brickstory,
  },
  {
    name: "CodexPOS",
    category: "Commerce · Operations",
    description:
      "A restaurant-ready point-of-sale platform connecting table management, kitchen workflows, order handling, and day-to-day business operations in real time.",
    stack: ["React", "Laravel", "Kitchen Display", "Multi-tenant"],
    brand: brandAssets.codexpos,
  },
  {
    name: "Laravel React Admin Starter Kit",
    category: "Developer tools · Product",
    description:
      "A production-minded Laravel and React foundation with authentication, role-based access, audit trails, settings, and the building blocks development teams actually need.",
    stack: ["Laravel 12", "React 19", "Sanctum", "Tailwind"],
    brand: brandAssets.starter,
  },
];

export const experience: ExperienceItem[] = [
  {
    period: "Current",
    dates: "2026 — Present",
    company: "BizHR",
    role: "Full-Stack Software Engineer",
    location: "Dubai · Remote",
    summary:
      "Building a full HR management platform across React, Node.js, and PostgreSQL—from employee experiences to payroll, attendance, mobile APIs, DevOps, and production deployments.",
    brand: brandAssets.bizhr,
  },
  {
    period: "Project",
    dates: "Current",
    company: "WayHopper",
    role: "Senior Laravel Developer",
    location: "United States · Remote",
    summary:
      "Developing event-management infrastructure, Stripe Connect payment flows, GPS-driven check-ins, ticketing, operational tooling, and the DevOps needed to run large participant events.",
    brand: brandAssets.wayhopper,
  },
  {
    period: "Independent",
    dates: "Feb 2019 — Present",
    company: "Freelance Product Development",
    role: "Full-Stack Developer",
    location: "Worldwide",
    summary:
      "Turning client requirements into maintainable software across Laravel, CodeIgniter, PHP, React, payments, APIs, DevOps, and existing production systems.",
    brand: brandAssets.freelance,
  },
  {
    period: "Employment",
    dates: "Oct 2017 — Feb 2019",
    company: "ChimpStudio",
    role: "PHP Developer",
    location: "Lahore, Pakistan",
    summary:
      "Delivered software for Punjab Food Authority through ChimpStudio, including department modules, food licensing systems, mobile application web services, and operational workflows.",
    brand: brandAssets.chimp,
  },
  {
    period: "Employment",
    dates: "Jan 2015 — Sep 2017",
    company: "Jotix Technologies",
    role: "PHP Developer",
    location: "Pakistan",
    summary:
      "Built scalable APIs and backend services, collaborated directly with clients and stakeholders, and delivered production systems using PHP, CodeIgniter, Laravel, MySQL, JavaScript, and DevOps practices.",
    brand: brandAssets.jotix,
  },
  {
    period: "Employment",
    dates: "Jul 2011 — Dec 2014",
    company: "Techcity.pk",
    role: "PHP Developer",
    location: "Pakistan",
    summary:
      "Started my professional journey building backend modules, improving existing systems, maintaining frontend experiences, and delivering web projects with Core PHP and MySQL.",
    brand: brandAssets.techcity,
  },
];

export const education: EducationItem[] = [
  {
    mark: "VU",
    institution: "Virtual University of Pakistan",
    qualification: "Bachelor of Business & Information Technology (BBIT)",
    detail: "2023—2027 · Continuing",
    status: "Current student",
  },
  {
    mark: "BS",
    institution: "Bright Scope, Shah Faisal Colony, Karachi",
    qualification: "Advanced Diploma in Information Technology (DIT)",
    detail: "Shah Faisal Colony, Karachi",
    status: "Professional diploma",
  },
  {
    mark: "GS",
    institution: "Government Superior College, Karachi",
    qualification: "Intermediate",
    detail: "Karachi, Pakistan",
    status: "Completed",
  },
  {
    mark: "AT",
    institution: "Government Boys Agro Technical Secondary School, Shah Faisal Colony, Karachi",
    qualification: "Matriculation",
    detail: "Shah Faisal Colony, Karachi",
    status: "Completed",
  },
];

export const expertise: ExpertiseArea[] = [
  {
    name: "Backend engineering",
    description:
      "APIs, domain logic, queues, authentication, payment flows, and maintainable service architecture.",
    skills: ["Laravel", "PHP", "Node.js", "Express", "TypeScript", "CodeIgniter"],
  },
  {
    name: "Frontend and product UI",
    description:
      "Responsive interfaces and application workflows that stay understandable as products grow.",
    skills: ["React", "Vite", "JavaScript", "Tailwind", "Bootstrap", "TanStack Query"],
  },
  {
    name: "DevOps and infrastructure",
    description:
      "Production databases, deployment pipelines, monitoring, caching, and server operations.",
    skills: ["DevOps", "Docker", "AWS", "Nginx", "Git", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    name: "Integrations and real time",
    description:
      "The connective tissue that makes sophisticated products feel simple and dependable.",
    skills: [
      "Stripe Connect",
      "Razorpay",
      "Firebase",
      "Google Maps",
      "OAuth",
      "WebSockets",
      "REST APIs",
    ],
  },
];

export const stats = [
  { value: "14+", label: "Years building software" },
  { value: "2011", label: "Professional journey began" },
  { value: "5", label: "Featured product platforms" },
  { value: "Full-stack", label: "Product-to-production ownership" },
] as const;

export const heroTechnologies = [
  "Laravel",
  "React",
  "Node.js",
  "PHP",
  "TypeScript",
  "DevOps",
] as const;
