import { COUPLE_INITIALS } from '../../constants/couple';

// الزر الوحيد في شاشة الافتتاحية — الضغط عليه يفتح الدعوة
export default function GateSeal({ onOpen, disabled, sealRef }) {
  return (
    <button
      ref={sealRef}
      type="button"
      className={`relative top-[1.6svh] z-[3] grid h-[92px] w-[92px] place-items-center rounded-full p-0 text-[#3d2a1c] text-[length:22px] font-bold [text-shadow:0_0_6px_rgba(255,250,241,.95),0_0_14px_rgba(255,250,241,.8)] shadow-[0_0_0_7px_rgba(255,250,241,.12),0_8px_24px_rgba(53,39,28,.16)] cursor-pointer transition-[background] duration-[250ms] hover:bg-[rgba(255,250,241,.24)] focus-visible:outline-2 focus-visible:outline-[#ab8469] focus-visible:outline-offset-[5px] before:absolute before:inset-[-7px] before:rounded-full before:border before:border-[rgba(255,250,241,.75)] before:content-[''] before:pointer-events-none before:animate-seal-pulse [@media(max-width:760px)]:h-[80px] [@media(max-width:760px)]:w-[80px] [@media(max-width:760px)]:text-[length:19px] motion-reduce:before:animate-none ${disabled ? 'cursor-wait before:opacity-0 before:animate-none' : ''}`}
      onClick={onOpen}
      disabled={disabled}
      aria-label="افتح الدعوة"
    >
      <span>{COUPLE_INITIALS.groom} &amp; {COUPLE_INITIALS.bride}</span>
      <i className="absolute bottom-[13px] not-italic text-[length:11px]" aria-hidden="true">✦</i>
    </button>
  );
}
