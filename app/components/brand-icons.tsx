type BrandIconName = "signal" | "workflow" | "retention" | "title" | "script" | "thumbnail" | "premium";

type BrandIconProps = {
  name: BrandIconName;
  className?: string;
};

const iconPaths: Record<BrandIconName, React.ReactNode> = {
  signal: (
    <>
      <path d="M4 18V8" />
      <path d="M10 18V4" />
      <path d="M16 18v-7" />
      <path d="M22 18V6" />
    </>
  ),
  workflow: (
    <>
      <path d="M6 7h5" />
      <path d="M13 7h5" />
      <path d="M18 7v10" />
      <path d="M18 17H8" />
      <path d="M8 17V11" />
      <circle cx="6" cy="7" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="8" cy="17" r="2" />
    </>
  ),
  retention: (
    <>
      <path d="M4 16c3-8 7-8 10-2 2 4 4 5 6 1" />
      <path d="M4 20h16" />
      <path d="M4 4v16" />
      <circle cx="14" cy="14" r="2" />
    </>
  ),
  title: (
    <>
      <path d="M5 6h14" />
      <path d="M8 6v12" />
      <path d="M16 6v12" />
      <path d="M7 18h10" />
    </>
  ),
  script: (
    <>
      <path d="M7 4h8l4 4v12H7z" />
      <path d="M15 4v5h5" />
      <path d="M10 13h7" />
      <path d="M10 17h5" />
    </>
  ),
  thumbnail: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="3" />
      <path d="M8 15l3-3 2 2 3-4 2 5" />
      <circle cx="9" cy="10" r="1" />
    </>
  ),
  premium: (
    <>
      <path d="M12 3l3 6 6 .8-4.5 4.4 1.1 6.3L12 17l-5.6 3.5 1.1-6.3L3 9.8 9 9z" />
      <path d="M12 8v5" />
    </>
  ),
};

export function BrandIcon({ name, className = "" }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {iconPaths[name]}
    </svg>
  );
}

export function BrandIconTile({ name }: { name: BrandIconName }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-300 shadow-lg shadow-emerald-500/10">
      <BrandIcon name={name} className="h-5 w-5" />
    </div>
  );
}
