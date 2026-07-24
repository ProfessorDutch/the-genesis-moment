type Props = { size?: number; className?: string };

export function SeedMark({ size = 22, className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
      fill="none"
    >
      {/* seed */}
      <ellipse cx="12" cy="17" rx="3.6" ry="2.4" fill="currentColor" />
      {/* sprout stem */}
      <path
        d="M12 15 C 12 11, 12 9, 12 6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* leaf */}
      <path
        d="M12 9 C 15.5 8.5, 17 6.5, 17 4.5 C 14.5 4.5, 12.5 6, 12 9 Z"
        fill="currentColor"
      />
    </svg>
  );
}
