import { SITE_URL, site } from "../site";

export function SiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: site.name,
        url: SITE_URL,
        image: `${SITE_URL}${site.profileImage}`,
        jobTitle: site.role,
        description: site.description,
        email: `mailto:${site.email}`,
        telephone: site.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.locationLocality,
          addressCountry: site.locationCountry,
        },
        sameAs: [site.github, site.linkedin, site.facebook],
        knowsAbout: [...site.specialties],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: `${site.name} — ${site.role}`,
        url: SITE_URL,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function HomeJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: site.title,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: { "@id": `${SITE_URL}/#person` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function CaseStudyJsonLd() {
  const url = `${SITE_URL}/work/punjab-food-authority`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: "Punjab Food Authority project through ChimpStudio",
    description:
      "Career achievement: software, mobile application services, and digital workflows for Punjab Food Authority, delivered through ChimpStudio.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
