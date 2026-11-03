import { EVENT } from '../../constants/couple';
import { CalendarIcon, ClockIcon } from '../ui/EventIcons';

// يمين: التقويم (اليوم + التاريخ) — شمال: الساعة (الفترة + الوقت)
export default function EventInfo() {
  return (
    <div className="flex items-start justify-center gap-[clamp(36px,12vw,62px)] text-center text-[#5b4636]">
      <div className="flex min-w-[92px] flex-col items-center gap-[6px] text-[length:clamp(14px,2.2svh,17px)] leading-[1.5]">
        <CalendarIcon />
        <span className="font-semibold">{EVENT.weekday}</span>
        <span className="font-medium tracking-[.04em] text-[#6f5a4a] [font-variant-numeric:tabular-nums]" dir="ltr">{EVENT.date}</span>
      </div>
      <div className="flex min-w-[92px] flex-col items-center gap-[6px] text-[length:clamp(14px,2.2svh,17px)] leading-[1.5]">
        <ClockIcon />
        <span className="font-semibold">{EVENT.period}</span>
        <span className="font-medium tracking-[.04em] text-[#6f5a4a] [font-variant-numeric:tabular-nums]" dir="ltr">{EVENT.time}</span>
      </div>
    </div>
  );
}
