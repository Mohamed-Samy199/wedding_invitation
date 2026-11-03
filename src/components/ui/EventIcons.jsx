const base = {
  className: 'h-[clamp(24px,3.6svh,30px)] w-[clamp(24px,3.6svh,30px)] mb-[4px] text-[#6e5645]',
  viewBox: '0 0 32 32',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function CalendarIcon() {
  return (
    <svg {...base}>
      <rect x="5" y="7" width="22" height="20" rx="3" />
      <path d="M5 13h22M11 4v5M21 4v5" />
      <path d="M11 18h.01M16 18h.01M21 18h.01M11 22h.01M16 22h.01" strokeWidth="2" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg {...base}>
      <circle cx="16" cy="16" r="11.5" />
      <path d="M16 9v7l4.5 3" />
    </svg>
  );
}
