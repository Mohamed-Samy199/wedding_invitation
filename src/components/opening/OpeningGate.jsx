import cover from '../../assets/images/invitation-cover.jpg';
import GateSeal from './GateSeal';

export default function OpeningGate({ opened, opening, onOpen, refs }) {
  return (
    <section
      className={`fixed inset-0 z-20 overflow-hidden ${opened ? 'invisible pointer-events-none' : ''}`}
      style={{ '--cover': `url(${cover})` }}
      aria-label="افتح الدعوة"
    >
      <div className="absolute inset-0 grid place-items-center [perspective:1600px]">
        <div
          className="absolute top-0 bottom-0 left-0 z-[1] w-[50.15%] [background-image:linear-gradient(120deg,rgba(250,244,233,.19),rgba(119,83,58,.15)),var(--cover)] [background-size:cover,200%_100%] bg-no-repeat shadow-[0_0_35px_rgba(38,26,18,.28)] [backface-visibility:visible] will-change-transform [background-position:center,left_center] [transform-origin:left_center]"
          ref={refs.leftDoor}
          aria-hidden="true"
        />
        <div
          className="absolute top-0 right-0 bottom-0 z-[1] w-[50.15%] [background-image:linear-gradient(120deg,rgba(250,244,233,.19),rgba(119,83,58,.15)),var(--cover)] [background-size:cover,200%_100%] bg-no-repeat shadow-[0_0_35px_rgba(38,26,18,.28)] [backface-visibility:visible] will-change-transform [background-position:center,right_center] [transform-origin:right_center]"
          ref={refs.rightDoor}
          aria-hidden="true"
        />
        <GateSeal onOpen={onOpen} disabled={opening} sealRef={refs.seal} />
      </div>
    </section>
  );
}
