import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "./components/BrandLogo";
import { HomeJsonLd } from "./components/JsonLd";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { ExternalLink, IconArrow } from "./components/Ui";
import {
  brandAssets,
  education,
  experience,
  expertise,
  heroTechnologies,
  projects,
  showcaseBrands,
  stats,
} from "./content";
import { SITE_URL, site } from "./site";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
  },
};

function SectionIntro({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      <p className="section-lede">{children}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <SiteHeader />

      <main id="content">
        <section className="hero wrap" id="top" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="availability">
              <span className="availability-dot" aria-hidden="true" />
              Available for selected projects
            </p>
            <p className="eyebrow">
              {site.role} · {site.location}
            </p>
            <h1 id="hero-heading">{site.name}</h1>
            <p className="hero-intro">
              A Full-Stack Software Engineer with {site.experience} years of
              experience building SaaS products, HRMS platforms, event
              management systems, and enterprise web applications. Primary
              stack: Laravel, React, Node.js, and DevOps.
            </p>
            <ul className="tech-row" aria-label="Primary technologies">
              {heroTechnologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                View Projects <IconArrow />
              </a>
              <a className="button button-secondary" href="#contact">
                Contact Me
              </a>
              <Link className="text-link" href="/resume">
                View résumé <IconArrow />
              </Link>
              <ExternalLink className="text-link" href={site.linkedin}>
                LinkedIn <IconArrow diagonal />
              </ExternalLink>
              <ExternalLink className="text-link" href={site.github}>
                GitHub <IconArrow diagonal />
              </ExternalLink>
            </div>
          </div>

          <aside className="hero-card" aria-label="Profile overview">
            <div className="portrait-wrap">
              {/* Vinext local image optimization is unreliable in preview; keep explicit dimensions for CLS. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.profileImage}
                alt="Portrait of Asif Ahmed, Full-Stack Software Engineer"
                width={819}
                height={1024}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <dl className="profile-meta">
              <div>
                <dt>Based in</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Experience</dt>
                <dd>{site.experience} years</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>SaaS and enterprise systems</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="facts" aria-label="Professional statistics">
          <dl className="wrap fact-grid">
            {stats.map((item) => (
              <div key={item.label}>
                <dd>{item.value}</dd>
                <dt>{item.label}</dt>
              </div>
            ))}
          </dl>
        </section>

        <section className="brand-showcase" aria-label="Companies and platforms">
          <div className="wrap">
            <p className="eyebrow">Companies, projects, and platforms</p>
            <ul className="brand-showcase-grid">
              {showcaseBrands.map((brand) => (
                <li className="showcase-brand" key={brand.name}>
                  <BrandLogo {...brand} className="showcase-logo" />
                  <span>{brand.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="wrap section" id="about" aria-labelledby="about-heading">
          <div className="about-grid">
            <div>
              <p className="eyebrow">About</p>
              <h2 id="about-heading">Engineering that turns complex operations into dependable products.</h2>
            </div>
            <div className="about-copy">
              <p>
                I work across the full product: understanding what a business
                needs, shaping an interface people can use, building the backend
                that keeps it reliable, and getting it safely into production.
              </p>
              <p>
                That experience covers HR technology, government licensing, event
                platforms, commerce operations, and API-heavy business software.
                I am at my best when thoughtful engineering can make a
                complicated workflow feel clear and dependable.
              </p>
            </div>
          </div>
        </section>

        <section
          className="expertise-section"
          id="expertise"
          aria-labelledby="expertise-heading"
        >
          <div className="wrap section">
            <SectionIntro
              id="expertise-heading"
              eyebrow="Technical expertise"
              title="Backend depth, product-minded frontend, and production operations."
            >
              Deep backend experience with Laravel, PHP, and Node.js, pragmatic
              React interfaces, and DevOps knowledge required to ship and
              support real software.
            </SectionIntro>
            <div className="expertise-grid">
              {expertise.map((area) => (
                <article className="expertise-card" key={area.name}>
                  <h3>{area.name}</h3>
                  <p>{area.description}</p>
                  <ul className="skill-list">
                    {area.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap section" id="work" aria-labelledby="work-heading">
          <SectionIntro
            id="work-heading"
            eyebrow="Featured projects"
            title="Platforms built for real operational work."
          >
            Selected product work across event management, HRMS development, property
            platforms, restaurant operations, and reusable Laravel and React
            foundations.
          </SectionIntro>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project" key={project.name}>
                <p className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="project-content">
                  <div className="project-heading">
                    <BrandLogo {...project.brand} className="project-logo" />
                    <div>
                      <p className="project-type">{project.category}</p>
                      <h3>{project.name}</h3>
                    </div>
                  </div>
                  <p>{project.description}</p>
                  <ul className="chips">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className="achievement-section"
          id="achievement"
          aria-labelledby="achievement-heading"
        >
          <div className="wrap">
            <p className="eyebrow">Career achievement</p>
            <div className="achievement">
              <div className="achievement-brands">
                <BrandLogo {...brandAssets.pfa} className="achievement-logo" />
                <span aria-hidden="true">×</span>
                <BrandLogo {...brandAssets.chimp} className="achievement-logo" />
              </div>
              <div>
                <h2 id="achievement-heading">
                  Punjab Food Authority, delivered through ChimpStudio
                </h2>
                <p>
                  Working for Punjab Food Authority through ChimpStudio is one of
                  my proudest professional achievements. I helped develop
                  software, mobile application services, and digital workflows
                  that supported food licensing operations and departmental
                  processes.
                </p>
                <Link className="text-link achievement-link" href="/work/punjab-food-authority">
                  Read case study <IconArrow />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="wrap section experience"
          id="experience"
          aria-labelledby="experience-heading"
        >
          <SectionIntro
            id="experience-heading"
            eyebrow="Professional experience"
            title="A career built in production systems."
          >
            From Core PHP systems to modern multi-tenant platforms, each chapter
            added another layer of product ownership, including DevOps for
            shipping and running production systems.
          </SectionIntro>
          <ol className="timeline">
            {experience.map((job) => (
              <li className="experience-row" key={`${job.company}-${job.dates}`}>
                <div className="job-period">
                  <span>{job.period}</span>
                  <strong>{job.dates}</strong>
                </div>
                <div>
                  <div className="job-heading">
                    <BrandLogo {...job.brand} className="job-logo" />
                    <div>
                      <h3>{job.company}</h3>
                      <p className="role">{job.role}</p>
                    </div>
                  </div>
                  <p className="job-summary">{job.summary}</p>
                </div>
                <p className="job-location">{job.location}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="wrap section education"
          id="education"
          aria-labelledby="education-heading"
        >
          <SectionIntro
            id="education-heading"
            eyebrow="Education and certifications"
            title="A foundation built in Karachi, continued in business and IT."
          >
            Technical training and school in Shah Faisal Colony, Karachi, followed
            by university-level business and information technology studies.
          </SectionIntro>
          <ul className="education-list">
            {education.map((item) => (
              <li className="education-card" key={item.institution}>
                <div className="education-mark" aria-hidden="true">
                  {item.mark}
                </div>
                <div>
                  <h3>{item.institution}</h3>
                  <p>{item.qualification}</p>
                  <p className="education-detail">{item.detail}</p>
                </div>
                <p className="education-status">{item.status}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="wrap contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">Contact</p>
              <h2 id="contact-heading">Let’s talk about the next product that needs to ship.</h2>
              <p className="contact-intro">
                Open to full-stack roles, freelance projects, and thoughtful
                product collaborations in Pakistan, the UAE, and worldwide.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href={`mailto:${site.email}`}>
                  Email {site.name} <IconArrow />
                </a>
                <ExternalLink className="button button-secondary" href={site.linkedin}>
                  LinkedIn <IconArrow diagonal />
                </ExternalLink>
                <ExternalLink className="text-link" href={site.github}>
                  GitHub <IconArrow diagonal />
                </ExternalLink>
              </div>
            </div>
            <address className="contact-card">
              <p className="contact-card-label">Direct</p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
              <p>{site.location}</p>
              <div className="social-links">
                <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
                <ExternalLink href={site.github}>GitHub</ExternalLink>
                <ExternalLink href={site.facebook}>Facebook</ExternalLink>
              </div>
            </address>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
