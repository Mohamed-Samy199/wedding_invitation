import { COUPLE, EVENT } from '../../constants/couple';
import Footer from '../layout/Footer';

export default function DetailsSection() {
  return (
    <section
      id="details"
      className="relative overflow-hidden bg-[radial-gradient(ellipse_at_50%_0%,#f8f3e8_0%,#e9e1d4_74%)] px-[18px] py-[clamp(54px,9vw,96px)] text-center [@media(max-width:760px)]:px-[14px] [@media(max-width:760px)]:py-[48px]"
      aria-labelledby="invitation-heading"
    >
      <article className="relative mx-auto w-[min(100%,470px)] border border-[rgba(155,130,97,.5)] bg-[#f8f5e9] p-[12px] shadow-[0_22px_65px_rgba(78,58,38,.15),0_3px_10px_rgba(78,58,38,.08)] before:pointer-events-none before:absolute before:inset-[6px] before:border before:border-[rgba(180,153,115,.36)] before:content-['']">
        <div className="relative z-[1] flex min-h-[690px] flex-col items-center px-[clamp(18px,6vw,46px)] pb-[30px] pt-[48px] text-[#494238] [@media(max-width:760px)]:min-h-[650px] [@media(max-width:760px)]:pt-[38px] [@media(max-width:390px)]:min-h-[620px]! [@media(max-width:390px)]:px-[17px]">
          <p className="m-0 font-monogram text-[clamp(23px,6vw,30px)] text-[#90734e]">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</p>
          <div
            className="mb-[31px] mt-[12px] flex w-[min(230px,80%)] items-center gap-[14px] text-[#b5986e] before:h-px before:flex-1 before:bg-[linear-gradient(90deg,transparent,#b79a72)] before:content-[''] after:h-px after:flex-1 after:scale-x-[-1] after:bg-[linear-gradient(90deg,transparent,#b79a72)] after:content-['']"
            aria-hidden="true"
          >
            <span className="text-[13px]">✦</span>
          </div>

          <p className="m-0 font-monogram text-[clamp(32px,8vw,42px)] leading-[1.4] text-[#413a30]">
            {COUPLE.groom}<span className="font-romantic text-[.68em] text-[#b49870]" aria-hidden="true"> &amp; </span>{COUPLE.bride}
          </p>
          <h2 className="m-[8px_0_15px] text-[18px] font-medium text-[#76634d]" id="invitation-heading">دعوة لحضور الفرح</h2>

          <p className="m-0 max-w-[340px] text-[clamp(14px,3.7vw,16px)] font-normal leading-[2.15] text-[#696257]">
            وبدعاءٍ صادق أن يتمّ الله لنا ولكم الخير، نتشرّف بدعوتكم لمشاركتنا فرحتنا.
          </p>

          <div
            className="mb-[17px] mt-[21px] flex w-[min(220px,70%)] items-center gap-[12px] text-[#ad8e64] before:h-px before:flex-1 before:bg-[#d9cbb5] before:content-[''] after:h-px after:flex-1 after:bg-[#d9cbb5] after:content-['']"
            aria-hidden="true"
          >
            <span className="text-[20px]">❧</span>
          </div>

          <p className="m-0 max-w-[340px] text-[clamp(14px,3.7vw,16px)] font-normal leading-[2.15] text-[#514a3f]">
            في يومٍ جمع الله فيه القلوب،<br />
            وكتب فيه بداية عمرٍ جديد،<br />
            وجودكم بيننا شرف،<br />
            ومشاركتكم لنا تزيد الفرح فرحًا <span className="inline-block ms-[5px] text-[22px] text-[#bd9ab3] [vertical-align:-2px]">♡</span>
          </p>

          <p className="mx-0 mb-0 mt-[27px] max-w-[340px] text-[clamp(14px,3.7vw,16px)] font-normal leading-[2.15] text-[#75634c]">
            ننتظركم بكل محبة<br />
            لتكتمل فرحتنا بحضوركم
          </p>

          <div className="mt-[21px] flex flex-col gap-[4px] text-[12px] tracking-[.02em] text-[#8d7658]" aria-label="موعد الفرح">
            <span>{EVENT.weekday}، {EVENT.date}</span>
            <span>{EVENT.period === 'مساء' ? 'مساءً' : EVENT.period} · {EVENT.time}</span>
          </div>

          <p className="m-[auto_0_15px] pt-[35px] font-monogram text-[22px] text-[#796347] [@media(max-width:390px)]:text-[20px]">بارك الله لنا ولكم وجمعنا على خير</p>
          <Footer />
        </div>
      </article>
    </section>
  );
}
