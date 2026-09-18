import Link from "next/link";

type BrandLogoProps = {
  light?: boolean;
  className?: string;
  href?: string;
  onClick?: () => void;
  asButton?: boolean;
  tagline?: boolean;
};

export function BrandLogo({
  light = false,
  className = "",
  href = "/",
  onClick,
  asButton = false,
  tagline = false,
}: BrandLogoProps) {
  const image = (
    <span className="leashed-brand-art">
      <img
        src={light
          ? "/leashed-assets/brand/leashed-logo-light.webp"
          : "/leashed-assets/brand/leashed-logo-dark.webp"}
        alt="Leashed"
      />
      {tagline ? <small className="public-brand-tagline">SKILLS. CONFIDENCE. CAREER.</small> : null}
    </span>
  );

  if (asButton) {
    return <button type="button" className={`leashed-brand-logo ${className}`} onClick={onClick} aria-label="Leashed home">{image}</button>;
  }

  return <Link className={`leashed-brand-logo ${className}`} href={href} aria-label="Leashed home">{image}</Link>;
}
