import { useEffect, useState } from 'react';
import galleryBackground from '../../assets/images/bg.png';
import { COUPLE } from '../../constants/couple';
import galleryOne from '../../assets/images/wedding-gallery/wedding-gallery-01.jpg';
import galleryTwo from '../../assets/images/wedding-gallery/wedding-gallery-02.jpg';
import galleryThree from '../../assets/images/wedding-gallery/wedding-gallery-03.jpg';

const SLIDES = [
  { src: galleryOne, alt: 'طاولة زفاف أنيقة وسط أزهار وإضاءة دافئة', caption: 'ليلة مليانة فرح' },
  { src: galleryTwo, alt: 'منصة زفاف مزينة بالزهور والستائر البيضاء', caption: 'تفاصيل تليق بفرحتنا' },
  { src: galleryThree, alt: 'تنسيق طاولة زفاف بالزهور والشموع', caption: 'لحظات تبقى في الذاكرة' },
];

const ARROW_CLASSES = [
  'absolute z-[2] top-1/2 grid place-items-center size-[44px] p-0',
  '[transform:translateY(-50%)] border border-[rgba(255,250,241,0.8)] rounded-full',
  'text-[#584b3b] bg-[rgba(255,251,242,0.88)] shadow-[0_5px_16px_rgba(42,34,27,0.18)]',
  'cursor-pointer [transition:background_0.2s_ease,transform_0.2s_ease]',
  'hover:[transform:translateY(-50%)_scale(1.06)] hover:bg-[#fffdf7]',
  'focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[#896d4e] focus-visible:outline-offset-[4px]',
  '[@media(max-width:480px)]:size-[38px] motion-reduce:transition-none',
].join(' ');

const DOT_CLASSES = [
  'h-[8px] p-0 border-0 rounded-[999px] cursor-pointer',
  '[transition:width_0.25s_ease,background_0.25s_ease] motion-reduce:transition-none',
  'focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-[#896d4e] focus-visible:outline-offset-[4px]',
].join(' ');

export default function WeddingGallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % SLIDES.length);

  return (
    <section
      id="wedding-gallery"
      className="pt-[clamp(52px,9vw,92px)] px-[18px] pb-[clamp(64px,10vw,100px)] [background:var(--gallery-bg)_center/cover_no-repeat,#eee8dc] text-center [@media(max-width:480px)]:px-[14px]"
      style={{ '--gallery-bg': `url(${galleryBackground})` }}
      aria-labelledby="wedding-gallery-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') showPrevious();
        if (event.key === 'ArrowLeft') showNext();
      }}
    >
      <div className="w-[min(100%,780px)] mx-auto">
        <div className="mb-[30px] [@media(max-width:480px)]:mb-[23px]">
          <span className="text-[#a18a6c] text-[12px] tracking-[0.08em]">ذكريات جميلة</span>
          <h2 id="wedding-gallery-title" className="mt-[5px] mb-[8px] text-[#4b4034] font-monogram text-[length:clamp(28px,7vw,38px)] font-medium">لحظات من الأفراح</h2>
          <p className="m-0 text-[#887b6d] text-[13px]">صور وتفاصيل نحتفل بها معًا</p>
        </div>

        <div className="relative w-[min(100%,680px)] mx-auto" role="region" aria-roledescription="carousel" aria-label="صور من الأفراح">
          <figure className="relative m-0 overflow-hidden aspect-[4/3] border border-[rgba(160,133,100,0.32)] rounded-[18px] bg-[#ddd6c8] shadow-[0_22px_48px_rgba(65,49,33,0.16)] [@media(max-width:480px)]:rounded-[14px]" aria-live="polite" aria-atomic="true">
            {SLIDES.map((slide, index) => (
              <img
                className={`absolute inset-0 w-full h-full object-cover [transition:opacity_0.75s_ease] motion-reduce:transition-none ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
                src={slide.src}
                alt={slide.alt}
                key={slide.src}
                aria-hidden={index !== activeIndex}
                loading={index === 0 ? 'eager' : 'lazy'}
                draggable="false"
              />
            ))}
            <figcaption className="absolute inset-x-0 bottom-0 pt-[44px] px-[20px] pb-[19px] text-[#fffaf1] [background:linear-gradient(transparent,rgba(42,34,27,0.62))] text-[15px] [text-shadow:0_1px_5px_rgba(0,0,0,0.25)]">{SLIDES[activeIndex].caption}</figcaption>
          </figure>

          <button className={`${ARROW_CLASSES} left-[13px] [@media(max-width:480px)]:left-[9px]`} type="button" onClick={showPrevious} aria-label="الصورة السابقة">
            <span className="mt-[-3px] [font-family:serif] text-[29px] leading-none" aria-hidden="true">›</span>
          </button>
          <button className={`${ARROW_CLASSES} right-[13px] [@media(max-width:480px)]:right-[9px]`} type="button" onClick={showNext} aria-label="الصورة التالية">
            <span className="mt-[-3px] [font-family:serif] text-[29px] leading-none" aria-hidden="true">‹</span>
          </button>

          <div className="flex justify-center items-center gap-[8px] mt-[19px]" role="group" aria-label="اختيار صورة">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                className={`${DOT_CLASSES} ${index === activeIndex ? 'w-[24px] bg-[#9b8060]' : 'w-[8px] bg-[#c7bca9]'}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`عرض الصورة ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-[5px] mt-[34px]" aria-label={`بكل الحب، ${COUPLE.groom} و${COUPLE.bride}`}>
          <p className="m-0 text-[#4b4034] font-monogram text-[length:clamp(30px,7vw,38px)] leading-[1.35]">{COUPLE.groom}<span className="text-[#a98a67] font-romantic text-[0.75em]" dir="ltr"> &amp; </span>{COUPLE.bride}</p>
          <span className="text-[#4b4034] text-[32px] leading-none [text-shadow:0_3px_9px_rgba(139,80,75,0.16)]" aria-hidden="true">♥</span>
        </div>
      </div>
    </section>
  );
}
