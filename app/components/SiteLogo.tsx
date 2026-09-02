type SiteLogoProps = {
  compact?: boolean;
};

export default function SiteLogo({ compact = false }: SiteLogoProps) {
  return (
    <span className={`site-logo${compact ? " site-logo-compact" : ""}`}>
      <svg
        className="site-logo-mark"
        viewBox="0 0 64 64"
        width={36}
        height={36}
        aria-hidden="true"
        focusable="false"
      >
        <rect width="64" height="64" rx="14" />
        <path
          className="site-logo-letter"
          d="M12 50 27 14h10l15 36h-9l-3-8H24l-3 8h-9Zm15-16h10l-5-13-5 13Z"
        />
        <path className="site-logo-accent" d="M16 41h32" />
      </svg>
      {!compact ? <span className="site-logo-wordmark">Asif Ahmed</span> : null}
    </span>
  );
}
