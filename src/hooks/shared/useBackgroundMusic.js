import { useCallback, useEffect, useRef } from 'react';
import { MUSIC } from '../../constants/audio';

// بيحمّل الـ mp3 من أول ما الصفحة تفتح، وبيشغّله لما نستدعي play()
// (لازم play() تتنادى من جوه ضغطة المستخدم عشان المتصفح يسمح بالصوت)
export default function useBackgroundMusic() {
  const audioRef = useRef(null);
  const fadeRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(MUSIC.src);
    audio.loop = MUSIC.loop;
    audio.preload = 'auto';
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      window.clearInterval(fadeRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;

    window.clearInterval(fadeRef.current);
    audio.volume = 0;

    const startedAt = performance.now();
    fadeRef.current = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - startedAt) / MUSIC.fadeInDuration);
      audio.volume = MUSIC.volume * progress;
      if (progress >= 1) window.clearInterval(fadeRef.current);
    }, 50);

    const attempt = audio.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        // المتصفح منع التشغيل — منكسرش الدعوة بسبب الصوت
        window.clearInterval(fadeRef.current);
      });
    }
  }, []);

  return { play };
}