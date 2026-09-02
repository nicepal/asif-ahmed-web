import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "../../components/BrandLogo";
import HomeHashLink from "../../components/HomeHashLink";
import { CaseStudyJsonLd } from "../../components/JsonLd";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";
import { IconArrow } from "../../components/Ui";
import { brandAssets } from "../../content";
import { SITE_URL, site } from "../../site";

const pageUrl = `${SITE_URL}/work/punjab-food-authority`;
const title = "Punjab Food Authority through ChimpStudio";
const description =
  "Career achievement: software, mobile application services, and digital workflows for Punjab Food Authority, delivered through ChimpStudio by Asif Ahmed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    url: pageUrl,
    title: `${title} | ${site.name}`,
    description,
  },
};

export default function PunjabFoodAuthorityPage() {
  return (
    <>
      <CaseStudyJsonLd />
      <SiteHeader />
      <main id="content" className="case-page">
        <article className="wrap section">
          <p className="eyebrow">Career achievement</p>
          <div className="achievement-brands case-brands">
            <BrandLogo {...brandAssets.pfa} className="achievement-logo" />
            <span aria-hidden="true">×</span>
            <BrandLogo {...brandAssets.chimp} className="achievement-logo" />
          </div>
          <h1>Punjab Food Authority</h1>
          <p className="resume-meta">
            Delivered through ChimpStudio · PHP Developer · Oct 2017 — Feb 2019 ·
            Lahore, Pakistan
          </p>
          <p className="section-lede">
            Working for Punjab Food Authority through ChimpStudio is one of my
            proudest professional achievements. The work supported food licensing
            operations and departmental processes with software, mobile
            application services, and digital workflows.
          </p>

          <section className="resume-block" aria-labelledby="case-context">
            <h2 id="case-context">Context</h2>
            <p>
              Punjab Food Authority is a public-sector licensing operation. The
              engagement was delivered while I was a PHP Developer at ChimpStudio
              in Lahore, from October 2017 to February 2019.
            </p>
          </section>

          <section className="resume-block" aria-labelledby="case-built">
            <h2 id="case-built">What I built</h2>
            <p>
              I helped develop department modules, food licensing software, mobile
              application web services, and operational systems used in day-to-day
              licensing workflows.
            </p>
          </section>

          <section className="resume-block" aria-labelledby="case-stack">
            <h2 id="case-stack">Approach</h2>
            <p>
              The implementation was PHP-based web software with mobile
              application web services. I do not list unverified product metrics,
              team size, or a public project URL here.
            </p>
          </section>

          <div className="hero-actions">
            <HomeHashLink className="button button-primary" id="experience">
              View experience <IconArrow />
            </HomeHashLink>
            <HomeHashLink className="button button-secondary" id="contact">
              Contact Me
            </HomeHashLink>
            <Link className="text-link" href="/">
              Back to homepage <IconArrow />
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
