import Link from "next/link";
import HomeHashLink from "./components/HomeHashLink";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { IconArrow } from "./components/Ui";
import { site } from "./site";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="content" className="wrap section not-found">
        <p className="eyebrow">404</p>
        <h1>This page is not available.</h1>
        <p className="section-lede">
          The link may be outdated. You can return to {site.name}’s portfolio or
          jump to selected work.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/">
            Go to homepage <IconArrow />
          </Link>
          <HomeHashLink className="button button-secondary" id="work">
            View Projects
          </HomeHashLink>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
