import { useEffect, useState } from 'react';
import butterflyImage from '../../assets/images/wedding-butterfly.webp';

const initialFlight = [
  { x: 12, y: 34, angle: -12, size: 86, delay: 0 },
  { x: 88, y: 42, angle: 14, size: 72, delay: 0.8 },
  { x: 16, y: 76, angle: 8, size: 64, delay: 1.5 },
  { x: 84, y: 78, angle: -9, size: 80, delay: 0.4 },
];

const randomFlight = (previous) => ({
  x: 8 + Math.random() * 84,
  y: 12 + Math.random() * 76,
  angle: Math.round(Math.random() * 56 - 28),
  size: previous.size,
  delay: previous.delay,
});

export default function ButterflyLayer() {
  const [butterflies, setButterflies] = useState(initialFlight);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timers = initialFlight.map((_, index) => {
      let timer;
      const flyAgain = () => {
        const pause = 3200 + Math.random() * 2600;
        timer = window.setTimeout(() => {
          setButterflies((current) =>
            current.map((butterfly, i) => (i === index ? randomFlight(butterfly) : butterfly)),
          );
          flyAgain();
        }, pause);
      };
      timer = window.setTimeout(flyAgain, 700 + initialFlight[index].delay * 1000);
      return () => window.clearTimeout(timer);
    });

    return () => timers.forEach((clearTimer) => clearTimer());
  }, []);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none" aria-hidden="true">
      {butterflies.map((butterfly, index) => (
        <span
          className="absolute block aspect-[1.23] opacity-[.76] [transform:translate(-50%,-50%)_rotate(var(--flight-angle))] [transition:left_4.8s_cubic-bezier(.45,0,.25,1),top_4.8s_cubic-bezier(.45,0,.25,1),transform_4.8s_ease-in-out] will-change-[left,top,transform] [filter:drop-shadow(0_5px_8px_rgba(104,74,48,.12))] motion-reduce:[transition:none]"
          key={index}
          style={{
            left: `${butterfly.x}%`,
            top: `${butterfly.y}%`,
            width: `clamp(42px, ${butterfly.size}px, 15vw)`,
            '--flight-angle': `${butterfly.angle}deg`,
            '--flight-delay': `${butterfly.delay}s`,
          }}
        >
          <img className="block h-full w-full object-contain animate-butterfly-flutter motion-reduce:animate-none [animation-delay:var(--flight-delay)]" src={butterflyImage} alt="" draggable="false" />
        </span>
      ))}
    </div>
  );
}
