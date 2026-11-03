import { useCallback, useRef, useState } from 'react';
import gsap from 'gsap';
import { GATE_ANIMATION as A } from '../../constants/animation';
import { prefersReducedMotion } from '../../utils/motion';

export default function useOpenInvitation() {
  const [opened, setOpened] = useState(false);
  const [opening, setOpening] = useState(false);
  const leftDoor = useRef(null);
  const rightDoor = useRef(null);
  const seal = useRef(null);

  const finish = useCallback(() => {
    window.scrollTo({ top: 0, left: window.scrollX, behavior: 'instant' });
    setOpened(true);
  }, []);

  const open = useCallback(() => {
    if (opening || opened) return;
    setOpening(true);

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    // الهيرو ظاهر خلف الأبواب، فبمجرد انفتاحها تظهر الصفحة الأولى مباشرة
    gsap
      .timeline({ defaults: { ease: 'power3.inOut' }, onComplete: finish })
      .to(seal.current, { scale: 0.7, autoAlpha: 0, duration: A.sealDuration }, 0)
      .to(leftDoor.current, { rotateY: -A.doorRotation, xPercent: -A.doorShift, duration: A.doorDuration }, A.doorDelay)
      .to(rightDoor.current, { rotateY: A.doorRotation, xPercent: A.doorShift, duration: A.doorDuration }, A.doorDelay)
      .to([leftDoor.current, rightDoor.current], { autoAlpha: 0, duration: A.doorFadeDuration, ease: 'power1.out' }, A.doorFadeAt);
  }, [opening, opened, finish]);

  return { opened, opening, open, refs: { leftDoor, rightDoor, seal } };
}
