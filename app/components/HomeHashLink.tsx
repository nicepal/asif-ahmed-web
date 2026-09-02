type HomeHashLinkProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

/** Native hash links so section jumps work from /resume and other subpages. */
export default function HomeHashLink({
  id,
  className,
  children,
  onClick,
}: HomeHashLinkProps) {
  return (
    <a className={className} href={`/#${id}`} onClick={onClick}>
      {children}
    </a>
  );
}
