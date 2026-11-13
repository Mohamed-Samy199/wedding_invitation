import { COUPLE, COUPLE_INITIALS } from '../../constants/couple';

// مونوجرام الحرفين بخط مزخرف — الخط من font-monogram في Tailwind theme
export default function Monogram() {
  return (
    <div
      className="flex h-[calc(var(--size)*1.5)] select-none items-center justify-center [--size:clamp(130px,min(46vw,23svh),240px)] [direction:rtl] font-monogram text-[length:var(--size)] leading-[1.2]"
      role="img"
      aria-label={`${COUPLE.groom} و${COUPLE.bride}`}
    >
      <span
        className="block bg-clip-text text-transparent [background-image:linear-gradient(165deg,#d8b98f_0%,#a88259_48%,#7d5d42_100%)] [filter:drop-shadow(0_1.5px_0_rgba(255,250,241,.9))_drop-shadow(0_8px_12px_rgba(125,93,66,.28))] text-[length:14.5rem] [transform:translateY(-.08em)]"
        aria-hidden="true"
      >
        {COUPLE_INITIALS.groom}
      </span>
      <span
        className="block bg-clip-text text-transparent 
        [background-image:linear-gradient(165deg,#d8b98f_0%,#a88259_48%,#7d5d42_100%)] 
        [filter:drop-shadow(0_1.5px_0_rgba(255,250,241,.9))_drop-shadow(0_8px_12px_rgba(125,93,66,.28))] 
        text-[length:19.5rem] [transform:translateY(-.2em)] -ms-[.2em] "
        aria-hidden="true"
      >
        {COUPLE_INITIALS.bride}
      </span>
    </div>
  );
}
