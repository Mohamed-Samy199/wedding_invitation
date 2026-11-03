import { useEffect } from 'react';
import { AUTO_SCROLL } from '../../constants/scroll';

const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);
const smoothStep = (value) => value * value * (3 - 2 * value);

export default function useAutoScroll(enabled, containerRef) {
  useEffect(() => {
    if (!enabled || !containerRef.current) return undefined;

    const container = containerRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const readyAt = performance.now() + AUTO_SCROLL.startDelay;
    const pressedPointers = new Set();
    const pressedKeys = new Set();
    let hovered = finePointer.matches && container.matches(':hover');
    let windowFocused = true;
    let idleUntil = 0;
    let frame;
    let previousTime = performance.now();
    let runStartedAt = null;
    // Fractional positions are retained, so a slow speed still works at high FPS.
    let position = window.scrollY;
    let lastWrittenPosition = window.scrollY;

    const pauseForManualScroll = () => {
      idleUntil = performance.now() + AUTO_SCROLL.manualIdleDelay;
      runStartedAt = null;
      position = window.scrollY;
      lastWrittenPosition = window.scrollY;
    };

    const onPointerEnter = (event) => {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') hovered = true;
    };
    const onPointerLeave = (event) => {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') hovered = false;
    };
    const onPointerDown = (event) => {
      pressedPointers.add(event.pointerId);
      runStartedAt = null;
    };
    const onPointerUp = (event) => pressedPointers.delete(event.pointerId);
    const onWindowPointerOut = (event) => {
      if (!event.relatedTarget && event.pointerType !== 'touch') hovered = false;
    };
    const onKeyDown = (event) => {
      if (SCROLL_KEYS.has(event.key)) {
        pressedKeys.add(event.key);
        pauseForManualScroll();
      }
    };
    const onKeyUp = (event) => {
      if (pressedKeys.delete(event.key)) pauseForManualScroll();
    };
    const onScroll = () => {
      // Our instant frame updates must not be mistaken for user scrolling.
      if (Math.abs(window.scrollY - lastWrittenPosition) > 1) pauseForManualScroll();
    };
    const onBlur = () => {
      windowFocused = false;
      pressedPointers.clear();
      pressedKeys.clear();
      runStartedAt = null;
    };
    const onFocus = () => {
      windowFocused = true;
      hovered = finePointer.matches && container.matches(':hover');
      runStartedAt = null;
    };
    const resetRamp = () => { runStartedAt = null; };

    const tick = (now) => {
      // Clamp the frame gap to avoid jumps after a suspended/background tab.
      const elapsed = Math.min(now - previousTime, 50) / 1000;
      previousTime = now;
      const paused = now < readyAt || hovered || pressedPointers.size > 0 ||
        pressedKeys.size > 0 || now < idleUntil || document.hidden ||
        !windowFocused || reducedMotion.matches;
      const bottom = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

      if (paused || window.scrollY >= bottom) {
        runStartedAt = null;
        position = window.scrollY;
        lastWrittenPosition = window.scrollY;
      } else {
        if (runStartedAt === null) {
          runStartedAt = now;
          position = window.scrollY;
        }
        const progress = Math.min(1, (now - runStartedAt) / AUTO_SCROLL.rampDuration);
        const remaining = Math.max(0, bottom - position);
        const endEase = Math.min(1, Math.sqrt(remaining / AUTO_SCROLL.endSlowdownDistance));
        position = Math.min(bottom, position + AUTO_SCROLL.speed * smoothStep(progress) * endEase * elapsed);
        if (bottom - position < 0.5) position = bottom;
        // CSS scroll-smooth must not queue a fresh smooth animation on every frame.
        window.scrollTo({ top: position, left: window.scrollX, behavior: 'instant' });
        lastWrittenPosition = window.scrollY;
      }
      frame = window.requestAnimationFrame(tick);
    };

    container.addEventListener('pointerenter', onPointerEnter);
    container.addEventListener('pointerleave', onPointerLeave);
    container.addEventListener('pointerdown', onPointerDown, { passive: true });
    container.addEventListener('wheel', pauseForManualScroll, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
    window.addEventListener('pointerout', onWindowPointerOut);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', resetRamp);
    reducedMotion.addEventListener('change', resetRamp);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      container.removeEventListener('pointerenter', onPointerEnter);
      container.removeEventListener('pointerleave', onPointerLeave);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('wheel', pauseForManualScroll);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('pointerout', onWindowPointerOut);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', resetRamp);
      reducedMotion.removeEventListener('change', resetRamp);
    };
  }, [enabled, containerRef]);
}
