import { COUPLE } from '../../constants/couple';

export default function Footer() {
  return (
    <footer className="m-0 flex w-full flex-col gap-[5px] border-t border-[#dfd4c3] pt-[14px] text-[#948875] text-[length:10px]">
      <span>بكل الحب، {COUPLE.groom} و{COUPLE.bride}</span>
      <span>نسعد بحضوركم ومشاركتكم أجمل لحظاتنا</span>
    </footer>
  );
}
