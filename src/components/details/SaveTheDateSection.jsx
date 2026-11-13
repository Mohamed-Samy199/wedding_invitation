import { useEffect, useMemo, useState } from 'react';
import bgImage from '../../assets/images/bg.png';
import { EVENT } from '../../constants/couple';

const WEEKDAYS = ['أحد', 'اثنين', 'ثلاثاء', 'اربعاء', 'خميس', 'جمعة', 'سبت'];
const pad = (value) => String(value).padStart(2, '0');

function getEventDateParts() {
  const [day, month, year] = EVENT.date.split('/').map((part) => Number(part.trim()));
  return { day, month, year };
}

function getEventDateTime() {
  const { day, month, year } = getEventDateParts();
  const [rawHour, minute] = EVENT.time.split(':').map(Number);
  const hour = EVENT.period.includes('مساء') ? (rawHour % 12) + 12 : rawHour % 12;
  const date = new Date(year, month - 1, day, hour, minute || 0, 0, 0);
  return { date };
}

function CalendarGrid() {
  const { day, month, year } = getEventDateParts();
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const monthName = new Intl.DateTimeFormat('ar-EG', { month: 'long', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, 1)));
  const cells = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div
      className="w-full rounded-[21px] border border-[rgba(155,158,130,.3)] bg-[rgba(248,247,232,.8)] px-[clamp(18px,6vw,32px)] pb-[24px] pt-[27px] shadow-[0_18px_42px_rgba(67,76,54,.1)] backdrop-blur-[7px]"
      aria-label={`تقويم ${monthName} ${year}`}
    >
      <div className="mb-[24px] flex flex-col items-center gap-[4px]">
        <span className="text-[17px] text-[#737663]">موعد الفرح</span>
        <span className="font-editorial text-[15px] uppercase tracking-[.16em] text-[#8b806b]">
          {monthName} <span className="ms-[4px] text-[12px]">{year}</span>
        </span>
      </div>
      <div className="grid grid-cols-7 items-center justify-items-center mb-[7px] text-[11px] text-[#8b8c78]" aria-hidden="true">
        {WEEKDAYS.map((weekday) => <span key={weekday}>{weekday}</span>)}
      </div>
      <div className="grid grid-cols-7 items-center justify-items-center gap-y-[4px]">
        {cells.map((date, index) => (
          <span
            className={date === day
              ? "relative grid h-[34px] w-[34px] place-items-center text-[12px] font-bold tabular-nums text-[#464a3b] before:absolute before:inset-[1px] before:rounded-full before:border before:border-[#9d8b72] before:content-[''] [@media(max-width:380px)]:h-[30px] [@media(max-width:380px)]:w-[30px]"
              : "grid h-[34px] w-[34px] place-items-center text-[12px] tabular-nums text-[#626556] [@media(max-width:380px)]:h-[30px] [@media(max-width:380px)]:w-[30px]"}
            key={`${date ?? 'blank'}-${index}`}
            aria-current={date === day ? 'date' : undefined}
          >
            {date ?? ''}
          </span>
        ))}
      </div>
    </div>
  );
}

function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  const eventTime = useMemo(() => getEventDateTime().date.getTime(), []);
  const remaining = Math.max(0, eventTime - now);
  const values = [
    { label: 'يوم', value: Math.floor(remaining / 86400000) },
    { label: 'ساعة', value: Math.floor((remaining / 3600000) % 24) },
    { label: 'دقيقة', value: Math.floor((remaining / 60000) % 60) },
    { label: 'ثانية', value: Math.floor((remaining / 1000) % 60) },
  ];

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="mt-[9px] w-full border-t border-[rgba(131,137,107,.25)] px-[14px] pb-[22px] pt-[28px]"
      aria-label="الوقت المتبقي حتى موعد الفرح"
    >
      <p className="mb-[20px] mt-0 font-editorial text-[15px] uppercase tracking-[.15em] text-[#737764]">العدّ التنازلي</p>
      <div className="grid grid-cols-4 gap-[10px] [@media(max-width:380px)]:gap-[4px]">
        {values.map(({ label, value }) => (
          <div className="flex flex-col items-center gap-[6px]" key={label}>
            <span className="font-romantic text-[clamp(28px,8vw,40px)] leading-none tabular-nums text-[#626653]">{pad(value)}</span>
            <span className="text-[11px] text-[#868875]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SaveTheDateSection() {
  return (
    <section
      id="save-the-date"
      className="relative min-h-[100svh] overflow-hidden px-[18px] pb-[56px] pt-[clamp(48px,8vw,86px)] [background:linear-gradient(180deg,_rgba(232,_234,_216,.34),_rgba(246,_244,_229,.24)),_var(--save-date-bg)_center_/_cover_no-repeat,_#e4e7d6] [@media(max-width:380px)]:px-[12px]"
      style={{ '--save-date-bg': `url(${bgImage})` }}
      aria-labelledby="save-date-title"
    >
      <div className="mx-auto flex w-[min(100%,460px)] flex-col items-center gap-[22px] text-center text-[#55584a]">
        <div className="w-full rounded-[17px] border border-[rgba(158,160,132,.28)] bg-[rgba(248,247,232,.73)] px-[20px] pb-[20px] pt-[18px] shadow-[0_12px_32px_rgba(67,76,54,.08)] backdrop-blur-[5px]">
          <span className="mb-[6px] inline-grid h-[34px] w-[34px] place-items-center rounded-full bg-[rgba(255,255,248,.7)] text-[22px] text-[#758160]" aria-hidden="true">⌖</span>
          <p className="m-0 text-[12px] text-[#8a8c75]">الموقع</p>
          <h2 className="m-[5px_0_7px] text-[18px] font-medium text-[#545849]" id="save-date-title">البرانية - اشمون</h2>
          <p className="m-0 text-[13px] leading-[1.8] text-[#777967]">قاعة ريم لاند الثانية</p>
        </div>

        <CalendarGrid />
        <Countdown />
      </div>
    </section>
  );
}
