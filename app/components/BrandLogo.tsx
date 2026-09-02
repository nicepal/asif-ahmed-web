"use client";

import { useState } from "react";

type BrandLogoProps = {
  name: string;
  initials: string;
  src?: string;
  className?: string;
};

export default function BrandLogo({
  initials,
  src,
  className = "",
}: BrandLogoProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span className={`company-logo ${className}`.trim()} aria-hidden="true">
      {showImage ? (
        // Remote brand marks need an onError fallback; Vinext cannot reliably optimize them.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </span>
  );
}
