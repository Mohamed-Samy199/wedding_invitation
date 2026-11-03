import heroBg from '../../assets/images/hero-bg.jpg';
import { COUPLE } from '../../constants/couple';
import ButterflyLayer from './ButterflyLayer';
import Monogram from './Monogram';
import EventInfo from './EventInfo';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#f3e1cc] before:absolute before:inset-[-40px] before:content-[''] before:[background:var(--hero-bg)_center/cover] before:blur-[28px] before:[transform:scale(1.1)] before:opacity-[.9]"
      style={{ '--hero-bg': `url(${heroBg})` }}
      aria-labelledby="hero-title"
    >
      <div className="relative mx-auto h-screen supports-[height:100svh]:h-[100svh] w-[min(100%,calc(100svh*0.5628))] [background:var(--hero-bg)_center/cover_no-repeat]">
        <h1 id="hero-title" className="sr-only">دعوة زفاف {COUPLE.groom} و{COUPLE.bride}</h1>
        <ButterflyLayer />
        <div className="absolute inset-x-0 top-[20%] z-[2] flex flex-col items-center gap-[clamp(22px,4.5svh,44px)]">
          <Monogram />
          <EventInfo />
        </div>
      </div>
    </section>
  );
}
