import Link from "next/link";
import SiteLogo from "./SiteLogo";
import { site } from "../site";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-bar">
        <Link className="brand-link" href="/" aria-label="Asif Ahmed, home">
          <SiteLogo compact />
        </Link>
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          {site.role} · {site.location}
        </p>
        <a href="#content">Back to top</a>
      </div>
    </footer>
  );
}
