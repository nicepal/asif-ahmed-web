import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "../components/PrintButton";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { ExternalLink, IconArrow } from "../components/Ui";
import { education, experience, expertise, projects } from "../content";
import { SITE_URL, site } from "../site";

export const metadata: Metadata = {
  title: "Résumé",
  description: `${site.name} is a ${site.role} in ${site.location} with ${site.experience} years of experience in Laravel, React, Node.js, and DevOps.`,
  alternates: {
    canonical: `${SITE_URL}/resume`,
  },
  openGraph: {
    url: `${SITE_URL}/resume`,
    title: `Résumé — ${site.name}`,
    description: `${site.role} · ${site.location} · ${site.experience} years`,
  },
};

export default function ResumePage() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="resume-page">
        <div className="wrap section resume-shell">
          <p className="eyebrow">Résumé</p>
          <h1>{site.name}</h1>
          <p className="resume-role">
            {site.role} · {site.location} · {site.experience} years
          </p>
          <p className="section-lede">
            Full-stack software engineer building SaaS products, HRMS platforms,
            event management systems, and enterprise web applications with
            Laravel, React, Node.js, and DevOps.
          </p>

          <div className="hero-actions resume-actions">
            <PrintButton />
            <Link className="text-link" href="/">
              Back to homepage <IconArrow />
            </Link>
          </div>

          <section className="resume-block" aria-labelledby="resume-contact">
            <h2 id="resume-contact">Contact</h2>
            <ul className="resume-contact">
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
              </li>
              <li>
                <ExternalLink href={site.linkedin}>LinkedIn</ExternalLink>
              </li>
              <li>
                <ExternalLink href={site.github}>GitHub</ExternalLink>
              </li>
            </ul>
          </section>

          <section className="resume-block" aria-labelledby="resume-experience">
            <h2 id="resume-experience">Experience</h2>
            <ol className="resume-list">
              {experience.map((job) => (
                <li key={`${job.company}-${job.dates}`}>
                  <h3>{job.company}</h3>
                  <p className="resume-meta">
                    {job.role} · {job.dates} · {job.location}
                  </p>
                  <p>{job.summary}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="resume-block" aria-labelledby="resume-expertise">
            <h2 id="resume-expertise">Expertise</h2>
            <ul className="resume-list">
              {expertise.map((area) => (
                <li key={area.name}>
                  <h3>{area.name}</h3>
                  <p>{area.skills.join(" · ")}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="resume-block" aria-labelledby="resume-projects">
            <h2 id="resume-projects">Featured projects</h2>
            <ul className="resume-list">
              {projects.map((project) => (
                <li key={project.name}>
                  <h3>{project.name}</h3>
                  <p className="resume-meta">{project.category}</p>
                  <p>{project.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="resume-block" aria-labelledby="resume-education">
            <h2 id="resume-education">Education</h2>
            <ul className="resume-list">
              {education.map((item) => (
                <li key={item.institution}>
                  <h3>{item.institution}</h3>
                  <p>
                    {item.qualification} · {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
